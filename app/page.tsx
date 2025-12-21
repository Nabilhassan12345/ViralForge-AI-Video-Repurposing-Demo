"use client"

import { useState } from "react"
import { UploadScreen } from "@/components/upload-screen"
import { ProcessingScreen } from "@/components/processing-screen"
import { ResultsScreen } from "@/components/results-screen"
import { AnimatePresence, motion } from "framer-motion"

export type Screen = "upload" | "processing" | "results"
export type Platform = "youtube" | "linkedin" | "reels" | "shorts" | "tiktok" | "x" | "facebook"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("upload")
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(["tiktok", "reels", "shorts"])
  const [jobId, setJobId] = useState<string | null>(null)

  const handleJobCreated = (job_id: string, platforms: string[]) => {
    setJobId(job_id)
    setSelectedPlatforms(platforms as Platform[])
    setCurrentScreen("processing")
  }

  const handleProcessingComplete = () => {
    setCurrentScreen("results")
  }

  const handleGenerateAnother = () => {
    setCurrentScreen("upload")
    setJobId(null)
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
            <UploadScreen onJobCreated={handleJobCreated} />
          </motion.div>
        )}
        {currentScreen === "processing" && jobId && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <ProcessingScreen jobId={jobId} selectedPlatforms={selectedPlatforms} onComplete={handleProcessingComplete} />
          </motion.div>
        )}
        {currentScreen === "results" && jobId && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full"
          >
            <ResultsScreen jobId={jobId} selectedPlatforms={selectedPlatforms} onGenerateAnother={handleGenerateAnother} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
