export type GitHubContributionDay = {
  date: string;
  contributionCount: number;
  weekday: number;
};

export type GitHubContributionWeek = {
  firstDay: string;
  contributionDays: GitHubContributionDay[];
};

export type GitHubContributionMonth = {
  name: string;
  firstDay: string;
  totalWeeks: number;
};

export type GitHubContributionCalendar = {
  totalContributions: number;
  maxContributionCount: number;
  stats: GitHubContributionStats;
  weeks: GitHubContributionWeek[];
  months: GitHubContributionMonth[];
};

export type GitHubContributionStats = {
  averagePerDay: number;
  busiestDay: {
    date: string;
    contributionCount: number;
  } | null;
  busiestWeekday: {
    label: string;
    contributionCount: number;
  } | null;
  longestStreak: number;
  currentStreak: number;
  recentBusiestHour: {
    label: string;
    commitCount: number;
  } | null;
};

type GitHubContributionResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: GitHubContributionWeek[];
          months: GitHubContributionMonth[];
        };
      };
    };
  };
  errors?: Array<{ message?: string }>;
};

const GITHUB_GRAPHQL_ENDPOINT = "https://api.github.com/graphql";
const GITHUB_REST_ENDPOINT = "https://api.github.com";
const DEFAULT_LOGIN = "nickradford";
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let cachedContributionCalendar: Promise<GitHubContributionCalendar | null> | null = null;

function getGitHubToken() {
  return process.env.GITHUB_TOKEN ?? import.meta.env.GITHUB_TOKEN;
}

function getMaxContributionCount(weeks: GitHubContributionWeek[]) {
  return weeks.reduce((max, week) => {
    return week.contributionDays.reduce(
      (weekMax, day) => Math.max(weekMax, day.contributionCount),
      max,
    );
  }, 0);
}

function getContributionDays(weeks: GitHubContributionWeek[]) {
  return weeks
    .flatMap((week) => week.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));
}

function getLongestStreak(days: GitHubContributionDay[]) {
  let longestStreak = 0;
  let currentStreak = 0;

  days.forEach((day) => {
    if (day.contributionCount > 0) {
      currentStreak += 1;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return longestStreak;
}

function getCurrentStreak(days: GitHubContributionDay[]) {
  let streak = 0;

  for (let index = days.length - 1; index >= 0; index -= 1) {
    const day = days[index];

    if (!day) {
      continue;
    }

    if (day.contributionCount === 0) {
      if (streak === 0 && index === days.length - 1) {
        continue;
      }

      break;
    }

    streak += 1;
  }

  return streak;
}

function getBusiestWeekday(days: GitHubContributionDay[]) {
  const weekdayTotals = new Map<number, number>();

  days.forEach((day) => {
    weekdayTotals.set(
      day.weekday,
      (weekdayTotals.get(day.weekday) ?? 0) + day.contributionCount,
    );
  });

  const busiest = Array.from(weekdayTotals.entries()).sort((a, b) => b[1] - a[1])[0];

  if (!busiest) {
    return null;
  }

  return {
    label: WEEKDAY_LABELS[busiest[0]] ?? "Day",
    contributionCount: busiest[1],
  };
}

function getCalendarStats(
  calendar: NonNullable<
    GitHubContributionResponse["data"]
  >["user"]["contributionsCollection"]["contributionCalendar"],
  recentBusiestHour: GitHubContributionStats["recentBusiestHour"],
): GitHubContributionStats {
  const days = getContributionDays(calendar.weeks);
  const busiestDay = days.reduce<GitHubContributionDay | null>((busiest, day) => {
    if (!busiest || day.contributionCount > busiest.contributionCount) {
      return day;
    }

    return busiest;
  }, null);

  return {
    averagePerDay: days.length > 0 ? calendar.totalContributions / days.length : 0,
    busiestDay: busiestDay
      ? {
          date: busiestDay.date,
          contributionCount: busiestDay.contributionCount,
        }
      : null,
    busiestWeekday: getBusiestWeekday(days),
    longestStreak: getLongestStreak(days),
    currentStreak: getCurrentStreak(days),
    recentBusiestHour,
  };
}

function formatHour(hour: number) {
  const suffix = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;

  return `${hour12} ${suffix}`;
}

async function fetchRecentBusiestHour(login: string, token: string) {
  const response = await fetch(`${GITHUB_REST_ENDPOINT}/users/${login}/events/public?per_page=100`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    return null;
  }

  const events = (await response.json()) as Array<{
    created_at?: string;
    type?: string;
    payload?: {
      commits?: unknown[];
    };
  }>;
  const hourlyCommitCounts = new Map<number, number>();

  events.forEach((event) => {
    if (event.type !== "PushEvent" || !event.created_at) {
      return;
    }

    const commitCount = Array.isArray(event.payload?.commits)
      ? event.payload.commits.length
      : 1;
    const hour = new Date(event.created_at).getHours();

    hourlyCommitCounts.set(hour, (hourlyCommitCounts.get(hour) ?? 0) + commitCount);
  });

  const busiest = Array.from(hourlyCommitCounts.entries()).sort((a, b) => b[1] - a[1])[0];

  if (!busiest) {
    return null;
  }

  return {
    label: formatHour(busiest[0]),
    commitCount: busiest[1],
  };
}

async function fetchGitHubContributionCalendar(
  login = DEFAULT_LOGIN,
): Promise<GitHubContributionCalendar | null> {
  const token = getGitHubToken();

  if (!token) {
    return null;
  }

  const response = await fetch(GITHUB_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query GitHubContributionCalendar($login: String!) {
          user(login: $login) {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                months {
                  name
                  firstDay
                  totalWeeks
                }
                weeks {
                  firstDay
                  contributionDays {
                    date
                    contributionCount
                    weekday
                  }
                }
              }
            }
          }
        }
      `,
      variables: { login },
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub contribution fetch failed with ${response.status}`);
  }

  const payload = (await response.json()) as GitHubContributionResponse;
  const calendar = payload.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar || payload.errors?.length) {
    throw new Error(payload.errors?.[0]?.message ?? "GitHub contribution data was missing");
  }

  const recentBusiestHour = await fetchRecentBusiestHour(login, token).catch(() => null);

  return {
    ...calendar,
    maxContributionCount: getMaxContributionCount(calendar.weeks),
    stats: getCalendarStats(calendar, recentBusiestHour),
  };
}

export async function getGitHubContributionCalendar() {
  cachedContributionCalendar ??= fetchGitHubContributionCalendar().catch((error) => {
    console.warn(
      error instanceof Error
        ? `Skipping GitHub contribution hover card: ${error.message}`
        : "Skipping GitHub contribution hover card",
    );

    return null;
  });

  return cachedContributionCalendar;
}
