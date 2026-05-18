import { useState, useRef, useEffect } from "react";
import "./styles/globals.css";

import { T, STEPS } from "./styles/tokens.js";
import StepIndicator  from "./components/StepIndicator.jsx";
import Toast          from "./components/Toast.jsx";
import SongSearch     from "./components/SongSearch.jsx";
import AudioUpload    from "./components/AudioUpload.jsx";
import LyricSync      from "./components/LyricSync.jsx";
import PresetSelector from "./components/PresetSelector.jsx";
import ExportPanel    from "./components/ExportPanel.jsx";
import PreviewSidebar from "./components/PreviewSidebar.jsx";

export default function App() {
  // ── Workflow state ──
  const [step,         setStep]         = useState(0);
  const [lyrics,       setLyrics]       = useState([]);
  const [audioFile,    setAudioFile]    = useState(null);
  const [audioURL,     setAudioURL]     = useState(null);
  const [currentTime,  setCurrentTime]  = useState(0);
  const [duration,     setDuration]     = useState(30);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentLine,  setCurrentLine]  = useState(0);
  const [selectedPreset, setSelectedPreset] = useState("crt-mono");
  const [selectedFont,   setSelectedFont]   = useState("Vidaloka");
  const [notification,   setNotification]   = useState(null);

  const audioRef = useRef(null);

  // ── Notification helper ──
  const showNotif = (msg, type = "success") => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3200);
  };

  // ── Sync current lyric line with playback time ──
  useEffect(() => {
    if (!lyrics.length) return;
    const idx = [...lyrics].reverse().findIndex((l) => l.start <= currentTime);
    if (idx >= 0) setCurrentLine(lyrics.length - 1 - idx);
  }, [currentTime, lyrics]);

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handleKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space")       { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight")  setCurrentLine((l) => Math.min(lyrics.length - 1, l + 1));
      if (e.code === "ArrowLeft")   setCurrentLine((l) => Math.max(0, l - 1));
      if (e.code === "KeyE")        setStep(4);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lyrics.length, isPlaying]);

  // ── Audio helpers ──
  const handleFileLoad = (file) => {
    if (audioURL) URL.revokeObjectURL(audioURL);
    const url = URL.createObjectURL(file);
    setAudioFile(file);
    setAudioURL(url);
    setCurrentTime(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying((p) => !p);
  };

  const handleSeek = (t) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  return (
    <>
      {/* Hidden audio element */}
      {audioURL && (
        <audio
          ref={audioRef}
          src={audioURL}
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.target.duration)}
          onEnded={() => setIsPlaying(false)}
          style={{ display: "none" }}
        />
      )}

      {/* Toast notification */}
      <Toast notification={notification} onDismiss={() => setNotification(null)} />

      {/* ── Top Navigation ── */}
      <header style={{
        background: "#000", color: "#fff",
        padding: "0 32px", height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "3px solid #FFF700",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontFamily: "'Spectral SC', serif", fontSize: 26, letterSpacing: 4, color: T.teal }}>
            LYRICRAFT
          </span>
          <span style={{
            background: T.yellow, color: "#000",
            padding: "2px 8px", fontSize: 10, fontWeight: 900,
            letterSpacing: 1, border: "2px solid #fff",
            fontFamily: "'Spectral SC', serif",
          }}>BETA</span>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <span className="tag tag-teal" style={{ cursor: "pointer" }}>Docs</span>
          <span className="tag" style={{ background: "#333", color: "#fff", border: "2px solid #555", cursor: "pointer" }}>GitHub</span>
        </nav>
      </header>

      {/* ── Hero Strip ── */}
      <div style={{
        background: "#000", color: "#fff",
        padding: "28px 32px",
        borderBottom: "3px solid #000",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32,
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Spectral SC', serif",
            fontSize: "clamp(32px, 5vw, 52px)",
            letterSpacing: 3, lineHeight: 1, marginBottom: 8,
          }}>
            CINEMATIC{" "}
            <span style={{ color: T.teal }}>LYRIC MOTION</span>{" "}
            <span style={{ color: T.yellow }}>GENERATOR</span>
          </h1>
          <p style={{ fontFamily: "'Spectral SC', serif", fontSize: 13, color: "#aaa", maxWidth: 480, lineHeight: 1.6 }}>
            Browser-native. No upload limits. No watermarks.<br />
            Premium cinematic typography — exported locally.
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap" }}>
          {["MP4", "WEBM", "MOV", "GIF"].map((f) => (
            <span key={f} className="tag" style={{ background: "#222", color: "#aaa", border: "2px solid #444" }}>{f}</span>
          ))}
        </div>
      </div>

      {/* ── Step Navigator ── */}
      <div style={{
        background: T.beige,
        borderBottom: "3px solid #000",
        padding: "16px 32px",
        overflowX: "auto",
      }}>
        <StepIndicator steps={STEPS} current={step} />
      </div>

      {/* ── Main Layout ── */}
      <main style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "32px",
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: 32,
        alignItems: "start",
      }}>
        {/* Left — Workflow panels */}
        <div>
          <SongSearch
            onComplete={(fetchedLyrics) => { setLyrics(fetchedLyrics); setStep(1); }}
            onNotify={showNotif}
          />
          <AudioUpload
            audioFile={audioFile}
            audioRef={audioRef}
            currentTime={currentTime}
            duration={duration}
            isPlaying={isPlaying}
            onFileLoad={handleFileLoad}
            onSeek={handleSeek}
            onTogglePlay={togglePlay}
            onComplete={() => setStep(2)}
            onNotify={showNotif}
          />
          <LyricSync
            lyrics={lyrics}
            duration={duration}
            onComplete={() => setStep(3)}
          />
          <PresetSelector
            selectedPreset={selectedPreset}
            selectedFont={selectedFont}
            onPresetChange={setSelectedPreset}
            onFontChange={setSelectedFont}
            onComplete={() => setStep(4)}
          />
          <ExportPanel onNotify={showNotif} />
        </div>

        {/* Right — Live preview sidebar */}
        <PreviewSidebar
          lyrics={lyrics}
          currentLine={currentLine}
          isPlaying={isPlaying}
          onLineChange={setCurrentLine}
          onTogglePlay={togglePlay}
        />
      </main>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: "3px solid #000",
        background: "#000", color: "#555",
        padding: "20px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "'Spectral SC', serif", fontSize: 11,
        marginTop: 32, flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ color: T.teal, fontFamily: "'Spectral SC', serif", fontSize: 18, letterSpacing: 3 }}>
          LYRICRAFT
        </span>
        <span>BROWSER-NATIVE · CANVAS + FFMPEG WASM · NO SERVERS</span>
        <span>V1.0 · CRT MONO PRESET</span>
      </footer>
    </>
  );
}
