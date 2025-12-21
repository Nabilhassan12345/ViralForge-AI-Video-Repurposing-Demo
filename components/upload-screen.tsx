"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Upload, Link, Play, X, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ViralForgeLogo, AnimatedBackground, PrimaryButton, PlatformPill } from "./ui/shared"
import type { Platform } from "@/app/page"
import { VIDEO_EMBEDS } from "@/app/page"

const hookStyles = ["Curiosity", "Shock", "Story", "Educational"]
const captionStyles = ["Bold", "Clean", "Karaoke"]
const framingStyles = ["Auto-emphasis", "Face zoom", "Center"]
const pacingStyles = ["Fast", "Balanced", "Smooth"]

const allPlatforms: Platform[] = ["youtube", "linkedin", "reels", "shorts", "tiktok", "x", "facebook"]
const demoPlatforms: Platform[] = ["linkedin", "x", "facebook", "youtube"]

interface UploadScreenProps {
  onStartProcessing: (selectedPlatforms: Platform[]) => void
}

// Responsive video embed component - with watermark hiding (top-left logo)
function VideoEmbed({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={{ paddingBottom: "56.25%" }}>
      {/* Scale iframe larger and shift DOWN+RIGHT to hide top-left Streamable watermark */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={src}
          className="absolute w-[120%] h-[120%]"
          style={{
            border: "none",
            top: "-10%",
            left: "-5%",
            transform: "scale(1.1)",
            transformOrigin: "bottom right"
          }}
          allowFullScreen
          allow="autoplay"
        />
      </div>
      {/* Overlay gradient on top-left to hide any remaining branding */}
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-zinc-900 via-zinc-900/50 to-transparent pointer-events-none" />
    </div>
  )
}

export function UploadScreen({ onStartProcessing }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["tiktok", "reels", "shorts"])
  const [selectedHook, setSelectedHook] = useState("Curiosity")
  const [selectedCaption, setSelectedCaption] = useState("Bold")
  const [selectedFraming, setSelectedFraming] = useState("Auto-emphasis")
  const [selectedPacing, setSelectedPacing] = useState("Fast")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true)
    } else if (e.type === "dragleave") {
      setIsDragging(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) => {
      if (prev.includes(platform)) {
        return prev.length > 1 ? prev.filter((p) => p !== platform) : prev
      }
      return [...prev, platform]
    })
  }

  const removeFile = () => {
    setFile(null)
  }

  const handleGenerate = () => {
    // Demo mode - no actual upload, just transition to processing
    onStartProcessing(selectedPlatforms)
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <ViralForgeLogo />
        </div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance">
            Repurpose once. Go viral everywhere.
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto text-pretty">
            Instantly turn long videos into viral shorts for TikTok, Instagram Reels, and YouTube Shorts.
          </p>
        </motion.div>

        {/* Example Video Preview - Streamable Embed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <div className="relative mx-auto max-w-2xl">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 shadow-2xl">
              <VideoEmbed src={VIDEO_EMBEDS.raw} />
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-medium z-10">
                Example input video
              </div>
            </div>
          </div>
        </motion.div>

        {/* URL Input Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-4 max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/60 rounded-2xl p-2 shadow-xl shadow-violet-500/5">
            <div className="flex items-center gap-3 flex-1 px-4">
              <Link className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                placeholder="Drop a long video or paste a link..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-sm py-2"
              />
            </div>
            <PrimaryButton onClick={handleGenerate}>
              Get clips
            </PrimaryButton>
          </div>
          <p className="text-center text-zinc-500 text-xs mt-2">
            <span className="text-violet-400 font-medium">Wiro</span> generates the 2–3s hook visual for maximum
            retention.
          </p>
        </motion.div>

        {/* Compact File Upload */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className={`relative border-2 border-dashed rounded-2xl p-3 transition-all duration-300 mb-5 max-w-sm mx-auto ${isDragging
            ? "border-violet-500 bg-violet-500/10 scale-[1.02]"
            : "border-zinc-800/80 bg-zinc-900/30 hover:border-zinc-700 hover:bg-zinc-900/50"
            }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {!file && (
            <input
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              ref={fileInputRef}
            />
          )}
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                    <Play className="w-5 h-5 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium truncate max-w-[150px]">{file.name}</p>
                    <p className="text-zinc-500 text-xs">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={removeFile}
                  className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-red-500/20 transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3 py-1"
              >
                <Upload className="w-5 h-5 text-zinc-500" />
                <span className="text-zinc-500 text-sm">or drag & drop a file</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Virality Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-5 mb-5 max-w-3xl mx-auto shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Zap className="w-4 h-4 text-violet-400" />
            <h3 className="text-white font-semibold text-sm">Virality Settings</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Hook Style */}
            <div>
              <p className="text-zinc-500 text-xs mb-2">Hook Style</p>
              <div className="flex flex-wrap gap-1.5">
                {hookStyles.map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedHook(style)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedHook === style
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                      }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Captions */}
            <div>
              <p className="text-zinc-500 text-xs mb-2">Captions</p>
              <div className="flex flex-wrap gap-1.5">
                {captionStyles.map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCaption(style)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedCaption === style
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                      }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Framing */}
            <div>
              <p className="text-zinc-500 text-xs mb-2">Framing</p>
              <div className="flex flex-wrap gap-1.5">
                {framingStyles.map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedFraming(style)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedFraming === style
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                      }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Pacing */}
            <div>
              <p className="text-zinc-500 text-xs mb-2">Pacing</p>
              <div className="flex flex-wrap gap-1.5">
                {pacingStyles.map((style) => (
                  <motion.button
                    key={style}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPacing(style)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${selectedPacing === style
                      ? "bg-violet-500/20 text-violet-300 border border-violet-500/30"
                      : "bg-zinc-800/80 text-zinc-400 border border-zinc-700/50 hover:border-zinc-600"
                      }`}
                  >
                    {style}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Platform Output Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-5 max-w-4xl mx-auto"
        >
          <p className="text-zinc-400 text-sm mb-3 text-center">Platform Output</p>
          <div className="flex flex-wrap justify-center gap-2">
            {allPlatforms.map((platform) => (
              <PlatformPill
                key={platform}
                platform={platform}
                selected={selectedPlatforms.includes(platform)}
                onClick={() => togglePlatform(platform)}
                showDemo={demoPlatforms.includes(platform)}
              />
            ))}
          </div>
        </motion.div>

        {/* Generate CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-center mb-8"
        >
          <PrimaryButton onClick={handleGenerate} className="px-10 py-4 text-base">
            Generate Viral Versions
          </PrimaryButton>
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
            <span>Powered by</span>
            <span className="text-violet-400 font-medium">Wiro AI</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
