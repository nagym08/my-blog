import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div style={{ lineHeight: 1.75 }}>
      <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1.5rem" }}>
        About
      </h1>
      <p style={{ marginBottom: "1rem" }}>
        Welcome to my blog. I write about software engineering, side projects,
        and lessons learned along the way.
      </p>
      <p style={{ color: "var(--muted)" }}>More content coming soon.</p>
    </div>
  );
}
