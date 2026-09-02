"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  // Lock the theme at mount time so logo sources never change mid-animation,
  // which was causing the "blink" on mobile / tablet when hydration flipped isDark.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const credipleLogo = useState(() => (isDark ? crediple_dark : crediple_light))[0];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const enterpriseLogo = useState(() => (isDark ? enterprise_dark : enterprise_light))[0];

  const handleImageLoad = useCallback(() => {
    loadedCount.current += 1;
    if (loadedCount.current >= 2) {
      setImagesReady(true);
    }
  }, []);

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

  useEffect(() => {
    const t = setTimeout(() => setImagesReady(true), 300);
    return () => clearTimeout(t);
  }, []);

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={credipleLogo.src}
                alt="Crediple"
                onLoad={handleImageLoad}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${step === "crediple" ? "opacity-100" : "opacity-0"
                  }`}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={enterpriseLogo.src}
                alt="Enterprise"
                onLoad={handleImageLoad}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${step === "enterprise" ? "opacity-100" : "opacity-0"
                  }`}
              />
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
