import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/content";
import { CATEGORIES, type Category } from "@/lib/content.schema";
import { Card } from "@/components/ui";
import { articleToCardProps } from "@/lib/articleCard";
import styles from "./page.module.css";

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

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{label}</h2>
      {articles.length === 0 ? (
        <p className={styles.empty}>No articles found.</p>
      ) : (
        <div className={styles.cardGrid}>
          {articles.map((article) => (
            <Card key={article.slug} {...articleToCardProps(article)} />
          ))}
        </div>
      )}
    </section>
  );
}
