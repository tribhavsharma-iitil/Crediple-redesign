"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import Loader from "@/components/animations/Loader";
import FloatingLogo from "@/components/animations/FloatingLogo";
import ScrollButton from "@/components/ui/ScrollButton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CookieConsent from "@/components/cookies/CookieConsent";
import {
  getInitialIntroPhase,
  isHomeIntroCompleted,
  markHomeIntroCompleted,
  type HomeIntroPhase,
} from "@/lib/homeIntro";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
  }, [isHome]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

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
    <>
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
        <Footer />
      </motion.div>

      <ScrollButton />
      <CookieConsent />
    </>
  );
}
