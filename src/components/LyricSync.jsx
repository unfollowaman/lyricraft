import Panel from "./Panel.jsx";

/**
 * LyricSync
 * Step 3 — Review and adjust lyric–audio alignment.
 * In production: connect to a forced-alignment service
 * (e.g. Gentle, WhisperX, or your own sync pipeline).
 */
export default function LyricSync({ lyrics, duration, onComplete }) {
  return (
    <Panel label="03 // LYRIC SYNC" badge="AI-ASSISTED">
      <p style={{ fontSize: 13, color: "#7A7670", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
        Lyrics are auto-synced to your audio. Click any line to preview and manually adjust timing.
      </p>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
        {[
          ["LINES",    lyrics.length],
          ["DURATION", `${duration.toFixed(0)}s`],
          ["STATUS",   "SYNCED"],
        ].map(([label, val]) => (
          <div
            key={label}
            style={{ background: "#FAF8F4", border: "1.5px solid #E8E8E4", borderRadius: 12, padding: "14px 16px" }}
          >
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, fontWeight: 500, color: "#A8A49E", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
              {label}
            </div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 22, color: label === "STATUS" ? "#3D9970" : "#1A1A1A", lineHeight: 1 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <button className="btn btn-outline" style={{ flex: 1, height: 40, border: "1.5px solid #D8D4CC", borderRadius: 10, background: "#FDFCF9", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.15s ease" }}>↺ RE-SYNC</button>
        <button className="btn btn-outline" style={{ flex: 1, height: 40, border: "1.5px solid #D8D4CC", borderRadius: 10, background: "#FDFCF9", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.15s ease" }}>✎ MANUAL EDIT</button>
      </div>
      <button
        className={`btn btn-yellow ${lyrics.length === 0 ? "btn-disabled" : ""}`}
        onClick={onComplete}
        style={{ width: "100%", height: 44, background: "#1A1A1A", color: "#FDFCF9", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.03em", cursor: "pointer", transition: "all 0.15s ease" }}
      >
        NEXT — PRESET →
      </button>
    </Panel>
  );
}
