import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MILESTONES } from "../../data/siteData";
import SectionReveal from "../ui/SectionReveal";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

// CLEAN COUNT UP (better than pachinko)
function AnimatedYear({ value, delay = 0 }) {
  const [count, setCount] = useState(value - 5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let start = value - 10;
      let end = value;
      let duration = 800;
      let startTime = null;

      const animate = (time) => {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);

        const current = Math.floor(start + (end - start) * progress);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <motion.span
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: delay / 1000 }}
      className="tabular-nums"
    >
      {count}
    </motion.span>
  );
}

export default function MilestonesSection() {
  return (
    <section className="py-20" style={{ background: "#F8F8F8" }}>
      <div className="">
        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-white">
          {MILESTONES.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className={`px-6 py-12 flex flex-col items-center text-center h-full
    ${i !== MILESTONES.length - 1 ? "lg:border-r border-gray-300" : ""}
  `}
            >
              {/* LABEL */}
              <p className="text-2xl font-medium text-[#653C1A] leading-snug max-w-[220px] min-h-[80px] flex items-center justify-center">
                {m.label}
              </p>

              {/* YEAR */}
              <h3 className="text-4xl font-semibold text-blue-500 tracking-tight my-6">
                <AnimatedYear value={m.yearStart} delay={i * 150} />-
                <AnimatedYear value={m.yearEnd} delay={i * 150 + 200} />
              </h3>

              {/* SUBTEXT */}
              <span className="text-xs uppercase tracking-widest text-gray-400 mt-auto">
                {m.sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* BUTTON */}
        <Link to="/about">
          <SectionReveal className="text-center mt-12">
            <Button variant="secondary" size="lg">
              Read More
            </Button>
          </SectionReveal>
        </Link>
      </div>
    </section>
  );
}
