"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import enterprise_light from "@/assets/enterprise_light.png";
import enterprise_dark from "@/assets/enterprise_dark.png";
import crediple_light from "@/assets/crediple_light.png";
import crediple_dark from "@/assets/crediple_dark.png";
import crediple_light_icon_loading from "@/assets/crediple_light_icon_loading.png";
import crediple_dark_icon_loading from "@/assets/crediple_dark_icon_loading.png";
import { useTheme } from "@/context/ThemeContext";

interface LoaderProps {
  onComplete: () => void;
}

const STEP_MS = 1500;
const VISIBLE_MS = STEP_MS * 3;
const IMAGE_TIMEOUT_MS = 5000;

export default function Loader({ onComplete }: LoaderProps) {
  const [visible, setVisible] = useState(true);
  const [step, setStep] = useState<"icon" | "crediple" | "enterprise">(
    "icon"
  );
  const [imagesReady, setImagesReady] = useState(false);

  const { isDark } = useTheme();

  const finishedRef = useRef(false);

  const iconLogo = isDark
    ? crediple_dark_icon_loading
    : crediple_light_icon_loading;
  const credipleLogo = isDark ? crediple_dark : crediple_light;
  const enterpriseLogo = isDark ? enterprise_dark : enterprise_light;

  /**
   * Preload and decode both logos before showing them.
   * This avoids starting the animation while Safari/iOS
   * is still decoding the images.
   */
  useEffect(() => {
    let cancelled = false;

    const preloadImage = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new window.Image();

        img.onload = async () => {
          try {
            await img.decode();
          } catch {
            // decode() can fail even when the image is usable.
            // In that case, continue normally.
          }

          resolve();
        };

        img.onerror = () => resolve();

        img.src = src;
      });

    const preload = async () => {
      await Promise.all([
        preloadImage(iconLogo.src),
        preloadImage(credipleLogo.src),
        preloadImage(enterpriseLogo.src),
      ]);

      if (!cancelled) {
        setImagesReady(true);
      }
    };

    preload();

    return () => {
      cancelled = true;
    };
  }, [iconLogo.src, credipleLogo.src, enterpriseLogo.src]);

  /**
   * Safety fallback.
   * This is intentionally longer than the old 800ms fallback,
   * so we don't start the animation while images are still decoding.
   */
  useEffect(() => {
    if (imagesReady) return;

    const timeout = setTimeout(() => {
      setImagesReady(true);
    }, IMAGE_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, [imagesReady]);

  /**
   * Switch logo and finish loader.
   */
  const finish = useCallback(() => {
    if (finishedRef.current) return;

    finishedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    if (!imagesReady) return;

    const stepTimer1 = setTimeout(() => {
      setStep("crediple");
    }, STEP_MS);

    const stepTimer2 = setTimeout(() => {
      setStep("enterprise");
    }, STEP_MS * 2);

    const hideTimer = setTimeout(() => {
      finish();

      setTimeout(() => {
        setVisible(false);
      }, 500);
    }, VISIBLE_MS);

    return () => {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(hideTimer);
    };
  }, [imagesReady, finish]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="intro-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            backgroundColor: "var(--loader-bg)",
          }}
        >
          {/* Background glow */}
          <motion.div
            aria-hidden
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: imagesReady ? 0.6 : 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            className="absolute pointer-events-none rounded-full"
            style={{
              width: 400,
              height: 400,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.14) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
              filter: "blur(28px)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center gap-5">
            {/* Logos */}
            <div className="relative w-[180px] h-[180px]">
              {/* Icon */}
              <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[90px]"
                style={{
                  opacity: imagesReady && step === "icon" ? 1 : 0,
                  transition: "opacity 500ms ease-in-out",
                }}
              >
                <Image
                  src={iconLogo}
                  alt="Crediple Icon"
                  fill
                  sizes="180px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Crediple */}
              <div
                className="absolute inset-0"
                style={{
                  opacity:
                    imagesReady && step === "crediple" ? 1 : 0,
                  transition: "opacity 500ms ease-in-out",
                }}
              >
                <Image
                  src={credipleLogo}
                  alt="Crediple"
                  fill
                  sizes="180px"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Enterprise */}
              <div
                className="absolute inset-0"
                style={{
                  opacity:
                    imagesReady && step === "enterprise" ? 1 : 0,
                  transition: "opacity 500ms ease-in-out",
                }}
              >
                <Image
                  src={enterpriseLogo}
                  alt="Enterprise"
                  fill
                  sizes="180px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Loading indicator */}
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: 80,
                height: 2,
                background: "var(--border)",
              }}
            >
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}