import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { getMyBookmarks } from "@/actions/bookmarks";
import { AccountProfile } from "@/components/account/AccountProfile";
import { BookmarkList } from "@/components/account/BookmarkList";
import { DangerZone } from "@/components/account/DangerZone";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  const [user, bookmarks] = await Promise.all([
    db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    }),
    getMyBookmarks(),
  ]);

  if (!user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <p className={styles.eyebrow}>Account</p>
        <h1 className={styles.pageTitle}>Your space</h1>
      </header>

      <AccountProfile
        name={user.name}
        email={user.email}
        image={user.image}
        role={user.role}
        createdAt={user.createdAt}
      />

      <BookmarkList bookmarks={bookmarks} />

      <DangerZone />
    </div>
  );
}
