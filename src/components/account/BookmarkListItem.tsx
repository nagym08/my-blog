"use client";

import { useActionState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Tag } from "@/components/ui/Tag/Tag";
import { removeBookmark, type MyBookmark } from "@/actions/bookmarks";
import { categoryToColor } from "@/lib/articleCard";
import styles from "./BookmarkListItem.module.css";

const TrashIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
  </svg>
);

export function BookmarkListItem({ bookmark }: { bookmark: MyBookmark }) {
  const { article } = bookmark;
  const [, action, pending] = useActionState(async () => {
    await removeBookmark(article.slug);
    return null;
  }, null);

  return (
    <li className={`${styles.item} ${pending ? styles.pending : ""}`}>
      <div className={styles.body}>
        <div className={styles.tagRow}>
          <Tag
            label={article.frontmatter.category}
            color={categoryToColor[article.frontmatter.category] ?? "default"}
          />
          <span className={styles.date}>
            {format(article.frontmatter.publishedAt, "MMM d, yyyy")}
          </span>
        </div>
        <Link
          href={`/articles/${article.slug}`}
          className={styles.titleLink}
        >
          <h3 className={styles.title}>{article.frontmatter.title}</h3>
        </Link>
        <p className={styles.excerpt}>{article.frontmatter.excerpt}</p>
      </div>

      <form action={action} className={styles.form}>
        <button
          type="submit"
          disabled={pending}
          className={styles.removeButton}
          aria-label={`Remove "${article.frontmatter.title}" from bookmarks`}
        >
          <span className={styles.removeIcon}>
            <TrashIcon />
          </span>
          <span className={styles.removeLabel}>
            {pending ? "Removing…" : "Remove"}
          </span>
        </button>
      </form>
    </li>
  );
}
