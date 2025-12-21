"use client"

import { useState } from "react"
import { Download, Play, Sparkles, RotateCcw, Check, ExternalLink, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Platform } from "@/app/page"
import { VIDEO_EMBEDS } from "@/app/page"
import { ViralForgeLogo, AnimatedBackground, PrimaryButton, PlatformIcon } from "./ui/shared"

// Demo clip metadata
const clipMeta: Record<string, { duration: string; score: number }> = {
  tiktok: { duration: "0:32", score: 97 },
  reels: { duration: "0:45", score: 99 },
  shorts: { duration: "0:58", score: 95 },
}

interface ResultsScreenProps {
  selectedPlatforms: Platform[]
  onGenerateAnother: () => void
}

// Responsive video embed for 16:9 - with watermark hiding (top-left logo)
function VideoEmbed16x9({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`} style={{ paddingBottom: "56.25%" }}>
      {/* Scale iframe larger and shift to hide top-left Streamable watermark */}
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
      <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-zinc-900 via-zinc-900/50 to-transparent pointer-events-none rounded-tl-xl" />
    </div>
  )
}

// Responsive video embed for 9:16 (vertical) - with watermark hiding (top-left logo)
function VideoEmbed9x16({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-zinc-800 ${className}`} style={{ paddingBottom: "177.78%" }}>
      {/* Scale iframe larger and shift to hide top-left Streamable watermark */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src={src}
          className="absolute w-[115%] h-[115%]"
          style={{
            border: "none",
            top: "-8%",
            left: "-5%",
            transform: "scale(1.08)",
            transformOrigin: "bottom right"
          }}
          allowFullScreen
          allow="autoplay"
        />
      </div>
      {/* Overlay gradient on top-left to hide any remaining branding */}
      <div className="absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-zinc-800 via-zinc-800/50 to-transparent pointer-events-none rounded-tl-xl" />
    </div>
  )
}

