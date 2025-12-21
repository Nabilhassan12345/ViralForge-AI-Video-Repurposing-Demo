"use client"
import { useState } from "react"
import { Download, Play, Sparkles, RotateCcw, Check, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Platform } from "@/app/page"
import { ViralForgeLogo, AnimatedBackground, PrimaryButton, PlatformBadge, platformStyles } from "./ui/shared"

const platformConfig: Record<Platform, { duration: string; score: number }> = {
  tiktok: { duration: "0:32", score: 97 },
  reels: { duration: "0:45", score: 99 },
  shorts: { duration: "0:58", score: 95 },
  youtube: { duration: "5:32", score: 92 },
  linkedin: { duration: "2:15", score: 88 },
  x: { duration: "0:28", score: 91 },
  facebook: { duration: "1:15", score: 89 },
}

const defaultDemoClips: Platform[] = ["tiktok", "reels", "shorts"]

interface ResultsScreenProps {
  selectedPlatforms: Platform[]
  onGenerateAnother: () => void
}

export function ResultsScreen({ selectedPlatforms, onGenerateAnother }: ResultsScreenProps) {
  const [downloadedPlatforms, setDownloadedPlatforms] = useState<Platform[]>([])
  const [playingPreview, setPlayingPreview] = useState<Platform | null>(null)
  const [hoveredCard, setHoveredCard] = useState<Platform | null>(null)
  const [downloadingAll, setDownloadingAll] = useState(false)

  const platforms = selectedPlatforms && selectedPlatforms.length > 0 ? selectedPlatforms : defaultDemoClips
  const clipCount = platforms.length

  const handleDownload = (platform: Platform) => {
    setDownloadedPlatforms([...downloadedPlatforms, platform])
    setTimeout(() => {
      setDownloadedPlatforms((prev) => prev.filter((p) => p !== platform))
    }, 2000)
  }

  const handlePreview = (platform: Platform) => {
    setPlayingPreview(platform)
    setTimeout(() => {
      setPlayingPreview(null)
    }, 3000)
  }

  const handleDownloadAll = () => {
    setDownloadingAll(true)
    setTimeout(() => {
      setDownloadingAll(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="w-full max-w-5xl mx-auto relative z-10 px-4 py-8">
        {/* Logo */}
        <div className="mb-8">
          <ViralForgeLogo />
        </div>

        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 px-5 py-2.5 rounded-2xl mb-4 shadow-lg shadow-emerald-500/10"
          >
            <Check className="w-5 h-5" />
            <span className="text-sm font-semibold">{clipCount} clips generated successfully</span>
          </motion.div>
        </motion.div>

        {/* Wiro AI Hook Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-zinc-900/70 backdrop-blur-xl border border-zinc-800/80 rounded-2xl p-6 mb-8 shadow-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-5 h-5 text-violet-400" />
            </motion.div>
            <h3 className="text-white font-semibold">Wiro AI Hook Showcase</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {/* Before */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <p className="text-zinc-500 text-sm mb-2">Original opening</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-video bg-zinc-800/80 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden border border-zinc-700/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/30 to-zinc-900/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-zinc-700/60 flex items-center justify-center">
                    <Play className="w-7 h-7 text-zinc-400" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-zinc-400 text-xs px-2 py-1 rounded-lg">
                  0:00 - 0:05
                </div>
              </motion.div>
            </motion.div>

            {/* After */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <p className="text-zinc-500 text-sm mb-2">Wiro-enhanced hook</p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="aspect-video bg-gradient-to-br from-violet-900/40 to-fuchsia-900/40 border border-violet-500/30 rounded-2xl flex items-center justify-center cursor-pointer group relative overflow-hidden"
              >
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-violet-500/30 flex items-center justify-center">
                    <Play className="w-7 h-7 text-violet-300" />
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 bg-violet-900/60 backdrop-blur-sm text-violet-300 text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI Hook: 3s
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Prompt Used */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-800/50 rounded-2xl p-4 hover:bg-zinc-800/70 transition-colors cursor-pointer border border-zinc-700/30"
          >
            <p className="text-zinc-500 text-xs mb-1">Prompt used:</p>
            <p className="text-zinc-300 text-sm italic mb-2">
              &ldquo;Create an attention-grabbing hook that poses a provocative question and promises value within the
              first 3 seconds.&rdquo;
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>
                Model: <span className="text-zinc-400">Wiro v1</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span>
                Time: <span className="text-zinc-400">2.3s</span>
              </span>
              <span className="text-zinc-700">•</span>
              <span>
                Hook length: <span className="text-zinc-400">3s</span>
              </span>
            </div>
            <button className="mt-2 text-violet-400 text-xs flex items-center gap-1 hover:text-violet-300">
              <ExternalLink className="w-3 h-3" />
              Edit prompt
            </button>
          </motion.div>
        </motion.div>

        {/* Output Cards */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white font-semibold text-lg mb-4"
        >
          Your Generated Clips
        </motion.h3>

        <div className="grid md:grid-cols-3 gap-6 mb-8 pt-8">
          {platforms.map((platform, index) => {
            const config = platformConfig[platform]
            const style = platformStyles[platform]
            if (!config || !style) return null

            return (
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onHoverStart={() => setHoveredCard(platform)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative pt-7"
              >
                {/* Floating Platform Badge */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
                  <PlatformBadge platform={platform} size="lg" />
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all group shadow-xl"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[9/16] bg-zinc-800 overflow-hidden">
                    <motion.img
                      animate={{ scale: hoveredCard === platform ? 1.05 : 1 }}
                      transition={{ duration: 0.3 }}
                      src="/vertical-video-clip-thumbnail-with-person-speaking.jpg"
                      alt={`${style.name} clip`}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Play Overlay */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === platform ? 1 : 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                      onClick={() => handlePreview(platform)}
                    >
                      <motion.div
                        animate={playingPreview === platform ? { scale: [1, 1.2, 1] } : {}}
                        transition={{
                          duration: 0.5,
                          repeat: playingPreview === platform ? Number.POSITIVE_INFINITY : 0,
                        }}
                        className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <Play className="w-8 h-8 text-white fill-white" />
                      </motion.div>
                    </motion.div>

                    {/* Bottom badges row */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="bg-emerald-500/90 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
                        <span className="text-emerald-200 text-[10px]">SCORE</span>
                        <span className="text-sm">{config.score}</span>
                      </div>
                      <div className="bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-2.5 py-1.5 rounded-lg shadow-lg">
                        {config.duration}
                      </div>
                    </div>

                    {/* Preview playing indicator */}
                    <AnimatePresence>
                      {playingPreview === platform && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/60"
                        >
                          <div className="flex items-center gap-1">
                            {[0, 1, 2, 3].map((i) => (
                              <motion.div
                                key={i}
                                animate={{ scaleY: [1, 2, 1] }}
                                transition={{ duration: 0.4, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                                className="w-1 h-4 bg-white rounded-full"
                              />
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4">
                    <p className="text-white font-medium mb-3 text-center">{style.name}</p>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePreview(platform)}
                        className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium py-2.5 px-3 rounded-xl transition-colors border border-zinc-700/50"
                      >
                        <Play className="w-4 h-4" />
                        Preview
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleDownload(platform)}
                        disabled={downloadedPlatforms.includes(platform)}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-medium py-2.5 px-3 rounded-xl transition-colors disabled:opacity-70 shadow-lg shadow-violet-500/20"
                      >
                        {downloadedPlatforms.includes(platform) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Done
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4" />
                            MP4
                          </>
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <PrimaryButton onClick={handleDownloadAll} disabled={downloadingAll} className="px-8">
            {downloadingAll ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Downloaded!
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download All ({clipCount})
              </>
            )}
          </PrimaryButton>
          <PrimaryButton onClick={onGenerateAnother} variant="secondary" className="px-8">
            <RotateCcw className="w-4 h-4 mr-2" />
            Generate Another
          </PrimaryButton>
        </motion.div>
      </div>
    </div>
  )
}
