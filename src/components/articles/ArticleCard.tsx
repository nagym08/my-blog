import Link from "next/link";
import { format } from "date-fns";
import type { ArticleMeta } from "@/lib/content";
import styles from "./ArticleCard.module.css";

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const { slug, frontmatter, readingTime } = article;

  return (
    <article className={styles.card}>
      <Link href={`/articles/${slug}`} className={styles.link}>
        <h2 className={styles.title}>{frontmatter.title}</h2>
      </Link>
      <p className={styles.excerpt}>{frontmatter.excerpt}</p>
      <div className={styles.meta}>
        <span>{format(frontmatter.publishedAt, "MMM d, yyyy")}</span>
        <span className={styles.separator}>&middot;</span>
        <span>{readingTime}</span>
        <span className={styles.separator}>&middot;</span>
        <Link
          href={`/category/${frontmatter.category}`}
          className={styles.category}
        >
          {frontmatter.category}
        </Link>
      </div>
      {frontmatter.tags.length > 0 && (
        <div className={styles.tags}>
          {frontmatter.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
