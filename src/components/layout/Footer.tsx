"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  FOOTER_COL1,
  FOOTER_COL2,
  FOOTER_COL3,
  FOOTER_COL4,
  FOOTER_TAGLINE,
  FOOTER_COPYRIGHT,
} from "@/utils/siteData";
import crediple_light from "@/assets/crediple_light.png";
import crediple_dark from "@/assets/crediple_dark.png";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const SOCIALS = [
  { Icon: FaXTwitter, href: "#", label: "X / Twitter" },
  { Icon: FaInstagram, href: "#", label: "Instagram" },
  { Icon: FaFacebookF, href: "#", label: "Facebook" },
  { Icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

function LinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <motion.div variants={fadeUp} className="flex flex-col gap-0">
      {title && (
        <h4
          className="text-[14px] sm:text-[15px] font-semibold mb-4 sm:mb-5 tracking-wide"
          style={{ color: "var(--text-primary)" }}
        >
          {title}
        </h4>
      )}
      <ul className="flex flex-col gap-3 sm:gap-[14px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              {...(link.href.startsWith("http")
                ? {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  }
                : {})}
              className="text-[13px] sm:text-[14px] leading-none transition-colors duration-150 no-underline"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-color)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(180deg, rgba(3,7,18,0.95) 0%, rgba(2,6,23,1) 100%)"
          : "linear-gradient(180deg, #e8f0ff 0%, #eef4ff 100%)",
        borderTop: `1px solid ${isDark ? "rgba(147,197,253,0.1)" : "rgba(29,78,216,0.1)"}`,
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}
    >
      {/* Top ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[600px] -translate-x-1/2"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at center, rgba(96,165,250,0.14), transparent 66%)"
            : "radial-gradient(ellipse at center, rgba(29,78,216,0.08), transparent 66%)",
          filter: "blur(54px)",
          transition: "background 0.5s ease",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 py-12 sm:py-14 px-5 sm:px-8">
        <motion.div
          className="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-10 sm:gap-12 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Brand block */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-4 max-w-[280px] sm:max-w-[300px]"
          >
            <div className="inline-flex items-start gap-2 flex-col">
              <Image
                src={isDark ? crediple_dark : crediple_light}
                alt="Crediple"
                width={100}
              />
              <p style={{ color: "var(--text-secondary)", fontSize: "12px" }}>
                A{" "}
                <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
                  YAKA
                </span>{" "}
                Enterprise
              </p>
            </div>

            {/* Tagline */}
            <p
              className="text-[13px] leading-[1.75]"
              style={{
                color: "var(--text-secondary)",
                transition: "color 0.4s ease",
              }}
            >
              {FOOTER_TAGLINE}
            </p>

            {/* Social icons — each opens in a new tab */}
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 320, damping: 20 }}
                  className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer"
                  style={{
                    border: `1px solid ${isDark ? "rgba(147,197,253,0.14)" : "rgba(29,78,216,0.14)"}`,
                    color: isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(12,26,53,0.55)",
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(29,78,216,0.06)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = isDark ? "#93c5fd" : "#1d4ed8";
                    el.style.borderColor = isDark
                      ? "rgba(147,197,253,0.4)"
                      : "rgba(29,78,216,0.4)";
                    el.style.background = isDark
                      ? "rgba(96,165,250,0.1)"
                      : "rgba(29,78,216,0.09)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = isDark
                      ? "rgba(255,255,255,0.55)"
                      : "rgba(12,26,53,0.55)";
                    el.style.borderColor = isDark
                      ? "rgba(147,197,253,0.14)"
                      : "rgba(29,78,216,0.14)";
                    el.style.background = isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(29,78,216,0.06)";
                  }}
                >
                  <Icon size={14} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <div className="flex flex-row gap-8 sm:gap-12 md:gap-16 lg:gap-20 md:ml-auto flex-wrap">
            <LinkColumn title="" links={FOOTER_COL1} />
            <LinkColumn title="" links={FOOTER_COL2} />
            <LinkColumn title="" links={FOOTER_COL3} />
            <LinkColumn title="" links={FOOTER_COL4} />
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div
        className="mx-5 sm:mx-8"
        style={{
          height: 1,
          background: isDark ? "rgba(147,197,253,0.1)" : "rgba(29,78,216,0.1)",
          transition: "background 0.4s ease",
        }}
      />

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="text-[12px] sm:text-[13px] order-2 sm:order-1 text-center sm:text-left"
          style={{ color: "var(--text-muted)", transition: "color 0.4s ease" }}
        >
          © 2024 All Rights Reserved.
        </p>
        <p
          className="text-[12px] sm:text-[13px] order-1 sm:order-2 text-center sm:text-right"
          style={{ color: "var(--text-muted)", transition: "color 0.4s ease" }}
        >
          Crediple India Private Limited (CIPL)
        </p>
      </div>
    </footer>
  );
}
