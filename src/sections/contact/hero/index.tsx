"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { contactContent, contactColors, homeLight } from "@/content/contact";
import { useTheme } from "@/context/ThemeContext";
import { homeEase, homeFadeRight } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { HomeReveal } from "@/components/home/HomeReveal";
import aboutBg from "@/assets/about/about_us_bg.png";

const { hero } = contactContent;
const C = contactColors;

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: homeEase },
  },
};

export default function ContactHero() {
  const { isDark } = useTheme();
  const { heroStagger } = useHomeMotion();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const fieldStyle = {
    background: isDark ? "rgba(248,248,248,0.06)" : "#FFFFFF",
    border: `1px solid ${isDark ? "rgba(220,226,246,0.12)" : homeLight.border}`,
    color: isDark ? "#F8F8F8" : homeLight.heading,
  } as const;

  const fieldClass =
    "w-full px-4 text-sm !text-white outline-none transition-[border-color,box-shadow] placeholder:text-[#8A93A6] focus:border-[#2F80ED]/55 focus:ring-2 focus:ring-[#2F80ED]/15 !bg-transparent";

  const labelClass = "mb-1.5 block text-xs font-medium";

  return (
    <section
      id="contact-hero"
      className="relative overflow-hidden pt-[7.5rem] pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24"
      style={{
        background:
          `url(${aboutBg.src}) center/cover no-repeat`,
      }}

    >

      <div className="relative z-10 mx-auto grid max-w-[1260px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-20">
        {/* Left — headline + say-hi */}
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={heroItem}
            className="font-heading mb-4 text-white text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:text-5xl lg:text-[3.25rem]"

          >
            {hero.titleLine1}
            <br />
            {hero.titleLine2}
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mb-10 text-white max-w-md text-sm leading-relaxed sm:mb-12 sm:text-base"
          >
            {hero.description}
          </motion.p>

          <motion.div variants={heroItem}>
            <p
              className="mb-2 text-sm text-white"

            >
              {hero.sayHi}
            </p>
            <a
              href={`mailto:${hero.email}`}
              className="text-xl text-white font-bold no-underline transition-opacity hover:opacity-80 sm:text-2xl"

            >
              {hero.email}
            </a>
          </motion.div>
        </motion.div>

        {/* Right — form card */}
        <HomeReveal variants={homeFadeRight}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-6 sm:p-8"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid "rgba(220,226,246,0.08)"`,
              boxShadow: "0 20px 60px rgba(0,0,0,0.35)"
            }}
          >
            <div>
              <label
                htmlFor="contact-name"
                className={labelClass}
                style={{ color: C.textMuted}}
              >
                {hero.form.name.label}
              </label>
              <input
                id="contact-name"
                name="name"
                placeholder={hero.form.name.placeholder}
                value={form.name}
                onChange={handleChange}
                required
                className={`${fieldClass} h-12`}
                style={fieldStyle}
              />
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className={labelClass}
                style={{ color: C.textMuted}}
              >
                {hero.form.email.label}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                placeholder={hero.form.email.placeholder}
                value={form.email}
                onChange={handleChange}
                required
                className={`${fieldClass} h-12`}
                style={fieldStyle}
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className={labelClass}
                style={{ color: C.textMuted}}
              >
                {hero.form.subject.label}
              </label>
              <input
                id="contact-subject"
                name="subject"
                placeholder={hero.form.subject.placeholder}
                value={form.subject}
                onChange={handleChange}
                required
                className={`${fieldClass} h-12`}
                style={fieldStyle}
              />
            </div>

            <div>
              <label
                htmlFor="contact-description"
                className={labelClass}
                style={{ color: C.textMuted}}
              >
                {hero.form.description.label}
              </label>
              <textarea
                id="contact-description"
                name="description"
                placeholder={hero.form.description.placeholder}
                value={form.description}
                onChange={handleChange}
                rows={4}
                className={`${fieldClass} min-h-[110px] resize-none py-3`}
                style={fieldStyle}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: homeEase }}
              className="mt-1 inline-flex h-12 w-full items-center justify-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{
                background: '#0047AB',
                boxShadow: `0 8px 28px ${C.glow}`,
              }}
            >
              {hero.form.submitLabel}
            </motion.button>
          </form>
        </HomeReveal>
      </div>
    </section>
  );
}
