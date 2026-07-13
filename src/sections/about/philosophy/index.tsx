"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { ChevronRight } from "lucide-react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { aboutContent, aboutColors } from "@/content/about";
import { homeTitleAccentStyle } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import {
  homeFadeUp,
  homeFadeLeft,
  homeStagger,
  homeViewport,
} from "@/lib/animations";

const { philosophy } = aboutContent;
const C = aboutColors;

/* Two arches between boxes only — anchors sit at the sides, never through box centers.
   Short mid segment under 02 is covered by the box. */
const DESKTOP_PATH =
  "M 22 28 C 30 8, 37 8, 45 28 L 55 28 C 63 8, 70 8, 78 28";

function stepFromProgress(progress: number) {
  if (progress < 0.33) return 0;
  if (progress < 0.66) return 1;
  return 2;
}

function usePathPoint(
  pathRef: RefObject<SVGPathElement | null>,
  progress: MotionValue<number>,
) {
  const [pos, setPos] = useState({ x: 22, y: 28 });

  const update = (latest: number) => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    if (!length) return;
    const point = path.getPointAtLength(
      Math.max(0, Math.min(1, latest)) * length,
    );
    setPos({ x: point.x, y: point.y });
  };

  useLayoutEffect(() => {
    update(progress.get());
  }, [pathRef, progress]);

  useMotionValueEvent(progress, "change", update);

  return pos;
}

