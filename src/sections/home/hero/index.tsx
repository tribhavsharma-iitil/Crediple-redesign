"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import heroOverlay from "@/assets/home/hero_overlay.png";
import {
  homeContent,
  homeColors,
  homeLight,
  // getHomeTitleAccentStyle,
} from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { useIntroPhase } from "@/components/layout/AppShell";
import { homeEase } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import HashLink from "@/components/ui/HashLink";
// import HeroWave from "@/components/home/HeroWave";
import YakaBrandMark from "@/components/home/YakaBrandMark";
import { CredipleButton } from "@/components/ui/CredipleButton";
import { cn } from "@/lib/utils";
import {
  HERO_CONTENT_CLASS,
  HERO_SECTION_CLASS,
  HERO_YAKA_SLOT_CLASS,
} from "@/components/home/heroLayout";

const { hero } = homeContent;
const C = homeColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function Hero() {
  const { isDark } = useTheme();
  const { phase } = useIntroPhase();
  const { heroStagger } = useHomeMotion();
  const [showYaka, setShowYaka] = useState(true);
  const [videoMounted, setVideoMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // A <video> paints solid black until its first frame decodes, no matter
    // what CSS background it has — reset so the section's own themed
    // background shows through while the newly-selected source loads.
    setVideoReady(false);
  }, [isDark, isMobile]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const update = () => {
      // Hide when header becomes solid — YAKA moves into the header
      setShowYaka(window.scrollY <= 40);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    // Next's SSR markup for <video muted> doesn't serialize the `muted`
    // attribute, so the browser's first paint sees an unmuted autoplay
    // video, blocks it, and flashes the play button. Only mount the
    // <video> client-side so React creates it fresh (sets .muted for
    // real from the start) instead of hydrating the unmuted SSR markup.
    setVideoMounted(true);
  }, []);

  useEffect(() => {
    if (!videoMounted) return;
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const tryPlay = () => {
      video.play().catch(() => { });
    };

    tryPlay();
    // Some mobile browsers aren't ready to accept play() the instant
    // the element mounts — retry once real media data is available.
    video.addEventListener("loadedmetadata", tryPlay);
    video.addEventListener("canplay", tryPlay);

    // Last-resort fallback: a few mobile browsers (e.g. Chrome on
    // Android with Data Saver) still block the very first
    // programmatic autoplay. The user's first touch/scroll/click
    // anywhere on the page unlocks it, so playback starts without
    // them ever needing to tap the video's own play control.
    document.addEventListener("touchstart", tryPlay, { once: true, passive: true });
    document.addEventListener("scroll", tryPlay, { once: true, passive: true });
    document.addEventListener("click", tryPlay, { once: true });

    return () => {
      video.removeEventListener("loadedmetadata", tryPlay);
      video.removeEventListener("canplay", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("scroll", tryPlay);
      document.removeEventListener("click", tryPlay);
    };
    // isMobile is included because switching source swaps in a new
    // <video> node (via key) that needs its own muted+play kick.
  }, [videoMounted, isMobile]);

  const showStaticLogo = phase === "ready" && showYaka;

  return (
    <section
      id="hero"
      className={cn(
        HERO_SECTION_CLASS,
        "lg:!h-[100vh] md:!h-[100vh] sm:!h-[100dvh] !h-[50vh] !p-0",
        isDark ? "!bg-[#000000]" : "!bg-[#FFFFFF]",
      )}
    >
      {/* <HeroWave isDark={isDark} /> */}

      {/* YAKA mark + themed tagline */}
      <div
        id="yaka-logo-anchor"
        className={HERO_YAKA_SLOT_CLASS}
      >
        {showStaticLogo ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <YakaBrandMark />
          </motion.div>
        ) : phase === "flying" || (phase === "ready" && !showYaka) ? (
          // Invisible stub so FloatingLogo can measure the slot
          <div
            className="h-6 w-6 opacity-0 sm:h-10 sm:w-10 md:h-14 md:w-14 xl:h-16 xl:w-16"
            aria-hidden
          />
        ) : null}
      </div>
      {/* 
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 z-0 h-[min(360px,50vw)] w-[min(640px,100vw)] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse, ${C.glow} 0%, transparent 70%)`,
          filter: "blur(50px)",
        }}
      /> */}

      {/* Background video — dedicated mobile crop below md, contained globe above it */}
      {videoMounted ? (
        isMobile ? (
          <video
            key={isDark ? "hero-video-mobile-dark" : "hero-video-mobile-light"}
            ref={videoRef}
            aria-hidden
            onLoadedData={() => setVideoReady(true)}
            className={cn(
              "pointer-events-none absolute inset-0 z-[0] h-full w-full object-cover !top-[2rem] transition-opacity duration-500",
              isDark ? "!bg-[#000000]" : "!bg-[#FFFFFF]",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
          >
            <source
              src={isDark ? "/videos/bg_hero_mobile.mp4" : "/videos/bg_hero_mobile_light.mp4"}
              type="video/mp4"
            />
          </video>
        ) : (
          <video
            key={isDark ? "hero-video-desktop-dark" : "hero-video-desktop-light"}
            ref={videoRef}
            aria-hidden
            onLoadedData={() => setVideoReady(true)}
            className={cn(
              "pointer-events-none absolute lg:top-18 md:top-14 inset-0 z-[0] w-full object-contain md:left-0 lg:!h-[80vh] md:!h-[80vh] transition-opacity duration-500",
              isDark ? "!bg-[#000000]" : "!bg-[#FFFFFF]",
              videoReady ? "opacity-100" : "opacity-0",
            )}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
          >
            <source
              src={isDark ? "/videos/hero_bg.mp4" : "/videos/hero_bg_light.mp4"}
              type="video/mp4"
            />
          </video>
        )
      ) : null}

      {/* Overlay image layered on top of the video */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: `url(${heroOverlay.src}) center/cover no-repeat` }}
      /> */}

      {/* Subtle overlay to keep text readable over the video */}
      {/* <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5, background: isDark ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.25)" }}
      /> */}
      <div className="relative z-10 w-full lg:!h-[100vh] md:!h-[100vh] sm:!h-[100dvh] !h-[60vh]" style={{
        background: isDark
          ? `url(${heroOverlay.src}) center/cover no-repeat`
          : "transparent",
      }}>


        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className={`${HERO_CONTENT_CLASS} max-w-4xl lg:!h-[100vh] md:!h-[100vh] sm:!h-[100dvh] !h-[70vh] `}
        >
          {/* <motion.div
          variants={heroItem}
          className="mb-3 w-fit max-w-full sm:mb-6 md:mb-7"
        >
          <span
            className="inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-medium tracking-wide sm:px-4 sm:text-[11px] md:text-xs"
            style={{
              borderColor: isDark
                ? "rgba(180, 197, 255, 0.45)"
                : "rgba(21,80,180,0.25)",
              color: isDark ? "#B4C5FF" : C.accentStrong,
              background: isDark
                ? "rgba(10, 20, 45, 0.85)"
                : "rgba(47,128,237,0.08)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#22C55E" }}
            />
            <span className="truncate">{hero.badge}</span>
          </span>
        </motion.div> */}

          <motion.h1
            variants={heroItem}
            className="font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1]"
            style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
          >
            {hero.titleLine1}
            <br />
            {/* <span style={getHomeTitleAccentStyle(isDark)}>{hero.titleLine2}</span> */}
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mb-4 max-w-xl px-1 text-[13px] leading-relaxed sm:mb-8 sm:text-sm md:mb-9 md:text-[15px] lg:text-base font-jakarta font-semibold"
            style={{ color: isDark ? "#FFFFFF" : homeLight.body }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="mb-4 flex w-full max-w-[240px] flex-col items-stretch justify-center gap-3 sm:mb-10 sm:max-w-none sm:flex-row sm:items-center sm:gap-4 md:mb-12 !mb-0"
          >
            {isDark ? (
              <HashLink
                href={hero.primaryCta.href}
                className="inline-flex h-11 items-center justify-center whitespace-nowrap px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 !mb-0"
                style={{
                  background: "rgba(255, 255, 255, 0.16)"
                }}
              >
                {hero.primaryCta.label}
              </HashLink>
            ) : (
              <CredipleButton
                href={hero.primaryCta.href}
                className="h-10 shrink-0 rounded-lg px-5 font-semibold"
              >
                {hero.primaryCta.label}
              </CredipleButton>
            )}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
