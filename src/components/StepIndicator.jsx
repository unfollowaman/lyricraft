/**
 * StepIndicator
 * Horizontal step progress bar.
 * Shows: done (black + checkmark), active (yellow), idle (beige).
 */
export default function StepIndicator({ steps, current }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0, flexWrap: "wrap", rowGap: 8 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              className={`step-badge ${
                i < current ? "step-done" : i === current ? "step-active" : "step-idle"
              }`}
              aria-current={i === current ? "step" : undefined}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
                color: i === current ? "#000" : "#888",
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {s}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div
              style={{
                width: 32,
                height: 3,
                background: i < current ? "#000" : "#ccc",
                margin: "0 8px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
