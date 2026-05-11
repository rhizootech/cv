import { describe, it, expect, beforeAll, afterAll } from "vitest";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";

import {
  getProjects,
  getFeaturedProjects,
  getDetailProjects,
} from "../../lib/content/projects";

let tmpDir: string;

const validFile = (overrides: Partial<Record<string, unknown>> = {}) => {
  const fm = {
    title: "Sample Project",
    summary: "Did something interesting with code.",
    stack: ["Python", "Django"],
    industry: "Sample Industry",
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
  return `---\n${lines.join("\n")}\n---\nBody text here.`;
};

beforeAll(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "cv-content-test-"));
});

afterAll(async () => {
  await fs.rm(tmpDir, { recursive: true, force: true });
});

describe("getProjects", () => {
  it("parses a valid MDX file into a typed Project", async () => {
    await fs.writeFile(path.join(tmpDir, "alpha.mdx"), validFile({ title: "Alpha", order: 1 }));
    const projects = await getProjects(tmpDir);
    await fs.rm(path.join(tmpDir, "alpha.mdx"));

    expect(projects).toHaveLength(1);
    expect(projects[0]).toMatchObject({
      slug: "alpha",
      title: "Alpha",
      summary: "Did something interesting with code.",
      stack: ["Python", "Django"],
      industry: "Sample Industry",
      order: 1,
      featured: true,
      detail: false,
    });
    expect(projects[0].body.trim()).toBe("Body text here.");
  });

  it("derives slug from filename", async () => {
    await fs.writeFile(
      path.join(tmpDir, "my-cool-project.mdx"),
      validFile({ title: "X", order: 1 }),
    );
    const projects = await getProjects(tmpDir);
    await fs.rm(path.join(tmpDir, "my-cool-project.mdx"));

    expect(projects[0].slug).toBe("my-cool-project");
  });

  it("sorts projects by `order` ascending", async () => {
    await fs.writeFile(path.join(tmpDir, "c.mdx"), validFile({ title: "C", order: 30 }));
    await fs.writeFile(path.join(tmpDir, "a.mdx"), validFile({ title: "A", order: 10 }));
    await fs.writeFile(path.join(tmpDir, "b.mdx"), validFile({ title: "B", order: 20 }));

    const projects = await getProjects(tmpDir);
    await Promise.all(
      ["a.mdx", "b.mdx", "c.mdx"].map((f) => fs.rm(path.join(tmpDir, f))),
    );

    expect(projects.map((p) => p.title)).toEqual(["A", "B", "C"]);
  });

  it("throws when required frontmatter is missing", async () => {
    const broken = `---\ntitle: "Missing fields"\n---\nbody`;
    await fs.writeFile(path.join(tmpDir, "broken.mdx"), broken);

    await expect(getProjects(tmpDir)).rejects.toThrow();

    await fs.rm(path.join(tmpDir, "broken.mdx"));
  });

  it("ignores non-mdx files in the content directory", async () => {
    await fs.writeFile(path.join(tmpDir, "valid.mdx"), validFile({ order: 1 }));
    await fs.writeFile(path.join(tmpDir, "README.md"), "# Notes");
    await fs.writeFile(path.join(tmpDir, ".DS_Store"), "");

    const projects = await getProjects(tmpDir);
    await Promise.all(
      ["valid.mdx", "README.md", ".DS_Store"].map((f) =>
        fs.rm(path.join(tmpDir, f)).catch(() => {}),
      ),
    );

    expect(projects).toHaveLength(1);
  });
});

describe("getFeaturedProjects", () => {
  it("returns only projects with featured: true", async () => {
    await fs.writeFile(path.join(tmpDir, "f1.mdx"), validFile({ order: 1, featured: true }));
    await fs.writeFile(path.join(tmpDir, "f2.mdx"), validFile({ order: 2, featured: false }));
    await fs.writeFile(path.join(tmpDir, "f3.mdx"), validFile({ order: 3, featured: true }));

    const featured = await getFeaturedProjects(tmpDir);
    await Promise.all(
      ["f1.mdx", "f2.mdx", "f3.mdx"].map((f) => fs.rm(path.join(tmpDir, f))),
    );

    expect(featured).toHaveLength(2);
    expect(featured.every((p) => p.featured)).toBe(true);
  });
});

describe("getDetailProjects", () => {
  it("returns only projects with detail: true (used for static route generation)", async () => {
    await fs.writeFile(
      path.join(tmpDir, "d1.mdx"),
      validFile({ order: 1, detail: true }),
    );
    await fs.writeFile(
      path.join(tmpDir, "d2.mdx"),
      validFile({ order: 2, detail: false }),
    );

    const detail = await getDetailProjects(tmpDir);
    await Promise.all(["d1.mdx", "d2.mdx"].map((f) => fs.rm(path.join(tmpDir, f))));

    expect(detail).toHaveLength(1);
    expect(detail[0].detail).toBe(true);
  });
});
