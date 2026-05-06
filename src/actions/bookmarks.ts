"use server";

import { revalidatePath } from "next/cache";
import { eq, and, desc, count } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { bookmarks } from "@/db/schema";
import { getArticleBySlug, type ArticleMeta, toMeta } from "@/lib/content";

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

  revalidatePath("/account");
  revalidatePath("/account/bookmarks");
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

export interface MyBookmark {
  id: string;
  bookmarkedAt: Date;
  article: ArticleMeta;
}

export async function getMyBookmarks(): Promise<MyBookmark[]> {
  const session = await auth();
  if (!session?.user?.id) return [];

  const rows = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, session.user.id))
    .orderBy(desc(bookmarks.createdAt));

  const result: MyBookmark[] = [];
  for (const row of rows) {
    const article = getArticleBySlug(row.articleSlug);
    if (!article) continue;
    result.push({
      id: row.id,
      bookmarkedAt: row.createdAt,
      article: toMeta(article),
    });
  }
  return result;
}

export async function getMyBookmarksCount(): Promise<number> {
  const session = await auth();
  if (!session?.user?.id) return 0;

  const [row] = await db
    .select({ value: count() })
    .from(bookmarks)
    .where(eq(bookmarks.userId, session.user.id));

  return row?.value ?? 0;
}

export async function removeBookmark(articleSlug: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await db
    .delete(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, session.user.id),
        eq(bookmarks.articleSlug, articleSlug)
      )
    );

  revalidatePath("/account");
  revalidatePath("/account/bookmarks");
  revalidatePath(`/articles/${articleSlug}`);
}
