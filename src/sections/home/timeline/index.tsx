"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, useAnimation } from "framer-motion";
import { TIMELINE } from "@/utils/siteData";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const TIMELINE_DETAILS: Record<
  string,
  {
    headline: string;
    highlights: string[];
    metric?: string;
    metricLabel?: string;
  }
> = {
  "2018-2019": {
    headline: "Foundation & Concept Stage",
    highlights: [
      "Ideation of an OPC model built as a Loan Proposal Aggregator ecosystem",
      "Research on credit bureaus, scoring systems, and lending behaviour in India",
      "Development of core philosophy around credit correction, optimisation, and financial inclusion",
      "Early validation of credit pain points among individuals and small businesses",
      "Formation of the foundational team and advisory discussions initiated",
    ],
    metric: "2018",
    metricLabel: "Inception Year",
  },
  "2020-2022": {
    headline: "Research, Design & Early Structuring",
    highlights: [
      "Deep research driven development of credit improvement methodologies",
      "Structuring service frameworks for credit audit, correction, and score enhancement",
      "Mapping relationships between lenders, credit bureaus, and credit behaviour patterns",
      "Building the initial operational blueprint and service lifecycle design",
      "Establishing internal processes for credit analysis and integrated aggregator framework",
    ],
    metric: "Core",
    metricLabel: "Methodology Built",
  },
  "2022-2024": {
    headline: "Platform Building & Service Expansion",
    highlights: [
      "Transition from concept to a structured credit services platform ecosystem",
      "Service lines expansion of credit audit, correction, score improvement, and optimisation",
      "Design of customer journey workflows with SRN based service lifecycle",
      "Strengthening channel driven service delivery model across partners",
      "Development of training frameworks for credit partners and internal teams",
    ],
    metric: "SRN",
    metricLabel: "Lifecycle Deployed",
  },
  "2025-2026": {
    headline: "Scale, Automation & Ecosystem Growth",
    highlights: [
      "6 years of primary market research across multiple verticals, channels, and customer segments",
      "Deep understanding of market dynamics, resource gaps, challenges, and execution risks",
      "Development of a multi domain enterprise ecosystem across health, finance, law, technology, data, HR, and property management",
      "Phased launch of multiple brands through structured and controlled market entry",
      "Ecosystem-led strategy designed to overcome typical startup and brand launch challenges",
    ],
    metric: "7+",
    metricLabel: "Domains Integrated",
  },
};

