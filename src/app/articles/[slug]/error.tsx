"use client";

export default function ArticleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 0" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Something went wrong
      </h1>
      <p style={{ color: "var(--muted)", marginBottom: "1.5rem" }}>
        {error.message || "An unexpected error occurred."}
      </p>
      <button
        onClick={reset}
        style={{
          padding: "0.5rem 1rem",
          background: "var(--accent)",
          color: "#fff",
          border: "none",
          borderRadius: "0.25rem",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
