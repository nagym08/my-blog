import Link from "next/link";

export default function CategoryNotFound() {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Category Not Found
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
        This category doesn&apos;t exist.
      </p>
      <Link href="/">Back to home</Link>
    </div>
  );
}
