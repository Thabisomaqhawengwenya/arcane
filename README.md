# Arcane: Divided Twin Cities

<div align="center">

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.5-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-RFC_7233_Streaming-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-9.0.2_FastStart-007808?style=for-the-badge&logo=ffmpeg&logoColor=white)](https://ffmpeg.org/)
[![License](https://img.shields.io/badge/License-Creative_Tribute-E03C31?style=for-the-badge)](https://riotgames.com)

**An award-level, cinematic interactive web experience inspired by Riot Games and Fortiche Productions' *Arcane: League of Legends*, reverse-engineered and reconstructed from the award-winning *Zentry* digital experience.**

[Explore Features](#highlights--cinematic-craft) • [Tech Stack](#complete-tech-stack) • [Motion Physics](#motion-physics--clip-path-geometry) • [Media Inventory](#curated-arcane-anime-asset-pipeline) • [Local Setup](#quick-start)

</div>

---

## Overview

**Arcane: Divided Twin Cities** transforms the multi-award-winning kinetic layout of Zentry into a dark, immersive storytelling vessel exploring the tragic fracture between sisters **Powder (Jinx)** and **Violet (Vi)**. 

Set across the gilded rooftops of Piltover and the toxic neon depths of the Zaun Undercity, every interaction, from the scroll-linked polygonal morphing to the kinetic skew-rolling buttons, has been tailored to embody the collision between Hextech precision and Shimmer-fueled madness.

---

## Highlights & Cinematic Craft

### 1. Director-Paced Hero Immersion
- **Unbroken 4-Second Opening:** Upon page load, all overlays, titles, and buttons remain completely invisible (`opacity: 0`, `pointer-events: none`), allowing the cinematic atmosphere to set the narrative tone uninterrupted.
- **Cubic-Bezier Fade-In:** At exactly $t = 4.0\text{s}$, the hero branding (`ARCANE`), subtitle metadata, and CTA smoothly materialize using an ultra-smooth cubic-bezier transition (`opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)`).
- **Automated Scene Progression:** At $t = 80.0\text{s}$ ($1\text{m }20\text{s}$), the hero video automatically pauses and programmatically executes a smooth scroll anchor directly into the **Welcome to Zaun & Piltover** About section.

### 2. Interactive 3D Center Portal
- **Lighter Flame Artwork:** The center interactive tile features the iconic, intimate moment of Jinx and Vi holding the lighter flame in the dark (`img/hero-center.png`).
- **Real-Time Cursor Perspective Tilt:** Hovering over the center portal dynamically tracks the cursor relative to card geometry, imparting 3D depth tilt (`transformPerspective: 500px`).
- **Cyclic Video Transition:** Clicking the center card initiates an expanding geometric zoom transition that advances through the 4-stage hero video loop.

### 3. Pure Fortiche Anime Footage (Zero In-Game Clips)
- All in-game ability renders and generic assets have been purged.
- Every video slot across the entire experience is populated with **100% authentic, high-bitrate animation cuts** from Fortiche Productions' *Arcane* (Season 1, Season 2, and the official *Enemy* animation).

### 4. Mathematical Scroll-Linked Morphing
- **Non-Linear Polygon Clip-Paths:** ScrollTrigger scrubs polygon coordinates from asymmetrical trapezoids (`polygon(14% 0, 72% 0, 88% 90%, 0 95%)`) to full-screen rectangles (`polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`).
- **Organic Liquid SVG Shimmer Filter:** A custom `<svg>` filter (`#flt_tag`) applies procedural Gaussian blurring coupled with high-contrast alpha color matrix thresholds to produce a viscous, liquid meniscus effect around floating story frames.

### 5. Dedicated Hextech Arcana Experience (`hextech.html`)
- **Twin-City Narrative Split:** While `index.html` chronicles Jinx and Vi's fracture in Zaun, `hextech.html` transports the audience into Jayce and Viktor's breakthrough in the Piltover Academy.
- **Hextech Visual Language:** Replaces the violet Zaun palette with electric Hexcore cyan (`#00F0FF`), Piltover Art Deco Gold (`#F5A623`), and cosmic obsidian (`#050811`).
- **Kinetic Hexcore Bento Grid:** 5 dedicated video cards showcasing the birth of Hextech, runic containment harmonics, wild rune anomalies, kinetic force barriers, and the Piltover Hexgates.
- **Synchronized Global Navigation:** The navigation bar directly links between `/index.html` (Sisters) and `/hextech.html` (Hextech) with active indicator states.

### 6. Custom RFC 7233 Media Server
- Includes a purpose-built Node.js media server featuring native **HTTP 206 Partial Content Range Streaming**.
- Enables instantaneous seeking, random-access byte scrubbing, and zero-buffer video playback across all devices.

---

## Complete Tech Stack

| Category | Technology | Purpose & Implementation |
| :--- | :--- | :--- |
| **UI Framework** | **React 18.3.1** | Component-driven declarative UI, custom hook lifecycle management, and reactive video playback coordination. |
| **Animation Engine** | **GSAP 3.12.5 (GreenSock)** | Core motion engine powering high-performance 60fps scroll-linked timelines, 3D transforms, and coordinate interpolation. |
| **Scroll Orchestration**| **GSAP ScrollTrigger** | Pinning, scrubbing, velocity tracking, and trigger callbacks bound to viewport scroll progress. |
| **Styling & Design System** | **Tailwind CSS 3.4.1** | Custom design tokens, responsive typography scaling, and utility-driven flex/grid scaffolding. |
| **Typography Engine** | **OpenType SS01 Alternates** | Custom font pairings (`Zentry`, `Circular Web`, `Robert Medium`, `General Sans`) with stylistic alternate ligatures enabled. |
| **Media Server** | **Node.js Native HTTP / FS** | RFC 7233 compliant media streaming server with partial byte-range (`HTTP 206`) parsing and MIME resolution. |
| **Media Encoding** | **FFmpeg 9.0.2** | Lossless trimming, faststart MP4 container remuxing (`-movflags +faststart`), and WebP lossless compression. |
| **Audio Processing** | **AAC / MP3 Stereo** | Atmospheric Zaun soundscape audio loop synchronized with browser play states. |
| **Reverse-Engineering** | **Chrome DevTools Protocol (CDP)** | Deep AST bundle inspection, dynamic runtime network interception, and asset extraction. |

---

## Motion Physics & Clip-Path Geometry

### Non-Linear Scroll-Linked Polygon Scrub
The hero video frame morphs dynamically as the user scrolls downwards toward the About section:

```css
/* Initial scrub state */
clip-path: polygon(14% 0, 72% 0, 88% 90%, 0 95%);
border-radius: 0% 0% 40% 10%;

/* Fully expanded state */
clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
border-radius: 0% 0% 0% 0%;
```

### The Liquid Shimmer SVG Filter Matrix
The Story section achieves its fluid, organic border boundaries through mathematical alpha thresholding:

$$\begin{bmatrix} R' \\ G' \\ B' \\ A' \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 19 & -9 \end{bmatrix} \begin{bmatrix} R \\ G \\ B \\ A \end{bmatrix}$$

```html
<svg class="invisible absolute size-0" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="flt_tag">
      <!-- 1. Diffuse boundary by 8px standard deviation -->
      <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
      
      <!-- 2. Sharpen alpha threshold to create liquid surface tension -->
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 19 -9"
        result="flt_tag"
      />
      
      <!-- 3. Composite original graphic over the filtered gooey meniscus -->
      <feComposite in="SourceGraphic" in2="flt_tag" operator="atop" />
    </filter>
  </defs>
</svg>
```

### 3D Perspective Tilt & Dynamic Spotlight Tracking
Each Bento grid feature card tracks mouse coordinates relative to its bounding rectangle, applying real-time 3D rotation and a radial flashlight spotlight:

$$\text{tilt}_X = (\text{relative}_Y - 0.5) \times 5^\circ$$
$$\text{tilt}_Y = (\text{relative}_X - 0.5) \times -5^\circ$$

```javascript
const handleMouseMove = (event) => {
  const { left, top, width, height } = itemRef.current.getBoundingClientRect();
  const relativeX = (event.clientX - left) / width;
  const relativeY = (event.clientY - top) / height;

  const tiltX = (relativeY - 0.5) * 5;
  const tiltY = (relativeX - 0.5) * -5;

  setTransformStyle(`perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98, 0.98, 0.98)`);
};
```

---

## Curated Arcane Anime Asset Pipeline

All media assets are 100% authentic animation from Fortiche Productions, encoded specifically for low latency and smooth web playback:

| Asset | Format | Resolution | Source Scene & Character | Narrative Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `hero-1.mp4` | MP4 (H.264) | 1080p | **Jinx & Vi Tragic Edit** (80.0s) | Main hero backdrop with 4s fade-in & 1m20s auto-advance. |
| `hero-2.mp4` | MP4 (H.264) | 720p FastStart | **Jinx Blue Flare Reunion** (9.0s) | Bridge flare lighting scene with pink neon graffiti overlays. |
| `hero-3.mp4` | MP4 (H.264) | 720p FastStart | **Vi The Pit Fighter** (9.0s) | Vi brawling in the underground fight arena. |
| `hero-4.mp4` | MP4 (H.264) | 720p FastStart | **Jinx Shimmer Awakened** (9.5s) | Explosive anime climax with glowing violet Shimmer eyes. |
| `feature-1.mp4` | MP4 (H.264) | 720p FastStart | **Fishbones Weaponry** (8.5s) | Jinx unleashing chaos with heavy rocket ordnance. |
| `feature-2.mp4` | MP4 (H.264) | 720p FastStart | **Atlas Gauntlets Charge** (8.0s) | Vi powering up her hydraulic steam gauntlets. |
| `feature-3.mp4` | MP4 (H.264) | 720p FastStart | **Ekko & The Firelights** (8.0s) | Ekko gliding across the Zaun canopy on his hoverboard. |
| `feature-4.mp4` | MP4 (H.264) | 720p FastStart | **Caitlyn's Sniper Squad** (7.5s) | Caitlyn commanding precision Hextech enforcers. |
| `feature-5.mp4` | MP4 (H.264) | 720p FastStart | **Undercity Skyline** (9.0s) | Atmospheric pan over the neon-drenched depths of Zaun. |
| `hero-center.png` | PNG | 736 × 903 | **Lighter Flame Portrait** | Center interactive 3D portal with hover physics. |
| `about.webp` | WebP | 736 × 903 | **Jinx & Vi Holding Flame** | Scroll-expanding central mask image in About section. |
| `entrance.webp` | WebP | 1920 × 1080 | **The Undercity Gates** | 3D interactive floating frame in Story section. |
| `contact-1/2.webp`| WebP | 1080p Cards | **Ekko & Caitlyn** | Polygonal diagonal shards framing the Contact CTA. |
| `loop.mp3` | MP3 Stereo | 320 kbps | **Arcane Ambient Theme** | Ambient audio track with interactive mute/unmute control. |

---

## Architectural Breakdown

```
arcane-experience/
├── zentry-local/                         # Production application
│   ├── assets/
│   │   ├── index-Bw72vWX5.js             # Bundled React + GSAP application logic
│   │   └── index-9nhqMKDh.css            # Compiled Tailwind utility classes
│   ├── audio/
│   │   ├── hero-audio.mp3                # Extracted soundtrack from main hero edit
│   │   └── loop.mp3                      # Ambient audio loop
│   ├── fonts/
│   │   ├── circularweb-book.woff2        # Body typography
│   │   ├── general.woff2                 # UI button & metadata typography
│   │   ├── robert-medium.woff2           # Subheading typography
│   │   ├── robert-regular.woff2          # Narrative text typography
│   │   └── zentry-regular.woff2          # Signature display display font
│   ├── img/
│   │   ├── about.webp                    # Scroll-linked expanding keyframe image
│   │   ├── contact-1.webp                # Ekko Firelight shard card
│   │   ├── contact-2.webp                # Caitlyn Kiramman shard card
│   │   ├── entrance.webp                 # Story portal keyframe artwork
│   │   ├── hero-center.png               # Center interactive lighter flame portrait
│   │   ├── jinx-vi-flame.png             # Master raw copy of lighter flame artwork
│   │   ├── logo.png                      # Arcane gold title insignia
│   │   └── swordman.webp                 # Atmospheric splash art
│   ├── videos/                           # 9 optimized H.264 / AAC anime video loops
│   ├── index.html                        # HTML5 shell containing SVG filter definitions
│   └── server.js                         # RFC 7233 HTTP 206 video range streaming server
├── zentry-analysis/                      # Reverse-engineering decompiler output
│   ├── app_components_decompiled.js      # Cleaned component definitions
│   ├── formatted_app.js                  # Formatted source bundle
│   ├── index.css                         # Raw extracted styling rules
│   └── index.js                          # Decompiled script index
├── README.md                             # Comprehensive project documentation
└── .gitignore                            # Clean repository ignore patterns
```

---

## HTTP 206 Video Streaming Engine

Standard static web servers often deliver media files with basic `HTTP 200` responses, which forces browsers to download the entire video sequentially before random access is possible.

To solve this, `zentry-local/server.js` implements an **RFC 7233 Partial Content streaming engine**:

```javascript
// zentry-local/server.js (RFC 7233 Range Implementation)
const range = req.headers.range;
if (range) {
  const parts = range.replace(/bytes=/, '').split('-');
  const start = parseInt(parts[0], 10);
  const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

  const chunkSize = end - start + 1;
  res.writeHead(206, {
    'Content-Range': `bytes ${start}-${end}/${totalSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': mimeType
  });

  const stream = fs.createReadStream(filePath, { start, end });
  stream.pipe(res);
}
```

### Why This Matters:
1. **Immediate Playback:** Videos start playing within milliseconds.
2. **Smooth Scrubbing:** When clicking the center card or auto-advancing, the browser requests only the exact byte range needed.
3. **Bandwidth Optimization:** Unbuffered portions of the video are never loaded until requested.

---

## Interactive Controls & User Guide

| Interaction | Trigger | Result |
| :--- | :--- | :--- |
| **Hero Center Hover** | Move cursor over center tile | 3D perspective tilt shifts card toward mouse; flame portrait reveals smoothly. |
| **Hero Center Click** | Click center tile | Triggers zoom-out GSAP scale animation and advances to the next Arcane clip. |
| **Director Auto-Advance**| Wait 1m 20s | Hero video automatically pauses and smoothly scrolls viewport to `#about`. |
| **Bento Flashlight** | Move mouse over feature cards | Dynamic spotlight gradient follows cursor across card face with 3D tilt. |
| **Story Gooey Parallax** | Move mouse over Story portal | 3D rotational tilt with fluid meniscus distortion via SVG `#flt_tag` filter. |
| **Kinetic Button Hover**| Hover any pill button | Dual-track text rolls upward with $12^\circ$ skew transition. |
| **Audio Toggle** | Click sound indicator (top right) | Toggles ambient soundscape loop with pulsing equalizer bar indicator. |

---

## Quick Start & Deployment

### 1. Vercel Cloud Deployment (Zero Configuration)
The repository is fully configured for automated Vercel deployment with zero build steps needed:
1. Import the repository on [Vercel](https://vercel.com/new).
2. Leave all settings at default (**Root Directory:** `./`, **Framework Preset:** `Other`).
3. Click **Deploy**. Vercel will instantly serve the experience globally with edge byte-range video streaming enabled via `vercel.json`.

---

### 2. Running Locally

#### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- Modern web browser with WebGL and HTML5 video support (Chrome, Edge, Firefox, Brave, Safari)

#### Installation & Launch

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Thabisomaqhawengwenya/arcane.git
   cd arcane
   ```

2. **Start the Streaming Server:**
   ```bash
   npm start
   # or: node server.js
   ```

3. **Open the Experience:**
   Navigate to:
   ```
   http://localhost:5173
   ```

---

## Credits & Attribution

- **Lore & Intellectual Property:** *Arcane* and *League of Legends* characters, universe, and imagery are trademarks and copyright of **Riot Games** and **Fortiche Productions**.
- **Creative Inspiration:** Visual layout, kinetic motion patterns, and interaction mechanics reverse-engineered as a creative study and technical tribute from the award-winning **Zentry** digital experience.
- **Crafted For:** **Mr Q (Maqhawe T Ngwenya)** by Antigravity.
