import CRTPreview from "./CRTPreview.jsx";

export default function PreviewSidebar({ lyrics, currentLine, isPlaying, onLineChange, onTogglePlay }) {
  return (
    <div className="mobile-preview-sidebar" style={{ background: "#FDFCF9", border: "1.5px solid #E0E0DC", borderRadius: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)", overflow: "hidden", position: "sticky", top: 72 }}>
      <div style={{ padding: "14px 18px", borderBottom: "1px solid #F0F0ED", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, letterSpacing: "0.1em", color: "#9B9B98", textTransform: "uppercase" }}>LIVE PREVIEW</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#9B9B98", fontFamily: "'DM Mono', monospace" }}>{isPlaying ? "● PLAYING" : "● PAUSED"}</span>
      </div>

      <div style={{ background: "#0A0A0A", aspectRatio: "9/16", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {lyrics.length > 0 ? (
          <CRTPreview lyrics={lyrics} currentLine={currentLine} isPlaying={isPlaying} />
        ) : (
          <div style={{ width: "100%", minHeight: 180, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 28, color: "#333" }}>◻</div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "#6B6B68", textAlign: "center" }}>
              FETCH LYRICS TO<br />ENABLE PREVIEW
            </div>
          </div>
        )}
      </div>

      <div className="mobile-preview-meta" style={{ padding: "12px 18px", borderTop: "1px solid #F0F0ED", display: "flex", alignItems: "center", gap: 8 }}>
        <span className="mobile-preview-meta-label" style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#9B9B98", marginRight: "auto" }}>
          CRT MONO · 9:16 · 30FPS
        </span>
        <div style={{ display: "flex", gap: 6 }}>
          {[
            { icon: "◀", action: () => onLineChange(Math.max(0, currentLine - 1)), label: "Previous line" },
            { icon: isPlaying ? "⏸" : "▶", action: onTogglePlay, label: isPlaying ? "Pause" : "Play" },
            { icon: "▶", action: () => onLineChange(Math.min(lyrics.length - 1, currentLine + 1)), label: "Next line" },
          ].map(({ icon, action, label }) => (
            <button
              key={label}
              onClick={action}
              aria-label={label}
              className="mobile-preview-btn" style={{ width: 32, height: 32, borderRadius: 8, border: "1.5px solid #E0E0DC", background: "#FAFAF8", color: "#1A1A1A", fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {lyrics.length > 0 && (
        <div style={{ borderTop: "1px solid #F0F0ED", padding: "12px 18px" }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9B9B98", marginBottom: 8 }}>LINE NAVIGATOR</div>
          <div style={{ maxHeight: 280, overflowY: "auto" }}>
            {lyrics.map((l, i) => (
              <div
                key={l.id}
                onClick={() => onLineChange(i)}
                role="button"
                tabIndex={0}
                aria-label={`Line ${i + 1}: ${l.text}`}
                style={{ padding: "8px 10px", cursor: "pointer", background: i === currentLine ? "#F0F0ED" : "transparent", borderLeft: i === currentLine ? "3px solid #1A1A1A" : "3px solid transparent", marginBottom: 2, display: "flex", gap: 10, alignItems: "center", transition: "background 0.08s" }}
              >
                <span style={{ fontSize: 10, color: i === currentLine ? "#1A1A1A" : "#9B9B98", fontFamily: "'DM Mono', monospace", minWidth: 28 }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: i === currentLine ? 600 : 400, color: i === currentLine ? "#1A1A1A" : "#6B6B68" }}>
                  {l.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ padding: "12px 18px", borderTop: "1px solid #F0F0ED" }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9B9B98", marginBottom: 8 }}>
          KEYBOARD
        </div>
        {[
          ["SPACE", "Play / Pause"],
          ["← →", "Navigate lines"],
          ["R", "Re-sync"],
          ["E", "Export"],
        ].map(([key, desc]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "3px 0" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 600, background: "#F0F0ED", border: "1px solid #E0E0DC", borderRadius: 4, padding: "2px 6px", color: "#3A3A38" }}>{key}</span>
            <span style={{ fontSize: 11, color: "#9B9B98" }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
