"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { HomeBrand, homeColors } from "@/content/home";
import { homeFadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";
import cardBg from "@/assets/container.png";

const C = homeColors;
const LINK_BLUE = "#5A96E3";

const cardVariants: Variants = homeFadeUp;

/**
 * Ecosystem cards always use the dark PDF treatment (network bg + light text),
 * on both light and dark site themes.
 */
export default function BrandCard({
  brand,
  index,
}: {
  brand: HomeBrand;
  index: number;
}) {
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
            background:
              "linear-gradient(180deg, transparent 0%, transparent 40%, rgba(13,20,37,0.55) 75%, rgba(13,20,37,0.85) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full items-start">
        <div className="w-full flex items-center justify-start mb-4 sm:mb-5 md:mb-6 pt-1">
          <div className="relative flex h-[64px] w-[64px] items-center justify-center sm:h-[100px] sm:w-[100px] md:h-[120px] md:w-[120px]">
            <div
              className="absolute inset-0 rounded-full opacity-35 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(47,128,237,0.5) 0%, transparent 70%)",
              }}
            />
            <Image
              src={brand.iconDark}
              alt={brand.name}
              width={120}
              height={120}
              className="relative z-10 h-auto max-h-[64px] w-auto max-w-[64px] object-contain mix-blend-screen sm:max-h-[100px] sm:max-w-[100px] md:max-h-[120px] md:max-w-[120px]"
              sizes="(max-width: 640px) 64px, (max-width: 768px) 100px, 120px"
              priority={index < 3}
            />
          </div>
        </div>

        <h3
          className="font-heading font-bold text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 tracking-tight text-left w-full"
          style={{ color: "#FFFFFF" }}
        >
          {brand.name}
        </h3>

        <p
          className="text-xs sm:text-[13px] md:text-sm leading-relaxed text-left flex-1 mb-5 sm:mb-6 line-clamp-4"
          style={{ color: "rgba(255,255,255,0.82)" }}
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
    "relative flex h-auto min-h-[280px] w-full flex-col overflow-hidden rounded-[16px] border p-4 transition-all duration-300 hover:border-[rgba(90,150,227,0.45)] sm:h-[360px] sm:min-h-[320px] sm:rounded-[20px] sm:p-6 md:h-[400px] md:p-8";

  const style = {
    background: "#0D1425",
    borderColor: "rgba(255,255,255,0.08)",
    // Inset only — outer drop shadows get clipped by the carousel and
    // read as a solid gray bar on light section backgrounds.
    boxShadow: "inset 0 1px 0 rgba(126,182,255,0.06)",
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
