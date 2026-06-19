interface JobItemProps {
  company: string;
  extraInfo?: string;
  img: any;
  role: string;
  startDate: string;
  endDate: string;
  summary?: string;
  highlights?: string[];
  technologies?: string[];
  logoTreatment?: "contain";
}

import heyday from "./src/images/heyday.png";
import govalo from "./src/images/govalo.png";
import cruise from "./src/images/cruise.png";
import unity from "./src/images/unity.png";
import idean from "./src/images/idean.png";
import euclid from "./src/images/euclid-wework.png";
import walmart from "./src/images/walmart.png";
import dell from "./src/images/dell.png";

const jobs: JobItemProps[] = [
  {
    company: "Sumi",
    role: "Founder",
    startDate: "Oct 2025",
    endDate: "Present",
    img: "/sumi-logo.svg",
    logoTreatment: "contain",
    summary:
      "Building a full-stack B2B SaaS platform for tattoo artists and studios across intake, booking, studio profiles, project pipelines, admin tooling, onboarding, payments, and public booking flows.",
    highlights: [
      "Own product discovery, customer workflow research, roadmap decisions, full-stack architecture, and studio-facing positioning.",
      "Interviewed around 20 tattoo artists and integrated Sumi with 2 working artist workflows while preparing for release and paid users.",
      "Integrated Gmail, Google Calendar, Stripe, Resend, PostHog, and Cloudflare infrastructure for communication, appointments, onboarding, payments, and operations.",
    ],
    technologies: [
      "TypeScript",
      "React",
      "TanStack Start",
      "Drizzle ORM",
      "PostgreSQL",
      "Stripe",
      "Cloudflare stack",
    ],
  },
  {
    company: "Heyday",
    role: "Senior Frontend Engineer",
    startDate: "Jan 2023",
    endDate: "Jun 2024",
    img: heyday,
    highlights: [
      "Shipped a streamlined onboarding flow in one day using an AI-assisted workflow, driving an approximately 15% lift in completion in an A/B test.",
      "Led migration from create-react-app to Next.js, improving frontend architecture, performance, maintainability, and developer experience.",
      "Built AI-assisted writing features using Tiptap editor infrastructure across customer-facing product surfaces.",
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Tiptap"],
  },
  {
    company: "Govalo",
    role: "Founding Full Stack Engineer",
    startDate: "Nov 2021",
    endDate: "Aug 2022",
    img: govalo,
    highlights: [
      "Reduced webhook processing errors by 80% by replacing a monolithic handler with an asynchronous jobs system with exponential retries and dead-letter recovery.",
      "Established coding conventions, design patterns, and product engineering practices for the team.",
      "Created internal management tools for troubleshooting, promo code administration, billing plan management, and customer operations.",
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "BullMQ", "Shopify"],
  },
  {
    company: "Cruise Automation",
    role: "Senior Full Stack Engineer",
    startDate: "Oct 2018",
    endDate: "May 2019",
    img: cruise,
    highlights: [
      "Developed a custom Electron-based Data Workbench for data scientists to manipulate Google BigQuery data and visualize results using Python and Highcharts.",
      "Built internal CI and data visualization tools to analyze results from millions of autonomous vehicle simulation runs.",
    ],
    technologies: ["Next.js", "Go", "Electron", "Python", "Highcharts", "BigQuery"],
  },
  {
    company: "Unity Technologies",
    role: "Full Stack Engineer",
    startDate: "Oct 2017",
    endDate: "May 2018",
    img: unity,
    highlights: [
      "Contributed to the Unity Ads platform, building product surfaces for game developer monetization insights.",
    ],
    technologies: ["React", "Redux", "Go", "Node.js"],
  },
  {
    company: "Idean, Inc",
    extraInfo: "now frog",
    role: "Senior UI Developer (Contract)",
    startDate: "Oct 2016",
    endDate: "Mar 2017",
    img: idean,
    highlights: [
      "Developed a B2B web application for a multinational media streaming service and established frontend best practices for the team.",
    ],
    technologies: ["React", "Redux"],
  },
  {
    company: "Euclid Analytics",
    extraInfo: "acq. by WeWork",
    role: "Software Engineer",
    startDate: "Feb 2016",
    endDate: "Sep 2016",
    img: euclid,
    highlights: [
      "Migrated the main product from Rails Asset Pipeline to ES2015 and Webpack and developed a data verification app.",
    ],
    technologies: ["ES2015", "Webpack", "Express.js", "React"],
  },
  {
    company: "Walmart Labs",
    extraInfo: "Sam's Club",
    role: "Senior Mobile Web Engineer",
    startDate: "Apr 2015",
    endDate: "Oct 2015",
    img: walmart,
    highlights: [
      "Led implementation of new UI designs using Angular and CSS components, unifying styles across teams.",
    ],
    technologies: ["Angular", "CSS"],
  },
  {
    company: "Dell",
    role: "Software Development Staff Engineer",
    startDate: "Apr 2011",
    endDate: "Mar 2015",
    img: dell,
    highlights: [
      "Led creation of a shared UI library adopted by around 100 Dell products and guided remote teams on AngularJS adoption and frontend architecture.",
    ],
    technologies: ["AngularJS", "UI libraries", "Frontend architecture"],
  },
];

export default jobs;
