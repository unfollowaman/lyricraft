/* ═══════════════════════════════════════════════════════════
   LYRICRAFT — Static Data & Preset Definitions
═══════════════════════════════════════════════════════════ */

/**
 * Demo lyrics shown when lyrics API is not configured.
 * Replace with real API response shape: { id, text, start, end }
 */
export const MOCK_LYRICS = [
  { id: 0, text: "In the neon-soaked midnight rain",      start: 0,    end: 3.2  },
  { id: 1, text: "I heard your voice like a distant train", start: 3.2, end: 6.8  },
  { id: 2, text: "Every word you said",                   start: 6.8,  end: 9.0  },
  { id: 3, text: "Still echoes in my head",               start: 9.0,  end: 12.4 },
  { id: 4, text: "Like static on an old cassette",        start: 12.4, end: 15.6 },
  { id: 5, text: "A memory I can't forget",               start: 15.6, end: 19.0 },
  { id: 6, text: "The phosphor glow of 3 AM",             start: 19.0, end: 22.3 },
  { id: 7, text: "Plays our song again and again",        start: 22.3, end: 26.0 },
];

/**
 * Cinematic preset definitions.
 * Each preset is a complete artistic mood — not a template.
 * locked: true → V2 roadmap, not yet available
 */
export const PRESETS = [
  {
    id:          "crt-mono",
    name:        "CRT MONO",
    description: "Green phosphor glow, scanlines, analog flicker",
    tags:        ["NOSTALGIC", "HYPNOTIC"],
    accent:      "#00ff41",
    bg:          "#000000",
    preview:     "crt",
    locked:      false,
  },
  {
    id:          "vhs-drift",
    name:        "VHS DRIFT",
    description: "Chromatic aberration, tape noise, warm saturation",
    tags:        ["RETRO", "WARM"],
    accent:      "#FF6B35",
    bg:          "#1a0a00",
    preview:     "vhs",
    locked:      true,
  },
  {
    id:          "void-signal",
    name:        "VOID SIGNAL",
    description: "Pure white on black, minimal, surgical precision",
    tags:        ["MINIMAL", "COLD"],
    accent:      "#ffffff",
    bg:          "#000000",
    preview:     "void",
    locked:      true,
  },
];
