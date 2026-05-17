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
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 20 }}>
        {EXPORT_FORMATS.map((f) => (
          <button
            key={f}
            className={`btn ${selectedFormat === f ? "btn-primary" : "btn-outline"}`}
            onClick={() => setSelectedFormat(f)}
            style={{ fontSize: f === "GREEN SCR" ? 10 : 13 }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Progress */}
      {exporting && (
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Vidaloka', serif", marginBottom: 8 }}>
            RENDERING FRAMES — {exportProgress}%
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${exportProgress}%` }}>
              {exportProgress > 15 && `${exportProgress}%`}
            </div>
          </div>
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

      <div style={{ display: "flex", gap: 8 }}>
        <button
          className={`btn btn-yellow ${exporting ? "btn-disabled" : ""}`}
          onClick={handleExport}
          style={{ fontSize: 13, flex: 1 }}
        >
          {exporting ? `RENDERING ${exportProgress}%...` : exported ? "↓ RE-EXPORT" : "▶ START RENDER"}
        </button>
      </div>

      <p style={{ fontSize: 11, color: "#888", marginTop: 12, fontFamily: "'Vidaloka', serif", lineHeight: 1.6 }}>
        Rendering happens entirely in your browser using Canvas + FFmpeg WASM.<br />
        No uploads. No servers. Your content stays local.
      </p>
    </Panel>
  );
}
