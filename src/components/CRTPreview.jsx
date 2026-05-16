import { useRef, useEffect } from "react";

/**
 * CRTPreview
 * Real-time Canvas2D rendering of the CRT MONO preset.
 * Draws: phosphor glow text, scanlines, sweep line, vignette,
 *        corner reticles, analog flicker, timestamp overlay.
 */
export default function CRTPreview({ lyrics, currentLine, isPlaying }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const frameRef  = useRef(0);
  const flickerRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;
    const line = lyrics[currentLine] || lyrics[0];

    function drawFrame() {
      frameRef.current++;
      const f = frameRef.current;

      // ── Subtle analog flicker ──
      if (Math.random() < 0.01) {
        flickerRef.current = 0.88 + Math.random() * 0.12;
      } else {
        flickerRef.current += (1 - flickerRef.current) * 0.1;
      }
      const alpha = flickerRef.current;

      // ── Background ──
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, W, H);

      // ── Scanlines ──
      ctx.save();
      for (let y = 0; y < H; y += 4) {
        ctx.fillStyle = `rgba(0,0,0,${0.25 + Math.sin(f * 0.02 + y * 0.1) * 0.02})`;
        ctx.fillRect(0, y, W, 2);
      }
      ctx.restore();

      // ── Moving scanline sweep ──
      const sweepY = ((f * 1.5) % (H + 60)) - 30;
      const sweepGrad = ctx.createLinearGradient(0, sweepY - 20, 0, sweepY + 20);
      sweepGrad.addColorStop(0,   "rgba(0,255,65,0)");
      sweepGrad.addColorStop(0.5, "rgba(0,255,65,0.04)");
      sweepGrad.addColorStop(1,   "rgba(0,255,65,0)");
      ctx.fillStyle = sweepGrad;
      ctx.fillRect(0, sweepY - 20, W, 40);

      // ── Vignette ──
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, H * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.7)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Previous line (ghosted) ──
      if (currentLine > 0 && lyrics[currentLine - 1]) {
        ctx.save();
        ctx.globalAlpha = 0.25 * alpha;
        ctx.fillStyle   = "#00ff41";
        ctx.font        = `500 16px 'IBM Plex Mono', monospace`;
        ctx.textAlign   = "center";
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur  = 8;
        ctx.fillText(lyrics[currentLine - 1].text.toUpperCase(), W / 2, H / 2 - 52);
        ctx.restore();
      }

      // ── Main lyric line ──
      ctx.save();
      ctx.globalAlpha  = alpha;
      const glowIntensity = 18 + Math.sin(f * 0.05) * 6;
      ctx.shadowColor  = "#00ff41";
      ctx.shadowBlur   = glowIntensity;
      ctx.fillStyle    = "#00ff41";

      // Adaptive font size
      const text = (line?.text || "").toUpperCase();
      let fontSize = 28;
      ctx.font = `700 ${fontSize}px 'IBM Plex Mono', monospace`;
      while (ctx.measureText(text).width > W - 80 && fontSize > 14) {
        fontSize--;
        ctx.font = `700 ${fontSize}px 'IBM Plex Mono', monospace`;
      }
      ctx.textAlign = "center";
      ctx.fillText(text, W / 2, H / 2 + 8);

      // Occasional horizontal noise burst
      if (Math.random() < 0.03) {
        ctx.globalAlpha = 0.6 * alpha;
        ctx.fillText(text, W / 2 + (Math.random() - 0.5) * 3, H / 2 + 8);
      }
      ctx.restore();

      // ── Next line hint ──
      if (lyrics[currentLine + 1]) {
        ctx.save();
        ctx.globalAlpha = 0.12 * alpha;
        ctx.fillStyle   = "#00ff41";
        ctx.font        = `400 14px 'IBM Plex Mono', monospace`;
        ctx.textAlign   = "center";
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur  = 4;
        ctx.fillText(lyrics[currentLine + 1].text.toUpperCase(), W / 2, H / 2 + 50);
        ctx.restore();
      }

      // ── Timestamp overlay ──
      ctx.save();
      ctx.globalAlpha = 0.35 * alpha;
      ctx.fillStyle   = "#00ff41";
      ctx.font        = `400 10px 'IBM Plex Mono', monospace`;
      const mm = String(Math.floor(f / 60)).padStart(2, "0");
      const ss = String(f % 60).padStart(2, "0");
      ctx.textAlign = "left";
      ctx.fillText(`${mm}:${ss}`, 16, H - 16);
      ctx.textAlign = "right";
      ctx.fillText("CRT MONO // V1", W - 16, H - 16);
      ctx.restore();

      // ── Corner reticles ──
      const cs = 12;
      ctx.save();
      ctx.strokeStyle = "#00ff41";
      ctx.globalAlpha = 0.4 * alpha;
      ctx.lineWidth   = 1.5;
      // Top-left
      ctx.beginPath(); ctx.moveTo(12, 12 + cs); ctx.lineTo(12, 12); ctx.lineTo(12 + cs, 12); ctx.stroke();
      // Top-right
      ctx.beginPath(); ctx.moveTo(W - 12 - cs, 12); ctx.lineTo(W - 12, 12); ctx.lineTo(W - 12, 12 + cs); ctx.stroke();
      // Bottom-left
      ctx.beginPath(); ctx.moveTo(12, H - 12 - cs); ctx.lineTo(12, H - 12); ctx.lineTo(12 + cs, H - 12); ctx.stroke();
      // Bottom-right
      ctx.beginPath(); ctx.moveTo(W - 12 - cs, H - 12); ctx.lineTo(W - 12, H - 12); ctx.lineTo(W - 12, H - 12 - cs); ctx.stroke();
      ctx.restore();

      animRef.current = requestAnimationFrame(drawFrame);
    }

    animRef.current = requestAnimationFrame(drawFrame);
    return () => cancelAnimationFrame(animRef.current);
  }, [currentLine, lyrics]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={270}
      aria-label="CRT Mono live preview"
      style={{ width: "100%", display: "block", imageRendering: "pixelated" }}
    />
  );
}
