/**
 * Solutions page content.
 * Colors shared with Home / About brand tokens.
 */

import { homeColors, homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight } from "@/content/home";
import companyHistory4 from "@/assets/home/company_history_4.png";
import dataIntelligence from "@/assets/solutions/data_intelligance.png";
import whoWeServe1 from "@/assets/home/who_we_serve_1.jpg";
import whoWeServe3 from "@/assets/home/who_we_serve_3.jpg";
import whoWeServe4 from "@/assets/home/who_we_serve_4.jpg";

export const solutionsColors = {
  ...homeColors,
  text: "#F8F8F8",
  textHeading: "#D8E0F0",
  textMuted: "#707080",
  textBody: "#586878",
  textSoftBlue: "#B0C0F8",
  textAccent: "#3888F0",
} as const;

export { homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight };

export const solutionsContent = {
  hero: {
    titleLine1: "Scalable Systems For",
    titleAccent: "Modern Businesses.",
    description:
      "We build automation systems and digital infrastructure for businesses that can't afford downtime.",
    primaryCta: { label: "See Our Solutions", href: "#domains" },
    secondaryCta: { label: "Talk to Us", href: "/contact" },
  },

  trust: {
    label: "Trusted by 50+ institutions",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  foundation: {
    title: "How We Build",
    headline: "The Same Discipline",
    subheadline: "Across Every Brand We Own.",
    body: "Rather than building first and adjusting later, we study the operational realities — the bottlenecks, the friction points — up front. Every brand we launch fits from day one.",
    accent:
      "That's the difference between a product and infrastructure. Every one of our brands is built as the latter.",
    image: companyHistory4,
  },

  domains: {
    titleBefore: "Domains We",
    titleAccent: "Serve",
    items: [
      {
        title: "FinTech Intelligence",
        desc: "From credit clarity to borrower profiling, financial decision infrastructure for structured, sustainable growth.",
        short: "Financial decision infrastructure for structured growth.",
        href: "/contact",
        image: whoWeServe3,
      },
      {
        title: "HealthTech Systems",
        desc: "From patient acquisition to clinical growth, digital infrastructure for healthcare providers.",
        short: "Digital infrastructure for healthcare providers.",
        href: "/contact",
        image: whoWeServe1,
      },
      {
        title: "Data Intelligence",
        desc: "From cloud infrastructure to AI/ML, data intelligence systems for enterprise scale.",
        short: "Data intelligence systems for enterprise scale.",
        href: "/contact",
        image: dataIntelligence,
      },
      {
        title: "LegalTech Workflows",
        desc: "Legal workflow infrastructure to reduce paperwork and speed up legal services.",
        short: "Legal workflow infrastructure for faster services.",
        href: "/contact",
        image: whoWeServe4,
      },
    ],
  },

  process: {
    titleBefore: "Our",
    titleAccent: "Process",
    subtitle: "The repeatable strategy behind every system we ship.",
    steps: [
      {
        number: "01",
        label: "Discover",
        text: "We begin by understanding the industry. What are its friction points? Who are its users? What are the scaling challenges?",
      },
      {
        number: "02",
        label: "Design",
        text: "We design the workflows, data flow, and intelligence layer, all toward a cohesive brand experience.",
      },
      {
        number: "03",
        label: "Develop",
        text: "The blueprint comes to life. We build the digital infrastructure — dashboards, tools, systems — with measurable outcomes from day one.",
      },
      {
        number: "04",
        label: "Scale",
        text: "We keep optimizing for higher adoption, automation, and better performance to help the system scale well beyond where it started.",
      },
    ],
  },

  advantage: {
    titleBefore: "Multiple Systems,",
    titleAccent: "One Brand",
    subtitle:
      "One central intelligence layer powers every brand in the Crediple ecosystem.",
    items: [
      { number: "01", label: "Digital Footprint Systems" },
      { number: "02", label: "Growth Funnels" },
      { number: "03", label: "Automated Workflows" },
      { number: "04", label: "Operational Intelligence" },
      { number: "05", label: "Real-Time Dashboards" },
      { number: "06", label: "Ecosystem Design" },
    ],
  },

  cta: {
    title: "One Layer Across Every Brand.",
    description:
      "Every Crediple brand runs on the same infrastructure, designed for consistency, built for scale.",
    button: { label: "Get in Touch", href: "/contact" },
  },
} as const;

export type SolutionsDomain = (typeof solutionsContent.domains.items)[number];
