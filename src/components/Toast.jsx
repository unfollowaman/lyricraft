import { T } from "../styles/tokens.js";

/**
 * Toast
 * Neo-Brutalist slide-in notification.
 * Types: "success" | "error" | "warning"
 */
export default function Toast({ notification, onDismiss }) {
  if (!notification) return null;

  const accentColor =
    notification.type === "success" ? T.teal
    : notification.type === "warning" ? T.yellow
    : T.magenta;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        background: "#fff",
        border: "3px solid #000",
        boxShadow: "6px 6px 0 #000",
        padding: "12px 20px 12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: "'IBM Plex Mono', monospace",
        fontWeight: 700,
        fontSize: 13,
        maxWidth: 380,
        animation: "reveal-up 0.15s ease-out",
      }}
    >
      {/* Left accent stripe */}
      <span
        style={{
          width: 6,
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          background: accentColor,
        }}
      />

      <span>
        {notification.type === "success" ? "✓ " : notification.type === "warning" ? "⚠ " : "✕ "}
        {notification.msg}
      </span>

      <button
        onClick={onDismiss}
        aria-label="Dismiss notification"
        style={{
          marginLeft: "auto",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontWeight: 900,
          fontSize: 16,
          lineHeight: 1,
          padding: 0,
          color: "#000",
        }}
      >
        ✕
      </button>
    </div>
  );
}
