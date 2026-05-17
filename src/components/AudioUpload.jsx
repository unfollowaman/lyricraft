import { useRef } from "react";
import Panel from "./Panel.jsx";
import Waveform from "./Waveform.jsx";
import { T } from "../styles/tokens.js";

/**
 * AudioUpload
 * Step 2 — Upload MP3/WAV/OGG audio file.
 * Supports drag-and-drop and file picker.
 */
export default function AudioUpload({
  audioFile,
  audioRef,
  currentTime,
  duration,
  isPlaying,
  onFileLoad,
  onSeek,
  onTogglePlay,
  onComplete,
  onNotify,
}) {
  const fileInputRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;
    const allowed = ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp3"];
    if (!allowed.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg)$/i)) {
      onNotify("Unsupported format. Use MP3, WAV, or OGG.", "error");
      return;
    }
    onFileLoad(file);
    onNotify(`Audio loaded: ${file.name}`, "success");
  };

  const handleChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  return (
    <Panel
      label="02 // AUDIO UPLOAD"
      badge={audioFile ? "LOADED" : "WAITING"}
      accent={audioFile ? T.teal : T.yellow}
    >
      {/* Drop Zone */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload audio file"
        style={{
          border: "3px dashed #000",
          background: audioFile ? "#e8fff9" : "#fafafa",
          padding: 32,
          textAlign: "center",
          cursor: "pointer",
          marginBottom: audioFile ? 16 : 0,
          transition: "background 0.1s",
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,.ogg"
          onChange={handleChange}
          style={{ display: "none" }}
          aria-hidden="true"
        />

        {audioFile ? (
          <>
            <div style={{ fontSize: 28, marginBottom: 8 }}>🎵</div>
            <div style={{ fontWeight: 700, fontFamily: "'Vidaloka', serif" }}>
              {audioFile.name}
            </div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 4, fontFamily: "'Vidaloka', serif" }}>
              {(audioFile.size / 1024 / 1024).toFixed(2)} MB — click to replace
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: 36, marginBottom: 8 }}>⬆</div>
            <div style={{ fontWeight: 700, fontFamily: "'Vidaloka', serif", marginBottom: 4 }}>
              DROP AUDIO FILE HERE
            </div>
            <div style={{ fontSize: 12, color: "#888", fontFamily: "'Vidaloka', serif" }}>
              MP3 · WAV · OGG — up to 100 MB
            </div>
          </>
        )}
      </div>

      {/* Waveform + Controls */}
      {audioFile && (
        <>
          <div style={{ border: "3px solid #000", background: "#f0f0f0", marginBottom: 12 }}>
            <Waveform currentTime={currentTime} duration={duration} onSeek={onSeek} />
          </div>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              className={`btn ${isPlaying ? "btn-danger" : "btn-primary"}`}
              onClick={onTogglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              style={{ fontSize: 12 }}
            >
              {isPlaying ? "⏸ PAUSE" : "▶ PLAY"}
            </button>

            <span style={{ fontFamily: "'Vidaloka', serif", fontSize: 12 }}>
              {String(Math.floor(currentTime / 60)).padStart(2, "0")}:
              {String(Math.floor(currentTime % 60)).padStart(2, "0")}
              {" / "}
              {String(Math.floor(duration / 60)).padStart(2, "0")}:
              {String(Math.floor(duration % 60)).padStart(2, "0")}
            </span>

            <button
              className="btn btn-yellow"
              onClick={onComplete}
              style={{ marginLeft: "auto", fontSize: 12 }}
            >
              NEXT — SYNC →
            </button>
          </div>
        </>
      )}
    </Panel>
  );
}
