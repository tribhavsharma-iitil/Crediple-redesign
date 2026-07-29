"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { homeContent, homeColors, homeLight } from "@/content/home";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp, homeFadeLeft, homeScaleIn } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import ctaBg from "@/assets/gradient.png";

const { testimonials, cta } = homeContent;
const C = homeColors;

/** Sampled from Home.pdf testimonials frame */
const T = {
  bg: "#03081A",
  card: "#0B1324",
  quote: "#F4F6FA",
  muted: "#7B8494",
} as const;

export default function Testimonials() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();
  const items = testimonials.items;

  return (
    <div className="w-full">
      <section
        id="testimonials"
        className="relative section-py overflow-hidden"
        style={{ background: isDark ? T.bg : '#FFFFFF' }}
      >
        <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6">
          <HomeReveal variants={homeFadeLeft} className="mb-8 sm:mb-10 w-full">
            <h2
              className="font-heading text-left text-2xl font-black tracking-tight sm:text-3xl md:text-4xl lg:text-5xl"
              style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
            >
              {testimonials.title}
            </h2>
            <p
              className="mt-3 max-w-2xl text-left text-sm sm:text-base"
              style={{ color: isDark ? '#FFFFFF' : '#454545CC' }}
            >
              {testimonials.subtitle}
            </p>
          </HomeReveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-px overflow-hidden border sm:grid-cols-3"
            style={{
              
              borderColor: isDark ? '#232323' : homeLight.border,
            }}
          >
            {items.map((item) => (
              <HomeItem key={item.name} variants={homeFadeUp} className="h-full">
                <article
                  className="relative flex h-full flex-col p-6 text-left sm:p-7"
                  style={{ background: isDark ? 'transparent' : homeLight.bgAlt }}
                >
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      placeholder="blur"
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>

                  <p
                    className="mt-5 flex-1 text-sm leading-relaxed"
                    style={{ color: isDark ? "#FFFFFFCC" : "#454545CC" }}
                  >
                    &ldquo;{item.text}&rdquo;
                  </p>

                  <span
                    className="mt-6 block h-0.5 w-6 rounded-full"
                    style={{ background: C.accentSoft }}
                  />

                  <p
                    className="mt-4 text-sm font-bold"
                    style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="mt-0.5 text-xs"
                    style={{ color: isDark ? T.muted : homeLight.muted }}
                  >
                    {item.role}, {item.company}
                  </p>
                </article>
              </HomeItem>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
}
