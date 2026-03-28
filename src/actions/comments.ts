"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { comments } from "@/db/schema";

export async function createComment(
  articleSlug: string,
  body: string,
  parentId?: string
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await db.insert(comments).values({
    articleSlug,
    authorId: session.user.id,
    parentId: parentId ?? null,
    body,
  });

  revalidatePath(`/articles/${articleSlug}`);
}

export async function updateComment(commentId: string, body: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const comment = await db.query.comments.findFirst({
    where: eq(comments.id, commentId),
  });
  if (!comment) throw new Error("Comment not found");

  if (comment.authorId !== session.user.id && session.user.role !== "admin") {
    throw new Error("Not authorized");
  }

  await db
    .update(comments)
    .set({ body, isEdited: true, updatedAt: new Date() })
    .where(eq(comments.id, commentId));

  revalidatePath(`/articles/${comment.articleSlug}`);
}

export async function deleteComment(commentId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const comment = await db.query.comments.findFirst({
    where: eq(comments.id, commentId),
  });
  if (!comment) throw new Error("Comment not found");

  if (comment.authorId !== session.user.id && session.user.role !== "admin") {
    throw new Error("Not authorized");
  }

  await db.delete(comments).where(eq(comments.id, commentId));

  revalidatePath(`/articles/${comment.articleSlug}`);
}
