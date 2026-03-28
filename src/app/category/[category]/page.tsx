import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/content";
import { CATEGORIES, type Category } from "@/lib/content.schema";
import { ArticleList } from "@/components/articles/ArticleList";

const CATEGORY_LABELS: Record<Category, string> = {
  coding: "Coding",
  project: "Projects",
  "developer-growth": "Developer Growth",
};

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as Category];
  if (!label) return { title: "Not Found" };

  return { title: label };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const articles = getArticlesByCategory(category as Category);
  const label = CATEGORY_LABELS[category as Category];

  return <ArticleList articles={articles} heading={label} />;
}
