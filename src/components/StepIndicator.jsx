/**
 * StepIndicator
 * Horizontal step progress bar.
 * Shows: done (black + checkmark), active (yellow), idle (beige).
 */
export default function StepIndicator({ steps, current }) {
  return (
    <div style={{ background: "#FFFFFF", borderBottom: "1px solid #E8E8E4", padding: "0 24px", display: "flex", alignItems: "center", gap: 0, overflowX: "auto", scrollbarWidth: "none" }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 16px", cursor: "pointer", borderBottom: i === current ? "2px solid #1A1A1A" : "2px solid transparent", transition: "all 0.15s ease", whiteSpace: "nowrap" }}>
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
                color: i < current || i === current ? "#FFFFFF" : "#9B9B98",
                border: i < current || i === current ? "1.5px solid #1A1A1A" : "1.5px solid #E0E0DC",
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 12,
                fontWeight: i === current ? 600 : 500,
                letterSpacing: "0.03em",
                color: i < current ? "#6B6B68" : i === current ? "#1A1A1A" : "#9B9B98",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {s}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              style={{
                width: 24,
                height: 1,
                background: "#E0E0DC",
                flexShrink: 0,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
