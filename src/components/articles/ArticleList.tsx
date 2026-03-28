import type { ArticleMeta } from "@/lib/content";
import { ArticleCard } from "./ArticleCard";
import styles from "./ArticleList.module.css";

export function ArticleList({
  articles,
  heading,
}: {
  articles: ArticleMeta[];
  heading?: string;
}) {
  if (articles.length === 0) {
    return <p className={styles.empty}>No articles found.</p>;
  }

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <div>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
