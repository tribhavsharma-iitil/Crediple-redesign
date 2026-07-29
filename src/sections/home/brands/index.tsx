"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  homeContent,
  homeColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { cn } from "@/lib/utils";

const { ecosystem, hero } = homeContent;
const C = homeColors;

export default function Brands() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="ecosystem"
      className="relative section-py"
    >
      <div className="">
        <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
          <HomeReveal variants={homeFadeLeft} className="mb-8 w-full sm:mb-10">
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <div className="min-w-0">
                <h2
                  className="font-heading text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
                  style={{ color: isDark ? C.text : homeLight.heading }}
                >
                  {ecosystem.titleBefore}{" "}
                  <span style={getHomeTitleAccentStyle(isDark)}>
                    {ecosystem.titleAccent}
                  </span>
                </h2>
                <p
                  className="mt-2 text-sm font-medium"
                  style={{ color: isDark ? C.textMuted : homeLight.muted }}
                >
                  {ecosystem.subtitle}
                </p>
              </div>
              <CredipleButton href={hero.primaryCta.href} size="md">
                Explore
              </CredipleButton>
            </div>
          </HomeReveal>
        </div>


        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="flex gap-px overflow-x-auto !overflow-y-hidden border hide-scrollbar"
          style={{
            background: isDark ? C.border : homeLight.border,
            borderColor: isDark ? C.border : homeLight.border,
          }}
        >
          {ecosystem.brands.map((brand) => {
            const cardStyle = {
              background: isDark ? C.bgSection : homeLight.bg,
            };
            const cardClassName =
              "relative flex h-full w-[350px] h-80 shrink-0 flex-col p-6 no-underline transition-colors duration-200 sm:p-7 lg:p-8";

            const inner = (
              <>
                <div className="mb-5 flex w-full items-center justify-end sm:mb-16">
                  <Image
                    src={isDark ? brand.iconDark : brand.icon}
                    alt={brand.name}
                    width={100}
                    height={60}
                    className="h-6 w-auto object-contain sm:h-12"
                  />
                </div>
                <h3
                  className="font-heading text-lg font-bold tracking-tight sm:text-3xl"
                  style={{ color: isDark ? C.text : homeLight.heading }}
                >
                  {brand.name}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed"
                  style={{ color: isDark ? "rgba(220,226,246,0.65)" : homeLight.body }}
                >
                  {brand.description}
                </p>
              </>
            );

            return (
              <HomeItem key={brand.name} className="h-full">
                {brand.clickable ? (
                  <Link
                    href={brand.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(cardClassName, "hover:bg-black/[0.02] dark:hover:bg-white/[0.03]")}
                    style={cardStyle}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className={cardClassName} style={cardStyle}>
                    {inner}
                  </div>
                )}
              </HomeItem>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
