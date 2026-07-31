/**
 * Solutions page content.
 * Colors shared with Home / About brand tokens.
 */

import { homeColors, homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight } from "@/content/home";
import dataIntelligence from "@/assets/solutions/data_intelligance.png";
import whoWeServe1 from "@/assets/home/who_we_serve_1.png";
import whoWeServe3 from "@/assets/home/who_we_serve_3.png";
import whoWeServe4 from "@/assets/home/who_we_serve_4.png";

export const solutionsColors = {
  ...homeColors,
  text: "#F8F8F8",
  textHeading: "#D8E0F0",
  textMuted: "#707080",
  textBody: "#586878",
  textSoftBlue: "#B0C0F8",
  textAccent: "#0047AB",
} as const;

export { homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight };

export const solutionsContent = {
  hero: {
    titleLine1: "Scalable Systems For",
    titleAccent: "Modern Businesses.",
    description:
      "We build automation systems and digital infrastructure for businesses that can't afford downtime.",
    primaryCta: { label: "See Our Solutions", href: "/solutions/#domains" },
    secondaryCta: { label: "Talk to Us", href: "/contact/#contact-form" },
  },

  foundation: {
    headline: "The Same Discipline Across Every Brand We Own.",
    body: "Rather than building first and adjusting later, we study the operational realities — the bottlenecks, the friction points — up front. Every brand we launch fits from day one.",
    accent:
      "That's the difference between a product and infrastructure. Every one of our brands is built as the latter.",
  },

  domains: {
    title: "Domains We Serve",
    subtitle: "Industry specific solutions that drive efficiency and sustainable growth.",
    items: [
      {
        title: "HealthTech Systems",
        desc: "From patient acquisition to clinical growth, digital infrastructure for healthcare providers.",
        href: "/contact",
        image: whoWeServe1,
      },
      {
        title: "FinTech Intelligence",
        desc: "Financial infrastructure for smarter lending and sustainable growth.",
        href: "/contact",
        image: whoWeServe3,
      },
      {
        title: "LegalTech Workflows",
        desc: "Legal workflow infrastructure to reduce paperwork and speed up legal services.",
        href: "/contact",
        image: whoWeServe4,
      },
      {
        title: "Data Intelligence",
        desc: "From cloud infrastructure to AI/ML, data intelligence systems for enterprise scale.",
        href: "/contact",
        image: dataIntelligence,
      },
    ],
  },

  process: {
    titleLine1: "From Vision",
    titleLine2: "to Impact",
    subtitle:
      "Every breakthrough solution follows a proven process, designed to reduce complexity, accelerate execution, and create measurable business value.",
    cta: { label: "Build With Us", href: "/contact" },
    steps: [
      {
        number: "1",
        label: "Discover",
        text: "We begin by understanding the industry. What are its friction points? Who are its users? What are the scaling challenges?",
      },
      {
        number: "2",
        label: "Design",
        text: "We design the workflows, data flow, and intelligence layer, all toward a cohesive brand experience.",
      },
      {
        number: "3",
        label: "Develop",
        text: "The blueprint comes to life. We build the digital infrastructure — dashboards, tools, systems — with measurable outcomes from day one.",
      },
      {
        number: "4",
        label: "Scale",
        text: "We keep optimizing for higher adoption, automation, and better performance to help the system scale well beyond where it started.",
      },
    ],
  },

  advantage: {
    titleLine1: "Multiple",
    titleLine2: "Systems, One",
    titleLine3: "Brand",
    subtitle:
      "One central intelligence layer powers every brand in the Crediple ecosystem.",
    items: [
      {
        tag: "CORE",
        title: "Digital Footprint Systems",
        desc: "Build unified digital experiences across every customer touchpoint.",
      },
      {
        tag: "CORE",
        title: "Growth Funnels",
        desc: "Convert prospects into loyal customers through intelligent acquisition journeys.",
      },
      {
        tag: "AUTOMATION",
        title: "Automated Workflows",
        desc: "Automate repetitive tasks to improve efficiency and operational consistency.",
      },
      {
        tag: "INTELLIGENCE",
        title: "Operational Intelligence",
        desc: "Transform business data into actionable insights for smarter decisions.",
      },
      {
        tag: "ANALYTICS",
        title: "Real-Time Dashboards",
        desc: "Monitor live performance through centralized, data-driven business dashboards.",
      },
      {
        tag: "ECOSYSTEM",
        title: "Ecosystem Design",
        desc: "Connect products, platforms, and people into one scalable ecosystem.",
      },
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
