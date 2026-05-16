import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ─── CRITICAL for GitHub Pages ───────────────────────────
  // Your site is served at: https://unfollowaman.github.io/lyricraft/
  // Without this, all asset paths resolve to the root domain (404).
  base: "/lyricraft/",
  // ─────────────────────────────────────────────────────────

  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },
});
