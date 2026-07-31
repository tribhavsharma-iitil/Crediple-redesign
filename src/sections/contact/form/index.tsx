"use client";

import { CalendarDays, Mail, MapPin, type LucideIcon } from "lucide-react";
import { contactContent, contactColors, homeLight } from "@/content/contact";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { motion } from "framer-motion";

const { info } = contactContent;
const C = contactColors;


const ICONS: Record<string, LucideIcon> = {
  clock: CalendarDays,
  calander: CalendarDays,
  calendar: CalendarDays,
  mail: Mail,
  mapPin: MapPin,
};

export default function ContactInfoBar() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();

  return (
    <section
      id="contact-info"
      className="relative overflow-hidden pt-10"
    >
      <div className="mx-auto max-w-[1260px] px-4 sm:px-6">
        <HomeReveal variants={homeFadeUp}>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 gap-4 pt-10 sm:grid-cols-3 border-0"
          >
            {info.items.map((item) => {
              const Icon = ICONS[item.icon];
              const isAddress = item.label === "Address";
              const valueContent = isAddress ? (
                <>
                  Sattva Knowledge City, Hi-Tech City, Hyderabad,
                  <br />
                  Telangana, India, Pin - 500081
                </>
              ) : (
                item.value
              );

              return (
                <HomeItem key={item.label} variants={homeFadeUp}>
                  <div className="flex items-start gap-4">
                    <div
                      className="flex h-11 w-11 flex-shrink-0 items-center justify-center"
                      style={{
                        background: "#FFFFFF14",
                        color: "#0047AB",
                        border: `1px solid rgba(220,226,246,0.12)`,
                      }}
                    >
                      <Icon
                        size={18}
                        style={{ color: "#0047AB" }}
                      />
                    </div>
                    <div>
                      <p
                        className="mb-1 text-xs"
                        style={{ color: C.textMuted }}
                      >
                        {item.label}
                      </p>
                      <p
                        className="text-sm leading-relaxed font-medium text-white"
                      >
                        {valueContent}
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
