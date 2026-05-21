/**
 * StepIndicator
 * Horizontal step progress bar.
 * Shows: done (black + checkmark), active (yellow), idle (beige).
 */
export default function StepIndicator({ steps, current }) {
  return (
    <div className="mobile-step-indicator" style={{ background: "#F5F2EC", borderBottom: "2px solid #1A1A1A", padding: "0 20px", display: "flex", alignItems: "center", gap: 0, overflowX: "auto", scrollbarWidth: "none", flexWrap: "nowrap" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 16px", marginBottom: i === current ? -2 : 0, cursor: "pointer", borderBottom: i === current ? "2px solid #1A1A1A" : "2px solid transparent", transition: "all 0.15s ease", whiteSpace: "nowrap" }}>
            <div
              aria-current={i === current ? "step" : undefined}
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                fontFamily: "'DM Mono', monospace",
                background: i < current || i === current ? "#1A1A1A" : "#F0F0ED",
                color: i < current || i === current ? "#FDFCF9" : "#A8A49E",
                border: i < current || i === current ? "1.5px solid #1A1A1A" : "1.5px solid #D8D4CC",
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: i === current ? 700 : 500,
                letterSpacing: "0.03em",
                color: i < current ? "#7A7670" : i === current ? "#1A1A1A" : "#A8A49E",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {s}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              style={{
                width: 20,
                height: 1,
                background: "#D8D4CC",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