export default function AboutPhilosophy() {
  const { isDark } = useTheme();
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    mass: 0.4,
  });

  const desktopDot = usePathPoint(pathRef, smoothProgress);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setActiveStep(stepFromProgress(latest));
    setProgressValue(latest);
  });

  useEffect(() => {
    const latest = smoothProgress.get();
    setActiveStep(stepFromProgress(latest));
    setProgressValue(latest);
  }, [smoothProgress]);

  return (
    <section
      id="philosophy"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bgSection : "#F8FAFC" }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10">
          <h2
            className="font-heading text-3xl font-black tracking-tight sm:text-4xl md:text-5xl"
            style={{ color: isDark ? C.textHeading : "#0F172A" }}
          >
            {philosophy.titleBefore}{" "}
            <span style={homeTitleAccentStyle}>{philosophy.titleAccent}</span>
          </h2>
        </HomeReveal>

        <HomeReveal variants={homeFadeUp}>
          <div
            className="mb-5 rounded-[22px] border px-4 py-8 sm:mb-6 sm:px-10 sm:py-14 md:px-14"
            style={{
              background: isDark ? "#0B1324" : "#FFFFFF",
              borderColor: isDark ? "rgba(248,248,248,0.08)" : "#E2E8F0",
            }}
          >
            <p
              className="mb-12 text-center text-[10px] font-semibold uppercase tracking-[0.18em] sm:mb-14 sm:text-[11px]"
              style={{ color: isDark ? "#707880" : "#64748B" }}
            >
              {philosophy.intro}
            </p>

            <div ref={trackRef} className="mx-auto mb-12 max-w-4xl sm:mb-14">
              {/* Mobile stacked path */}
              <div className="flex flex-col items-center gap-0 sm:hidden">
                {philosophy.principles.map((item, i) => {
                  const isActive = activeStep === i;
                  const segment = progressValue * 3 - i;
                  const dotInSegment = segment >= 0 && segment <= 1;

                  return (
                    <div
                      key={`m-${item.number}`}
                      className="flex w-full flex-col items-center text-center"
                    >
                      <motion.div
                        animate={{
                          boxShadow: isActive
                            ? "0 0 0 4px rgba(47,128,237,0.25), 0 0 28px rgba(47,128,237,0.45)"
                            : "0 4px 12px rgba(15,23,42,0.08)",
                          scale: isActive ? 1.06 : 1,
                        }}
                        transition={{ duration: 0.35 }}
                        className="relative z-10 flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] text-[13px] font-bold text-[#0F172A] dark:border-[rgba(176,200,248,0.35)] dark:bg-[#0E1628] dark:text-white"
                      >
                        {item.number}
                      </motion.div>
                      <p className="mt-3 max-w-[260px] text-sm font-semibold leading-snug text-[#0F172A] dark:text-[#F0F0F0]">
                        {item.text}
                      </p>
                      {i < philosophy.principles.length - 1 && (
                        <div aria-hidden className="relative my-4 h-10 w-px">
                          <div className="absolute inset-0 border-l border-dashed border-[rgba(47,128,237,0.4)] dark:border-[rgba(200,220,255,0.55)]" />
                          {dotInSegment && (
                            <span
                              className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full"
                              style={{
                                top: `${segment * 100}%`,
                                background: "#5FA8FF",
                                boxShadow: "0 0 10px rgba(95,168,255,0.95)",
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Desktop wave path */}
              <div className="hidden sm:block">
                <div className="relative h-16 md:h-20">
                  <svg
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
                    viewBox="0 0 100 56"
                    fill="none"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={DESKTOP_PATH}
                      stroke={
                        isDark
                          ? "rgba(200, 220, 255, 0.4)"
                          : "rgba(47, 128, 237, 0.35)"
                      }
                      strokeWidth="1.5"
                      strokeDasharray="3.5 5.5"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                    <motion.path
                      d={DESKTOP_PATH}
                      stroke="#5FA8FF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      style={{ pathLength: smoothProgress }}
                    />
                    <path
                      ref={pathRef}
                      d={DESKTOP_PATH}
                      fill="none"
                      stroke="transparent"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Dot rides the dashed path beside the boxes (sides only) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute z-[15] block h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${desktopDot.x}%`,
                      top: `${(desktopDot.y / 56) * 100}%`,
                      background: "#5FA8FF",
                      boxShadow:
                        "0 0 0 5px rgba(95,168,255,0.22), 0 0 16px rgba(95,168,255,0.95)",
                    }}
                  />

                  <div className="relative z-20 grid h-full grid-cols-3 items-center">
                    {philosophy.principles.map((item, i) => {
                      const isActive = activeStep === i;
                      return (
                        <div
                          key={`d-${item.number}`}
                          className="flex justify-center"
                        >
                          <motion.div
                            animate={{
                              boxShadow: isActive
                                ? isDark
                                  ? "0 0 0 4px rgba(47,128,237,0.28), 0 0 28px rgba(47,128,237,0.5)"
                                  : "0 0 0 4px rgba(47,128,237,0.18), 0 8px 20px rgba(47,128,237,0.2)"
                                : isDark
                                  ? "0 0 24px rgba(47,128,237,0.2)"
                                  : "0 4px 12px rgba(15,23,42,0.08)",
                              scale: isActive ? 1.08 : 1,
                            }}
                            transition={{ duration: 0.35 }}
                            className="relative flex h-11 w-11 items-center justify-center rounded-[10px] border border-[#CBD5E1] bg-[#F8FAFC] text-[13px] font-bold text-[#0F172A] dark:border-[rgba(176,200,248,0.35)] dark:bg-[#0E1628] dark:text-white"
                          >
                            {item.number}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-4">
                  {philosophy.principles.map((item, i) => (
                    <motion.p
                      key={`dl-${item.number}`}
                      animate={{ opacity: activeStep === i ? 1 : 0.55 }}
                      className="px-1 text-center text-sm font-semibold leading-snug text-[#0F172A] dark:text-[#F0F0F0]"
                    >
                      {item.text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </div>

            <p
              className="text-center text-sm font-bold uppercase tracking-[0.08em] sm:text-base"
              style={{ color: isDark ? C.textAccentSoft : C.accentSoft }}
            >
              {philosophy.verdict}
            </p>
          </div>
        </HomeReveal>

        <motion.div
          variants={homeStagger}
          initial="hidden"
          whileInView="visible"
          viewport={homeViewport}
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
        >
          {philosophy.pillars.map((item) => (
            <HomeItem key={item.number} variants={homeFadeUp}>
              <div
                className="flex items-center gap-4 rounded-[16px] border px-5 py-[18px] transition-colors hover:border-[rgba(90,150,227,0.35)]"
                style={{
                  background: isDark ? "#0B1324" : "#FFFFFF",
                  borderColor: isDark
                    ? "rgba(248,248,248,0.08)"
                    : "#E2E8F0",
                }}
              >
                <span
                  className="w-7 shrink-0 font-heading text-sm font-bold tabular-nums"
                  style={{ color: isDark ? C.textMuted : "#94A3B8" }}
                >
                  {item.number}
                </span>
                <span
                  className="min-w-0 flex-1 text-sm font-medium"
                  style={{ color: isDark ? C.textHeading : "#0F172A" }}
                >
                  {item.label}
                </span>
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                  style={{
                    borderColor: isDark
                      ? "rgba(248,248,248,0.16)"
                      : "#E2E8F0",
                    color: isDark ? C.textMuted : "#64748B",
                    background: isDark ? "rgba(18,28,51,0.6)" : "#F8FAFC",
                  }}
                >
                  <ChevronRight size={14} />
                </span>
              </div>
            </HomeItem>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
