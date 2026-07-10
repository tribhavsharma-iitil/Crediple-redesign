"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { HomeBrand, homeColors } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { homeFadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import cardBg from "@/assets/container.png";

const C = homeColors;
const LINK_BLUE = "#5A96E3";

const cardVariants: Variants = homeFadeUp;

export default function BrandCard({
  brand,
  index,
}: {
  brand: HomeBrand;
  index: number;
}) {
  const { isDark } = useTheme();

  const content = (
    <>
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={cardBg}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-center"
          priority={index < 3}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(13,20,37,0.55) 75%, rgba(13,20,37,0.85) 100%)"
              : "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.55) 55%, rgba(255,255,255,0.9) 100%)",
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
