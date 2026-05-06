import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { getMyBookmarksCount } from "@/actions/bookmarks";
import { PageHeader } from "@/components/ui";
import { AccountProfile } from "@/components/account/AccountProfile";
import { BookmarksSummary } from "@/components/account/BookmarksSummary";
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

  const [user, bookmarksCount] = await Promise.all([
    db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    }),
    getMyBookmarksCount(),
  ]);

  if (!user) {
    redirect("/auth/signin?callbackUrl=/account");
  }

  return (
    <div className={styles.page}>
      <PageHeader eyebrow="Account" title="Your space" />

      <AccountProfile
        name={user.name}
        email={user.email}
        image={user.image}
        role={user.role}
        createdAt={user.createdAt}
      />

      <BookmarksSummary count={bookmarksCount} />

      <DangerZone />
    </div>
  );
}
