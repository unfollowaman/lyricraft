import CRTPreview from "./CRTPreview.jsx";
import { T } from "../styles/tokens.js";

export default function PreviewSidebar({ lyrics, currentLine, isPlaying, onLineChange, onTogglePlay }) {
  return (
    <div style={{ position: "sticky", top: 76 }}>

      {/* Live Preview Card */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="panel-header">
          LIVE PREVIEW
          <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: isPlaying ? "#00ff41" : "#888",
              border: "1px solid #555",
              animation: isPlaying ? "pulse-dot 1.2s ease-in-out infinite" : "none",
            }} />
            <span style={{ fontSize: 10 }}>{isPlaying ? "PLAYING" : "PAUSED"}</span>
          </span>
        </div>

        <div style={{ background: "#000", aspectRatio: "16/9", position: "relative" }}>
          {lyrics.length > 0 ? (
            <CRTPreview lyrics={lyrics} currentLine={currentLine} isPlaying={isPlaying} />
          ) : (
            <div style={{
              width: "100%", minHeight: 180,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexDirection: "column", gap: 8,
            }}>
              <div style={{ fontSize: 28, color: "#333" }}>◻</div>
              <div style={{ fontFamily: "'Vidaloka', serif", fontSize: 11, color: "#444", textAlign: "center" }}>
                FETCH LYRICS TO<br />ENABLE PREVIEW
              </div>
            </div>
          )}
        </div>

        {/* Playback controls */}
        <div style={{ padding: "12px 16px", background: "#111", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Vidaloka', serif", fontSize: 11, color: "#666" }}>
            CRT MONO · 9:16 · 30fps
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {[
              { icon: "◀", action: () => onLineChange(Math.max(0, currentLine - 1)),                         label: "Previous line" },
              { icon: isPlaying ? "⏸" : "▶", action: onTogglePlay,                                          label: isPlaying ? "Pause" : "Play" },
              { icon: "▶", action: () => onLineChange(Math.min(lyrics.length - 1, currentLine + 1)),         label: "Next line" },
            ].map(({ icon, action, label }) => (
              <button
                key={label}
                onClick={action}
                aria-label={label}
                style={{
                  background: "#222", border: "2px solid #444", color: "#fff",
                  width: 32, height: 32, cursor: "pointer", fontSize: 13,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Line Navigator */}
      {lyrics.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="panel-header">LINE NAVIGATOR</div>
          <div style={{ padding: 12, maxHeight: 280, overflowY: "auto" }}>
            {lyrics.map((l, i) => (
              <div
                key={l.id}
                onClick={() => onLineChange(i)}
                role="button"
                tabIndex={0}
                aria-label={`Line ${i + 1}: ${l.text}`}
                style={{
                  padding: "8px 10px", cursor: "pointer",
                  background: i === currentLine ? T.teal : "transparent",
                  borderLeft: i === currentLine ? "4px solid #000" : "4px solid transparent",
                  marginBottom: 2,
                  display: "flex", gap: 10, alignItems: "center",
                  transition: "background 0.08s",
                }}
              >
                <span style={{ fontSize: 10, color: i === currentLine ? "#000" : "#888", fontFamily: "'Vidaloka', serif", minWidth: 28 }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: 12, fontFamily: "'Vidaloka', serif", fontWeight: i === currentLine ? 700 : 400, color: i === currentLine ? "#000" : "#333" }}>
                  {l.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard shortcuts */}
      <div style={{ border: "3px solid #000", background: "#000", padding: "12px 16px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, marginBottom: 10, color: "#555", fontFamily: "'Vidaloka', serif" }}>
          KEYBOARD
        </div>
        {[
          ["SPACE", "Play / Pause"],
          ["← →",  "Navigate lines"],
          ["R",     "Re-sync"],
          ["E",     "Export"],
        ].map(([key, desc]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, fontFamily: "'Vidaloka', serif" }}>
            <span style={{ background: "#222", color: "#fff", padding: "2px 8px", fontSize: 10, border: "1px solid #444" }}>{key}</span>
            <span style={{ fontSize: 11, color: "#666" }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
