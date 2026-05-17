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
      <p style={{ fontSize: 13, color: "#555", marginBottom: 16, fontFamily: "'Vidaloka', serif" }}>
        Lyrics are auto-synced to your audio. Click any line to preview and manually adjust timing.
      </p>

      {/* Stats strip */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {[
          ["LINES",    lyrics.length,           "#00C2CB"],
          ["DURATION", `${duration.toFixed(0)}s`, "#FFF700"],
          ["STATUS",   "SYNCED",                 "#fff"],
        ].map(([label, val, bg]) => (
          <div
            key={label}
            style={{ border: "3px solid #000", background: bg, padding: "12px 16px" }}
          >
            <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Vidaloka', serif", marginBottom: 4 }}>
              {label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, fontFamily: "'Vidaloka', serif", letterSpacing: 2 }}>
              {val}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <button className="btn btn-outline" style={{ fontSize: 12 }}>↺ RE-SYNC</button>
        <button className="btn btn-outline" style={{ fontSize: 12 }}>✎ MANUAL EDIT</button>
        <button
          className={`btn btn-yellow ${lyrics.length === 0 ? "btn-disabled" : ""}`}
          onClick={onComplete}
          style={{ marginLeft: "auto", fontSize: 12 }}
        >
          NEXT — PRESET →
        </button>
      </div>
    </Panel>
  );
}
