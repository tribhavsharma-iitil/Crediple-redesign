import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import robotBg from '../../assets/cta_banner.jpg';
import Button from "../ui/Button";
import SectionReveal from "../ui/SectionReveal";

export default function CTABanner() {
  return (
    <SectionReveal>
      <section className="relative overflow-hidden w-full">

        <img
          src={robotBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />


        {/* Centered frosted glass card */}
        <div className="relative z-10 flex items-center justify-center py-10 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center max-w-[900px] w-full px-8 sm:px-12 py-10"
            style={{
              background: 'rgba(255, 255, 255, 0.48)',    
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.55)',
              boxShadow: '0 4px 32px rgba(180,185,210,0.18)',
            }}
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl font-semibold leading-tight mb-4"
              style={{ color: '#1A1A1A' }}
            >
              Build, Scale, and Solve.
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-sm leading-[1.75] mb-7 max-w-[560px]"
              style={{ color: '#1A1A1A' }}
            >
              Whether it's Healthcare, Finance, Legal, or Data Intelligence or IT infrastructure, Crediple delivers
              the structured digital solutions that drive real world outcomes. We don't just invest in companies;
              we engineer the future of professional services.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.93 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 220, damping: 18 }}
            >
              <Link to="/contact">
              <Button variant="secondary" size="lg">Start Your Journey</Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SectionReveal>
  );
}