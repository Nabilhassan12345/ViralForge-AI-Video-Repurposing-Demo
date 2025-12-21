import Image from "next/image"
import { Youtube, Linkedin } from "lucide-react"

const platforms = [
  {
    name: "YouTube",
    icon: <Youtube className="w-6 h-6 text-white" />,
    bgColor: "bg-red-600",
    duration: "5m~15m",
    thumbnail: "/man-speaking-into-microphone-podcast-yellow-backgr.jpg",
    caption: "to get started",
    captionHighlight: "started",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin className="w-6 h-6 text-white" />,
    bgColor: "bg-blue-700",
    duration: "1m~5m",
    thumbnail: "/two-men-podcast-interview-orange-striped-shirt.jpg",
    caption: "A LOT OF",
    captionHighlight: "",
  },
  {
    name: "Instagram Reels",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#instagram-gradient)" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" stroke="url(#instagram-gradient)" strokeWidth="2" />
        <circle cx="18" cy="6" r="1.5" fill="url(#instagram-gradient)" />
        <defs>
          <linearGradient id="instagram-gradient" x1="2" y1="22" x2="22" y2="2">
            <stop stopColor="#FFDC80" />
            <stop offset="0.5" stopColor="#F56040" />
            <stop offset="1" stopColor="#C13584" />
          </linearGradient>
        </defs>
      </svg>
    ),
    bgColor: "bg-zinc-800",
    duration: "1m~3m",
    thumbnail: "/man-with-glasses-looking-up-owl-eyes-overlay.jpg",
    caption: "A LOT OF",
    captionHighlight: "",
  },
  {
    name: "YouTube Shorts",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"
          fill="#FF0000"
        />
        <path d="M10 15l5.19-3L10 9v6z" fill="white" />
      </svg>
    ),
    bgColor: "bg-zinc-800",
    duration: "<1m",
    thumbnail: "/man-sitting-chair-podcast-studio-talking.jpg",
    caption: "DEFY MAY HAVE SUCCEEDED",
    captionHighlight: "SUCCEEDED",
  },
  {
    name: "TikTok",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <path
          d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
          fill="#25F4EE"
        />
        <path
          d="M16.37 2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 014.19-3.51V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 006.55 20.1 6.34 6.34 0 0015.86 15.67v-7a8.16 8.16 0 004.77 1.52V6.79A4.83 4.83 0 0116.86 2.54V2z"
          fill="#FE2C55"
        />
      </svg>
    ),
    bgColor: "bg-zinc-800",
    duration: "<30s",
    thumbnail: "/man-with-beard-podcast-microphone-interview.jpg",
    caption: "INTERACTIVE OR",
    captionHighlight: "",
  },
  {
    name: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    bgColor: "bg-zinc-800",
    duration: "<1m",
    thumbnail: "/man-black-jacket-podcast-speaking.jpg",
    caption: "A LOT OF",
    captionHighlight: "",
  },
  {
    name: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" fill="#1877F2" />
        <path
          d="M15.5 8.5h-2c-.83 0-1.5.67-1.5 1.5v2h3.5l-.5 3h-3v6h-3v-6H6.5v-3H9v-2.5c0-2.21 1.79-4 4-4h2.5v3z"
          fill="white"
        />
      </svg>
    ),
    bgColor: "bg-zinc-800",
    duration: "1m~3m",
    thumbnail: "/man-glasses-orange-striped-shirt-podcast.jpg",
    caption: "TO GET STARTED",
    captionHighlight: "",
  },
]