// Preview modal component
function PreviewModal({
  isOpen,
  onClose,
  videoUrl,
  platform
}: {
  isOpen: boolean
  onClose: () => void
  videoUrl: string | null
  platform: string
}) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-zinc-900 rounded-2xl p-4 max-w-md w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold capitalize">{platform} Preview</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {videoUrl && <VideoEmbed9x16 src={videoUrl} />}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// Clip card component
function ClipCard({
  platform,
  videoUrl,
  duration,
  score,
  isEmpty,
  onPreview,
  onDownload,
}: {
  platform: Platform
  videoUrl: string | null
  duration: string
  score: number
  isEmpty?: boolean
  onPreview: () => void
  onDownload: () => void
}) {
  const platformLabels: Record<string, string> = {
    tiktok: "TikTok",
    reels: "Instagram Reels",
    shorts: "YouTube Shorts",
    youtube: "YouTube",
    linkedin: "LinkedIn",
    x: "X",
    facebook: "Facebook",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-zinc-900/80 backdrop-blur-xl border rounded-2xl overflow-hidden ${isEmpty ? "border-zinc-700/50 opacity-60" : "border-zinc-800/80"
        }`}
    >
      {/* Video or Placeholder */}
      <div className="relative">
        {/* Platform badge */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${platform === "tiktok" ? "bg-black" :
            platform === "reels" ? "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400" :
              platform === "shorts" ? "bg-red-600" :
                "bg-zinc-700"
            }`}>
            <PlatformIcon platform={platform} className="w-5 h-5 text-white" />
          </div>
        </div>

        {isEmpty ? (
          <div className="bg-zinc-800/50 flex items-center justify-center" style={{ aspectRatio: "9/16" }}>
            <div className="text-center p-4">
              <div className="w-16 h-16 rounded-full bg-zinc-700/50 flex items-center justify-center mx-auto mb-3">
                <Play className="w-8 h-8 text-zinc-500" />
              </div>
              <p className="text-zinc-500 text-sm font-medium">Not generated</p>
              <p className="text-zinc-600 text-xs">(demo)</p>
            </div>
          </div>
        ) : videoUrl ? (
          <VideoEmbed9x16 src={videoUrl} />
        ) : null}

        {/* Score & Duration badges */}
        {!isEmpty && (
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center z-10">
            <span className="bg-emerald-500/90 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-bold">
              SCORE {score}
            </span>
            <span className="bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
              {duration}
            </span>
          </div>
        )}
      </div>

      {/* Info & Actions */}
      <div className="p-4">
        <h3 className="text-white font-medium text-center mb-3">
          {platformLabels[platform]}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={onPreview}
            disabled={isEmpty}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isEmpty
              ? "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
              }`}
          >
            <Play className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={onDownload}
            disabled={isEmpty}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isEmpty
              ? "bg-zinc-800/50 text-zinc-600 cursor-not-allowed"
              : "bg-violet-600 text-white hover:bg-violet-500"
              }`}
          >
            <Download className="w-4 h-4" />
            MP4
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export function ResultsScreen({ selectedPlatforms, onGenerateAnother }: ResultsScreenProps) {
  const [previewModal, setPreviewModal] = useState<{ isOpen: boolean; url: string | null; platform: string }>({
    isOpen: false,
    url: null,
    platform: "",
  })

  const getVideoUrl = (platform: Platform): string | null => {
    if (platform === "tiktok") return VIDEO_EMBEDS.tiktok
    if (platform === "shorts") return VIDEO_EMBEDS.shorts
    if (platform === "reels") return VIDEO_EMBEDS.reels // null
    return null
  }

  const getStreamablePageUrl = (platform: Platform): string | null => {
    // Convert embed URLs to page URLs for download
    if (platform === "tiktok") return "https://streamable.com/ew9rri"
    if (platform === "shorts") return "https://streamable.com/wp4n8i"
    if (platform === "reels") return null
    return null
  }

  const handlePreview = (platform: Platform) => {
    const url = getVideoUrl(platform)
    if (url) {
      setPreviewModal({ isOpen: true, url, platform })
    }
  }

  const handleDownload = (platform: Platform) => {
    const pageUrl = getStreamablePageUrl(platform)
    if (pageUrl) {
      window.open(pageUrl, "_blank")
    }
  }

  const handleDownloadAll = () => {
    // Open Streamable pages for all available clips
    const urls = [
      "https://streamable.com/ew9rri", // TikTok
      "https://streamable.com/wp4n8i", // Shorts
    ]
    urls.forEach((url, i) => {
      setTimeout(() => window.open(url, "_blank"), i * 300)
    })
  }

  // Count generated clips (TikTok + Shorts = 2, not 3 since Reels is empty for demo)
  const generatedCount = 2

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 px-4 py-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <ViralForgeLogo />
        </div>

        {/* Success Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 rounded-full">
            <Check className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 font-medium text-sm">
              {generatedCount} clips generated successfully
            </span>
          </div>
        </motion.div>

        {/* Wiro AI Hook Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <h2 className="text-white font-semibold">Wiro AI Hook Showcase</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Original */}
            <div>
              <p className="text-zinc-400 text-sm mb-2">Original opening</p>
              <div className="bg-zinc-800/50 rounded-xl overflow-hidden">
                <VideoEmbed16x9 src={VIDEO_EMBEDS.raw} />
              </div>
              <p className="text-zinc-500 text-xs mt-2">0:00 - 0:05</p>
            </div>

            {/* Wiro-enhanced */}
            <div>
              <p className="text-zinc-400 text-sm mb-2">Wiro-enhanced hook</p>
              <div className="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-xl overflow-hidden border border-violet-500/20">
                <VideoEmbed16x9 src={VIDEO_EMBEDS.shorts} />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-violet-400 text-xs">✨ AI Hook, 3s</span>
              </div>
            </div>
          </div>

          {/* Prompt info */}
          <div className="bg-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Prompt used:</p>
            <p className="text-zinc-300 text-sm italic mb-3">
              "Create an attention-grabbing hook that poses a provocative question and promises value within the first 3 seconds."
            </p>
            <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
              <span>Model: <span className="text-zinc-300">Wiro v1</span></span>
              <span>Time: <span className="text-zinc-300">2.3s</span></span>
              <span>Hook length: <span className="text-zinc-300">3s</span></span>
            </div>
            <button className="text-violet-400 text-xs mt-2 hover:underline">
              ✎ Edit prompt
            </button>
          </div>
        </motion.div>

        {/* Your Generated Clips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-white font-semibold mb-4">Your Generated Clips</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* TikTok */}
            <ClipCard
              platform="tiktok"
              videoUrl={VIDEO_EMBEDS.tiktok}
              duration={clipMeta.tiktok.duration}
              score={clipMeta.tiktok.score}
              onPreview={() => handlePreview("tiktok")}
              onDownload={() => handleDownload("tiktok")}
            />

            {/* Instagram Reels - Empty placeholder */}
            <ClipCard
              platform="reels"
              videoUrl={null}
              duration={clipMeta.reels.duration}
              score={clipMeta.reels.score}
              isEmpty={true}
              onPreview={() => { }}
              onDownload={() => { }}
            />

            {/* YouTube Shorts */}
            <ClipCard
              platform="shorts"
              videoUrl={VIDEO_EMBEDS.shorts}
              duration={clipMeta.shorts.duration}
              score={clipMeta.shorts.score}
              onPreview={() => handlePreview("shorts")}
              onDownload={() => handleDownload("shorts")}
            />
          </div>

          {/* Demo label */}
          <p className="text-zinc-500 text-xs text-center mt-4">
            Demo outputs (pre-rendered)
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <PrimaryButton onClick={handleDownloadAll} className="px-6">
            <Download className="w-4 h-4 mr-2" />
            Download All ({generatedCount})
          </PrimaryButton>
          <button
            onClick={onGenerateAnother}
            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Generate Another
          </button>
        </motion.div>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={previewModal.isOpen}
        onClose={() => setPreviewModal({ isOpen: false, url: null, platform: "" })}
        videoUrl={previewModal.url}
        platform={previewModal.platform}
      />
    </div>
  )
}
