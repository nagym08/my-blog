import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import styles from "./AuthButton.module.css";

export async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/auth/signin" className={styles.signIn}>
        Sign in
      </Link>
    );
  }

  return (
    <div className={styles.user}>
      <span className={styles.name}>{session.user.name}</span>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className={styles.signOut}>
          Sign out
        </button>
      </form>
    </div>
  );
}
