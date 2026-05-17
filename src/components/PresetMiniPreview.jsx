import { useRef, useEffect } from "react";

/**
 * PresetMiniPreview
 * Small animated Canvas thumbnail shown inside preset selection cards.
 * Each preset type renders its own distinct visual style.
 */
export default function PresetMiniPreview({ preset }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const frameRef  = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    function draw() {
      frameRef.current++;
      const f = frameRef.current;

      // Background
      ctx.fillStyle = preset.bg || "#000";
      ctx.fillRect(0, 0, W, H);

      if (preset.preview === "crt") {
        // Scanlines
        for (let y = 0; y < H; y += 3) {
          ctx.fillStyle = "rgba(0,0,0,0.3)";
          ctx.fillRect(0, y, W, 1.5);
        }
        // Sweep
        const sweep = ((f * 1.2) % (H + 20)) - 10;
        ctx.fillStyle = "rgba(0,255,65,0.06)";
        ctx.fillRect(0, sweep, W, 8);
        // Glowing text
        const glow = 8 + Math.sin(f * 0.08) * 3;
        ctx.shadowColor = "#00ff41";
        ctx.shadowBlur  = glow;
        ctx.fillStyle   = "#00ff41";
        ctx.font        = `bold 11px 'Vidaloka', serif`;
        ctx.textAlign   = "center";
        ctx.fillText("CRT MONO", W / 2, H / 2 + 4);
        ctx.shadowBlur  = 0;
        ctx.globalAlpha = 0.3;
        ctx.font        = `10px 'Vidaloka', serif`;
        ctx.fillText("PHOSPHOR GLOW", W / 2, H / 2 + 16);
        ctx.globalAlpha = 1;

      } else if (preset.preview === "vhs") {
        ctx.fillStyle   = preset.accent;
        ctx.font        = `bold 11px 'Vidaloka', serif`;
        ctx.textAlign   = "center";
        ctx.globalAlpha = 0.6;
        ctx.fillText("VHS DRIFT", W / 2 + (Math.random() - 0.5) * 2, H / 2);
        ctx.globalAlpha = 1;

      } else {
        // void
        ctx.fillStyle = "#fff";
        ctx.font      = `bold 11px 'Vidaloka', serif`;
        ctx.textAlign = "center";
        ctx.fillText("VOID SIGNAL", W / 2, H / 2);
      }

      // Lock overlay for upcoming presets
      if (preset.locked) {
        ctx.fillStyle = "rgba(0,0,0,0.65)";
        ctx.fillRect(0, 0, W, H);
        ctx.fillStyle   = "#FFF700";
        ctx.font        = `bold 14px 'Vidaloka', serif`;
        ctx.textAlign   = "center";
        ctx.fillText("🔒", W / 2, H / 2 + 5);
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [preset]);

  return (
    <canvas
      ref={canvasRef}
      width={160}
      height={90}
      aria-label={`${preset.name} preset preview`}
      style={{ width: "100%", display: "block" }}
    />
  );
}
