"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import yakaBlue from "@/assets/yaka_blue.png";
import type { HomeIntroPhase } from "@/lib/homeIntro";

const NAV_H = 72;
const SCROLL_START = 50;
const SCROLL_END = 240;
const LOGO_HERO = 132;
const LOGO_NAV = 34;
const ANCHOR_ID = "yaka-logo-anchor";

interface FloatingLogoProps {
  phase: HomeIntroPhase;
  onIntroComplete: () => void;
}

type Rect = { x: number; y: number; width: number; height: number };

function readAnchor(): Rect | null {
  const el = document.getElementById(ANCHOR_ID);
  if (!el) return null;
  const r = el.getBoundingClientRect();
  return { x: r.left, y: r.top, width: r.width, height: r.height };
}

function fallbackHero(vw: number): Rect {
  const pad = vw < 900 ? 24 : 48;
  return {
    x: vw - pad - LOGO_HERO,
    y: NAV_H + 24,
    width: LOGO_HERO,
    height: LOGO_HERO,
  };
}

function viewportCenter(vw: number, vh: number): Rect {
  return {
    x: vw / 2 - LOGO_HERO / 2,
    y: vh / 2 - LOGO_HERO / 2,
    width: LOGO_HERO,
    height: LOGO_HERO,
  };
}

export default function FloatingLogo({
  phase,
  onIntroComplete,
}: FloatingLogoProps) {
  const [vw, setVw] = useState(0);
  const [vh, setVh] = useState(0);
  const [heroRect, setHeroRect] = useState<Rect | null>(null);
  const [landed, setLanded] = useState(() => phase === "ready");
  const completeRef = useRef(phase === "ready");

  const rawProgress = useMotionValue(0);
  const scrollProgress = useSpring(rawProgress, {
    stiffness: 130,
    damping: 24,
    mass: 0.8,
  });

  const measure = useCallback(() => {
    if (typeof window === "undefined") return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    setVw(w);
    setVh(h);
    setHeroRect(readAnchor() ?? fallbackHero(w));
  }, []);

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (phase !== "flying" && phase !== "ready") return;
    measure();
    const t = setTimeout(measure, 150);
    return () => clearTimeout(t);
  }, [phase, measure]);

  const rightPad = vw < 900 ? 24 : 40;
  const navX = Math.max(0, vw - rightPad - 108 - 12 - 36 - 12 - LOGO_NAV);
  const navY = (NAV_H - LOGO_NAV) / 2;

  const scrollX = useTransform(scrollProgress, [0, 1], [heroRect?.x ?? 0, navX]);
  const scrollY = useTransform(scrollProgress, [0, 1], [heroRect?.y ?? 0, navY]);
  const scrollSize = useTransform(scrollProgress, [0, 1], [LOGO_HERO, LOGO_NAV]);
  const scrollOpacity = useTransform(scrollProgress, [0.65, 0.85], [1, 0]);

  useEffect(() => {
    if (!landed || phase !== "ready") return;
    const onScroll = () => {
      const p = Math.min(
        1,
        Math.max(0, (window.scrollY - SCROLL_START) / (SCROLL_END - SCROLL_START))
      );
      rawProgress.set(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [landed, phase, rawProgress]);

  const handleLand = useCallback(() => {
    if (completeRef.current) return;
    completeRef.current = true;
    setLanded(true);
    onIntroComplete();
  }, [onIntroComplete]);

  useEffect(() => {
    if (vw > 0 && vw < 768 && phase === "flying") {
      handleLand();
    }
  }, [vw, phase, handleLand]);

  if (vw < 768 || !heroRect || vh === 0) {
    return null;
  }

  const logo = yakaBlue;

  if (phase === "flying" && !landed) {
    const center = viewportCenter(vw, vh);
    return (
      <motion.div
        className="fixed z-[55] pointer-events-none"
        initial={{
          left: center.x,
          top: center.y,
          width: center.width,
          height: center.height,
        }}
        animate={{
          left: heroRect.x,
          top: heroRect.y,
          width: heroRect.width,
          height: Math.min(heroRect.height, heroRect.width),
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          damping: 18,
          mass: 1,
        }}
        onAnimationComplete={handleLand}
      >
        <Image src={logo} alt="A YAKA Enterprise" fill className="object-contain" priority />
      </motion.div>
    );
  }

  // FIXED: The internal calculation states stay live, but rendering outputs nothing.
  // This hands off visual presentation seamlessly over to the native Home Hero section box.
  if (phase === "ready" && landed) {
    return null;
  }

  return null;
}