import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth Error",
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Authentication Error
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        {error === "OAuthAccountNotLinked"
          ? "This email is already associated with another account. Try signing in with a different provider."
          : "Something went wrong during authentication. Please try again."}
      </p>
      <Link href="/auth/signin">Try again</Link>
    </div>
  );
}
