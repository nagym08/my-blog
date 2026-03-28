"use client";

import { useActionState } from "react";
import { toggleBookmark } from "@/actions/bookmarks";
import styles from "./BookmarkButton.module.css";

export function BookmarkButton({
  articleSlug,
  initialBookmarked,
}: {
  articleSlug: string;
  initialBookmarked: boolean;
}) {
  async function handleToggle(prev: boolean) {
    await toggleBookmark(articleSlug);
    return !prev;
  }

  const [bookmarked, action, pending] = useActionState(
    handleToggle,
    initialBookmarked
  );

  return (
    <form action={action}>
      <button
        type="submit"
        disabled={pending}
        className={`${styles.button} ${bookmarked ? styles.active : ""}`}
        title={bookmarked ? "Remove bookmark" : "Bookmark this article"}
      >
        {bookmarked ? "Bookmarked" : "Bookmark"}
      </button>
    </form>
  );
}
