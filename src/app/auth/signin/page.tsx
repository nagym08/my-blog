import type { Metadata } from "next";
import { signIn } from "@/lib/auth";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Sign In",
};

const providers = [
  { id: "github", name: "GitHub" },
  { id: "google", name: "Google" },
];

export default function SignInPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign In</h1>
      <p className={styles.subtitle}>Choose a provider to continue</p>
      <div className={styles.providers}>
        {providers.map((provider) => (
          <form
            key={provider.id}
            action={async () => {
              "use server";
              await signIn(provider.id, { redirectTo: "/" });
            }}
          >
            <button type="submit" className={styles.button}>
              Sign in with {provider.name}
            </button>
          </form>
        ))}
      </div>
    </div>
  );
}
