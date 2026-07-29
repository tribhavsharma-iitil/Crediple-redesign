"use client";

import { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import Loader from "@/components/animations/Loader";
import FloatingLogo from "@/components/animations/FloatingLogo";
import ScrollButton from "@/components/ui/ScrollButton";
import Navbar from "@/components/layout/Navbar";
import CtaBanner from "@/components/layout/CtaBanner";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/cookies/CookieConsent";
import {
  getInitialIntroPhase,
  isHomeIntroCompleted,
  markHomeIntroCompleted,
  type HomeIntroPhase,
} from "@/lib/homeIntro";
import { consumePendingHash, normalizePath, scrollToHashWhenReady } from "@/lib/scrollToHash";

// 1. Create a lightweight context to share the animation state with inner child layout nodes
const IntroContext = createContext<{ phase: HomeIntroPhase }>({ phase: "ready" });
export const useIntroPhase = () => useContext(IntroContext);

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";

  const [phase, setPhase] = useState<HomeIntroPhase>(() =>
    getInitialIntroPhase(isHome)
  );

  const loaderDoneRef = useRef(false);

  useEffect(() => {
    if (!isHome) return;
    if (isHomeIntroCompleted()) {
      setPhase("ready");
    } else {
      loaderDoneRef.current = false;
      setPhase("loading");
    }
  }, [isHome, pathname]); // Added pathname fallback trigger tracking

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  // Hash CTAs: land at top, then animate down to the section (no instant jump)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pending = consumePendingHash();
    const hash = pending || window.location.hash.replace(/^#/, "") || null;
    if (!hash) return;

    const path = normalizePath(pathname || "/");

    return scrollToHashWhenReady(hash, {
      startFromTop: true,
      delayMs: pending ? 120 : 40,
      onScrolled: () => {
        window.history.replaceState(null, "", `${path}#${hash}`);
      },
    });
  }, [pathname]);

  const handleLoaderComplete = useCallback(() => {
    if (loaderDoneRef.current) return;
    loaderDoneRef.current = true;
    setPhase("flying");
  }, []);

  const handleIntroComplete = useCallback(() => {
    markHomeIntroCompleted();
    setPhase("ready");
  }, []);

  const contentReady = !isHome || phase === "ready";

  return (
    <IntroContext.Provider value={{ phase }}>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] origin-left h-[2px] pointer-events-none bg-brand-blue"
        style={{ scaleX }}
      />

      {isHome && phase === "loading" && (
        <Loader onComplete={handleLoaderComplete} />
      )}

      {isHome && (phase === "flying" || phase === "ready") && (
        <FloatingLogo phase={phase} onIntroComplete={handleIntroComplete} />
      )}

      <motion.div
        initial={false}
        animate={{
          opacity: contentReady ? 1 : 0,
        }}
        transition={{ duration: contentReady ? 0.4 : 0, delay: contentReady ? 0.1 : 0 }}
        style={{ pointerEvents: contentReady ? "auto" : "none" }}
        className="relative flex min-h-screen flex-col"
        aria-hidden={!contentReady}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <CtaBanner />
        <Footer />
      </motion.div>

      <ScrollButton />
      <CookieConsent />
    </IntroContext.Provider>
  );
}