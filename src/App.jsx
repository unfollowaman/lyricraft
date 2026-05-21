import { useState, useRef, useEffect } from "react";
import "./styles/globals.css";

import { STEPS } from "./styles/tokens.js";
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
    <div style={{ background: "#F5F2EC", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif" }}>
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
        background: "#FDFCF9",
        borderBottom: "1px solid #E8E8E4",
        padding: "0 24px", height: 52,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, fontWeight: 500, letterSpacing: "0.12em", color: "#1A1A1A" }}>
            LYRICRAFT
          </span>
          <span style={{
            background: "#1A1A1A", color: "#FDFCF9",
            borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
          }}>BETA</span>
        </div>
        <nav style={{ display: "flex", gap: 8 }}>
          <a href="#" style={{ fontSize: 12, fontWeight: 500, color: "#7A7670", border: "1px solid #D8D4CC", borderRadius: 8, padding: "4px 12px", textDecoration: "none" }}>DOCS</a>
          <a href="#" style={{ fontSize: 12, fontWeight: 500, color: "#7A7670", border: "1px solid #D8D4CC", borderRadius: 8, padding: "4px 12px", textDecoration: "none" }}>GITHUB</a>
        </nav>
      </header>

      {/* ── Hero Strip ── */}
      <div style={{
        background: "#FDFCF9",
        borderBottom: "2px solid #1A1A1A",
        padding: "32px 24px 28px",
        textAlign: "left",
      }}>
        <div>
          <h1 style={{
            fontFamily: "'Fraunces', serif",
            letterSpacing: "-0.02em", lineHeight: 1, marginBottom: 8,
          }}>
            <span style={{ display: "block", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, fontStyle: "italic", color: "#1A1A1A" }}>CINEMATIC LYRIC</span>
            <span style={{ display: "block", fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 900, fontStyle: "normal", color: "#7A7670" }}>MOTION GENERATOR</span>
          </h1>
          <p style={{ fontSize: 12, color: "#A8A49E", marginTop: 10, fontWeight: 400, lineHeight: 1.5 }}>
            Browser-native. No upload limits. No watermarks.<br />
            Premium cinematic typography — exported locally.
          </p>
        </div>
        <div style={{ height: 1.5, background: "#1A1A1A", opacity: 0.12, margin: "14px 0 10px" }} />
        <div style={{ display: "inline-flex", gap: 6, flexShrink: 0, flexWrap: "wrap", marginTop: 0 }}>
          {["MP4", "WEBM", "MOV", "GIF"].map((f) => (
            <span key={f} style={{ border: "1.5px solid #1A1A1A", borderRadius: 5, padding: "2px 8px", fontSize: 10, fontWeight: 500, fontFamily: "'DM Mono', monospace", letterSpacing: "0.06em", background: "transparent", color: "#1A1A1A" }}>{f}</span>
          ))}
        </div>
      </div>

      {/* ── Step Navigator ── */}
      <StepIndicator steps={STEPS} current={step} />

      {/* ── Main Layout ── */}
      <main style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "1fr 380px",
        gap: 24,
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
        borderTop: "1px solid #E8E8E4",
        background: "#FDFCF9", color: "#A8A49E",
        padding: "20px 24px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 11, marginTop: 24, flexWrap: "wrap", gap: 8,
      }}>
        <span style={{ color: "#1A1A1A", fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.12em" }}>
          LYRICRAFT
        </span>
        <span>BROWSER-NATIVE · CANVAS + FFMPEG WASM · NO SERVERS</span>
        <span>V1.0 · CRT MONO PRESET</span>
      </footer>
    </div>
  );
}
