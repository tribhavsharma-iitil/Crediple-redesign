"use client";

import { Clock, Mail, MapPin, type LucideIcon } from "lucide-react";
import { contactContent, contactColors, homeLight } from "@/content/contact";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { motion } from "framer-motion";

const { info } = contactContent;
const C = contactColors;

const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  mail: Mail,
  mapPin: MapPin,
};

export default function ContactInfoBar() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="contact-info"
      className="relative overflow-hidden pb-16 sm:pb-20 md:pb-24"
    >
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-6 border-t pt-10 sm:grid-cols-3 sm:gap-8"
            style={{
              borderColor: isDark ? "rgba(220,226,246,0.10)" : homeLight.border,
            }}
          >
            {info.items.map((item) => {
              const Icon = ICONS[item.icon];
              return (
                <HomeItem key={item.label} variants={homeFadeUp}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background: isDark
                          ? "rgba(248,248,248,0.06)"
                          : homeLight.card,
                        border: `1px solid ${
                          isDark ? "rgba(220,226,246,0.12)" : homeLight.border
                        }`,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: isDark ? C.textSoftBlue : C.accentStrong }}
                      />
                    </div>
                    <div>
                      <p
                        className="mb-1 text-xs"
                        style={{ color: isDark ? C.textMuted : homeLight.muted }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="max-w-[280px] text-sm leading-relaxed font-medium"
                        style={{ color: isDark ? C.text : homeLight.heading }}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                </HomeItem>
              );
            })}
          </motion.div>
        </HomeReveal>
      </div>
    </section>
  );
}
