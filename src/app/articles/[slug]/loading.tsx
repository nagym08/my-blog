export default function ArticleLoading() {
  return (
    <div style={{ padding: "2rem 0" }}>
      <div
        style={{
          height: "2.5rem",
          width: "70%",
          background: "var(--surface-raised)",
          borderRadius: "0.25rem",
          marginBottom: "1rem",
        }}
      />
      <div
        style={{
          height: "1rem",
          width: "30%",
          background: "var(--surface-raised)",
          borderRadius: "0.25rem",
          marginBottom: "2rem",
        }}
      />
      {[95, 88, 100, 82, 90].map((width, i) => (
        <div
          key={i}
          style={{
            height: "1rem",
            width: `${width}%`,
            background: "var(--surface-raised)",
            borderRadius: "0.25rem",
            marginBottom: "0.75rem",
          }}
        />
      ))}
    </div>
  );
}
