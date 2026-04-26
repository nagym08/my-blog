import Link from "next/link";
import styles from "./BookmarksSummary.module.css";

const BookmarkIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

export function BookmarksSummary({ count }: { count: number }) {
  return (
    <Link href="/account/bookmarks" className={styles.card}>
      <span className={styles.iconWrap}>
        <BookmarkIcon />
      </span>
      <span className={styles.body}>
        <span className={styles.label}>Bookmarks</span>
        <span className={styles.meta}>
          {count === 0
            ? "Nothing saved yet"
            : `${count} ${count === 1 ? "article" : "articles"} saved`}
        </span>
      </span>
      <span className={styles.arrow} aria-hidden="true">
        <ArrowIcon />
      </span>
    </Link>
  );
}
