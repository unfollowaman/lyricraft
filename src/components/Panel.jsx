/**
 * Panel
 * Soft card wrapper.
 * Props:
 *   label  — header text (uppercase)
 *   badge  — optional small pill in header
 *   accent — kept for API compatibility
 */
export default function Panel({ label, badge, accent, children }) {
  const [stepNumber, stepTitle] = label.includes("//")
    ? label.split("//").map((part) => part.trim())
    : [null, label];

  return (
    <div
      style={{
        background: "#FFFFFF",
        border: "1.5px solid #E0E0DC",
        borderRadius: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        padding: 24,
        marginBottom: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: "1px solid #F0F0ED",
        }}
      >
        {stepNumber && (
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: 11,
              fontWeight: 500,
              color: "#9B9B98",
              letterSpacing: "0.06em",
            }}
          >
            {stepNumber} //
          </span>
        )}
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "0.04em",
            color: "#1A1A1A",
            textTransform: "uppercase",
          }}
        >
          {stepTitle}
        </span>
        {badge && (
          <span
            style={{
              marginLeft: "auto",
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.05em",
              background: "#F0F0ED",
              color: "#3A3A38",
              border: "1px solid #E0E0DC",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
