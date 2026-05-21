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
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
    lg: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
    card: '0 2px 6px rgba(0,0,0,0.05), 0 10px 28px rgba(0,0,0,0.07)',
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
