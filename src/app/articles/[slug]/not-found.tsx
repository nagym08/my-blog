import Link from "next/link";

export default function ArticleNotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Article Not Found</h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        The article you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/">Back to home</Link>
    </div>
  );
}
