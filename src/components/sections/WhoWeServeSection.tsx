import { motion } from 'framer-motion';
import { WHO_WE_SERVE } from '../../data/siteData';
import SectionReveal, { StaggerContainer, fadeUpItem } from '../ui/SectionReveal';
import bg from "../../assets/brands_bg.png";

export default function WhoWeServeSection() {
  return (
    <section
      className="section-py relative overflow-hidden"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* Teal organic blob — top left, bleeds off screen */}
      <img
        src={bg}
        className="absolute ml-[5%] w-[50vw] top-[10%] z-0 pointer-events-none select-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <SectionReveal className="text-center mb-14">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.22em] mb-4"
            style={{ color: '#9CA3AF' }}
          >
            WHY US?
          </p>
            <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight">

            Who we{' '}
            <span style={{ color: '#3B82F6' }}>Serve</span>
          </h2>
        </SectionReveal>

        {/* Grid */}
        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          staggerDelay={0.11}
        >
          {WHO_WE_SERVE.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUpItem}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="group flex flex-col cursor-pointer"
            >
              {/* Image block — sharp corners, no border-radius */}
              <div className="relative overflow-hidden mb-5" style={{ borderRadius: 0 }}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  style={{ height: '300px', display: 'block' }}
                />

                {/* Dark gradient at bottom for text legibility */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)',
                  }}
                />

                {/* Overlay title — white, centered, bottom */}
                <div className="absolute inset-0 flex items-end justify-center pb-5 px-4">
                  <h3
                    className="text-white text-[1.15rem] sm:text-[1.2rem] font-semibold text-center leading-snug"
                    style={{ textShadow: '0 1px 6px rgba(0,0,0,0.35)' }}
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Sub-heading */}
              <h4
                className="text-[1rem] font-[500] mb-2 leading-snug"
                style={{ color: '#484848' }}
              >
                {item.heading}
              </h4>

              {/* Description */}
              <p
                className="text-xs font-[400] leading-relaxed"
                style={{ color: '#9795B5' }}
              >
                {item.desc}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}