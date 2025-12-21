
# ViralForge Frontend (Next.js)

Modern UI for the ViralForge AI Video Repurposing platform. Upload long-form videos and generate platform-optimized short clips for TikTok, Reels, Shorts, and more.

## Features
- 🎬 Upload long-form video and select target platforms
- ⚡ Real-time processing status (SSE)
- 🪄 AI-powered hooks and captions
- 📱 Download platform-specific clips

## Getting Started (Local Dev)

1. **Install dependencies:**
	```bash
	cd frontend
	npm install
	```
2. **Configure environment:**
	```bash
	cp .env.local.example .env.local
	# Edit .env.local if needed (set NEXT_PUBLIC_API_BASE_URL)
	```
3. **Start the dev server:**
	```bash
	npm run dev
	```
	App runs at http://localhost:3000

4. **Backend:**
	- Make sure the ViralForge FastAPI backend is running (see ../README.md for backend setup)
	- Default API URL: http://localhost:8000

## Usage

1. Upload a video and select platforms
2. Watch real-time progress
3. Download your generated clips!

## Environment Variables

- `NEXT_PUBLIC_API_BASE_URL` — Backend API URL (default: http://localhost:8000)

## Project Structure

- `app/` — Next.js app directory
- `components/` — React UI components
- `lib/` — API utilities

## License

MIT
