"use client";

import { useState } from "react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { deleteComment, updateComment } from "@/actions/comments";
import { CommentForm } from "./CommentForm";
import styles from "./CommentItem.module.css";

interface Comment {
  id: string;
  body: string;
  parentId: string | null;
  authorId: string;
  authorName: string | null;
  authorImage: string | null;
  isEdited: boolean;
  createdAt: Date;
  children: Comment[];
}

export function CommentItem({
  comment,
  articleSlug,
  currentUserId,
  currentUserRole,
}: {
  comment: Comment;
  articleSlug: string;
  currentUserId?: string;
  currentUserRole?: string;
}) {
  const [replying, setReplying] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editBody, setEditBody] = useState(comment.body);
  const [deleting, setDeleting] = useState(false);

  const canModify =
    currentUserId === comment.authorId || currentUserRole === "admin";

  async function handleEdit() {
    if (!editBody.trim()) return;
    await updateComment(comment.id, editBody.trim());
    setEditing(false);
  }

  async function handleDelete() {
    setDeleting(true);
    await deleteComment(comment.id);
  }

  return (
    <div className={styles.comment}>
      <div className={styles.header}>
        {comment.authorImage && (
          <Image
            src={comment.authorImage}
            alt=""
            width={36}
            height={36}
            className={styles.avatar}
          />
        )}
        <span className={styles.author}>
          {comment.authorName ?? "Anonymous"}
        </span>
        <span className={styles.metaSpacer} />
        {comment.isEdited && (
          <span className={styles.edited}>edited</span>
        )}
        <span className={styles.time}>
          {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
        </span>
      </div>

      {editing ? (
        <div className={styles.editForm}>
          <textarea
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
            className={styles.editTextarea}
            rows={3}
          />
          <div className={styles.editActions}>
            <button onClick={handleEdit} className={styles.saveBtn}>
              Save
            </button>
            <button
              onClick={() => {
                setEditing(false);
                setEditBody(comment.body);
              }}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className={styles.body}>{comment.body}</p>
      )}

      <div className={styles.actions}>
        {currentUserId && !editing && (
          <button
            onClick={() => setReplying(!replying)}
            className={styles.actionBtn}
          >
            Reply
          </button>
        )}
        {canModify && !editing && (
          <>
            <button
              onClick={() => setEditing(true)}
              className={styles.actionBtn}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={styles.deleteBtn}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </>
        )}
      </div>

      {replying && (
        <div className={styles.replyForm}>
          <CommentForm
            articleSlug={articleSlug}
            parentId={comment.id}
            onCancel={() => setReplying(false)}
          />
        </div>
      )}

      {comment.children.length > 0 && (
        <div className={styles.children}>
          {comment.children.map((child) => (
            <CommentItem
              key={child.id}
              comment={child}
              articleSlug={articleSlug}
              currentUserId={currentUserId}
              currentUserRole={currentUserRole}
            />
          ))}
        </div>
      )}
    </div>
  );
}
