"use server";

import { revalidatePath } from "next/cache";
import { eq, and, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { articleReactions } from "@/db/schema";

export async function toggleReaction(articleSlug: string, type: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const existing = await db.query.articleReactions.findFirst({
    where: and(
      eq(articleReactions.articleSlug, articleSlug),
      eq(articleReactions.userId, session.user.id),
      eq(articleReactions.type, type)
    ),
  });

  if (existing) {
    await db
      .delete(articleReactions)
      .where(eq(articleReactions.id, existing.id));
  } else {
    await db.insert(articleReactions).values({
      articleSlug,
      userId: session.user.id,
      type,
    });
  }

  revalidatePath(`/articles/${articleSlug}`);
}

export async function getReactionCounts(articleSlug: string) {
  const rows = await db
    .select({
      type: articleReactions.type,
      count: sql<number>`count(*)::int`,
    })
    .from(articleReactions)
    .where(eq(articleReactions.articleSlug, articleSlug))
    .groupBy(articleReactions.type);

  return Object.fromEntries(rows.map((r) => [r.type, r.count]));
}

export async function getUserReactions(articleSlug: string) {
  const session = await auth();
  if (!session?.user?.id) return [];

  const rows = await db.query.articleReactions.findMany({
    where: and(
      eq(articleReactions.articleSlug, articleSlug),
      eq(articleReactions.userId, session.user.id)
    ),
    columns: { type: true },
  });

  return rows.map((r) => r.type);
}
