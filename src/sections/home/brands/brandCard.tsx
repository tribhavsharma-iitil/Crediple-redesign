"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { HomeBrand, homeColors } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { homeFadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const C = homeColors;
const LINK_BLUE = "#5A96E3";

const cardVariants: Variants = homeFadeUp;

/** Transparent network / constellation — no black fill */
function NetworkBackdrop({ id, variant }: { id: string; variant: number }) {
  const layouts = [
    {
      nodes: [
        [40, 36],
        [110, 24],
        [180, 42],
        [250, 20],
        [310, 50],
        [60, 90],
        [140, 100],
        [210, 78],
        [280, 110],
        [90, 150],
        [170, 155],
        [250, 165],
        [320, 130],
        [130, 200],
        [220, 205],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [0, 5],
        [1, 6],
        [2, 7],
        [4, 8],
        [5, 6],
        [6, 7],
        [7, 8],
        [5, 9],
        [6, 10],
        [8, 11],
        [8, 12],
        [9, 13],
        [10, 14],
        [11, 14],
      ] as [number, number][],
    },
    {
      nodes: [
        [50, 30],
        [130, 45],
        [200, 25],
        [270, 55],
        [80, 85],
        [160, 95],
        [240, 80],
        [300, 100],
        [100, 145],
        [180, 140],
        [260, 155],
        [140, 190],
        [230, 200],
        [60, 170],
        [310, 170],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 5],
        [5, 6],
        [6, 7],
        [4, 8],
        [5, 9],
        [6, 10],
        [8, 11],
        [9, 12],
        [8, 13],
        [10, 14],
        [9, 11],
      ] as [number, number][],
    },
    {
      nodes: [
        [70, 40],
        [150, 28],
        [230, 48],
        [300, 30],
        [40, 100],
        [120, 110],
        [200, 90],
        [280, 120],
        [80, 160],
        [160, 170],
        [240, 155],
        [320, 180],
        [110, 210],
        [200, 215],
        [50, 190],
      ],
      links: [
        [0, 1],
        [1, 2],
        [2, 3],
        [0, 4],
        [0, 5],
        [1, 5],
        [2, 6],
        [3, 7],
        [4, 5],
        [5, 6],
        [6, 7],
        [4, 8],
        [5, 9],
        [7, 10],
        [7, 11],
        [8, 12],
        [9, 13],
        [8, 14],
      ] as [number, number][],
    },
  ];

  const { nodes, links } = layouts[variant % layouts.length];

  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 360 240"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`${id}-glow`} cx="55%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#2F80ED" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Transparent — only soft blue glow, no black rect */}
      <rect width="360" height="240" fill={`url(#${id}-glow)`} />
      <g stroke="#7EB6FF" strokeWidth="0.85" opacity="0.4" fill="none">
        {links.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
          />
        ))}
      </g>
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 4 === 0 ? 2.8 : 1.8}
          fill="#B8D8FF"
          opacity={0.7}
        />
      ))}
    </svg>
  );
}

export default function BrandCard({
  brand,
  index,
}: {
  brand: HomeBrand;
  index: number;
}) {
  const { isDark } = useTheme();
  const patternId = `eco-net-${index}`;

  const content = (
    <>
      {/* Transparent network overlay only — no black image */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <NetworkBackdrop id={patternId} variant={index} />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(180deg, transparent 0%, transparent 45%, rgba(13,20,37,0.75) 75%, #0D1425 100%)"
              : "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="w-full flex items-center justify-start mb-4 sm:mb-5 md:mb-6 pt-1">
          <div className="relative w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] md:w-[120px] md:h-[120px] flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-35"
              style={{
                background:
                  "radial-gradient(circle, rgba(47,128,237,0.5) 0%, transparent 70%)",
              }}
            />
            <Image
              src={isDark ? brand.iconDark : brand.icon}
              alt={brand.name}
              width={120}
              height={120}
              className={cn(
                "relative z-10 object-contain w-auto h-auto max-h-[80px] sm:max-h-[100px] md:max-h-[120px] max-w-[80px] sm:max-w-[100px] md:max-w-[120px]",
                isDark && "mix-blend-screen"
              )}
              sizes="(max-width: 640px) 80px, (max-width: 768px) 100px, 120px"
              priority={index < 3}
            />
          </div>
        </div>

        <h3
          className="font-heading font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 tracking-tight text-left w-full"
          style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
        >
          {brand.name}
        </h3>

        <p
          className="text-xs sm:text-[13px] md:text-sm leading-relaxed text-left flex-1 mb-5 sm:mb-6 line-clamp-4"
          style={{ color: isDark ? "rgba(255,255,255,0.82)" : "#64748B" }}
        >
          {brand.description}
        </p>

        <span
          className={cn(
            "inline-flex items-center gap-1 text-sm font-medium mt-auto",
            !brand.clickable && "opacity-40"
          )}
          style={{ color: brand.clickable ? LINK_BLUE : C.textDim }}
        >
          {brand.cta}
          <ChevronRight size={15} strokeWidth={2.2} />
        </span>
      </div>
    </>
  );

  const className =
    "relative w-full min-h-[320px] h-[340px] sm:h-[360px] md:h-[400px] rounded-[16px] sm:rounded-[20px] border p-5 sm:p-6 md:p-8 flex flex-col overflow-hidden transition-all duration-300 hover:border-[rgba(90,150,227,0.45)]";

  const style = {
    background: isDark ? "#0D1425" : "#FFFFFF",
    borderColor: isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0",
    boxShadow: isDark
      ? "inset 0 1px 0 rgba(126,182,255,0.06), 0 24px 48px rgba(0,0,0,0.4)"
      : "0 10px 28px rgba(15,23,42,0.08)",
  };

  if (brand.clickable) {
    return (
      <motion.div variants={cardVariants} className="h-full">
        <Link
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(className, "no-underline block h-full")}
          style={style}
        >
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div variants={cardVariants} className={className} style={style}>
      {content}
    </motion.div>
  );
}
