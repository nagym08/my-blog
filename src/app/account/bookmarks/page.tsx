import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getMyBookmarks } from "@/actions/bookmarks";
import { PageHeader } from "@/components/ui";
import { BookmarkList } from "@/components/account/BookmarkList";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Bookmarks",
  robots: { index: false, follow: false },
};

export default async function BookmarksPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/account/bookmarks");
  }

  const bookmarks = await getMyBookmarks();

  return (
    <div className={styles.page}>
      <Link href="/account" className={styles.backLink}>
        <span aria-hidden="true">&larr;</span> Back to account
      </Link>

      <PageHeader
        eyebrow="Saved for later"
        title="Bookmarks"
        trailing={
          bookmarks.length > 0 ? (
            <span className={styles.count}>{bookmarks.length}</span>
          ) : null
        }
      />

      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
