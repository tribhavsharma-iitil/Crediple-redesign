import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {SOLUTIONS_SLIDES} from '../../data/siteData.ts'

/* How many cards visible per breakpoint */
function useVisibleCount() {
  const [count, setCount] = useState(3);
  useEffect(() => {
    function update() {
      if (window.innerWidth < 640) setCount(1);
      else if (window.innerWidth < 1024) setCount(2);
      else setCount(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

/* ─── Single Card ─── */
function SolutionCard({ slide, index, activeIndex, visibleCount }) {
  const offset = index - activeIndex;
  const isVisible = offset >= 0 && offset < visibleCount;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 60,
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: isVisible ? offset * 0.07 : 0 }}
      className="flex-shrink-0 w-full"
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div
        className="h-full rounded-xs border p-8 flex flex-col gap-5 hover:shadow-lg transition-shadow duration-300"
        style={{
          background: "var(--card-bg, #fff)",
          borderColor: "var(--text-subhead)",
        }}
      >
        {/* Title */}
        <h3
          className="font-['Jost',sans-serif] font-bold text-[22px] leading-tight"
          style={{ color: "var(--color-primary, #3297FC)" }}
        >
          {slide.title}
        </h3>

        {/* Desc */}
        <p
          className="font-['DM_Sans',sans-serif] text-[13.5px] leading-[1.75]"
          style={{ color: "var(--text-secondary, #6B7280)" }}
        >
          {slide.desc}
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--border-color, #E2E4EC)" }} />

        {/* List */}
        <ul className="flex flex-col gap-3">
          {slide.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
              className="flex items-start gap-2"
            >
              <span
                className="mt-[6px] w-[5px] h-[5px] rounded-full flex-shrink-0"
                style={{ background: "var(--color-primary, #3297FC)", opacity: 0.55 }}
              />
              <span
                className="font-['DM_Sans',sans-serif] text-[13px] leading-[1.65]"
                style={{ color: "var(--text-secondary, #6B7280)" }}
              >
                {item}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ─── Arrow Button ─── */
function ArrowBtn({ dir, onClick, disabled }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.12 }}
      whileTap={disabled ? {} : { scale: 0.93 }}
      className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
      style={{
        color: disabled
          ? "var(--text-muted, #9CA3AF)"
          : "var(--color-primary, #3297FC)",
        cursor: disabled ? "not-allowed" : "pointer",
        background: "transparent",
        border: "none",
      }}
      aria-label={dir === "prev" ? "Previous" : "Next"}
    >
      {dir === "prev" ? (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      ) : (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      )}
    </motion.button>
  );
}

/* ─── Dot Indicators ─── */
function Dots({ total, active, visibleCount, onChange }) {
  const dotCount = total - visibleCount + 1;
  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {Array.from({ length: dotCount }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onChange(i)}
          animate={{
            width: i === active ? 32 : 8,
            background: i === active
              ? "var(--color-primary, #3297FC)"
              : "var(--border-color, #D1D5DB)",
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="h-2 rounded-full border-none cursor-pointer"
          style={{ minWidth: i === active ? 32 : 8 }}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ─── Main Component ─── */
export default function SolutionsSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = useVisibleCount();
  const maxIndex = SOLUTIONS_SLIDES.length - visibleCount;

  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setActiveIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);

  // Clamp when resizing
  useEffect(() => {
    setActiveIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  return (
    <section
      className="w-full py-16 md:py-20"
      style={{ background: "var(--bg-base, #fff)" }}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

        {/* ── Heading ── */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight text-center mb-8"
          style={{
            fontSize: "clamp(26px, 3.5vw, 44px)",
            color: "var(--text-primary, #0D0F18)",
          }}
        >
          Discover our{" "}
          <span style={{ color: "var(--color-primary, #3297FC)" }}>in-demand</span>{" "}
          Solutions
        </motion.h2>

        {/* ── Slider row ── */}
        <div className="flex items-center gap-3 sm:gap-5 py-2">

          {/* Left arrow */}
          <ArrowBtn dir="prev" onClick={prev} disabled={activeIndex === 0} />

          {/* Cards viewport */}
          <div className="flex-1 ">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIndex}
                className="grid gap-5"
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, 1fr)`,
                }}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                {SOLUTIONS_SLIDES.slice(activeIndex, activeIndex + visibleCount).map((slide, i) => (
                  <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                    className="rounded-xl border flex flex-col gap-5 p-7 sm:p-8 cursor-default min-h-[400px]"
                    style={{
                      background: "var(--card-bg, #fff)",
                      borderColor: "rgba(155, 114, 80, 1)",
                    }}
                  >
                    {/* Title */}
                    <h3
                      className="font-[500] text-[20px] sm:text-[22px] leading-tight"
                      style={{ color: "rgb(0, 67, 138)" }}
                    >
                      {slide.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="font-['DM_Sans',sans-serif] text-[13px] sm:text-[13.5px] leading-[1.8]"
                      style={{ color: "var(--text-secondary, #6B7280)" }}
                    >
                      {slide.desc}
                    </p>

                    {/* Divider */}
                    <div
                      className="w-full"
                      style={{ borderTop: "1px solid var(--border-color, #E2E4EC)" }}
                    />

                    {/* Bullet list */}
                    <ul className="flex flex-col gap-[10px]">
                      {slide.items.map((item, idx) => (
                        <motion.li
                          key={item}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.18 + idx * 0.07, duration: 0.32 }}
                          className="flex items-start gap-[10px]"
                        >
                          <span
                            className="mt-[7px] rounded-full flex-shrink-0"
                            style={{
                              width: 4,
                              height: 4,
                              background: "var(--color-primary, #3297FC)",
                              opacity: 0.5,
                            }}
                          />
                          <span
                            className="font-['DM_Sans',sans-serif] text-[13px] leading-[1.7]"
                            style={{ color: "var(--text-secondary, #6B7280)" }}
                          >
                            {item}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow */}
          <ArrowBtn dir="next" onClick={next} disabled={activeIndex >= maxIndex} />

        </div>

        {/* ── Dots ── */}
        <Dots
          total={SOLUTIONS_SLIDES.length}
          active={activeIndex}
          visibleCount={visibleCount}
          onChange={setActiveIndex}
        />

      </div>
    </section>
  );
}