// Smooth expand using measured pixel height — avoids the height:"auto" snap bug
function ExpandPanel({
  isOpen,
  details,
}: {
  isOpen: boolean;
  details: (typeof TIMELINE_DETAILS)[string] | undefined;
}) {
  const controls = useAnimation();
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!innerRef.current) return;

    if (isOpen) {
      // Measure actual content height, then animate from 0 → that value
      const fullHeight = innerRef.current.scrollHeight;
      controls.start({
        height: fullHeight,
        opacity: 1,
        transition: {
          height: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const },
          opacity: { duration: 0.6, ease: "easeOut", delay: 0.1 },
        },
      });
    } else {
      controls.start({
        height: 0,
        opacity: 0,
        transition: {
          height: { duration: 0.7, ease: [0.4, 0, 0.2, 1] as const },
          opacity: { duration: 0.3, ease: "easeIn" },
        },
      });
    }
  }, [isOpen, controls]);

  if (!details) return null;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={controls}
      style={{ overflow: "hidden", width: "100%" }}
    >
      {/* Inner wrapper — always rendered so scrollHeight is measurable */}
      <div ref={innerRef} style={{ width: "100%", padding: "0 24px", boxSizing: "border-box" }}>
        <div className="pt-4 pb-2" style={{ width: "100%" }}>
          <div
            style={{
              height: 1,
              background: "rgba(34,211,238,0.15)",
              marginBottom: 20,
            }}
          />

          {details.metric && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                background: "rgba(34,211,238,0.07)",
                border: "1px solid rgba(34,211,238,0.15)",
                borderRadius: 999,
                padding: "4px 14px",
                marginBottom: 20,
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

          {/* Staggered highlight rows */}
          {details.highlights.map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={
                isOpen
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 8 }
              }
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1] as const,
                delay: isOpen ? 0.35 + i * 0.1 : 0,
              }}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                marginBottom: i < details.highlights.length - 1 ? 12 : 0,
              }}
            >
              <span
                style={{
                  marginTop: 7,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  flexShrink: 0,
                  background: "rgba(34,211,238,0.6)",
                }}
              />
              <p
                style={{
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: "rgba(226, 232, 240, 0.95)",
                  margin: 0,
                  textAlign: "left",
                }}
              >
                {h}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function TimelineCard({
  item,
  isHovered,
  isAnyHovered,
  onHoverStart,
  onHoverEnd,
}: {
  item: (typeof TIMELINE)[number];
  isHovered: boolean;
  isAnyHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const details = TIMELINE_DETAILS[item.period];

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="w-full select-none"
      style={{ cursor: "pointer", height: "100%" }}
    >
      <motion.div
        animate={{
          borderColor: isHovered ? "rgba(34,211,238,0.35)" : "rgba(34,211,238,0.08)",
          backgroundColor: isHovered ? "rgba(10,18,40,0.95)" : "rgba(10,18,40,0.15)",
          boxShadow: isHovered
            ? "0 20px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,211,238,0.2)"
            : "0 0px 0px rgba(0,0,0,0)",
          opacity: !isHovered && isAnyHovered ? 0.35 : 1,
          scale: !isHovered && isAnyHovered ? 0.97 : 1,
        }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }}
        style={{
          border: "1px solid",
          borderRadius: 24,
          padding: "32px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          zIndex: isHovered ? 50 : 10,
          backdropFilter: isHovered ? "blur(20px)" : "none",
          overflow: "hidden",
          minHeight: 280,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Ambient Top Glow */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              key="glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              aria-hidden
              style={{
                position: "absolute",
                top: -40,
                left: "50%",
                transform: "translateX(-50%)",
                width: 220,
                height: 90,
                borderRadius: "50%",
                background:
                  "radial-gradient(ellipse, rgba(34,211,238,0.2), transparent 70%)",
                filter: "blur(16px)",
                pointerEvents: "none",
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Circle to Rectangle Morph ── */}
        <motion.div
          animate={{
            width: isHovered ? "100%" : 56,
            height: isHovered ? 44 : 56,
            borderRadius: isHovered ? 12 : 999,
            borderColor: isHovered
              ? "rgba(34,211,238,0.5)"
              : "rgba(34,211,238,0.2)",
            backgroundColor: isHovered
              ? "rgba(34,211,238,0.07)"
              : "rgba(10,18,40,0.5)",
          }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }}
          style={{
            border: "1.5px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 24,
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait">
            {isHovered ? (
              <motion.span
                key="tag"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: item.tagColor,
                  whiteSpace: "nowrap",
                }}
              >
                {item.tag}
              </motion.span>
            ) : (
              <motion.div
                key="dot"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--timeline-inner-dot, #22d3ee)",
                  boxShadow: "0 0 8px rgba(34,211,238,0.7)",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Period ── */}
        <span
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
            backgroundImage:
              "var(--timeline-period, linear-gradient(to right, #fff, #94a3b8))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            display: "inline-block",
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          {item.period}
        </span>

        {/* ── Tag label (visible only when NOT hovered) ── */}
        <motion.div
          animate={{
            opacity: isHovered ? 0 : 1,
            height: isHovered ? 0 : "auto",
            marginBottom: isHovered ? 0 : 8,
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ overflow: "hidden" }}
        >
          <span
            style={{
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: item.tagColor,
            }}
          >
            {item.tag}
          </span>
        </motion.div>

        {/* ── Title ── */}
        <motion.p
          animate={{
            color: isHovered ? "#fff" : "var(--timeline-text, #cbd5e1)",
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            maxWidth: isHovered ? "100%" : "170px",
            margin: "0 auto",
          }}
        >
          {details?.headline || item.title}
        </motion.p>

        {/* ── Smooth Expand Panel ── */}
        <ExpandPanel isOpen={isHovered} details={details} />
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const HOVER_DELAY_MS = 120;

  const handleHoverStart = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, HOVER_DELAY_MS);
  };

  const handleHoverEnd = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHoveredIndex(null);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const getGridTemplateColumns = () => {
    if (hoveredIndex === null) return "1fr 1fr 1fr 1fr";
    return TIMELINE.map((_, i) =>
      i === hoveredIndex ? "2.2fr" : "0.6fr",
    ).join(" ");
  };

  return (
    <section
      ref={ref}
      className="relative pt-24 pb-32 px-6"
      style={{ minHeight: "450px" }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, rgba(34,211,238,0.03) 0%, transparent 75%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:transition-[grid-template-columns] md:duration-[1200ms] md:ease-[cubic-bezier(0.16,1,0.3,1)] gap-5 items-stretch"
          style={{
            gridTemplateColumns:
              typeof window !== "undefined" && window.innerWidth >= 768
                ? getGridTemplateColumns()
                : "1fr",
          }}
        >
          {TIMELINE.map((item, i) => (
            <TimelineCard
              key={item.period}
              item={item}
              isHovered={hoveredIndex === i}
              isAnyHovered={hoveredIndex !== null}
              onHoverStart={() => handleHoverStart(i)}
              onHoverEnd={handleHoverEnd}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}