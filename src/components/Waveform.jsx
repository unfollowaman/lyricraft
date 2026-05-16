import { useRef, useEffect } from "react";

/**
 * Waveform
 * Clickable mock audio waveform with teal playhead progress.
 * Replace bars.current with real Web Audio API analysis data
 * via AnalyserNode.getByteFrequencyData() for production use.
 */
export default function Waveform({ currentTime, duration, onSeek }) {
  const canvasRef = useRef(null);
  // Stable random bar heights generated once per mount
  const bars = useRef(
    Array.from({ length: 80 }, () => 0.2 + Math.random() * 0.8)
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const progress  = duration > 0 ? currentTime / duration : 0;
    const progressX = progress * W;

    bars.current.forEach((h, i) => {
      const x  = (i / bars.current.length) * W;
      const bw = W / bars.current.length - 1;
      const bh = h * (H * 0.85);
      const by = (H - bh) / 2;

      ctx.fillStyle = x < progressX ? "#00C2CB" : "#000";
      ctx.fillRect(x, by, bw, bh);
    });

    // Yellow playhead
    ctx.fillStyle = "#FFF700";
    ctx.fillRect(progressX - 1.5, 0, 3, H);
  }, [currentTime, duration]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const pct  = x / rect.width;
    onSeek(pct * duration);
  };

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={60}
      onClick={handleClick}
      aria-label="Audio waveform — click to seek"
      role="slider"
      style={{ width: "100%", height: "60px", cursor: "crosshair", display: "block" }}
    />
  );
}
