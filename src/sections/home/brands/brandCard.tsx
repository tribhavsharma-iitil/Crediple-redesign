"use client";

import { motion, Variants } from "framer-motion"; // ◄ Added Variants import
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BRANDS } from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const WAVE_CONFIGS = [
  {
    id: "indigo-blue",
    leftStart: "#6366f1",
    leftEnd: "rgba(21, 93, 252, 0)",
    rightStart: "#155dfc",
    rightEnd: "rgba(99, 102, 241, 0)",
    pathLeftToRight: "M0,15 C70,105 130,100 240,45 L240,120 L0,120 Z",
    pathRightToLeft: "M0,65 C100,115 170,95 240,40 L240,120 L0,120 Z"
  },
  {
    id: "blue-royal",
    leftStart: "#155dfc",
    leftEnd: "rgba(59, 130, 246, 0)",
    rightStart: "#3b82f6",
    rightEnd: "rgba(21, 93, 252, 0)",
    pathLeftToRight: "M0,10 C80,100 140,95 240,50 L240,120 L0,120 Z",
    pathRightToLeft: "M0,60 C90,110 160,90 240,35 L240,120 L0,120 Z"
  },
  {
    id: "teal-cyan",
    leftStart: "#0092b8",
    leftEnd: "rgba(34, 211, 238, 0)",
    rightStart: "#22d3ee",
    rightEnd: "rgba(0, 146, 184, 0)",
    pathLeftToRight: "M0,20 C70,110 130,105 240,35 L240,120 L0,120 Z",
    pathRightToLeft: "M0,55 C80,100 150,115 240,25 L240,120 L0,120 Z"
  },
  {
    id: "purple-deep",
    leftStart: "#7c3aed",
    leftEnd: "rgba(21, 93, 252, 0)",
    rightStart: "#155dfc",
    rightEnd: "rgba(124, 58, 237, 0)",
    pathLeftToRight: "M0,5 C90,105 150,90 240,55 L240,120 L0,120 Z",
    pathRightToLeft: "M0,70 C70,115 140,100 240,30 L240,120 L0,120 Z"
  }
];

// ── ADDED EXPLICIT TYPE ──────────────────────────────────────────────────────
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function BrandCard({
  brand,
  index,
}: {
  brand: typeof BRANDS[0];
  index: number;
}) {
  const { isDark } = useTheme();
  const wave = WAVE_CONFIGS[index % WAVE_CONFIGS.length];

  // Check if the current card is allowed to navigate
  const isClickable = ["Iitil", "Eatskart"].includes(brand.name);

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative w-full h-[520px] rounded-none border flex flex-col items-center text-center p-6 sm:p-8 overflow-hidden transition-shadow duration-300",
        isDark 
          ? "bg-[#0b1329] border-white/[0.05] shadow-2xl" 
          : "bg-white border-slate-100 shadow-md shadow-slate-100/50"
      )}
    >
      {/* Content Wrapper */}
      <div className="flex-1 flex flex-col items-center w-full z-10">
        {/* Brand Icon */}
        <div className="w-36 h-36 sm:w-40 sm:h-40 my-6 flex items-center justify-center shrink-0">
          <Image
            src={isDark ? brand.iconDark : brand.icon}
            alt={brand.name}
            width={140}
            height={140}
            className="object-contain max-h-full max-w-full"
            priority
          />
        </div>

        {/* Accent Divider Bar */}
        <div
          className={cn(
            "w-12 h-[2px] mb-6 rounded-full shrink-0",
            isDark ? "bg-white/30" : "bg-blue-600"
          )}
        />

        {/* Brand Name Title */}
        <h3
          className={cn(
            "font-heading font-bold text-xl sm:text-2xl mb-3 tracking-wide",
            isDark ? "text-white" : "text-slate-800"
          )}
        >
          {brand.name}
        </h3>

        {/* Description Context */}
        <p
          className={cn(
            "text-xs sm:text-sm font-normal leading-relaxed max-w-[260px]",
            isDark ? "text-slate-400" : "text-slate-500"
          )}
        >
          {brand.description}
        </p>
      </div>

      {/* Button Layout Area */}
      <div className="relative z-20 mt-auto pb-4">
        {isClickable ? (
          /* Active Link Button */
          <Link
            href={brand.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 hover:-translate-y-0.5",
              isDark
                ? "bg-[#cce0ff] text-slate-900 hover:bg-white"
                : "bg-blue-600 text-white hover:bg-blue-700"
            )}
          >
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </Link>
        ) : (
          /* Non-clickable Button Placeholder */
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center cursor-not-allowed opacity-40",
              isDark
                ? "bg-slate-700 text-slate-400"
                : "bg-slate-200 text-slate-400"
            )}
          >
            <ArrowUpRight size={20} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Deep Crossover Waves Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 w-full pointer-events-none z-0">
        <svg
          viewBox="0 0 240 120"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`${wave.id}-left`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={wave.leftStart} stopOpacity="0.6" />
              <stop offset="60%" stopColor={wave.leftStart} stopOpacity="0.2" />
              <stop offset="100%" stopColor={wave.leftEnd} stopOpacity="0" />
            </linearGradient>

            <linearGradient id={`${wave.id}-right`} x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={wave.rightStart} stopOpacity="0.6" />
              <stop offset="60%" stopColor={wave.rightStart} stopOpacity="0.2" />
              <stop offset="100%" stopColor={wave.rightEnd} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path d={wave.pathLeftToRight} fill={`url(#${wave.id}-left)`} />
          <path d={wave.pathRightToLeft} fill={`url(#${wave.id}-right)`} className="mix-blend-screen" />
        </svg>
      </div>
    </motion.div>
  );
}