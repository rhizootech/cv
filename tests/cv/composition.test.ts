import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import { composeCv } from "../../lib/cv/composition";

let tmpDir: string;

const projectMdx = (overrides: Partial<Record<string, unknown>> = {}) => {
  const fm = {
    title: "Sample",
    summary: "Did something cool.",
    stack: ["Python"],
    industry: "Test Industry",
    order: 1,
    featured: true,
    detail: false,
    ...overrides,
  };
  const lines = Object.entries(fm).map(([k, v]) => {
    if (Array.isArray(v)) return `${k}: ${JSON.stringify(v)}`;
    if (typeof v === "string") return `${k}: "${v.replace(/"/g, '\\"')}"`;
    return `${k}: ${v}`;
  });
  return `---\n${lines.join("\n")}\n---\nBody`;
};

beforeAll(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "cv-compose-test-"));
  await fs.writeFile(
    path.join(tmpDir, "alpha.mdx"),
    projectMdx({ title: "Alpha", order: 1, featured: true, detail: true }),
  );
  await fs.writeFile(
    path.join(tmpDir, "beta.mdx"),
    projectMdx({ title: "Beta", order: 2, featured: true, detail: false }),
  );
  await fs.writeFile(
    path.join(tmpDir, "gamma.mdx"),
    projectMdx({ title: "Gamma", order: 3, featured: false, detail: false }),
  );
});

afterAll(async () => {
  await fs.rm(tmpDir, { recursive: true, force: true });
});

describe("composeCv", () => {
  it("returns identity with name, title and contact handles", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.identity.name).toBe("Dewald Scholtz");
    expect(cv.identity.title).toMatch(/Founder/);
    expect(cv.identity.linkedinUrl).toMatch(/linkedin\.com/);
    expect(cv.identity.githubUrl).toMatch(/github\.com/);
    expect(cv.identity.location).toMatch(/South Africa/);
  });

  it("includes a non-empty summary composed of one or more paragraphs", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.summary.length).toBeGreaterThan(0);
    expect(cv.summary.every((p) => p.length > 0)).toBe(true);
    expect(cv.summary.join(" ").length).toBeGreaterThan(50);
  });

  it("includes only featured projects (non-featured are filtered out)", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.projects).toHaveLength(2);
    expect(cv.projects.every((p) => p.featured)).toBe(true);
    expect(cv.projects.map((p) => p.title)).toEqual(["Alpha", "Beta"]);
  });

  it("sorts projects by `order` ascending", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    const orders = cv.projects.map((p) => p.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("returns experience sorted by `order` ascending (most recent first)", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.experience.length).toBeGreaterThan(0);
    const orders = cv.experience.map((e) => e.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it("returns the most recent experience first (RCT is currently the most recent)", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.experience[0].current).toBe(true);
    expect(cv.experience[0].company).toBe("RCT");
  });

  it("includes RCT's notable engagements (Think Digital and OTH)", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    const rct = cv.experience.find((e) => e.company === "RCT");
    expect(rct?.engagements).toBeDefined();
    const clients = rct?.engagements?.map((e) => e.client) ?? [];
    expect(clients.some((c) => /Think Digital/.test(c))).toBe(true);
    expect(clients.some((c) => /Omega Test House/.test(c))).toBe(true);
  });

  it("includes the stack groups in their defined order with non-empty items", async () => {
    const cv = await composeCv({ projectsDir: tmpDir });
    expect(cv.stack.length).toBeGreaterThan(0);
    cv.stack.forEach((g) => {
      expect(g.label.length).toBeGreaterThan(0);
      expect(g.items.length).toBeGreaterThan(0);
    });
  });
});
