# Arcane: Divided Twin Cities

An award-level, interactive cinematic web experience inspired by Riot Games and Fortiche Productions' **Arcane: League of Legends**, reverse-engineered from the award-winning **Zentry** digital experience.

Centered on the tragic sisterhood between **Jinx (Powder)** and **Vi (Violet)** across the polarized worlds of Zaun and Piltover.

---

## Highlights & Engineering Craft

- **Cinematic Hero Pacing:**
  - Initial 4-second uninterrupted video immersion before typography and UI controls fade in with smooth cubic-bezier transitions.
  - Automatically advances and smoothly scrolls into the narrative About section at 1 minute 20 seconds.
- **Center Interactive Tile:**
  - Features the iconic portrait of Jinx and Vi holding the lighter flame in the dark, with real-time 3D cursor perspective tilt physics.
  - Clicking the tile triggers an expanding polygon zoom animation advancing through the Arcane video loop cycle.
- **Authentic Arcane Anime Footage:**
  - 100% genuine Fortiche animation clips across all interactive slots and Bento feature cards:
    - *Hero Carousel:* Jinx flare reunion, Vi brawler pit-fighting, Jinx shimmer eye awakening.
    - *Bento Feature Cards:* Jinx Fishbones weaponry, Vi Atlas Gauntlets, Ekko Firelight hoverboard, Caitlyn enforcer sniper squad, and Zaun neon cityscape.
- **Scroll-Linked GSAP Morphing:**
  - Dynamic polygon clip-path transitions (`polygon(14% 0, 72% 0, 88% 90%, 0 95%)` to `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`).
  - Liquid meniscus gooey SVG filter (`#flt_tag`) blending procedural blur with sharp alpha threshold matrices.
- **Streaming Media Server:**
  - Standalone Node.js media server with RFC 7233 HTTP 206 Partial Content range streaming for smooth, zero-buffer video playback.

---

## Project Structure

```
├── zentry-local/                  # Production web experience
│   ├── assets/                   # Bundled React + GSAP runtime and styles
│   ├── audio/                    # Ambient background score and hero audio
│   ├── fonts/                    # Zentry, Circular, and General Sans webfonts
│   ├── img/                      # Arcane key art, logos, and character cards
│   ├── videos/                   # Optimized H.264 / AAC Arcane anime loops
│   ├── index.html                # Entry HTML shell with SVG filters
│   └── server.js                 # HTTP 206 streaming local server
├── zentry-analysis/              # Reverse-engineering decompiler output
│   ├── app_components_decompiled.js
│   ├── formatted_app.js
│   ├── index.css
│   └── index.js
├── README.md
└── .gitignore
```

---

## Quick Start

### Prerequisites
- Node.js (v18+)

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Thabisomaqhawengwenya/arcane-experience.git
   cd arcane-experience
   ```

2. Start the local streaming server:
   ```bash
   node zentry-local/server.js
   ```

3. Open your browser:
   ```
   http://localhost:5173
   ```

---

## Credits & Disclaimer

- **Universe & Lore:** Arcane, League of Legends, characters, and visual assets are copyright of Riot Games and Fortiche Productions.
- **Design Inspiration:** Architectural layout and motion patterns reverse-engineered as a creative tribute from Zentry.
