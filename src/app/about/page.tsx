"use client";

import { motion } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Check } from "lucide-react";
import PageHero from "@/components/layout/PageHero";
import { ABOUT_HERO_CONTENT } from "@/utils/siteData";
import crediple_light from "@/assets/crediple_light.png";
import crediple_dark from "@/assets/crediple_dark.png";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";

// ─── Reusable animation variants ───────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Glow Card (Matching Homepage System) ────────────────────────────────────
function GlowCard({
  children,
  className = "",
  glowVar = "var(--glow-cyan)",
}: {
  children: React.ReactNode;
  className?: string;
  glowVar?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-[24px] p-[1.5px] ${className}`}
      style={{
        background: hovered
          ? `radial-gradient(160px circle at ${glow.x}% ${glow.y}%, ${glowVar}, var(--glow-secondary) 45%, var(--card-glow-base) 100%)`
          : "var(--card-glow-base)",
        transition: "background 0.08s ease",
      }}
    >
      <div
        className="relative rounded-[23px] h-full overflow-hidden"
        style={{ background: "var(--card-inner)", border: "1px solid var(--border-subtle)" }}
      >
        {hovered && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[23px]"
            style={{
              background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, color-mix(in srgb, var(--icon-accent) 5%, transparent) 0%, transparent 70%)`,
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}

// ─── Accent Card (Matching Homepage Specs) ───────────────────────────────────
function AccentCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] h-full ${className}`}
      style={{
        background: "var(--icon-accent-bg)",
        border: "1px solid var(--icon-accent-border)",
      }}
    >
      {children}
    </div>
  );
}

export default function AboutUs() {
  const { isDark } = useTheme();

  return (
    <div
      className="w-full overflow-x-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── HERO SECTION (Refactored to match split layout from Screenshot 2026-06-27 193006.jpg) ── */}
      <PageHero {...ABOUT_HERO_CONTENT} />


      {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── FOUNDATION ───────────────────────────────────────────────────── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-10 items-center relative z-10">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-[0.25rem] mb-5"
              style={{ color: "var(--text-muted)" }}
            >
              Our Foundation
            </p>
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              More Than a Holding  Company.<br/>
  
              A system builder across industries
            </h2>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p
              className="text-lg md:text-xl leading-relaxed mb-4 font-normal"
              style={{ color: "var(--text-secondary)" }}
            >
              Crediple transforms traditional business models into scalable,
              technology driven ecosystems. We bring structure, intelligence,
              and scalability to every industry we build in.
            </p>
            <p
              className="text-sm font-medium text-left"
              style={{ color: "var(--icon-accent)" }}
            >
              We are not just building Brands. We are building systems that
              power industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── PHILOSOPHY ───────────────────────────────────────────────────── */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[400px] h-[300px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-secondary) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-3xl text-center mb-4 sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Our Operating Philosophy
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="text-center text-sm md:text-base mb-12"
            style={{ color: "var(--text-secondary)" }}
          >
            We do not run businesses in isolation. We design interconnected
            ecosystems.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
          >
            <GlowCard glowVar="var(--glow-cyan)">
              <div className="px-6 sm:px-8 py-10">
                <p
                  className="text-center text-sm mb-12 uppercase tracking-wider font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Every vertical we enter is evaluated on three principles:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-6">
                  {[
                    "Can we standardise this process?",
                    "Can it be scaled through technology?",
                    "Can it improve decision making or access?",
                  ].map((text, i) => (
                    <motion.div
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      custom={i}
                      className="flex flex-col items-center text-center gap-5"
                    >
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold shadow-md border"
                        style={{
                          background: "var(--icon-accent-bg)",
                          color: "var(--icon-accent)",
                          borderColor: "var(--icon-accent-border)"
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      <p
                        className="text-sm font-semibold leading-snug max-w-[200px]"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {text}
                      </p>
                    </motion.div>
                  ))}
                </div>
                <div
                  className="border-t mb-6 mt-8"
                  style={{ borderColor: "var(--border-subtle)" }}
                />
                <p
                  className="text-center font-bold text-base md:text-lg tracking-wide uppercase"
                  style={{ color: "var(--icon-accent)" }}
                >
                  If the answer is yes — we build it.
                </p>
              </div>
            </GlowCard>
          </motion.div>



          {/* Cards grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-4 mt-8"
          >
            {[
              {
                label: "Transparent systems",
                number: "01",
              },
              {
                label: "Scalable digital infrastructure",
                number: "02",
              },
              {
                label: "Industry ready technology frameworks",
                number: "03",
              },
              {
                label: "Long term ecosystem value",
                number: "04",
              },
            ].map((item, i) => (
              <motion.div key={item.label} variants={fadeUp} custom={i}>
                <GlowCard glowVar="var(--glow-cyan)">
                  <div className="flex items-center gap-4 p-5">
                    {/* Numbered badge */}
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-[13px]"
                      style={{
                        background: "var(--icon-accent-bg)",
                        border: "1px solid var(--icon-accent-border)",
                        color: "var(--icon-accent)",
                        letterSpacing: "0.04em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {item.number}
                    </div>
                    <span
                      className="text-sm leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* ── divider ──────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-px" style={{ background: "var(--border-subtle)" }} />
      </div>

      {/* ── FUTURE DIRECTION ─────────────────────────────────────────────── */}
      <section className="relative py-16 overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 60%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <GlowCard glowVar="var(--glow-cyan)">
              <div className="px-8 sm:px-14 py-10 text-center">
                <h2
                  className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4"
                  style={{ color: "var(--text-primary)" }}
                >
                  Future Direction
                </h2>
                <p
                  className="text-md sm:text-lg mb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Our focus is not just expansion. It is{" "}
                  <strong
                    className="font-bold"
                    style={{ color: "var(--icon-accent)" }}
                  >
                    ecosystem convergence
                  </strong>
                  .
                </p>
                <p
                  className="text-sm mb-10 mx-auto leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  Where healthcare, finance, legal systems, and data
                  intelligence begin to interact seamlessly under one{" "}
                  <br className="hidden sm:block" />
                  unified structure.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Healthcare",
                    "Finance",
                    "Legal Systems",
                    "Data Intelligence",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-5 py-2.5 rounded-full text-sm"
                      style={{
                        background: "var(--icon-accent-bg)",
                        color: "var(--icon-accent)",
                        border: "1px solid var(--icon-accent-border)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER SIGN-OFF ───────────────────────────────────────────────── */}
      <section className="relative py-20 text-center overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="max-w-xl mx-auto px-6 relative z-10">
          <Image
            src={isDark ? crediple_dark : crediple_light}
            alt="Crediple"
            width={200}
            className="mx-auto mb-6"
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="w-12 h-0.5 mx-auto mb-8"
            style={{ background: "var(--icon-accent)" }}
          />
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="text-sm mb-4"
            style={{ color: "var(--text-muted)" }}
          >
            Crediple is not a traditional holding company.
          </motion.p>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={3}
            className="font-bold text-lg leading-snug mb-12"
            style={{ color: "var(--text-primary)" }}
          >
            It is a multi-domain system architecture designed to transform how
            industries operate.
          </motion.p>
          <div
            className="border-t pt-6"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              © 2026 Crediple. Building systems that power industries.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
