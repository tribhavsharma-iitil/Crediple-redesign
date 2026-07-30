"use client";

import Link from "next/link";
import { solutionsContent } from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { motion } from "framer-motion";
import sectionBg from "@/assets/home/visual_bg.png";


const { process } = solutionsContent;

export default function SolutionsProcess() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  const accent = isDark ? "#0047AB" : "#2F80ED";
  const rowBorder = isDark ? "rgba(248,248,248,0.1)" : "#E2E8F0";
  const cardBg = isDark ? "transparent" : "#FBFBFB";

  return (
    <section
      id="process"
      className="relative overflow-hidden section-py"
      style={{
        background: isDark
          ? `url(${sectionBg.src}) center/cover no-repeat`
          : "#FFFFFF"
      }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <HomeReveal variants={homeFadeLeft} className="m-auto">
            <h2
              className="font-heading text-2xl leading-tight font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
            >
              {process.titleLine1}
              <br />
              {process.titleLine2}
            </h2>
            <p
              className="mt-4 max-w-md text-sm leading-relaxed sm:text-[15px]"
              style={{ color: isDark ? "#7B8494" : "#64748B" }}
            >
              {process.subtitle}
            </p>
            <Link
              href={process.cta.href}
              className="mt-6 inline-flex h-10 items-center justify-center px-6 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
              style={{ background: "#0047AB" }}
            >
              {process.cta.label}
            </Link>
          </HomeReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            {process.steps.map((step, i) => {
              const isFirst = i === 0;
              const isLast = i === process.steps.length - 1;
              return (
                <div key={step.number} className="flex items-stretch gap-6">
                  {/* Dot + dotted connector column — stretches to match the card row via flex */}
                  <div className="relative w-5 shrink-0">
                    {!isFirst && (
                      <span
                        className="absolute top-0 bottom-1/2 left-1/2 w-0 border-l-2 border-dotted"
                        style={{ borderColor: isDark ? "#FFFFFF33" : "#2F80ED" }}
                      />
                    )}
                    {!isLast && (
                      <span
                        className="absolute top-1/2 bottom-0 left-1/2 w-0 border-l-2 border-dotted"
                        style={{ borderColor: isDark ? "#FFFFFF33" : "#2F80ED" }}
                      />
                    )}
                    {/* Horizontal connector from the dot to the card's left edge */}
                    <span
                      className="absolute top-1/2 left-1/2 h-0 border-t-2 border-dotted"
                      style={{ width: "calc(50% + 1.5rem)", borderColor: isDark ? "#FFFFFF33" : "#2F80ED" }}
                    />
                    <span
                      className="absolute top-1/2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ background: isDark ? "#0047AB" : "#0047AB" }}
                    />
                  </div>

                  <HomeItem variants={homeFadeUp} className="flex-1">
                    <div
                      className="p-6 sm:p-7"
                      style={{
                        background: cardBg,
                        borderStyle: "solid",
                        borderColor: rowBorder,
                        borderWidth: `${isFirst ? 1 : 0}px 1px 1px 1px`,
                        borderTopLeftRadius: isFirst ? "0rem" : 0,
                        borderTopRightRadius: isFirst ? "0rem" : 0,
                        borderBottomLeftRadius: isLast ? "0rem" : 0,
                        borderBottomRightRadius: isLast ? "0rem" : 0,
                      }}
                    >
                      <span
                        className="text-xs font-bold"
                        style={{ color: accent }}
                      >
                        {step.number}
                      </span>
                      <h3
                        className="font-heading mt-1 mb-1.5 text-lg font-bold"
                        style={{ color: isDark ? "#FFFFFF" : "#0F172A" }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: isDark ? "#D8E0F0" : "#475569" }}
                      >
                        {step.text}
                      </p>
                    </div>
                  </HomeItem>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
