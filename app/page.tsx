"use client"

import { useState } from "react"
import { UploadScreen } from "@/components/upload-screen"
import { ProcessingScreen } from "@/components/processing-screen"
import { ResultsScreen } from "@/components/results-screen"
import { AnimatePresence, motion } from "framer-motion"

export type Screen = "upload" | "processing" | "results"
export type Platform = "youtube" | "linkedin" | "reels" | "shorts" | "tiktok" | "x" | "facebook"

// Demo video embeds from Streamable
export const VIDEO_EMBEDS = {
  raw: "https://streamable.com/e/m60ypf",
  tiktok: "https://streamable.com/e/ew9rri",
  shorts: "https://streamable.com/e/wp4n8i",
  reels: null as string | null
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("upload")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["tiktok", "reels", "shorts"])

  const handleStartProcessing = (platforms: Platform[]) => {
    setSelectedPlatforms(platforms)
    setCurrentScreen("processing")
  }

  const handleProcessingComplete = () => {
    setCurrentScreen("results")
  }

  const handleGenerateAnother = () => {
    setCurrentScreen("upload")
  }

  return (
    <main className="min-h-screen bg-zinc-950 overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === "upload" && (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <UploadScreen onStartProcessing={handleStartProcessing} />
          </motion.div>
        )}
        {currentScreen === "processing" && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <ProcessingScreen selectedPlatforms={selectedPlatforms} onComplete={handleProcessingComplete} />
          </motion.div>
        )}
        {currentScreen === "results" && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <ResultsScreen selectedPlatforms={selectedPlatforms} onGenerateAnother={handleGenerateAnother} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
