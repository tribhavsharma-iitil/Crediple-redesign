import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { BRANDS } from "../data/siteData";
import {
  StaggerContainer,
  fadeLeftItem,
  fadeRightItem,
} from "../components/ui/SectionReveal";
import SectionReveal from "../components/ui/SectionReveal";
import bg from "../assets/brands_bg.png"; 

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 36 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Graduation Cap SVG Icon ─────────────────────────────────────────────────

const GradCapIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="#9B6B3A"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
  </svg>
);

// ─── Component ───────────────────────────────────────────────────────────────

export default function BrandsPage() {
  return (
    <div>
       <section
      className="section-py relative w-full"
      style={{ background: "var(--bg-base)" }}
    >
      <img
        src={bg}
        className="absolute ml-[40%] w-[50vw] z-0 pointer-events-none select-none"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <SectionReveal className="text-center mb-14 z-10">
          <p
            className="text-sm font-display font-[500] uppercase tracking-widest mb-3"
            style={{ color: "#999999" }}
          >
            OUR BRANDS
          </p>
          <h2
            className="text-3xl sm:text-4xl font-display font-[600]"
            style={{ color: "var(--text-primary)" }}
          >
            Our Brands.{" "}
            <span style={{ color: "var(--color-primary)" }}>One Vision</span>
          </h2>
        </SectionReveal>

        <StaggerContainer
          // ↓ gap-20 on mobile (accounts for 32px half-button + breathing room), lg can be tighter
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 sm:gap-20 lg:gap-8"
          staggerDelay={0.12}
        >
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.id}
              variants={i % 2 === 0 ? fadeLeftItem : fadeRightItem}
              whileHover={{ scale: 0.95, y: -4 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              style={{
                background: "var(--card-bg)",
                boxShadow: "var(--shadow-md)",
                overflow: "visible", // ← button bleeds out without clipping
                marginBottom: "2rem", // ← reserves space for the half-button below
              }}
              className="p-8 pb-6 flex flex-col gap-2 text-center group cursor-pointer relative"
            >
              <img src={brand.image} className="w-40 bg-cover mx-auto" alt="" />

              <h3
                className="text-[22px] font-display font-medium leading-tight"
                style={{ color: "#5D5A88" }}
              >
                {brand.name}
              </h3>

              <p
                className="text-xs mt-2 flex-1 font-sans font-400"
                style={{ color: "var(--text-secondary)" }}
              >
                {brand.description}
              </p>

              <Link
                to={brand.href}
                aria-label={`Learn more about ${brand.name}`}
                style={{ position: "static" }} // keeps Link in flow so it doesn't shrink card
              >
                <motion.div
                  transition={{ type: "spring", stiffness: 420, damping: 18 }}
                  className="absolute w-16 h-16 rounded-full bg-(--color-primary) flex justify-center items-center text-(--bg-base)"
                  style={{
                    bottom: "-2rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    boxShadow: "0 4px 16px rgba(26,107,255,0.35)",
                    zIndex: 10,
                  }}
                >
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight size={26} strokeWidth={2.5} />
                  </motion.div>
                </motion.div>
              </Link>

              {/* Bottom accent */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                style={{ background: brand.color }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
    </div>
  );
}
