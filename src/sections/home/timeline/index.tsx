"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TIMELINE } from "@/utils/siteData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const dotEntryVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 },
  },
};

const TIMELINE_DETAILS: Record<string, {
  headline: string;
  highlights: string[];
  metric?: string;
  metricLabel?: string;
}> = {
  "2018-2019": {
    headline: "Foundation of Crediple",
    highlights: [
      "Crediple incorporated to simplify financial access for Indian SMEs and individuals",
      "Core founding team assembled across FinTech, LegalTech & HealthTech domains",
      "Seed funding secured; operations commenced from Udaipur, Rajasthan",
    ],
    metric: "2018",
    metricLabel: "Year Founded",
  },
  "2020-2022": {
    headline: "Healthcare, Finances & Digital Brands",
    highlights: [
      "Healthcare vertical launched with teleconsultation and medicine delivery in Tier 2 cities",
      "Financial services expanded — connecting borrowers with 40+ NBFC & bank partners",
      "Multiple digital brands onboarded under the Crediple umbrella ecosystem",
    ],
    metric: "40+",
    metricLabel: "NBFC & Bank Partners",
  },
  "2022-2024": {
    headline: "Future-ready technologies",
    highlights: [
      "AI-driven underwriting and risk assessment tools deployed across lending verticals",
      "Proprietary tech stack built to support real-time financial decisioning at scale",
      "Strategic partnerships established with leading fintech infrastructure providers",
    ],
    metric: "1.5L+",
    metricLabel: "Users Served",
  },
  "2025-2026": {
    headline: "Service across India",
    highlights: [
      "Expanded to 12+ Indian states with localised support in 6 regional languages",
      "Pan-India service network established for financial, health and digital offerings",
      "Recognised among India's top emerging multi-brand fintech ecosystems",
    ],
    metric: "12+",
    metricLabel: "States Active",
  },
};

// ─── Single Timeline Card ─────────────────────────────────────────────────────
// The entire column (circle + period + tag + title) is the hover target.
// On hover it expands vertically to reveal the extra detail section below.

function TimelineCard({
  item,
  delay,
}: {
  item: (typeof TIMELINE)[number];
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);
  const details = TIMELINE_DETAILS[item.period];

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer" }}
    >
      {/* The expanding card wrapper */}
      <motion.div
        animate={
          hovered
            ? {
                borderColor: "rgba(34,211,238,0.35)",
                backgroundColor: "var(--card-bg, rgba(10,18,40,0.85))",
                boxShadow:
                  "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(34,211,238,0.18), 0 0 32px rgba(34,211,238,0.07)",
              }
            : {
                borderColor: "rgba(34,211,238,0.08)",
                backgroundColor: "transparent",
                boxShadow: "none",
              }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          border: "1px solid",
          borderRadius: 20,
          padding: "20px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          backdropFilter: hovered ? "blur(14px)" : "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow smear top — only visible when expanded */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              key="glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              aria-hidden
              style={{
                position: "absolute",
                top: -30,
                left: "50%",
                transform: "translateX(-50%)",
                width: 160,
                height: 80,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(34,211,238,0.1), transparent 70%)",
                filter: "blur(12px)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Circle dot ── */}
        <motion.div
          variants={dotEntryVariants}
          transition={{ delay }}
          animate={
            hovered
              ? {
                  boxShadow:
                    "0 0 0 6px rgba(34,211,238,0.1), 0 0 28px rgba(34,211,238,0.3)",
                  borderColor: "rgba(34,211,238,0.9)",
                }
              : {
                  boxShadow: "0 0 16px rgba(34,211,238,0.1)",
                  borderColor: "var(--timeline-dot-border)",
                }
          }
          transition={{ duration: 0.3 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            border: "1.5px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--timeline-dot-bg)",
            marginBottom: 16,
            flexShrink: 0,
          }}
        >
          {/* Inner pulsing dot */}
          <motion.div
            animate={
              hovered
                ? { scale: [1, 1.5, 1], opacity: [1, 1, 1] }
                : { scale: [1, 1.25, 1], opacity: [0.85, 1, 0.85] }
            }
            transition={{
              repeat: Infinity,
              duration: hovered ? 1.1 : 2.4,
              ease: "easeInOut",
            }}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "var(--timeline-inner-dot, #22d3ee)",
              boxShadow: hovered
                ? "0 0 14px rgba(34,211,238,1)"
                : "0 0 8px rgba(34,211,238,0.7)",
            }}
          />
        </motion.div>

        {/* ── Period ── */}
        <span
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)",
            backgroundImage: "var(--timeline-period)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {item.period}
        </span>

        {/* ── Tag ── */}
        <span
          style={{
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: item.tagColor,
            marginBottom: 6,
          }}
        >
          {item.tag}
        </span>

        {/* ── Title ── */}
        <p
          style={{
            fontSize: 13.5,
            lineHeight: 1.55,
            color: "var(--timeline-text)",
            maxWidth: 180,
            margin: "0 auto",
          }}
        >
          {item.title}
        </p>

        {/* ── Expanded detail section — animates height from 0 → auto ── */}
        <motion.div
          initial={false}
          animate={hovered ? { height: "auto", opacity: 1, marginTop: 16 } : { height: 0, opacity: 0, marginTop: 0 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden", width: "100%" }}
        >
          {details && (
            <div style={{ width: "100%" }}>
              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: "rgba(34,211,238,0.15)",
                  marginBottom: 14,
                }}
              />

              {/* Metric pill */}
              {details.metric && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "rgba(34,211,238,0.07)",
                    border: "1px solid rgba(34,211,238,0.15)",
                    borderRadius: 999,
                    padding: "4px 12px",
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      backgroundImage: "linear-gradient(135deg, #22d3ee, #60a5fa)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {details.metric}
                  </span>
                  <span
                    style={{
                      fontSize: 9,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--text-muted, rgba(148,163,184,0.7))",
                    }}
                  >
                    {details.metricLabel}
                  </span>
                </div>
              )}

              {/* Highlights */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  textAlign: "left",
                }}
              >
                {details.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{ display: "flex", alignItems: "flex-start", gap: 8 }}
                  >
                    <span
                      style={{
                        marginTop: 5,
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        flexShrink: 0,
                        background: "rgba(34,211,238,0.6)",
                      }}
                    />
                    <p
                      style={{
                        fontSize: 11.5,
                        lineHeight: 1.6,
                        color: "var(--text-secondary, rgba(148,163,184,0.9))",
                        margin: 0,
                      }}
                    >
                      {h}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// ─── Timeline ────────────────────────────────────────────────────────────────

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section ref={ref} className="relative py-20 px-6">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 65%)",
          filter: "blur(40px)",
        }}
        aria-hidden
      />

      <div className="max-w-5xl mx-auto">
        {/* Connecting line — desktop only */}
        <div className="hidden md:block relative mb-0">
          <motion.div
            variants={lineVariants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="absolute top-[48px] left-[calc(12.5%+28px)] right-[calc(12.5%+28px)] h-[1px] origin-left"
            style={{ backgroundImage: "var(--timeline-line)" }}
            aria-hidden
          />
        </div>

        {/* Grid — align-items start so expanding cards don't stretch siblings */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-4"
          style={{ alignItems: "start" }}
        >
          {TIMELINE.map((item, i) => (
            <TimelineCard key={item.period} item={item} delay={i * 0.12} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}