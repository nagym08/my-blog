"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { deleteAccount, type DeleteAccountState } from "@/actions/account";
import styles from "./DangerZone.module.css";

export function DangerZone() {
  const [confirming, setConfirming] = useState(false);
  const [state, action, pending] = useActionState<DeleteAccountState, FormData>(
    async () => deleteAccount(),
    null
  );

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
              onClick={() => setConfirming(false)}
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
      ) : (
        <div className={styles.actions}>
          <Button
            type="button"
            variant="outlined"
            size="md"
            onClick={() => setConfirming(true)}
            className={styles.dangerTrigger}
          >
            Delete account
          </Button>
        </div>
      )}
    </section>
  );
}
