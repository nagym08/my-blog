import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { cache } from "react";
import {
  frontmatterSchema,
  CATEGORIES,
  type Frontmatter,
  type Category,
} from "./content.schema";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface Article {
  slug: string;
  frontmatter: Frontmatter;
  readingTime: string;
  body: string;
}

export interface ArticleMeta {
  slug: string;
  frontmatter: Frontmatter;
  readingTime: string;
}

export function toMeta(article: Article): ArticleMeta {
  return {
    slug: article.slug,
    frontmatter: article.frontmatter,
    readingTime: article.readingTime,
  };
}

function parseArticle(filePath: string, slug: string): Article {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${filePath}:\n${JSON.stringify(parsed.error.issues, null, 2)}`
    );
  }

  return {
    slug,
    frontmatter: parsed.data,
    readingTime: readingTime(content).text,
    body: content,
  };
}

export const getAllArticles = cache((): ArticleMeta[] => {
  const articles: ArticleMeta[] = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(CONTENT_DIR, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, "");
      const filePath = path.join(categoryDir, file);
      const article = parseArticle(filePath, slug);

      if (
        process.env.NODE_ENV === "production" &&
        article.frontmatter.status === "draft"
      ) {
        continue;
      }

      articles.push(toMeta(article));
    }
  }

  return articles.sort(
    (a, b) =>
      b.frontmatter.publishedAt.getTime() - a.frontmatter.publishedAt.getTime()
  );
});

export function getArticleBySlug(slug: string): Article | null {
  for (const category of CATEGORIES) {
    const filePath = path.join(CONTENT_DIR, category, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return parseArticle(filePath, slug);
    }
  }
  return null;
}

export function getArticlesByCategory(category: Category): ArticleMeta[] {
  const categoryDir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(categoryDir)) return [];

  const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".mdx"));
  const articles: ArticleMeta[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const filePath = path.join(categoryDir, file);
    const article = parseArticle(filePath, slug);

    if (
      process.env.NODE_ENV === "production" &&
      article.frontmatter.status === "draft"
    ) {
      continue;
    }

    articles.push(toMeta(article));
  }

  return articles.sort(
    (a, b) =>
      b.frontmatter.publishedAt.getTime() - a.frontmatter.publishedAt.getTime()
  );
}

export function getArticlesBySeries(series: string): ArticleMeta[] {
  return getAllArticles()
    .filter((a) => a.frontmatter.series === series)
    .sort(
      (a, b) => (a.frontmatter.seriesOrder ?? 0) - (b.frontmatter.seriesOrder ?? 0)
    );
}

export function getSearchIndex() {
  return getAllArticles().map((a) => ({
    slug: a.slug,
    title: a.frontmatter.title,
    excerpt: a.frontmatter.excerpt,
    tags: a.frontmatter.tags,
    category: a.frontmatter.category,
  }));
}
