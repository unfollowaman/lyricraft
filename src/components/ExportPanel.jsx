import { useState } from "react";
import Panel from "./Panel.jsx";
import { T, EXPORT_FORMATS } from "../styles/tokens.js";

export default function ExportPanel({ onNotify }) {
  const [selectedFormat, setSelectedFormat] = useState("MP4");
  const [exportProgress, setExportProgress] = useState(0);
  const [exporting, setExporting]   = useState(false);
  const [exported, setExported]     = useState(false);

  const handleExport = async () => {
    setExporting(true);
    setExportProgress(0);
    setExported(false);

    // TODO: Replace with real Canvas → FFmpeg WASM pipeline
    for (let i = 0; i <= 100; i += 2) {
      await new Promise((r) => setTimeout(r, 40));
      setExportProgress(i);
    }

    setExporting(false);
    setExported(true);
    onNotify("Export complete — file ready for download", "success");
  };

  return (
    <Panel
      label="05 // EXPORT"
      badge={exported ? "READY" : "RENDER"}
      accent={exported ? T.teal : T.yellow}
    >
      {/* Format selector */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f}
            className={`btn ${selectedFormat === f ? "btn-primary" : "btn-outline"}`}
            onClick={() => setSelectedFormat(f)}
            style={{ height: 36, padding: "0 16px", border: "1.5px solid #E0E0DC", borderRadius: 8, background: selectedFormat === f ? "#1A1A1A" : "#FFFFFF", fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, color: selectedFormat === f ? "#FFFFFF" : "#6B6B68", cursor: "pointer", transition: "all 0.15s ease" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Progress */}
      {(exporting || exported) && (
        <div style={{ background: "#FAFAF8", border: "1.5px solid #E8E8E4", borderRadius: 12, padding: 20, textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Vidaloka', serif", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: "#9B9B98" }}>{exporting ? `RENDERING FRAMES — ${exportProgress}%` : "EXPORT READY"}</span>
          </div>
          {exporting && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${exportProgress}%` }}>
                {exportProgress > 15 && `${exportProgress}%`}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Export complete */}
      {exported && (
        <div style={{ border: "3px solid #00C2CB", background: "#e8fff9", padding: 16, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontWeight: 900, fontFamily: "'Vidaloka', serif", marginBottom: 4 }}>✓ EXPORT COMPLETE</div>
            <div style={{ fontSize: 12, color: "#555", fontFamily: "'Vidaloka', serif" }}>
              lyricraft_export.{selectedFormat.toLowerCase().replace(" ", "_")} · ~4.2 MB
            </div>
          </div>
          <button className="btn btn-primary" style={{ fontSize: 12 }}>↓ DOWNLOAD</button>
        </div>
      )}

      <button
        className={`btn btn-yellow ${exporting ? "btn-disabled" : ""}`}
        onClick={handleExport}
        style={{ width: "100%", height: 48, background: "#1A1A1A", color: "#FFFFFF", border: "none", borderRadius: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 15, letterSpacing: "0.02em", cursor: "pointer", transition: "all 0.15s ease" }}
      >
        {exporting ? `RENDERING ${exportProgress}%...` : exported ? "↓ RE-EXPORT" : "▶ START RENDER"}
      </button>

      <p style={{ fontSize: 11, color: "#888", marginTop: 12, fontFamily: "'Vidaloka', serif", lineHeight: 1.6 }}>
        Rendering happens entirely in your browser using Canvas + FFmpeg WASM.<br />
        No uploads. No servers. Your content stays local.
      </p>
    </Panel>
  );
}
