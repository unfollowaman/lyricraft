import { useState } from "react";
import Panel from "./Panel.jsx";
import { MOCK_LYRICS } from "../data/presets.js";

/**
 * SongSearch
 * Step 1 — Fetch lyrics by song name.
 * In production: replace the mock fetch with a real lyrics API call
 * (e.g. Genius API, Musixmatch, or your own backend proxy).
 */
export default function SongSearch({ onComplete, onNotify }) {
  const [query,     setQuery]     = useState("");
  const [searching, setSearching] = useState(false);
  const [lyrics,    setLyrics]    = useState([]);
  const [activeLine, setActiveLine] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setSearching(true);
    setLyrics([]);

    // ── TODO: Replace with real lyrics API ──
    // Example Genius proxy:
    // const res  = await fetch(`/api/lyrics?q=${encodeURIComponent(query)}`);
    // const data = await res.json(); // [{ id, text, start, end }, ...]
    // setLyrics(data);

    await new Promise((r) => setTimeout(r, 1400)); // mock delay
    setLyrics(MOCK_LYRICS);
    setSearching(false);
    onNotify("Lyrics fetched successfully", "success");
  };

  const handleProceed = () => {
    onComplete(lyrics);
  };

  return (
    <Panel label="01 // SONG SEARCH" badge="LYRICS ENGINE">
      <p style={{ fontSize: 12, color: "#A8A49E", marginTop: 8, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>
        Enter a song name to fetch lyrics automatically, or paste manually below.
      </p>

      {/* Search Row */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16 }}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="e.g. Blinding Lights — The Weeknd"
          aria-label="Song search query"
          style={{
            flex: 1,
            width: "100%",
            height: 44,
            border: "1.5px solid #D8D4CC",
            borderRadius: 10,
            padding: "0 14px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#1A1A1A",
            background: "#FAF8F4",
            outline: "none",
          }}
        />
        <button
          className={`btn btn-primary ${searching || !query.trim() ? "btn-disabled" : ""}`}
          onClick={handleSearch}
          style={{
            whiteSpace: "nowrap",
            flexShrink: 0,
            height: 44,
            padding: "0 20px",
            background: "#1A1A1A",
            color: "#FDFCF9",
            border: "none",
            borderRadius: 10,
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 600,
            fontSize: 13,
            letterSpacing: "0.03em",
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
        >
          {searching ? "FETCHING..." : "FETCH LYRICS"}
        </button>
      </div>

      {/* Progress */}
      {searching && (
        <div style={{ marginBottom: 12 }}>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "60%" }}>FETCHING...</div>
          </div>
        </div>
      )}

      {/* Lyrics List */}
      {lyrics.length > 0 && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, fontFamily: "'Vidaloka', serif" }}>
              {lyrics.length} LINES DETECTED
            </span>
            <span className="tag tag-teal">SYNCED</span>
          </div>

          <div style={{ maxHeight: 200, overflowY: "auto", border: "3px solid #000", background: "#fafafa", marginBottom: 16 }}>
            {lyrics.map((l, i) => (
              <div
                key={l.id}
                className={`lyric-line ${activeLine === i ? "active" : ""}`}
                onClick={() => setActiveLine(i)}
                role="button"
                tabIndex={0}
                aria-label={`Line ${i + 1}: ${l.text}`}
              >
                <span style={{ color: "#888", fontSize: 11, minWidth: 32, fontFamily: "'Vidaloka', serif" }}>
                  {String(Math.floor(l.start / 60)).padStart(2, "0")}:{String(Math.floor(l.start % 60)).padStart(2, "0")}
                </span>
                <span style={{ flex: 1 }}>{l.text}</span>
                <span style={{ fontSize: 10, color: "#aaa", fontFamily: "'Vidaloka', serif" }}>
                  {(l.end - l.start).toFixed(1)}s
                </span>
              </div>
            ))}
          </div>

          <button className="btn btn-yellow" onClick={handleProceed}>
            NEXT — UPLOAD AUDIO →
          </button>
        </>
      )}
    </Panel>
  );
}
