import { z } from "zod";

/**
 * Frontmatter schema for project MDX files in `content/projects/`.
 * The `slug` is injected by the loader from the filename.
 */
export const projectFrontmatterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  stack: z.array(z.string()).default([]),
  industry: z.string().min(1),
  year: z.number().int().optional(),
  dateRange: z.string().optional(),
  featured: z.boolean().default(true),
  detail: z.boolean().default(false),
  order: z.number().int(),
  externalUrl: z.url().optional(),
  cover: z.string().optional(),
  status: z.enum(["live", "archived", "case-study"]).optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export type Project = ProjectFrontmatter & {
  /** Raw MDX body (post-frontmatter). Empty string for card-only projects. */
  body: string;
};
