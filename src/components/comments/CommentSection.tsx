import { eq, asc } from "drizzle-orm";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { comments, users } from "@/db/schema";
import { CommentForm } from "./CommentForm";
import { CommentItem } from "./CommentItem";
import styles from "./CommentSection.module.css";

interface CommentWithAuthor {
  id: string;
  body: string;
  parentId: string | null;
  authorId: string;
  authorName: string | null;
  authorImage: string | null;
  isEdited: boolean;
  createdAt: Date;
  children: CommentWithAuthor[];
}

async function getComments(articleSlug: string): Promise<CommentWithAuthor[]> {
  const rows = await db
    .select({
      id: comments.id,
      body: comments.body,
      parentId: comments.parentId,
      authorId: comments.authorId,
      authorName: users.name,
      authorImage: users.image,
      isEdited: comments.isEdited,
      createdAt: comments.createdAt,
    })
    .from(comments)
    .innerJoin(users, eq(comments.authorId, users.id))
    .where(eq(comments.articleSlug, articleSlug))
    .orderBy(asc(comments.createdAt));

  const map = new Map<string, CommentWithAuthor>();
  const roots: CommentWithAuthor[] = [];

  for (const row of rows) {
    map.set(row.id, { ...row, children: [] });
  }

  for (const node of map.values()) {
    if (node.parentId && map.has(node.parentId)) {
      map.get(node.parentId)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

export async function CommentSection({
  articleSlug,
}: {
  articleSlug: string;
}) {
  const session = await auth();
  const tree = await getComments(articleSlug);

  return (
    <section className={styles.section}>
      <div className={styles.headingGroup}>
        <span className={styles.eyebrow}>Discussion</span>
        <h2 className={styles.heading}>
          Comments
          {tree.length > 0 && (
            <span className={styles.headingCount}>({tree.length})</span>
          )}
        </h2>
      </div>

      {session?.user ? (
        <CommentForm articleSlug={articleSlug} />
      ) : (
        <div className={styles.signInPrompt}>
          <p className={styles.signInText}>
            Join the conversation — sign in to leave a comment.
          </p>
          <Link href="/auth/signin" className={styles.signInCta}>
            Sign in
          </Link>
        </div>
      )}

      <div className={styles.list}>
        {tree.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            articleSlug={articleSlug}
            currentUserId={session?.user?.id}
            currentUserRole={session?.user?.role}
          />
        ))}
      </div>
    </section>
  );
}
