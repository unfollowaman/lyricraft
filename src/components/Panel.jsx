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
      className="mobile-panel"
      style={{
        background: "#FDFCF9",
        border: "1.5px solid #D8D4CC",
        borderRadius: 14,
        boxShadow: "0 2px 6px rgba(0,0,0,0.05), 0 10px 28px rgba(0,0,0,0.07)",
        marginBottom: 20,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "#1A1A1A",
          borderRadius: "13px 13px 0 0",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, fontWeight: 500, color: "#FFFFFF", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          {stepNumber ? `${stepNumber} // ${stepTitle}` : stepTitle}
        </span>
        {badge && (
          <span
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999,
              padding: "3px 10px",
              fontSize: 10,
              fontWeight: 600,
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div className="mobile-panel-body" style={{ padding: "20px 20px 22px", position: "relative" }}>
        <div className="panel-content">{children}</div>
      </div>
    </div>
  );
}
