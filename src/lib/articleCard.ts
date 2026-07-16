import { format } from "date-fns";
import type { ArticleMeta } from "@/lib/content";
import { CATEGORY_META } from "@/lib/categories";
import type { CardTag, TagColor } from "@/components/ui";

export function articleToCardProps(article: ArticleMeta, featured = false) {
  const { slug, frontmatter } = article;
  const tags: CardTag[] = [
    {
      label: frontmatter.category,
      color: CATEGORY_META[frontmatter.category]?.color ?? "default",
    },
    ...frontmatter.tags.map((t) => ({ label: t, color: "default" as TagColor })),
  ];

  return {
    variant: featured ? ("featured" as const) : ("standard" as const),
    image:
      featured && frontmatter.coverImage
        ? { src: frontmatter.coverImage, alt: frontmatter.title }
        : undefined,
    tags,
    title: frontmatter.title,
    description: frontmatter.excerpt,
    date: format(frontmatter.publishedAt, "MMM d, yyyy"),
    href: `/articles/${slug}`,
  };
}
