import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { projectFrontmatterSchema, type Project } from "./schema";

const DEFAULT_PROJECTS_DIR = path.join(process.cwd(), "content/projects");

/**
 * Load all project MDX files from `dir`, validate frontmatter, and return them
 * sorted by `order` ascending. The slug is derived from the filename.
 */
export async function getProjects(dir: string = DEFAULT_PROJECTS_DIR): Promise<Project[]> {
  const entries = await fs.readdir(dir);
  const mdxFiles = entries.filter((name) => name.endsWith(".mdx"));

  const projects = await Promise.all(
    mdxFiles.map(async (filename): Promise<Project> => {
      const filepath = path.join(dir, filename);
      const raw = await fs.readFile(filepath, "utf-8");
      const { data, content } = matter(raw);
      const slug = path.basename(filename, ".mdx");
      const parsed = projectFrontmatterSchema.parse({ ...data, slug });
      return { ...parsed, body: content };
    }),
  );

  return projects.sort((a, b) => a.order - b.order);
}

export async function getFeaturedProjects(dir?: string): Promise<Project[]> {
  return (await getProjects(dir)).filter((p) => p.featured);
}

export async function getDetailProjects(dir?: string): Promise<Project[]> {
  return (await getProjects(dir)).filter((p) => p.detail);
}
