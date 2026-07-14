"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import {
  contactContent,
  contactColors,
  homeLight,
  getHomeTitleAccentStyle,
} from "@/content/contact";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal } from "@/components/home/HomeReveal";
import { homeFadeLeft, homeFadeRight, homeEase } from "@/lib/animations";

const { form: F } = contactContent;
const C = contactColors;

export default function ContactFormSection() {
  const { isDark } = useTheme();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    background: isDark ? "#0B1424" : "#FFFFFF",
    border: `1px solid ${isDark ? "rgba(220,226,246,0.14)" : homeLight.border}`,
    color: isDark ? "#F8F8F8" : homeLight.heading,
  } as const;

  const fieldClass =
    "w-full rounded-2xl px-5 text-[15px] outline-none transition-[border-color,box-shadow] placeholder:text-[15px] focus:border-[#2F80ED]/55 focus:ring-2 focus:ring-[#2F80ED]/15";

  return (
    <section
      id="contact-form"
      className="relative overflow-hidden py-16 md:py-24"
      style={{ background: isDark ? C.bg : homeLight.bg }}
    >
      <div className="relative z-10 mx-auto grid max-w-[1260px] grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-20 xl:gap-24">
        {/* Left — contact info */}
        <HomeReveal variants={homeFadeLeft}>
          <h2
            className="font-heading mb-5 text-[1.75rem] leading-[1.2] font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-[2.75rem]"
            style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
          >
            {F.titleBefore}
            <br />
            <span style={getHomeTitleAccentStyle(isDark)}>{F.titleAccent}</span>
          </h2>

          <p
            className="mb-10 max-w-[340px] text-[13px] leading-relaxed sm:mb-12 sm:text-sm"
            style={{ color: isDark ? "#98A0A8" : homeLight.muted }}
          >
            We just need a couple of hours.
            <br />
            No more than 2 working days since receiving your request.
          </p>

          <div className="flex flex-col gap-8">
            <div>
              <p
                className="mb-2 text-[15px] font-bold"
                style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
              >
                {F.addressLabel}
              </p>
              <p
                className="max-w-[360px] text-[14px] leading-relaxed"
                style={{ color: isDark ? "#E8ECF4" : homeLight.body }}
              >
                {F.address}
              </p>
            </div>

            <div>
              <p
                className="mb-2 text-[15px] font-bold"
                style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
              >
                {F.emailLabel}
              </p>
              <a
                href={`mailto:${F.email}`}
                className="text-[14px] font-medium underline underline-offset-4 transition-opacity hover:opacity-75"
                style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
              >
                {F.email}
              </a>
            </div>

            <div>
              <p
                className="mb-2 text-[15px] font-bold"
                style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
              >
                {F.hoursLabel}
              </p>
              <p
                className="text-[14px] leading-relaxed"
                style={{ color: isDark ? "#E8ECF4" : homeLight.body }}
              >
                {F.hours}
              </p>
            </div>
          </div>
        </HomeReveal>

        {/* Right — form */}
        <HomeReveal variants={homeFadeRight}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                placeholder="Name*"
                value={form.name}
                onChange={handleChange}
                required
                className={`${fieldClass} h-14`}
                style={{
                  ...fieldStyle,
                  ...(isDark
                    ? {}
                    : { boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }),
                }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email*"
                value={form.email}
                onChange={handleChange}
                required
                className={`${fieldClass} h-14`}
                style={{
                  ...fieldStyle,
                  ...(isDark
                    ? {}
                    : { boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }),
                }}
              />
            </div>

            <input
              name="subject"
              placeholder="Subject*"
              value={form.subject}
              onChange={handleChange}
              required
              className={`${fieldClass} h-14`}
              style={{
                ...fieldStyle,
                ...(isDark
                  ? {}
                  : { boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }),
              }}
            />

            <textarea
              name="message"
              placeholder="Please describe what you need..."
              value={form.message}
              onChange={handleChange}
              rows={7}
              className={`${fieldClass} min-h-[180px] resize-none py-4`}
              style={{
                ...fieldStyle,
                ...(isDark
                  ? {}
                  : { boxShadow: "0 1px 2px rgba(15,23,42,0.04)" }),
              }}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: homeEase }}
              className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-full px-8 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:self-start"
              style={{
                background: C.buttonGradient,
                boxShadow: `0 8px 28px ${C.glow}`,
              }}
            >
              {F.submitLabel}
            </motion.button>
          </form>
        </HomeReveal>
      </div>
    </section>
  );
}
