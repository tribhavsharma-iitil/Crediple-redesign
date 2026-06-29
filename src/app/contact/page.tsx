"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Clock, Building2, Map, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import AnimatedInput from "@/components/ui/AnimatedInput";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Address detail rows ──────────────────────────────────────────────────────

const ADDRESS_ROWS: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
}[] = [
  {
    icon: Building2,
    label: "Building",
    value: (
      <>
        Sattva Knowledge City
        <br />
        Hi-Tech City
      </>
    ),
  },
  {
    icon: Map,
    label: "Pin code",
    value: (
      <>
        500081
        <br />
        Telangana, India
      </>
    ),
  },
  {
    icon: Mail,
    label: "Email",
    value: (
      <a
        href="mailto:hello@crediple.com"
        className="transition-opacity hover:opacity-75"
        style={{ color: "#22d3ee" }}
      >
        hello@crediple.com
      </a>
    ),
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within 1 business day",
  },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setMouse({
        x: ((e.clientX - r.left) / r.width) * 100,
        y: ((e.clientY - r.top) / r.height) * 100,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[70svh] items-center overflow-hidden pt-16"
      style={{ background: "var(--bg-primary)" }}
    >
      <div
        className="absolute inset-y-0 right-0 hidden w-[58%] bg-right bg-cover bg-no-repeat md:block"
        style={{
          backgroundImage: `linear-gradient(90deg, var(--bg-primary) 0%, color-mix(in srgb, var(--bg-primary) 72%, transparent) 34%, transparent 76%)`,
          opacity: 0.34,
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(620px circle at ${mouse.x}% ${mouse.y}%, var(--hero-glow), transparent 65%)`,
          transition: "background 0.12s ease",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, var(--glow-secondary) 0%, transparent 60%)",
          filter: "blur(60px)",
        }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-28"
        style={{ background: "linear-gradient(to top, var(--background), transparent)" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-20 md:grid-cols-[minmax(0,1fr)_360px]">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-3xl">
          <motion.div
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 backdrop-blur-xl"
            style={{
              border: "1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)",
              background: "color-mix(in srgb, var(--accent-color) 8%, transparent)",
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: "var(--accent-color)" }} />
            <span className="text-xs font-medium tracking-wide" style={{ color: "var(--accent-color)" }}>
              Contact Crediple
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-3xl font-bold leading-[1.06] tracking-tight sm:text-4xl md:text-5xl xl:text-6xl"
            style={{ color: "var(--text-primary)" }}
          >
            Let us build the next
            <span className="mt-2 block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              operating layer together.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="mt-7 max-w-2xl text-sm font-light leading-relaxed md:text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Talk to us about your brand, workflow, digital system, or growth challenge.
            We usually respond within one business day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="overflow-x-hidden font-sans" style={{ background: "var(--background)" }}>
      <ContactHero />

      {/* ── Contact Form ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-20" style={{ background: "var(--bg-secondary)" }}>
        <div
          className="pointer-events-none absolute left-1/4 top-1/2 h-[300px] w-[500px] -translate-y-1/2"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-6 md:grid-cols-2">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col"
          >
            <div className="mb-8 pl-5" style={{ borderLeft: "3px solid var(--icon-accent)" }}>
              <h2 className="mb-5 text-2xl font-bold leading-tight sm:text-3xl" style={{ color: "var(--text-primary)" }}>
                Contact us for more{" "}
                <br className="hidden sm:block" />
                Information
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We just need a couple of hours.
                <br />
                No more than 2 working days since receiving your request.
              </p>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AnimatedInput name="name" placeholder="Name*" value={form.name} onChange={handleChange} required />
                <AnimatedInput name="email" type="email" placeholder="Email*" value={form.email} onChange={handleChange} required />
              </motion.div>

              <motion.div variants={fadeUp}>
                <AnimatedInput name="subject" placeholder="Subject*" value={form.subject} onChange={handleChange} required />
              </motion.div>

              <motion.div variants={fadeUp}>
                <AnimatedInput
                  name="message"
                  placeholder="Please describe what you need..."
                  value={form.message}
                  onChange={handleChange}
                  multiline
                  rows={5}
                />
              </motion.div>

              <motion.div variants={fadeUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="w-fit">
                <Button type="submit" size="md" className="h-12 rounded-xl px-6 text-sm">
                  Send Message
                </Button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* ── Address Card ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-12 sm:py-16"
        style={{ background: "var(--bg-elevated)" }}
      >
        <div
          className="pointer-events-none absolute right-1/4 bottom-0 h-[300px] w-[420px]"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-secondary) 0%, transparent 65%)",
            filter: "blur(55px)",
          }}
          aria-hidden
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-6xl px-6"
        >
          {/* Card */}
          <div
            className="overflow-hidden rounded-[20px]"
            style={{
              border: "1px solid rgba(34,211,238,0.18)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {/* Top — city header */}
            <div
              className="flex items-start gap-5 px-9 py-8"
              style={{ borderBottom: "1px solid rgba(34,211,238,0.1)" }}
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px]"
                style={{
                  background: "rgba(34,211,238,0.1)",
                  border: "1px solid rgba(34,211,238,0.22)",
                }}
              >
                <MapPin className="h-6 w-6" style={{ color: "#22d3ee" }} />
              </div>
              <div>
                <h3
                  className="text-3xl font-bold leading-none"
                  style={{ color: "#22d3ee" }}
                >
                  Hyderabad
                </h3>
                <p
                  className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "rgba(34,211,238,0.45)" }}
                >
                  India · Asia/Kolkata (IST)
                </p>
              </div>
            </div>

            {/* Body — 2-column detail grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {ADDRESS_ROWS.map((row, i) => {
                const Icon = row.icon;
                const isOdd = i % 2 === 0;
                const isLastRow = i >= ADDRESS_ROWS.length - 2;

                return (
                  <div
                    key={row.label}
                    className="flex items-start gap-4 px-9 py-6"
                    style={{
                      borderBottom: isLastRow ? "none" : "1px solid rgba(34,211,238,0.07)",
                      borderRight: isOdd ? "1px solid rgba(34,211,238,0.07)" : "none",
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[9px]"
                      style={{
                        background: "rgba(34,211,238,0.08)",
                        border: "1px solid rgba(34,211,238,0.15)",
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: "#22d3ee" }} />
                    </div>
                    <div>
                      <p
                        className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                        style={{ color: "rgba(34,211,238,0.45)" }}
                      >
                        {row.label}
                      </p>
                      <p
                        className="text-sm font-medium leading-snug"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {row.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer — status + directions */}
            <div
              className="flex items-center justify-between px-9 py-4"
              style={{
                borderTop: "1px solid rgba(34,211,238,0.1)",
                background: "rgba(34,211,238,0.03)",
              }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: "#22d3ee", opacity: 0.7 }}
                />
                <span
                  className="text-[11px] font-semibold"
                  style={{ color: "rgba(34,211,238,0.6)" }}
                >
                  Office open · Mon – Fri, 9 AM – 6 PM IST
                </span>
              </div>

              <a
                href="https://maps.google.com/?q=Sattva+Knowledge+City+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#22d3ee" }}
              >
                Get directions
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 py-16" style={{ background: "var(--bg-primary)" }}>
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[540px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center, var(--glow-primary) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <motion.h2
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-2xl font-bold leading-snug sm:text-3xl"
            style={{ color: "var(--text-primary)" }}
          >
            Ready to design a smarter
            <br className="hidden sm:block" />
            operating system for growth?
          </motion.h2>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <Button asChild size="md" className="h-12 rounded-xl px-6 text-sm">
              <Link href="/solutions">
                View Solutions
                <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}