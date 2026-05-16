# LYRICRAFT — Cinematic Lyric Motion Generator

> Browser-native. No uploads. No servers. Premium cinematic typography animation.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (opens at http://localhost:3000)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## Project Structure

```
lyricraft/
├── index.html                   # HTML entry point
├── vite.config.js               # Vite bundler config
├── package.json
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Root component — state + layout
    ├── styles/
    │   ├── globals.css          # Neo-Brutalist design system CSS
    │   └── tokens.js            # Design tokens (JS-side)
    ├── data/
    │   └── presets.js           # Preset definitions + mock lyrics
    └── components/
        ├── CRTPreview.jsx       # Canvas2D CRT rendering engine
        ├── PresetMiniPreview.jsx# Animated preset thumbnails
        ├── Waveform.jsx         # Clickable audio waveform
        ├── StepIndicator.jsx    # Step progress bar
        ├── Panel.jsx            # Neo-Brutalist card wrapper
        ├── Toast.jsx            # Notification toasts
        ├── SongSearch.jsx       # Step 1 — lyrics fetch
        ├── AudioUpload.jsx      # Step 2 — audio file upload
        ├── LyricSync.jsx        # Step 3 — sync review
        ├── PresetSelector.jsx   # Step 4 — preset + customization
        ├── ExportPanel.jsx      # Step 5 — format + export
        └── PreviewSidebar.jsx   # Sticky live preview + navigator
```

---

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Deploy to Netlify

```bash
npm run build
# Drag and drop the /dist folder to netlify.com/drop
```

---

## Connecting Real APIs (Production Checklist)

| Feature | File | What to replace |
|---|---|---|
| Lyrics fetch | `SongSearch.jsx` | Mock delay → Genius / Musixmatch API call |
| Lyric sync | `LyricSync.jsx` | Static data → WhisperX / Gentle aligner |
| Audio analysis | `Waveform.jsx` | Random bars → Web Audio API `AnalyserNode` |
| Video export | `ExportPanel.jsx` | Mock loop → Canvas frames + FFmpeg WASM encode |

---

## Tech Stack

- **React 18** + **Vite 5**
- **Canvas2D API** — CRT rendering engine
- **Web Audio API** — audio playback + analysis
- **FFmpeg WASM** *(export pipeline, wire up in ExportPanel)*
- **Neo-Brutalist Design System** — design.md tokens

---

## Design System

All visual tokens live in `src/styles/tokens.js` and `src/styles/globals.css`.
Follows `design.md` exactly: `3px solid #000` borders, `4px 4px 0 #000` shadows,
`0px` border-radius, `#FFF700` focus rings, `#00C2CB` primary.