export function OpusClipFlow() {
  return (
    <div className="relative w-full max-w-[1400px]">
      {/* OpusClip Logo */}
      <div className="absolute top-0 right-0 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
              fill="black"
            />
            <path
              d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"
              fill="black"
            />
          </svg>
        </div>
        <span className="text-white font-semibold text-xl">OpusClip</span>
      </div>

      {/* Top Section - Video Input */}
      <div className="flex items-start gap-4 mb-8">
        {/* Video Thumbnail Card */}
        <div className="relative">
          <div className="relative w-56 h-36 rounded-lg overflow-hidden border-2 border-zinc-700">
            <Image
              src="/images/screenshot-202025-12-21-20at-2011.png"
              alt="SMOSH video thumbnail"
              fill
              className="object-cover object-top"
            />
            {/* Duration Badge */}
            <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded-full">2h 11m</div>
            {/* SMOSH Logo Overlay */}
            <div className="absolute top-2 left-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded transform -rotate-6">
              SMOSH
            </div>
            {/* Price Tag */}
            <div className="absolute top-8 right-8 bg-yellow-400 text-black text-sm font-bold px-2 py-0.5 rounded transform rotate-12">
              $0
            </div>
          </div>
          {/* File Name Label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-sm px-4 py-1.5 rounded-md whitespace-nowrap">
            My long video.mov
          </div>
        </div>

        {/* Dashed Connection Line and Drop Zone */}
        <div className="flex items-center gap-4 mt-8">
          <div className="border-2 border-dashed border-zinc-600 rounded-xl px-8 py-4 flex items-center gap-4">
            <span className="text-zinc-400 text-lg">Drop a long video</span>
          </div>

          {/* Get Clips Button */}
          <div className="relative">
            <button className="bg-zinc-100 hover:bg-white text-black font-semibold px-6 py-3 rounded-full text-lg transition-colors">
              Get clips in 1 click
            </button>
            {/* Cursor */}
            <div className="absolute -bottom-4 -right-8">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1">
                <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 01.35-.15h6.87a.5.5 0 00.35-.85L6.35 2.86a.5.5 0 00-.85.35z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Connection Lines SVG */}
      <div className="relative h-24 mb-4">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1400 100" preserveAspectRatio="none">
          {/* Vertical line from source */}
          <line x1="180" y1="0" x2="180" y2="30" stroke="white" strokeWidth="2" />
          {/* Circle connector */}
          <circle cx="180" cy="35" r="6" fill="black" stroke="white" strokeWidth="2" />

          {/* Horizontal spread line */}
          <line x1="100" y1="35" x2="1300" y2="35" stroke="white" strokeWidth="2" />

          {/* Vertical lines down to each platform */}
          {[100, 270, 440, 610, 780, 950, 1120, 1290].slice(0, 7).map((x, i) => (
            <g key={i}>
              <line x1={100 + i * 200} y1="35" x2={100 + i * 200} y2="80" stroke="white" strokeWidth="2" />
              {/* Arrow head */}
              <polygon points={`${100 + i * 200 - 6},70 ${100 + i * 200 + 6},70 ${100 + i * 200},85`} fill="white" />
            </g>
          ))}
        </svg>
      </div>

      {/* Platform Output Cards */}
      <div className="grid grid-cols-7 gap-4">
        {platforms.map((platform, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            {/* Platform Icon Badge */}
            <div className={`w-14 h-14 rounded-2xl ${platform.bgColor} flex items-center justify-center`}>
              {platform.icon}
            </div>

            {/* Video Thumbnail */}
            <div className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-zinc-800">
              <Image
                src={platform.thumbnail || "/placeholder.svg"}
                alt={`${platform.name} clip`}
                fill
                className="object-cover"
              />
              {/* Caption Overlay */}
              {platform.caption && (
                <div className="absolute bottom-12 left-2 right-2">
                  <p className="text-white text-xs font-medium leading-tight">
                    {platform.caption.split(platform.captionHighlight).map((part, i, arr) => (
                      <span key={i}>
                        {part}
                        {i < arr.length - 1 && <span className="text-yellow-400">{platform.captionHighlight}</span>}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {/* Duration Badge */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-zinc-900/80 text-emerald-400 text-sm font-medium px-3 py-1 rounded-full">
                {platform.duration}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
