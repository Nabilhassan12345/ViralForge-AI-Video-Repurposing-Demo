# ViralForge - AI Video Repurposing Demo

<div align="center">

![ViralForge](https://img.shields.io/badge/ViralForge-AI%20Video%20Tool-7c3aed?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38bdf8?style=for-the-badge&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-ff69b4?style=for-the-badge)

**Transform long-form videos into viral short-form content for TikTok, Instagram Reels, and YouTube Shorts**

[Live Demo](#demo) • [Features](#features) • [Getting Started](#getting-started) • [Tech Stack](#tech-stack)

</div>

---

## 🎬 Overview

ViralForge is a polished UI demo showcasing an AI-powered video repurposing platform. This frontend demonstrates the user experience of transforming long-form content into platform-optimized short clips with AI-generated hooks, smart captions, and automatic formatting.

> **Note:** This is a **frontend demo** with pre-rendered video outputs from Streamable. No backend required.

## ✨ Features

### Three-Screen Demo Flow

1. **🏠 Landing Page**
   - Video upload interface with drag & drop
   - Virality Settings (Hook style, Captions, Framing, Pacing)
   - Platform selection toggles (TikTok, Reels, Shorts, YouTube, etc.)

2. **⚡ Processing Screen**
   - Animated progress bar (0% → 100%)
   - 4-stage pipeline visualization (Analyzer → Hook → Platform Cuts → Renderer)
   - Real-time log messages with typing animation

3. **🎉 Results Page**
   - "Wiro AI Hook Showcase" - side-by-side original vs enhanced comparison
   - Generated clip cards with scores and durations
   - Preview modal and download buttons

### UI Highlights

- 🌙 Dark theme with purple accent colors
- ✨ Smooth Framer Motion animations
- 📱 Fully responsive design
- 🎨 Modern glassmorphism effects
- 🎥 Embedded video previews

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Nabilhassan12345/v0-opus-clip-ui-recreation.git

# Navigate to the project
cd v0-opus-clip-ui-recreation

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Flow

1. Click **"Generate Viral Versions"** on the landing page
2. Watch the ~8 second processing animation
3. Explore the results with embedded video previews
4. Click **"Generate Another"** to restart

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TailwindCSS 4** | Utility-first styling |
| **Framer Motion** | Smooth animations & transitions |
| **Lucide React** | Icon library |
| **Radix UI** | Accessible component primitives |

## 📁 Project Structure

```
├── app/
│   ├── page.tsx          # Main app with screen state management
│   ├── layout.tsx        # Root layout with fonts
│   └── globals.css       # Global styles & Tailwind config
├── components/
│   ├── upload-screen.tsx      # Landing page UI
│   ├── processing-screen.tsx  # Progress simulation
│   ├── results-screen.tsx     # Final results display
│   └── ui/
│       └── shared.tsx         # Reusable components (Logo, Buttons, etc.)
├── lib/
│   └── utils.ts          # Utility functions
└── public/
    └── *.jpg             # Demo images
```

## 🎥 Demo Videos

The demo uses pre-rendered videos hosted on Streamable:

- **Raw Input:** Example MrBeast-style content
- **TikTok Output:** Optimized vertical clip with hooks
- **YouTube Shorts:** Platform-formatted short

## 🎨 Customization

### Colors

The main accent color is purple (`violet-500` / `#7c3aed`). Modify in `globals.css` or component files.

### Video Embeds

Update the `VIDEO_EMBEDS` object in `app/page.tsx`:

```typescript
export const VIDEO_EMBEDS = {
  raw: "https://streamable.com/e/your-video",
  tiktok: "https://streamable.com/e/your-tiktok",
  shorts: "https://streamable.com/e/your-shorts",
  reels: null // or your reels URL
}
```

## 📝 License

MIT License - feel free to use this for your own projects!

---

<div align="center">

**Built with ❤️ using Next.js & TailwindCSS**

</div>
