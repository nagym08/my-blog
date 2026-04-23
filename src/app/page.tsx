import { desc } from "drizzle-orm";
import { getAllArticles, getArticleBySlug, toMeta } from "@/lib/content";
import { Card } from "@/components/ui";
import { db } from "@/lib/db";
import { articleViewCounts } from "@/db/schema";
import type { ArticleMeta } from "@/lib/content";
import { articleToCardProps } from "@/lib/articleCard";
import styles from "./page.module.css";

async function getMostPopular(limit: number): Promise<ArticleMeta[]> {
  const rows = await db
    .select({ articleSlug: articleViewCounts.articleSlug })
    .from(articleViewCounts)
    .orderBy(desc(articleViewCounts.count))
    .limit(limit);

  const articles: ArticleMeta[] = [];
  for (const row of rows) {
    const article = getArticleBySlug(row.articleSlug);
    if (article) {
      articles.push(toMeta(article));
    }
  }
  return articles;
}

export default async function HomePage() {
  const articles = getAllArticles();
  const latest = articles.slice(0, 6);
  const popular = await getMostPopular(6);

  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Exploring the Art of Development</h1>
      </section>

      <div className={styles.columns}>
        <section className={styles.column}>
          <h2>Latest Articles</h2>
          <div className={styles.cardGrid}>
            {latest.map((article, i) => (
              <Card
                key={article.slug}
                {...articleToCardProps(article, i === 0)}
              />
            ))}
          </div>
        </section>

        {popular.length > 0 && (
          <section className={styles.column}>
            <h2>Most Popular</h2>
            <div className={styles.cardGrid}>
              {popular.map((article) => (
                <Card
                  key={article.slug}
                  {...articleToCardProps(article)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
