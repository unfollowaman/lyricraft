/* ═══════════════════════════════════════════════════════════
   LYRICRAFT — Design Tokens
   Single source of truth for all JS-side styling values.
═══════════════════════════════════════════════════════════ */

export const tokens = {
  color: {
    bg: '#F5F2EC',
    surface: '#FDFCF9',
    surfaceHover: '#F4F4F2',
    border: '#D8D4CC',
    borderStrong: '#1A1A1A',
    text: '#1A1A1A',
    textMuted: '#7A7670',
    textLight: '#A8A49E',
    accent: '#1A1A1A',
    accentFg: '#FFFFFF',
    tag: '#F0F0ED',
    tagText: '#3A3A38',
    danger: '#D94F3D',
    success: '#3D9970',
    focus: '#1A1A1A',
  },
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    pill: '999px',
  },
  font: {
    display: "'Fraunces', serif",
    body: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  border: {
    default: '1.5px solid #D8D4CC',
    strong: '1.5px solid #1A1A1A',
    focus: '2px solid #1A1A1A',
  },
};

export const FONTS = [
  'Vidaloka',
  'Space Mono',
  'Courier New',
  'Vidaloka',
  'Roboto Mono',
];

export const EXPORT_FORMATS = ['MP4', 'WEBM', 'GIF', 'GREEN SCR'];

export const STEPS = ['SEARCH', 'AUDIO', 'SYNC', 'PRESET', 'EXPORT'];
