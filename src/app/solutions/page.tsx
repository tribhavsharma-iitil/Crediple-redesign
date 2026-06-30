"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { motion, Variants } from "framer-motion"; // ◄ Added Variants import
import {
  ArrowRight,
  CircleDollarSign,
  DatabaseZap,
  HeartPulse,
  Scale,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";
import { SERVICES_HERO_CONTENT } from "@/utils/siteData";
import { useTheme } from "@/context/ThemeContext";

// ── animation variants ────────────────────────────────────────────────────────
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// ── data ──────────────────────────────────────────────────────────────────────
const solutionDomains = [
  {
    title: "HealthTech Systems",
    text: "Patient acquisition, provider visibility, care workflows, and clinic operations shaped into one connected digital journey.",
    icon: HeartPulse,
  },
  {
    title: "FinTech Intelligence",
    text: "Credit clarity, borrower profiling, lending workflows, and financial decision systems built for structured growth.",
    icon: CircleDollarSign,
  },
  {
    title: "LegalTech Workflows",
    text: "Case handling, client onboarding, documentation, and service delivery brought into cleaner digital operating models.",
    icon: Scale,
  },
  {
    title: "Data Intelligence",
    text: "Dashboards, aggregation layers, predictive signals, and decision support systems that turn scattered data into action.",
    icon: DatabaseZap,
  },
];

const processSteps = [
  {
    title: "Discover",
    text: "We map the industry problem, operational friction, user journey, and scale requirement before defining the system.",
  },
  {
    title: "Architect",
    text: "We design the workflows, intelligence layer, data movement, and brand experience that make the solution repeatable.",
  },
  {
    title: "Build",
    text: "We turn the model into digital infrastructure, dashboards, tools, and growth systems with measurable outcomes.",
  },
  {
    title: "Scale",
    text: "We refine adoption, performance loops, automation, and expansion paths so every solution can grow beyond a single use case.",
  },
];

const capabilities = [
  "Digital presence systems",
  "Workflow automation",
  "Data dashboards",
  "Customer acquisition funnels",
  "Operational intelligence",
  "Brand ecosystem design",
];

// ── GlowCard ──────────────────────────────────────────────────────────────────
function GlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isDark } = useTheme();
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
      className={`relative h-full w-full rounded-[24px] border transition-all duration-300 overflow-hidden ${
        isDark 
          ? "bg-[#090F1C] border-white/[0.05]" 
          : "bg-white border-[#E2E8F0] shadow-sm shadow-blue-100/40"
      } ${className}`}
    >
      {hovered && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: isDark
              ? `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(59,130,246,0.08), transparent 80%)`
              : `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(21,93,252,0.04), transparent 80%)`,
          }}
        />
      )}
      <div className="relative h-full w-full z-10">
        {children}
      </div>
    </div>
  );
}

