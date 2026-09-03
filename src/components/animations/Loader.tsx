"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import enterprise_light from "@/assets/enterprise_light.png";
import enterprise_dark from "@/assets/enterprise_dark.png";
import crediple_light from "@/assets/crediple_light.png";
import crediple_dark from "@/assets/crediple_dark.png";
import { useTheme } from "@/context/ThemeContext";

interface LoaderProps {
  onComplete: () => void;
}

const STEP_MS = 1500;
const VISIBLE_MS = STEP_MS * 2;

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<"crediple" | "enterprise">("crediple");
  const [imagesReady, setImagesReady] = useState(false);
  const { isDark } = useTheme();
  const finishedRef = useRef(false);
  const loadedCount = useRef(0);
  const fallbackFired = useRef(false);

  // Detect client-side mount without setState-in-effect.
  // useSyncExternalStore returns false on server, true on client — no blink.
  const isMounted = useSyncExternalStore(
    () => () => { },      // subscribe (no-op, value never changes)
    () => true,          // client snapshot
    () => false,         // server snapshot
  );

  // Only derive logos from isDark after mount (when useTheme has resolved).
  // Before mount isMounted is false so we don't render <Image> at all.
  const credipleLogo = isDark ? crediple_dark : crediple_light;
  const enterpriseLogo = isDark ? enterprise_dark : enterprise_light;
  const themeReady = isMounted;

  // Mark images ready only once — whichever fires first (onLoad or fallback) wins.
  const markReady = useCallback(() => {
    if (fallbackFired.current) return;
    fallbackFired.current = true;
    setImagesReady(true);
  }, []);

  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1;
    if (loadedCount.current >= 2) {
      markReady();
    }
  }, [markReady]);

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!imagesReady) return;
    const stepTimer = setTimeout(() => setStep("enterprise"), STEP_MS);
    const hideTimer = setTimeout(() => {
      finish();
      setTimeout(() => setVisible(false), 500);
    }, VISIBLE_MS);
    return () => {
      clearTimeout(stepTimer);
      clearTimeout(hideTimer);
    };
  }, [finish, imagesReady]);

  // Safety-net fallback: if onLoad never fires (e.g. cached images skip the
  // event), force-start after a generous delay so the loader isn't stuck.
  useEffect(() => {
    const t = setTimeout(markReady, 800);
    return () => clearTimeout(t);
  }, [markReady]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "var(--loader-bg)" }}
        >
          <motion.div
            aria-hidden
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: imagesReady ? 0.6 : 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: imagesReady ? 1 : 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col items-center gap-5"
          >
            <div className="relative w-[180px] h-[180px]">
              {/* Only mount images after theme resolves to prevent src swap blink */}
              {themeReady && (
                <>
                  {/* Crediple logo — visible when step === "crediple" */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: step === "crediple" ? 1 : 0,
                      transition: "opacity 500ms ease-in-out",
                      willChange: "opacity",
                    }}
                  >
                    <Image
                      src={credipleLogo}
                      alt="Crediple"
                      fill
                      sizes="180px"
                      className="object-contain"
                      priority
                      onLoad={handleImageLoad}
                    />
                  </div>

                  {/* Enterprise logo — visible when step === "enterprise" */}
                  <div
                    className="absolute inset-0"
                    style={{
                      opacity: step === "enterprise" ? 1 : 0,
                      transition: "opacity 500ms ease-in-out",
                      willChange: "opacity",
                    }}
                  >
                    <Image
                      src={enterpriseLogo}
                      alt="Enterprise"
                      fill
                      sizes="180px"
                      className="object-contain"
                      priority
                      onLoad={handleImageLoad}
                    />
                  </div>
                </>
              )}
            </div>

            <div
              className="rounded-full overflow-hidden"
              style={{ width: 80, height: 2, background: "var(--border)" }}
            >
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="h-full w-1/2 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, var(--accent-color, #93c5fd), var(--accent-secondary, #818cf8), transparent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
