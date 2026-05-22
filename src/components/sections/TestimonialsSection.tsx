import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../../data/siteData';
import SectionReveal from '../ui/SectionReveal';

const INTERVAL = 3000;
const CARD_WIDTH = 370;
const CARD_GAP = 24;
const SIDE_OFFSET = CARD_WIDTH + CARD_GAP;

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = TESTIMONIALS.length;

  const goTo = (index: number) => setCurrent((index + total) % total);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(() => goTo(current + 1), INTERVAL);
    return () => clearInterval(intervalRef.current!);
  }, [paused, current]);

  const getOffset = (index: number) => {
    const raw = (index - current + total) % total;
    return raw > total / 2 ? raw - total : raw;
  };

  return (
    <section className="section-py" style={{ background: '#DFF0EF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <SectionReveal className="text-center mb-16">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.25em] mb-5"
            style={{ color: '#7AADAA' }}
          >
            TESTIMONIALS
          </p>
                    <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 tracking-tight">

            Why do people praise about{' '}
            <span style={{ color: '#3B82F6' }}>Crediple?</span>
          </h2>
        </SectionReveal>

        {/* Carousel */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden" style={{ height: '440px' }}>
            {TESTIMONIALS.map((t, i) => {
              const offset = getOffset(i);
              const isActive = offset === 0;
              const isSide = offset === -1 || offset === 1;
              if (!isActive && !isSide) return null;

              const xValue =
                offset === 0
                  ? '-50%'
                  : offset === -1
                  ? `calc(-50% - ${SIDE_OFFSET}px)`
                  : `calc(-50% + ${SIDE_OFFSET}px)`;

              return (
                <motion.div
                  key={i}
                  animate={{
                    x: xValue,
                    scale: isActive ? 1 : 0.9,
                    opacity: isActive ? 1 : 0.65,
                    zIndex: isActive ? 10 : 5,
                  }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    left: '50%',
                    position: 'absolute',
                    top: '50%',
                    translateY: '-50%',
                    width: `${CARD_WIDTH}px`,
                  }}
                  className={isActive ? '' : 'pointer-events-none'}
                >
                  <div
                    className="flex flex-col items-center text-center p-14"
                    style={{
                      width: `${CARD_WIDTH}px`,
                      height: '370px',
                      background: isActive ? '#FFFFFF' : '#F7F0EA',
                      boxShadow: isActive
                        ? '0 8px 40px rgba(0,0,0,0.10)'
                        : '0 2px 12px rgba(0,0,0,0.05)',
                    }}
                  >
                    {/* Title */}
                    <p
                      className=" font-[500] mb-8 leading-snug"
                      style={{
                        color: isActive ? '#484848' : '#B0A89E',
                      }}
                    >
                      {t.title}
                    </p>

                    {/* Quote */}
                    <blockquote
                      className="text-sm font-[400] leading-loose flex-1 "
                      style={{
                        color: isActive ? '#1F5E9E' : '#C5B9B0',
                      }}
                    >
                      {t.text}
                    </blockquote>

                    {/* Author */}
                    <div className="flex flex-row items-center gap-2 mt-6">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-[52px] h-[52px] rounded-full object-cover"
                        style={{ border: '2px solid #E5E7EB' }}
                      />
                      <div className="text-center">
                        <p
                          className="text-[11px] font-bold uppercase tracking-widest"
                          style={{ color: isActive ? '#1A1A2E' : '#B0A89E' }}
                        >
                          {t.name}
                        </p>
                        <p
                          className="text-[12px] mt-0.5"
                          style={{ color: isActive ? '#6B7280' : '#C5B9B0' }}
                        >
                          {t.role}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-[10px] mt-10">
            {TESTIMONIALS.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => goTo(i)}
                animate={{
                  width: i === current ? 10 : 10,
                  height: 10,
                  background:
                    i === current
                      ? '#8B6343'
                      : '#C8B4A0',
                  scale: i === current ? 1.15 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="rounded-full cursor-pointer"
                style={{ width: 14, height: 14 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}