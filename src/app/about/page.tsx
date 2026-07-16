import type { Metadata } from "next";
import { PageHeader } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div style={{ lineHeight: 1.75 }}>
      <PageHeader eyebrow="About" title="About this blog" />
      <p style={{ marginBottom: "1rem" }}>
        Welcome to my blog. I write about software engineering, side projects,
        and lessons learned along the way.
      </p>
      <p style={{ color: "var(--text-secondary)" }}>More content coming soon.</p>
    </div>
  );
}
