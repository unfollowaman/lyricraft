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

      {/* ── Step Navigator ── */}
      <StepIndicator steps={STEPS} current={step} />

      {/* ── Main Layout ── */}
      <main className="mobile-main-layout" style={{
        maxWidth: 680,
        margin: "0 auto",
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}>
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
      </main>
    </div>
  );
}
