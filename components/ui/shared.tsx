"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function ViralForgeLogo({ animate = false }: { animate?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-center gap-2.5"
    >
      <motion.div
        animate={animate ? { rotate: 360 } : {}}
        transition={animate ? { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" } : {}}
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center cursor-pointer relative overflow-hidden shadow-lg shadow-violet-500/25"
      >
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-white relative z-10" fill="currentColor">
          <polygon points="6 3 20 12 6 21 6 3" />
        </svg>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute -top-1 -right-1 w-3 h-3"
        >
          <Sparkles className="w-3 h-3 text-yellow-300" />
        </motion.div>
      </motion.div>
      <span className="text-white font-bold text-2xl tracking-tight">ViralForge</span>
    </motion.div>
  )
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep charcoal base */}
      <div className="absolute inset-0 bg-zinc-950" />

      {/* Animated gradient blobs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute top-1/3 -right-40 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute -bottom-20 left-1/3 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl"
      />
    </div>
  )
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: "primary" | "secondary" | "success"
}) {
  const variants = {
    primary: "from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-violet-500/25",
    secondary: "from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 shadow-zinc-900/25",
    success: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-500/25",
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`relative overflow-hidden bg-gradient-to-r ${variants[variant]} text-white font-semibold px-6 py-3 rounded-2xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {variant === "primary" && (
        <motion.div
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatDelay: 3 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export function PlatformBadge({
  platform,
  size = "lg",
}: {
  platform: string
  size?: "sm" | "md" | "lg"
}) {
  const config = platformStyles[platform]
  if (!config) return null

  const sizes = {
    sm: { outer: "w-10 h-10", inner: "w-7 h-7", icon: "w-4 h-4" },
    md: { outer: "w-12 h-12", inner: "w-9 h-9", icon: "w-5 h-5" },
    lg: { outer: "w-14 h-14", inner: "w-10 h-10", icon: "w-6 h-6" },
  }

  const s = sizes[size]

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -2 }}
      className={`${s.outer} rounded-2xl bg-zinc-800/95 backdrop-blur-md border border-zinc-700/60 shadow-xl flex items-center justify-center ring-2 ${config.ringColor}`}
    >
      <div
        className={`${s.inner} rounded-xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-md`}
      >
        <div className={s.icon}>{config.icon}</div>
      </div>
    </motion.div>
  )
}

export function PlatformPill({
  platform,
  selected,
  onClick,
  showDemo = false,
}: {
  platform: string
  selected: boolean
  onClick: () => void
  showDemo?: boolean
}) {
  const config = platformStyles[platform]
  if (!config) return null

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${selected
          ? "bg-gradient-to-r from-violet-600/90 to-indigo-600/90 border-2 border-violet-400/50 shadow-lg shadow-violet-500/20"
          : "bg-zinc-800/80 border-2 border-zinc-700/50 hover:border-zinc-600/50"
        }`}
    >
      {/* Icon Badge */}
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-md ${selected ? "bg-white/20 backdrop-blur-sm" : "bg-zinc-700/90"
          }`}
      >
        <div className="w-5 h-5">{config.icon}</div>
      </div>

      {/* Label */}
      <span className={`text-sm font-medium ${selected ? "text-white" : "text-zinc-300"}`}>{config.name}</span>

      {/* Demo tag */}
      {showDemo && <span className="text-[10px] bg-zinc-700/80 text-zinc-400 px-1.5 py-0.5 rounded">Demo</span>}
    </motion.button>
  )
}

export function PhonePreviewCard({
  platform,
  score,
  duration,
  thumbnail,
  index = 0,
}: {
  platform: string
  score: number
  duration: string
  thumbnail: string
  index?: number
}) {
  const config = platformStyles[platform]
  if (!config) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative pt-7 group"
    >
      {/* Floating Platform Badge */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <PlatformBadge platform={platform} size="lg" />
      </div>

      {/* Card */}
      <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 rounded-2xl overflow-hidden shadow-xl transition-all group-hover:border-zinc-700/80 group-hover:shadow-2xl group-hover:shadow-violet-500/10">
        {/* Thumbnail */}
        <div className="relative aspect-[9/16] bg-zinc-800 overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            src={thumbnail}
            alt={`${config.name} preview`}
            className="w-full h-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Bottom badges */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            {/* Score pill */}
            <div className="bg-emerald-500/95 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
              <span className="text-emerald-200 text-[10px] font-medium">SCORE</span>
              <span className="text-sm">{score}</span>
            </div>
            {/* Duration pill */}
            <div className="bg-black/70 backdrop-blur-sm text-white text-sm font-medium px-2.5 py-1.5 rounded-lg shadow-lg">
              {duration}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const platformStyles: Record<
  string,
  {
    name: string
    gradient: string
    ringColor: string
    icon: React.ReactNode
  }
> = {
  youtube: {
    name: "YouTube",
    gradient: "from-red-600 to-red-500",
    ringColor: "ring-red-500/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  linkedin: {
    name: "LinkedIn",
    gradient: "from-blue-600 to-blue-500",
    ringColor: "ring-blue-500/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  reels: {
    name: "Instagram Reels",
    gradient: "from-pink-600 via-purple-600 to-orange-500",
    ringColor: "ring-pink-500/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  shorts: {
    name: "YouTube Shorts",
    gradient: "from-red-600 to-red-500",
    ringColor: "ring-red-500/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      </svg>
    ),
  },
  tiktok: {
    name: "TikTok",
    gradient: "from-cyan-500 to-pink-500",
    ringColor: "ring-cyan-400/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
  },
  x: {
    name: "X",
    gradient: "from-zinc-700 to-zinc-800",
    ringColor: "ring-zinc-400/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  facebook: {
    name: "Facebook",
    gradient: "from-blue-600 to-blue-500",
    ringColor: "ring-blue-500/50",
    icon: (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFFFFF">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
}

// Simple platform icon component for clip cards
export function PlatformIcon({ platform, className = "" }: { platform: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    tiktok: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
      </svg>
    ),
    reels: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0z" />
      </svg>
    ),
    shorts: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
      </svg>
    ),
  }

  return icons[platform] || null
}

