import Panel from "./Panel.jsx";
import PresetMiniPreview from "./PresetMiniPreview.jsx";
import { PRESETS } from "../data/presets.js";
import { FONTS } from "../styles/tokens.js";

export default function PresetSelector({ selectedPreset, selectedFont, onPresetChange, onFontChange, onComplete }) {
  return (
    <Panel label="04 // MOTION PRESET" badge="CINEMATIC">
      <div><span className="label-subheader">PRESETS</span><hr className="label-rule" /><p style={{ fontSize: 13, color: "#7A7670", marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
        Each preset is a complete cinematic mood — not a template. Choose your atmosphere.
      </p></div>

      <div className="mobile-preset-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 20 }}>
        {PRESETS.map((p) => (
          <div
            key={p.id}
            className={`preset-card ${selectedPreset === p.id ? "selected" : ""}`}
            onClick={() => !p.locked && onPresetChange(p.id)}
            role="radio"
            aria-checked={selectedPreset === p.id}
            aria-label={p.name}
            tabIndex={0}
            style={{ opacity: p.locked ? 0.85 : 1, border: selectedPreset === p.id ? "2px solid #1A1A1A" : "1.5px solid #D8D4CC", borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "all 0.15s ease", background: "#FDFCF9", boxShadow: selectedPreset === p.id ? "0 4px 16px rgba(0,0,0,0.12)" : "none" }}
          >
            <PresetMiniPreview preset={p} />
            <div style={{ padding: "10px 10px 12px", background: "#FDFCF9" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: "#1A1A1A", marginBottom: 2 }}>
                  {p.name}
                </span>
                {p.locked && (
                  <span style={{ background: "#F0F0ED", color: "#A8A49E", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 600 }}>SOON</span>
                )}
                {!p.locked && selectedPreset === p.id && (
                  <span style={{ background: "#1A1A1A", color: "#FDFCF9", borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 700 }}>ACTIVE</span>
                )}
              </div>
              <p style={{ fontSize: 10, color: "#A8A49E", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4, margin: 0 }}>
                {p.description}
              </p>
              <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                {p.tags.map((t) => (
                  <span key={t} style={{ borderRadius: 999, border: "1px solid #D8D4CC", background: "#F8F8F5", padding: "2px 8px", fontSize: 9, fontWeight: 500, color: "#7A7670", fontFamily: "'DM Sans', sans-serif" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="panel-divider" />
      {/* Customization */}
      <div style={{ paddingTop: 2, marginTop: 4, marginBottom: 16 }}>
        <span className="label-subheader" style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.1em", color: "#A8A49E", textTransform: "uppercase", marginBottom: 14 }}>CUSTOMIZATION — LIMITED BY DESIGN</span><hr className="label-rule" />
        <div className="mobile-custom-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#7A7670", fontFamily: "'DM Sans', sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em", display: "block" }}>
              DISPLAY FONT
            </label>
            <select value={selectedFont} onChange={(e) => onFontChange(e.target.value)} style={{ width: "100%", height: 40, border: "1.5px solid #D8D4CC", borderRadius: 10, background: "#FAF8F4", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A1A1A", padding: "0 12px", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B6B68' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
              {FONTS.map((f) => <option key={f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#7A7670", fontFamily: "'DM Sans', sans-serif", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em", display: "block" }}>
              ASPECT RATIO
            </label>
            <select defaultValue="9:16" style={{ width: "100%", height: 40, border: "1.5px solid #D8D4CC", borderRadius: 10, background: "#FAF8F4", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1A1A1A", padding: "0 12px", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236B6B68' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}>
              <option>9:16 — Reels / Stories</option>
              <option>1:1 — Square</option>
              <option>16:9 — Landscape</option>
            </select>
          </div>
        </div>
      </div>

      <button className="btn btn-yellow" onClick={onComplete} style={{ width: "100%", height: 44, background: "#1A1A1A", color: "#FDFCF9", border: "none", borderRadius: 10, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: "0.03em", cursor: "pointer" }}>
        NEXT — EXPORT →
      </button>
    </Panel>
  );
}