// ── page ──────────────────────────────────────────────────────────────────────
export default function SolutionsPage() {
  const { isDark } = useTheme();

  const textPrimary = isDark ? "#ffffff" : "#1E293B";
  const textSecondary = isDark ? "#94a3b8" : "#475569";
  const accentColor = isDark ? "#3B82F6" : "#155DFC";
  const labelColor = isDark ? "#64748B" : "#94A3B8";

  const alternateBgStyle = {
    background: isDark
      ? "linear-gradient(135deg, #040814 0%, #081026 50%, #030712 100%)"
      : "linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #ECFEFF 100%)",
  };

  return (
    <div className="w-full overflow-x-hidden min-h-screen" style={alternateBgStyle}>
      <PageHero {...SERVICES_HERO_CONTENT} />

      {/* ── What We Solve ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <motion.div variants={fadeLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <p 
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: labelColor }}
            >
              What We Solve
            </p>
            <h2
              className="font-heading font-bold text-3xl md:text-5xl tracking-tight leading-[1.15]"
              style={{ color: textPrimary }}
            >
              We turn fragmented operations into connected ecosystems.
            </h2>
          </motion.div>

          <motion.div 
            variants={fadeRight} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            className="flex flex-col gap-5 pt-2 md:pt-8"
          >
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: textSecondary }}
            >
              Our solutions sit between strategy, technology, and operational execution. Instead of building
              isolated tools, we design systems that help teams acquire users, manage workflows, interpret data,
              and scale decision making.
            </p>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accentColor }}>
              Every solution is built to be repeatable, measurable, and ready for multi-domain expansion.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />
      </div>

      {/* ── Solution Domains ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p 
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: labelColor }}
            >
              DOMAINS
            </p>
            <h2
              className="font-heading font-bold text-3xl md:text-5xl tracking-tight"
              style={{ color: textPrimary }}
            >
              Solution Domains
            </h2>
            <p
              className="mx-auto max-w-2xl text-sm leading-relaxed mt-4"
              style={{ color: textSecondary }}
            >
              Each domain is distinct, but all are powered by the same Crediple approach: structured workflows,
              intelligent data, and scalable digital infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {solutionDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div key={domain.title} variants={cardVariant}>
                  <GlowCard>
                    <div className="p-8 h-full flex flex-col gap-6">
                      <div style={{ color: accentColor }}>
                        <Icon size={26} strokeWidth={2} />
                      </div>
                      
                      <div className="flex flex-col gap-2 flex-1">
                        <h3
                          className="font-heading font-bold text-xl tracking-tight"
                          style={{ color: textPrimary }}
                        >
                          {domain.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: textSecondary }}
                        >
                          {domain.text}
                        </p>
                      </div>

                      <Link 
                        href="/solutions" 
                        className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider transition-all group/link mt-2" 
                        style={{ color: accentColor }}
                      >
                        View Solutions 
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />
      </div>

      {/* ── How We Build ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p 
              className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
              style={{ color: labelColor }}
            >
              OUR PROCESS
            </p>
            <h2
              className="font-heading font-bold text-3xl md:text-5xl tracking-tight"
              style={{ color: textPrimary }}
            >
              How We Build Solutions
            </h2>
            <p
              className="text-sm leading-relaxed max-w-xl mx-auto mt-4"
              style={{ color: textSecondary }}
            >
              A system-first process from problem discovery to scalable execution.
            </p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {processSteps.map((step, index) => (
              <motion.div key={step.title} variants={cardVariant}>
                <GlowCard>
                  <div className="p-8 h-full flex flex-col gap-5">
                    <div
                      className="font-heading font-black text-2xl tracking-tight"
                      style={{ color: accentColor }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3
                        className="font-heading font-bold text-xl tracking-tight"
                        style={{ color: textPrimary }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: textSecondary }}
                      >
                        {step.text}
                      </p>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-[1400px] px-4 md:px-6">
        <div style={{ height: "1px", background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" }} />
      </div>

      {/* ── Core Capabilities ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 md:py-28 max-w-[1200px] mx-auto px-4 md:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <GlowCard>
            <div className="px-6 py-16 text-center sm:px-12">
              <p 
                className="text-xs font-bold uppercase tracking-[0.2em] mb-3"
                style={{ color: labelColor }}
              >
                WHAT WE DELIVER
              </p>
              <h2
                className="font-heading font-bold text-3xl md:text-5xl tracking-tight"
                style={{ color: textPrimary }}
              >
                Core Capabilities
              </h2>
              <p
                className="mx-auto mb-12 max-w-2xl text-sm leading-relaxed mt-4"
                style={{ color: textSecondary }}
              >
                Our solutions combine design, infrastructure, automation, and intelligence into practical systems that teams can use every day.
              </p>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {capabilities.map((capability) => (
                  <motion.div
                    key={capability}
                    variants={cardVariant}
                    className="flex items-center gap-3 rounded-[20px] px-5 py-4 text-left border transition-all duration-300"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.02)" : "rgba(240,247,255,0.5)",
                      borderColor: isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0",
                    }}
                  >
                    <div 
                      className="h-5 w-5 shrink-0 rounded-md flex items-center justify-center" 
                      style={{ background: isDark ? "rgba(59,130,246,0.15)" : "rgba(21,93,252,0.08)" }}
                    >
                      <Check className="h-3.5 w-3.5" style={{ color: accentColor }} />
                    </div>
                    <span
                      className="text-sm font-semibold tracking-tight"
                      style={{ color: textPrimary }}
                    >
                      {capability}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </GlowCard>
        </motion.div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-28 text-center max-w-[1400px] mx-auto px-4 md:px-6">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <div 
            className="rounded-[24px] py-16 px-6 sm:px-12 border transition-all duration-300" 
            style={{ 
              background: isDark ? "rgba(9,15,28,0.6)" : "rgba(255,255,255,0.7)",
              borderColor: isDark ? "rgba(255,255,255,0.05)" : "#E2E8F0"
            }}
          >
            <h2
              className="font-heading font-bold text-3xl md:text-5xl tracking-tight max-w-2xl mx-auto leading-[1.15] mb-5"
              style={{ color: textPrimary }}
            >
              Build the system behind your next industry solution.
            </h2>

            <p
              className="mx-auto mb-10 max-w-2xl text-sm leading-relaxed"
              style={{ color: textSecondary }}
            >
              Whether the challenge is visibility, workflow speed, data clarity, or scale, Crediple designs the operating layer that makes progress repeatable.
            </p>

            <Button asChild size="xl" className="font-semibold text-base px-8 h-14 rounded-xl group shadow-sm">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}