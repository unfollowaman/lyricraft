import { T } from "../styles/tokens.js";

/**
 * Panel
 * Neo-Brutalist card wrapper with black header bar.
 * Props:
 *   label  — header text (uppercase)
 *   badge  — optional small pill in header
 *   accent — badge background color (defaults to teal)
 */
export default function Panel({ label, badge, accent, children }) {
  return (
    <div className="card" style={{ marginBottom: 24 }}>
      <div className="panel-header">
        <span>{label}</span>
        {badge && (
          <span
            style={{
              background: accent || T.teal,
              color: "#000",
              padding: "2px 8px",
              fontSize: 10,
              fontWeight: 900,
              letterSpacing: 1,
              border: "2px solid #fff",
              fontFamily: "'Vidaloka', serif",
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}
