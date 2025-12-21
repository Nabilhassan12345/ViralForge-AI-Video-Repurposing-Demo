"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { getJobEvents } from "../lib/api"
import { Check, Loader2, Zap, Brain, Scissors, Film } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Platform } from "@/app/page"
import { ViralForgeLogo, AnimatedBackground, PrimaryButton } from "./ui/shared"


interface ProcessingStep {
  id: string
  title: string
  description: string
  progress: number
  status: "pending" | "processing" | "complete"
  icon: React.ReactNode
}

interface ProcessingScreenProps {
  jobId: string
  selectedPlatforms: Platform[]
  onComplete: () => void
}

export function ProcessingScreen({ jobId, selectedPlatforms, onComplete }: ProcessingScreenProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: "analyzer",
      title: "Analyzer",
      description: "Transcribing + selecting best moments",
      progress: 0,
      status: "processing",
      icon: <Brain className="w-5 h-5" />,
    },
    {
      id: "hook",
      title: "Hook",
      description: "Generating hook with Wiro AI",
      progress: 0,
      status: "pending",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: "platform",
      title: "Platform Cuts",
      description: "Formatting for TikTok/Reels/Shorts",
      progress: 0,
      status: "pending",
      icon: <Scissors className="w-5 h-5" />,
    },
    {
      id: "renderer",
      title: "Renderer",
      description: "Final export",
      progress: 0,
      status: "pending",
      icon: <Film className="w-5 h-5" />,
    },
  ])
  const [statusMessages, setStatusMessages] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)

  useEffect(() => {
    // Listen to backend job events via SSE
    const eventSource = getJobEvents(jobId)
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        // Example event: { job_id, agent, status, message, progress, ts, meta }
        setStatusMessages((prev) => [...prev.slice(-4), data.message])
        // Map backend agent to step index
        const agentToStep: Record<string, number> = {
          analyzer: 0,
          hook: 1,
          platform: 2,
          renderer: 3,
        }
        setSteps((prev) => {
          const newSteps = [...prev]
          const idx = agentToStep[data.agent] ?? -1
          if (idx >= 0) {
            newSteps[idx].progress = Math.max(newSteps[idx].progress, (data.progress || 0) * 100)
            newSteps[idx].status = data.status === "complete" ? "complete" : "processing"
            // Mark previous steps as complete
            for (let i = 0; i < idx; i++) newSteps[i].status = "complete"
          }
          // If renderer is complete, mark all as complete
          if (data.agent === "renderer" && data.status === "complete") {
            newSteps.forEach((s) => (s.status = "complete"))
            setIsComplete(true)
          }
          const totalProgress = newSteps.reduce((acc, s) => acc + s.progress, 0) / 4
          setOverallProgress(totalProgress)
          return newSteps
        })
      } catch (e) {
        // Ignore parse errors
      }
    }
    eventSource.onerror = () => {
      eventSource.close()
    }
    return () => {
      eventSource.close()
    }
  }, [jobId])

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />

      <div className="w-full max-w-3xl mx-auto relative z-10 px-4">
        {/* Logo */}
        <div className="mb-8">
          <ViralForgeLogo animate={!isComplete} />
        </div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl md:text-3xl font-bold text-white text-center mb-4"
        >
          {isComplete ? (
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Processing Complete!
            </span>
          ) : (
            "Creating your clips..."
          )}
        </motion.h2>

        {/* Overall Progress Bar */}
        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} className="mb-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-zinc-400">Overall Progress</span>
            <span className="text-white font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-2 bg-zinc-800/80 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
              className={`h-full rounded-full ${
                isComplete
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              }`}
            />
          </div>
        </motion.div>

        {/* Processing Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`relative bg-zinc-900/80 backdrop-blur-xl border rounded-2xl p-4 transition-all duration-300 ${
                step.status === "processing"
                  ? "border-violet-500/60 shadow-lg shadow-violet-500/20"
                  : step.status === "complete"
                    ? "border-emerald-500/50"
                    : "border-zinc-800/80"
              }`}
            >
              {/* Animated glow for processing */}
              {step.status === "processing" && (
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 pointer-events-none"
                />
              )}

              {/* Status Icon */}
              <div className="flex items-center justify-between mb-3 relative z-10">
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    step.status === "processing"
                      ? "bg-violet-500/20 text-violet-400"
                      : step.status === "complete"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-zinc-800 text-zinc-500"
                  }`}
                >
                  {step.icon}
                </div>
                {step.status === "complete" ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                ) : step.status === "processing" ? (
                  <Loader2 className="w-5 h-5 text-violet-400 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-700" />
                )}
              </div>

              <p className="text-white font-semibold text-sm mb-1 relative z-10">{step.title}</p>
              <p className="text-zinc-500 text-xs mb-3 relative z-10">{step.description}</p>

              {/* Progress Bar */}
              <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden relative z-10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${step.progress}%` }}
                  transition={{ duration: 0.3 }}
                  className={`h-full rounded-full ${
                    step.status === "complete" ? "bg-emerald-500" : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
                  }`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Status Log */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 mb-8 h-36 overflow-hidden"
        >
          <div className="flex flex-col gap-1.5">
            <AnimatePresence mode="popLayout">
              {statusMessages.map((msg, i) => (
                <motion.p
                  key={`${msg}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`text-sm font-mono ${i === statusMessages.length - 1 ? "text-violet-400" : "text-zinc-600"}`}
                >
                  <span className="text-zinc-700">{">"}</span> {msg}
                  {i === statusMessages.length - 1 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block w-2 h-4 bg-violet-400 ml-1 align-middle"
                    />
                  )}
                </motion.p>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* View Results Button */}
        <AnimatePresence>
          {isComplete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
              <PrimaryButton onClick={onComplete} variant="success" className="w-full py-4 text-lg">
                View Results
              </PrimaryButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
