import { tokens } from "../styles/tokens.js";

/**
 * Toast
 * Neo-Brutalist slide-in notification.
 * Types: "success" | "error" | "warning"
 */
export default function Toast({ notification, onDismiss }) {
  if (!notification) return null;

  const accentColor =
    notification.type === "success"
      ? tokens.color.success
      : notification.type === "warning"
        ? tokens.color.textMuted
        : tokens.color.danger;

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        role="alert"
        aria-live="assertive"
        style={{ background: "#1A1A1A", color: "#FFFFFF", borderRadius: 12, padding: "12px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, boxShadow: "0 8px 32px rgba(0,0,0,0.20)", minWidth: 240, maxWidth: 340, display: "flex", alignItems: "center", gap: 10, animation: "slideUp 0.2s ease", borderLeft: `4px solid ${accentColor}` }}
      >
        <span style={{ width: 8, height: 8, borderRadius: 999, background: accentColor, flexShrink: 0 }} />
        <span>
          {notification.type === "success" ? "✓ " : notification.type === "warning" ? "⚠ " : "✕ "}
          {notification.msg}
        </span>
        <button
          onClick={onDismiss}
          aria-label="Dismiss notification"
          style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14, lineHeight: 1, padding: 0, color: "#FFFFFF" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
