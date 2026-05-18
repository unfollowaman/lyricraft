import Panel from "./Panel.jsx";
import PresetMiniPreview from "./PresetMiniPreview.jsx";
import { PRESETS } from "../data/presets.js";
import { FONTS } from "../styles/tokens.js";

export default function PresetSelector({ selectedPreset, selectedFont, onPresetChange, onFontChange, onComplete }) {
  return (
    <Panel label="04 // MOTION PRESET" badge="CINEMATIC">
      <p style={{ fontSize: 13, color: "#555", marginBottom: 16, fontFamily: "'Spectral SC', serif" }}>
        Each preset is a complete cinematic mood — not a template. Choose your atmosphere.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
        {PRESETS.map((p) => (
          <div
            key={p.id}
            className={`preset-card ${selectedPreset === p.id ? "selected" : ""}`}
            onClick={() => !p.locked && onPresetChange(p.id)}
            role="radio"
            aria-checked={selectedPreset === p.id}
            aria-label={p.name}
            tabIndex={0}
            style={{ opacity: p.locked ? 0.85 : 1 }}
          >
            <PresetMiniPreview preset={p} />
            <div style={{ padding: "10px 12px", background: "#000", borderTop: "2px solid #333" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ color: "#fff", fontFamily: "'Spectral SC', serif", fontSize: 18, letterSpacing: 2 }}>
                  {p.name}
                </span>
                {p.locked && (
                  <span style={{ background: "#FFF700", color: "#000", fontSize: 9, fontWeight: 900, padding: "1px 6px", border: "1px solid #fff" }}>SOON</span>
                )}
                {!p.locked && selectedPreset === p.id && (
                  <span style={{ background: "#00C2CB", color: "#000", fontSize: 9, fontWeight: 900, padding: "1px 6px" }}>ACTIVE</span>
                )}
              </div>
              <p style={{ color: "#888", fontSize: 10, fontFamily: "'Spectral SC', serif", lineHeight: 1.4, margin: 0 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ border: `1px solid ${p.accent}`, color: p.accent, fontSize: 8, padding: "1px 5px", fontFamily: "'Spectral SC', serif", fontWeight: 700, letterSpacing: 0.5 }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customization */}
      <div style={{ border: "3px solid #000", background: "#fafafa", marginBottom: 16 }}>
        <div className="panel-header" style={{ background: "#222" }}>CUSTOMIZATION — LIMITED BY DESIGN</div>
        <div style={{ padding: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6, fontFamily: "'Spectral SC', serif" }}>
              DISPLAY FONT
            </label>
            <select value={selectedFont} onChange={(e) => onFontChange(e.target.value)}>
              {FONTS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, display: "block", marginBottom: 6, fontFamily: "'Spectral SC', serif" }}>
              ASPECT RATIO
            </label>
            <select defaultValue="9:16">
              <option>9:16 — Reels / Stories</option>
              <option>1:1 — Square</option>
              <option>16:9 — Landscape</option>
            </select>
          </div>
        </div>
      </div>

      <button className="btn btn-yellow" onClick={onComplete} style={{ fontSize: 12 }}>
        NEXT — EXPORT →
      </button>
    </Panel>
  );
}
