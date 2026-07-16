import { notFound } from "next/navigation";
import { getArticlesByCategory } from "@/lib/content";
import { CATEGORIES, type Category } from "@/lib/content.schema";
import { CATEGORY_META } from "@/lib/categories";
import { Card, PageHeader } from "@/components/ui";
import { articleToCardProps } from "@/lib/articleCard";
import styles from "./page.module.css";

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = CATEGORY_META[category as Category];
  if (!meta) return { title: "Not Found" };

  return { title: meta.fullLabel };
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
  const meta = CATEGORY_META[category as Category];

  return (
    <section className={styles.section}>
      <PageHeader
        eyebrow="Category"
        title={meta.fullLabel}
        description={meta.description}
      />
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
