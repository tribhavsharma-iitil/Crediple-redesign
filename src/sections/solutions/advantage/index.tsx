"use client";

import { solutionsContent, solutionsColors, homeLight } from "@/content/solutions";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { homeFadeUp, homeFadeLeft } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import { motion } from "framer-motion";

const { advantage } = solutionsContent;
const C = solutionsColors;

function AdvantageCard({
  item,
  isDark,
  className = "",
}: {
  item: (typeof advantage.items)[number];
  isDark: boolean;
  className?: string;
}) {
  return (
    <HomeItem variants={homeFadeUp} className={className}>
      <div
        className="h-full  border p-6"
        style={{
          background: isDark ? "#FFFFFF0A" : '#FBFBFB',
          borderColor: isDark ? "#232323" : homeLight.border,
        }}
      >
        <span
          className="text-xs font-bold tracking-[0.1em] uppercase"
          style={{ color: isDark ? C.textAccent : C.accentStrong }}
        >
          {item.tag}
        </span>
        <h3
          className="font-heading mt-6 mb-2 text-2xl font-black tracking-tight"
          style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
        >
          {item.title === "Growth Funnels" || item.title === "Ecosystem Design" ? (
            <>
              {item.title.split(" ")[0]}
              <br />
              {item.title.split(" ").slice(1).join(" ")}
            </>
          ) : (
            item.title
          )}
        </h3>
        <p
          className="text-md leading-relaxed"
          style={{ color: isDark ? '#FFFFFFCC' : homeLight.muted }}
        >
          {item.desc}
        </p>
      </div>
    </HomeItem>
  );
}

export default function SolutionsAdvantage() {
  const { isDark } = useTheme();
  const { stagger, viewport } = useHomeMotion();
  const firstRow = advantage.items.slice(0, 2);
  const secondRow = advantage.items.slice(2);

  return (
    <section
      id="advantage"
      className="relative overflow-hidden section-py"
      style={{ background: isDark ? '#000000' : '#ffffff' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          <HomeReveal variants={homeFadeLeft} className="sm:col-span-2 lg:col-span-2">
            <h2
              className="font-heading text-2xl leading-tight font-black tracking-tight sm:text-3xl md:text-4xl lg:text-6xl !leading-none"
              style={{ color: isDark ? "#FFFFFF" : homeLight.heading }}
            >
              {advantage.titleLine1}
              <br className="lg:block hidden" />
              {advantage.titleLine2}
              <br className="lg:block hidden" />
              {advantage.titleLine3}
            </h2>
            <p
              className="mt-3 max-w-md text-sm leading-relaxed md:text-[15px]"
              style={{ color: isDark ? '#ffffff' : homeLight.muted }}
            >
              {advantage.subtitle}
            </p>
          </HomeReveal>

          {firstRow.map((item) => (
            <AdvantageCard key={item.title} item={item} isDark={isDark} className="lg:col-span-1" />
          ))}

          {secondRow.map((item) => (
            <AdvantageCard key={item.title} item={item} isDark={isDark} className="lg:col-span-1" />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
