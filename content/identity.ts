/**
 * Identity constants shared between the home page and the /cv print route.
 * Edit here to update name / title / contact details everywhere at once.
 *
 * The About prose (was: `summary`) now lives in `content/about.tsx`. The CV
 * composition imports `aboutSummary` from there so it stays in sync with the
 * home page automatically.
 */
export const identity = {
  name: "Dewald Scholtz",
  title: "Founder · Polymath · Builder",
  location: "West Coast, Western Cape, South Africa",
  tagline: "I help teams build. They help me learn.",
  linkedinUrl: "https://www.linkedin.com/in/dewald-scholtz-97a992139/",
  linkedinHandle: "linkedin.com/in/dewald-scholtz",
  githubUrl: "https://github.com/scholtde",
  githubHandle: "github.com/scholtde",
  websites: [
    { label: "rc.technology", url: "https://rc.technology" },
    { label: "edgetower.co.za", url: "https://edgetower.co.za" },
  ],
} as const;
