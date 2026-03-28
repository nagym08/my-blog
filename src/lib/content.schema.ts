import { z } from "zod";

export const CATEGORIES = ["project", "coding", "developer-growth"] as const;
export type Category = (typeof CATEGORIES)[number];

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  category: z.enum(CATEGORIES),
  tags: z.array(z.string()).default([]),
  series: z.string().optional(),
  seriesOrder: z.number().int().positive().optional(),
  coverImage: z.string().optional(),
  publishedAt: z.coerce.date(),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;
