"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Check, Loader2, Zap, Brain, Scissors, Film } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Platform } from "@/app/page"
import { ViralForgeLogo, AnimatedBackground } from "./ui/shared"

interface ProcessingStep {
  id: string
  title: string
  description: string
  progress: number
  status: "pending" | "processing" | "complete"
  icon: React.ReactNode
}

interface ProcessingScreenProps {
  selectedPlatforms: Platform[]
  onComplete: () => void
}

// Log messages for typing animation
const logMessages = [
  "Identifying viral moments...",
  "Analyzing transcript for engagement peaks...",
  "Generating attention-grabbing hook...",
  "Creating Wiro AI visual hook...",
  "Optimizing framing for TikTok...",
  "Adjusting pacing for YouTube Shorts...",
  "Rendering platform-specific cuts...",
  "Finalizing exports..."
]

export function ProcessingScreen({ selectedPlatforms, onComplete }: ProcessingScreenProps) {
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

  const [overallProgress, setOverallProgress] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [typingText, setTypingText] = useState("")
  const [currentLogIndex, setCurrentLogIndex] = useState(0)

  // Simulate processing pipeline (6-9 seconds total)
  useEffect(() => {
    const totalDuration = 8000 // 8 seconds
    const stepDuration = totalDuration / 4 // 2 seconds per step

    // Progress animation
    const progressInterval = setInterval(() => {
      setOverallProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, totalDuration / 100)

    // Step 1: Analyzer (0-2s)
    const analyzerTimer = setTimeout(() => {
      setSteps(prev => prev.map(s =>
        s.id === "analyzer" ? { ...s, status: "complete", progress: 100 } :
          s.id === "hook" ? { ...s, status: "processing" } : s
      ))
    }, stepDuration)

    // Step 2: Hook (2-4s)
    const hookTimer = setTimeout(() => {
      setSteps(prev => prev.map(s =>
        s.id === "hook" ? { ...s, status: "complete", progress: 100 } :
          s.id === "platform" ? { ...s, status: "processing" } : s
      ))
    }, stepDuration * 2)

    // Step 3: Platform Cuts (4-6s)
    const platformTimer = setTimeout(() => {
      setSteps(prev => prev.map(s =>
        s.id === "platform" ? { ...s, status: "complete", progress: 100 } :
          s.id === "renderer" ? { ...s, status: "processing" } : s
      ))
    }, stepDuration * 3)

    // Step 4: Renderer complete (6-8s)
    const rendererTimer = setTimeout(() => {
      setSteps(prev => prev.map(s =>
        s.id === "renderer" ? { ...s, status: "complete", progress: 100 } : s
      ))
    }, stepDuration * 3.8)

    // Complete - transition to results
    const completeTimer = setTimeout(() => {
      onComplete()
    }, totalDuration + 500)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(analyzerTimer)
      clearTimeout(hookTimer)
      clearTimeout(platformTimer)
      clearTimeout(rendererTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  // Typing animation for log messages
  useEffect(() => {
    if (currentLogIndex >= logMessages.length) return

    const message = logMessages[currentLogIndex]
    let charIndex = 0
    setTypingText("")

    const typingInterval = setInterval(() => {
      if (charIndex <= message.length) {
        setTypingText(message.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        // Add to logs and start next message
        setTimeout(() => {
          setLogs(prev => [...prev.slice(-4), message]) // Keep last 5 lines
          setCurrentLogIndex(prev => prev + 1)
        }, 200)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentLogIndex])

  // Progress new log every ~1 second
  useEffect(() => {
    const logInterval = setInterval(() => {
      if (currentLogIndex < logMessages.length - 1) {
        setCurrentLogIndex(prev => Math.min(prev + 1, logMessages.length - 1))
      }
    }, 1000)

    return () => clearInterval(logInterval)
  }, [currentLogIndex])

  return (
    <div className="min-h-screen text-white relative overflow-hidden flex items-center justify-center">
      <AnimatedBackground />

      <div className="relative z-10 px-4 py-8 w-full max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-6">
          <ViralForgeLogo />
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Creating your clips...
          </h1>
        </motion.div>

        {/* Overall Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-zinc-400 text-sm">Overall Progress</span>
            <span className="text-white text-sm font-medium">{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* Step Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative bg-zinc-900/80 backdrop-blur-xl border rounded-xl p-4 transition-all duration-500 ${step.status === "processing"
                  ? "border-violet-500/50 shadow-lg shadow-violet-500/20"
                  : step.status === "complete"
                    ? "border-emerald-500/50"
                    : "border-zinc-800/80"
                }`}
            >
              {/* Status indicator */}
              <div className="absolute -top-2 -right-2">
                {step.status === "complete" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
                {step.status === "processing" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center"
                  >
                    <Loader2 className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${step.status === "processing"
                  ? "bg-violet-500/20 text-violet-400"
                  : step.status === "complete"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-800 text-zinc-500"
                }`}>
                {step.icon}
              </div>

              {/* Title & Description */}
              <h3 className={`font-semibold text-sm mb-1 ${step.status === "pending" ? "text-zinc-500" : "text-white"
                }`}>
                {step.title}
              </h3>
              <p className="text-zinc-500 text-xs leading-tight">
                {step.description}
              </p>

              {/* Progress bar for processing step */}
              {step.status === "processing" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-3 h-1 bg-zinc-800 rounded-full overflow-hidden"
                >
                  <motion.div
                    className="h-full bg-violet-500 rounded-full"
                    animate={{ width: ["0%", "30%", "60%", "90%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Log Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-zinc-900/60 backdrop-blur-xl border border-zinc-800/80 rounded-xl p-4"
        >
          <div className="font-mono text-xs space-y-1.5 min-h-[100px]">
            <AnimatePresence>
              {logs.map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 0.6, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-zinc-500 flex items-center gap-2"
                >
                  <span className="text-emerald-500">✓</span>
                  {log}
                </motion.div>
              ))}
            </AnimatePresence>
            {typingText && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-violet-400 flex items-center gap-2"
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 0.8 }}
                >
                  ▸
                </motion.span>
                {typingText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="inline-block w-2 h-4 bg-violet-400"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
