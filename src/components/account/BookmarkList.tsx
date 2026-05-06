import { ReadMoreLink } from "@/components/ui/ReadMoreLink/ReadMoreLink";
import type { MyBookmark } from "@/actions/bookmarks";
import { BookmarkListItem } from "./BookmarkListItem";
import styles from "./BookmarkList.module.css";

export function BookmarkList({ bookmarks }: { bookmarks: MyBookmark[] }) {
  return (
    <section className={styles.section}>
      {bookmarks.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyText}>
            Nothing saved yet — tap the bookmark icon on any article to keep it
            here for later.
          </p>
          <ReadMoreLink href="/" label="Browse articles" />
        </div>
      ) : (
        <ul className={styles.list}>
          {bookmarks.map((bookmark) => (
            <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
          ))}
        </ul>
      )}
    </section>
  );
}
