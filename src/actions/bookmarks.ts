"use server";

import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { bookmarks } from "@/db/schema";

export async function toggleBookmark(articleSlug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const existing = await db.query.bookmarks.findFirst({
    where: and(
      eq(bookmarks.userId, session.user.id),
      eq(bookmarks.articleSlug, articleSlug)
    ),
  });

  if (existing) {
    await db.delete(bookmarks).where(eq(bookmarks.id, existing.id));
  } else {
    await db.insert(bookmarks).values({
      userId: session.user.id,
      articleSlug,
    });
  }

  revalidatePath(`/articles/${articleSlug}`);
}

export async function getBookmarkStatus(articleSlug: string) {
  const session = await auth();
  if (!session?.user?.id) return false;

  const existing = await db.query.bookmarks.findFirst({
    where: and(
      eq(bookmarks.userId, session.user.id),
      eq(bookmarks.articleSlug, articleSlug)
    ),
  });

  return !!existing;
}
