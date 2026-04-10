import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import styles from "./AuthButton.module.css";

export async function AuthButton() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/auth/signin">
        <Button variant="primary" size="sm" tabIndex={-1}>
          Sign In
        </Button>
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
        <Button variant="secondary" size="sm" type="submit">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
