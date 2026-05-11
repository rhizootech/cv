export type OpenToEntry = {
  title: string;
  description: string;
};

/**
 * The "What I'm open to" list. Visitors self-select against these.
 * Edit this array to change what kinds of engagements the site advertises.
 */
export const openTo: OpenToEntry[] = [
  {
    title: "Senior Full-Stack / Tech Lead roles",
    description:
      "Python (Django/DRF), Next.js + TypeScript, Postgres/Redis, AWS — owning production systems and raising the bar for the team.",
  },
  {
    title: "Founding Engineer / Fractional CTO",
    description:
      "Seed-to-Series-A startups where I can own architecture end-to-end, ship features, and translate between technical and non-technical stakeholders.",
  },
  {
    title: "R&D / AI / Computer Vision specialist",
    description:
      "Deep work on computer vision, IoT integrations, edge AI, and “we don’t know if this is possible” problems where research and engineering blur.",
  },
  {
    title: "RCT consulting engagements",
    description:
      "Industrial automation, custom SaaS, AI prototypes, end-to-end build-outs — through RCT and the edgE:Tower platform.",
  },
];
