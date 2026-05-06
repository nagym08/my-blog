"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { deleteAccount, type DeleteAccountState } from "@/actions/account";
import styles from "./DangerZone.module.css";

export function DangerZone() {
  const [openCount, setOpenCount] = useState(0);
  const confirming = openCount > 0 && openCount % 2 === 1;

  return (
    <section className={styles.section} aria-labelledby="danger-heading">
      <div className={styles.copy}>
        <h2 id="danger-heading" className={styles.heading}>
          Delete account
        </h2>
        <p className={styles.description}>
          Permanently remove your profile, bookmarks, comments, and reactions.
          This action cannot be undone.
        </p>
      </div>

      {confirming ? (
        <DeleteConfirmForm
          key={openCount}
          onCancel={() => setOpenCount((n) => n + 1)}
        />
      ) : (
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outlined"
            size="md"
            onClick={() => setOpenCount((n) => n + 1)}
            className={styles.dangerTrigger}
          >
            Delete account
          </Button>
        </div>
      )}
    </section>
  );
}

function DeleteConfirmForm({ onCancel }: { onCancel: () => void }) {
  const [state, action, pending] = useActionState<DeleteAccountState, FormData>(
    async () => deleteAccount(),
    null
  );

  return (
    <form action={action} className={styles.confirmRow}>
      <p className={styles.confirmCopy}>
        Are you sure? Everything will be erased immediately.
      </p>
      {state?.error && (
        <p className={styles.error} role="alert">
          {state.error}
        </p>
      )}
      <div className={styles.actions}>
        <Button
          type="button"
          variant="outlined"
          size="md"
          onClick={onCancel}
          disabled={pending}
        >
          Cancel
        </Button>
        <button
          type="submit"
          disabled={pending}
          className={styles.confirmButton}
        >
          {pending ? "Deleting…" : "Permanently delete my account"}
        </button>
      </div>
    </form>
  );
}
