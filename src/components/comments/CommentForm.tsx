"use client";

import { useActionState } from "react";
import { createComment } from "@/actions/comments";
import styles from "./CommentForm.module.css";

export function CommentForm({
  articleSlug,
  parentId,
  onCancel,
}: {
  articleSlug: string;
  parentId?: string;
  onCancel?: () => void;
}) {
  async function handleSubmit(_prev: string | null, formData: FormData) {
    const body = formData.get("body") as string;
    if (!body.trim()) return "Comment cannot be empty.";

    try {
      await createComment(articleSlug, body.trim(), parentId);
      return null;
    } catch (e) {
      return e instanceof Error ? e.message : "Failed to post comment.";
    }
  }

  const [error, action, pending] = useActionState(handleSubmit, null);

  return (
    <form
      action={action}
      className={parentId ? styles.formNested : styles.form}
    >
      <textarea
        name="body"
        placeholder={parentId ? "Write a reply..." : "Write a comment..."}
        required
        rows={3}
        className={styles.textarea}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.actions}>
        <button type="submit" disabled={pending} className={styles.submit}>
          {pending ? "Posting..." : parentId ? "Reply" : "Comment"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancel}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
