"use client";

import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BRANDS } from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";

const cardVariants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function BrandCard({
  brand,
  index,
}: {
  brand: typeof BRANDS[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);
  const { isDark } = useTheme();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setGlowPos({ x, y });
    },
    []
  );

  return (
    <motion.div
      variants={cardVariants}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{
        scale: 1.045,
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
      }}
      className="relative rounded-[18px] p-[1.5px] cursor-pointer h-full"
      style={{
        background: hovered
          ? `radial-gradient(180px circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,130,246,0.7), rgba(96,165,250,0.3) 40%, rgba(30,58,138,0.15) 70%, rgba(255,255,255,0.06) 100%)`
          : "rgba(255,255,255,0.07)",
        transition: "background 0.1s ease",
      }}
    >
      {/* Inner card */}
      <div
        className="relative rounded-[17px] p-6 h-full flex flex-col overflow-hidden"
        style={{ background: "var(--card-inner)" }}
      >
        {/* Subtle inner glow on hover */}
        {hovered && (
          <div
            className="absolute pointer-events-none rounded-[17px] inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(220px circle at ${glowPos.x}% ${glowPos.y}%, rgba(59,130,246,0.06) 0%, transparent 70%)`,
            }}
          />
        )}

        {/* Icon / cover image */}
        <div className="w-full rounded-[14px] overflow-hidden mb-5 shrink-0">
          <Image
            src={isDark ? brand.iconDark : brand.icon}
            alt={brand.name}
            className="w-full h-68  sm:h-48 object-cover"
          />
        </div>

        {/* Name */}
        <h3
          className="font-semibold text-lg mb-2 leading-snug"
          style={{ color: "var(--icon-accent)" }}
        >
          {brand.name}
        </h3>

        {/* Description */}
        <p
          className="text-sm font-light leading-relaxed flex-1 mb-5"
          style={{ color: "var(--card-text-secondary)" }}
        >
          {brand.description}
        </p>

        {/* Learn more — opens in new tab */}
        <Link
          href={brand.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition-colors duration-150 no-underline group"
        >
          Learn More
          <motion.span
            className="inline-block"
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            ›
          </motion.span>
        </Link>
      </div>
    </motion.div>
  );
}