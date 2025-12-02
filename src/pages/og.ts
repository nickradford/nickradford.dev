import type { APIRoute } from "astro";
import satori from "satori";

export const prerender = false;

function boolParam(value: string | null, fallback: boolean): boolean {
  if (value === null) return fallback;
  return value === "1" || value === "true";
}

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams;

  const title = q.get("title") ?? "Nick Radford";
  const subtitle =
    q.get("subtitle") ??
    "Software engineer, pool shark, and amateur improviser.";
  const date = q.get("date");
  const readTime = q.get("readTime");
  const showName = boolParam(q.get("showName"), true);
  const showSubtitle = boolParam(q.get("showSubtitle"), false);

  const svg = await satori(
    // @ts-ignore
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #e4e4e7 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e4e4e7 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          color: "#52525b",
          padding: "40px",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "32px",
                left: "40px",
                right: "40px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                letterSpacing: "0.125rem",
              },
              children: [
                date
                   ? new Intl.DateTimeFormat("en-us", {
                       dateStyle: "long",
                     }).format(new Date(date))
                   : "",
                readTime ?? "",
              ],
            },
          },
          {
            type: "h1",
            props: {
              style: { fontSize: 48, lineHeight: 1.1, color: "#18181b" },
              children: title,
            },
          },
          showSubtitle && subtitle
            ? {
                type: "h2",
                props: { style: { fontSize: 24 }, children: subtitle },
              }
            : null,
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "8px",
                left: "40px",
                right: "40px",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 20,
                alignItems: "baseline",
              },
              children: [
                showName
                  ? {
                      type: "h3",
                      props: {
                        style: { fontSize: 28, color: "#18181b" },
                        children: "Nick Radford",
                      },
                    }
                  : "",
                "nickradford.dev",
              ],
            },
          },
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: -8,
                height: 8,
                backgroundImage:
                  "linear-gradient(90deg, rgba(2,0,36,0) 0%, rgba(2,0,36,0) 50%, rgba(2,132,199,1) 100%)",
              },
            },
          },
        ],
      },
    },
    { width: 800, height: 400 }
  );

  return new Response(svg, {
    headers: {
      "content-type": "image/svg+xml",
    "cache-control": "public, max-age=31536000, immutable",
  },
  });
};
