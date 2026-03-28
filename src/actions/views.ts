"use server";

import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { articleViewCounts } from "@/db/schema";

export async function trackView(articleSlug: string) {
  await db
    .insert(articleViewCounts)
    .values({ articleSlug, count: 1 })
    .onConflictDoUpdate({
      target: articleViewCounts.articleSlug,
      set: {
        count: sql`${articleViewCounts.count} + 1`,
        updatedAt: new Date(),
      },
    });
}
