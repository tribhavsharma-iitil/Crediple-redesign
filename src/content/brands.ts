/**
 * Brands page content from Crediple Brands.pdf + existing brand copy.
 */

import { homeColors, homeTitleAccentStyle } from "@/content/home";
import card_1 from "@/assets/card_1.png";
import card_2 from "@/assets/card_2.png";
import card_3 from "@/assets/card_3.png";
import card_4 from "@/assets/card_4.png";
import card_5 from "@/assets/card_5.png";
import card_6 from "@/assets/card_6.png";
import card_7 from "@/assets/card_7.png";

export const brandsColors = {
  ...homeColors,
  text: "#F8F8F8",
  textMuted: "#707080",
  textSoftBlue: "#B0C0F8",
  textAccent: "#3888F0",
  textTagline: "#5FA8FF",
} as const;

export { homeTitleAccentStyle };

const DELIVERABLE_NOTE = "A core part of what we deliver for this brand.";

export const brandsContent = {
  hero: {
    badge: "Our Brand Ecosystem",
    titleLine1: "Specialized Brands.",
    titleAccent: "Unified Vision.",
    description:
      "Each Crediple brand solves industry-specific challenges with scalable digital solutions.",
    descriptionLine2: "Built to lead modern industries.",
    primaryCta: { label: "About Us", href: "/about" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
  },

  trust: {
    label: "Trusted by 50+ institutions",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  brands: [
    {
      number: "01",
      name: "Iitil",
      tagline: "Turning Data Into Strategic Business Intelligence",
      description: [
        "Iitil is a data intelligence-driven ecosystem focused on transforming raw, unstructured data into meaningful business insights that drive strategic decision-making across industries.",
        "In a modern business environment, data is everywhere—but intelligence is missing. Iitil bridges this gap by building structured analytical systems and decision intelligence frameworks.",
      ],
      image: card_4,
      href: "https://www.iitil.com",
      deliverables: [
        "Data aggregation systems",
        "Business analytics dashboards",
        "Cross-industry insights",
        "Predictive analytics models",
        "Decision support systems",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We convert fragmented data into structured intelligence that powers better business decisions, operational efficiency, and strategic growth.",
    },
    {
      number: "02",
      name: "Eatskart",
      tagline: "Your Food, Your Way Through Intelligent On-Demand Delivery",
      description: [
        "Eatskart is a modern food delivery ecosystem designed to give you your food, your way, by connecting consumers with top-rated local restaurants and diverse cuisines effortlessly.",
        "Explore trending menus, discover fresh culinary choices, track your order in real time, and enjoy fast, reliable delivery brought straight to your doorstep via a seamless, few-tap workflow.",
      ],
      image: card_7,
      href: "https://eatskart.com/",
      deliverables: [
        "On-demand food delivery networks",
        "Real-time order tracking engines",
        "Restaurant discovery interfaces",
        "Localized marketplace systems",
        "Secure checkout workflows",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We transform local dining into a structured, highly reliable delivery ecosystem that prioritizes convenience, speed, and absolute meal satisfaction.",
    },
    {
      number: "03",
      name: "Orgatry",
      tagline: "Streamlining Human Capital Through Intelligent HRMS Solutions",
      description: [
        "Orgatry is a comprehensive HRMS ecosystem designed to simplify and automate the full lifecycle of workforce management — from onboarding and attendance to payroll, performance, and compliance.",
        "Managing people is complex. Orgatry transforms traditional HR operations into structured, data-driven workflows that reduce administrative overhead and empower organisations to focus on growth.",
      ],
      image: card_5,
      href: "https://orgatry.com",
      deliverables: [
        "End-to-end HRMS platforms",
        "Payroll automation systems",
        "Attendance & leave management",
        "Performance tracking workflows",
        "Compliance & reporting tools",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We replace fragmented HR processes with unified, intelligent workforce systems that improve efficiency, transparency, and organisational clarity.",
    },
    {
      number: "04",
      name: "My Doctor Capsule",
      tagline:
        "Transforming Healthcare Services Into a Digital First Patient Ecosystem",
      description: [
        "My Doctor Capsule is designed to transform how healthcare service providers connect with, engage and grow their patient base in a digitally driven world. It focuses on building a complete healthcare visibility and patient acquisition ecosystem for clinics, hospitals, and independent practitioners.",
        "In today's healthcare environment, trust, visibility, and accessibility are as important as treatment itself. My Doctor Capsule bridges this gap by enabling healthcare providers to establish a strong and credible digital identity.",
      ],
      image: card_1,
      href: "https://www.mydoctorcapsule.com",
      deliverables: [
        "End-to-end digital presence systems",
        "Structured patient acquisition funnels",
        "Healthcare branding",
        "Profile optimization",
        "Engagement systems",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We do not just market healthcare services — we build structured patient connection systems that improve discovery, trust, and conversion into care.",
    },
    {
      number: "05",
      name: "Loan Konnekt",
      tagline: "Building Structured Intelligence for Credit & Lending Ecosystems",
      description: [
        "Loan Konnekt is a financial intelligence ecosystem focused on simplifying and structuring credit, lending and financial decision making processes. It is built to bridge the gap between borrowers, financial understanding, and lending systems through structured advisory and analytical frameworks.",
        "The financial world is complex, fragmented, and often inaccessible to the average individual or business. Loan Konnekt simplifies this through system-driven financial clarity and credit intelligence models.",
      ],
      image: card_2,
      href: "https://www.loankonnekt.com",
      deliverables: [
        "Credit analysis frameworks",
        "Borrower profiling systems",
        "Lending ecosystem facilitation",
        "Financial intelligence dashboards",
        "Credit improvement pathways",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We transform financial complexity into structured clarity and actionable credit intelligence, enabling better decisions for individuals and institutions.",
    },
    {
      number: "06",
      name: "Lawvix",
      tagline: "Digitizing Legal Access Through Structured Workflow Systems",
      description: [
        "Lawvix is a legalTech ecosystem focused on simplifying legal access, improving case management and enabling structured legal service delivery through digital transformation.",
        "Legal systems are often slow, fragmented and difficult to navigate. Lawvix is designed to bring structure, transparency, and accessibility into legal workflows using technology-enabled systems.",
      ],
      image: card_3,
      href: "https://www.lawvix.com",
      deliverables: [
        "Digital case management",
        "Client onboarding workflows",
        "Legal documentation automation",
        "Legal service access platforms",
        "Workflow optimization tools",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We enable a shift from traditional legal handling to structured, process-driven legal ecosystems that improve efficiency, clarity, and accessibility.",
    },
    {
      number: "07",
      name: "Propertizor",
      tagline:
        "Connecting Buyers, Sellers & Agents Through Intelligent Real Estate Systems",
      description: [
        "Propertizor is a data-driven real estate platform built to bridge the gap between property seekers, sellers, and agents through structured discovery, smart listings, and intelligent market insights.",
        "The real estate market is noisy and opaque. Propertizor brings clarity through structured property data, verified listings, and analytical tools that help all stakeholders make confident, informed decisions.",
      ],
      image: card_6,
      href: "https://propertizor.com",
      deliverables: [
        "Smart property listing systems",
        "Buyer & seller matching engines",
        "Agent management platforms",
        "Market analytics dashboards",
        "Property valuation frameworks",
      ],
      deliverableNote: DELIVERABLE_NOTE,
      coreFocus:
        "We transform fragmented real estate experiences into structured, insight-driven ecosystems that accelerate transactions and build lasting property trust.",
    },
  ],

  advantage: {
    eyebrow: "Ecosystem",
    titleBefore: "Unified",
    titleAccent: "Advantage",
    subtitle:
      "Every brand in our ecosystem benefits from the same central intelligence layer.",
    items: [
      { number: "01", label: "Scalability" },
      { number: "02", label: "Unified data systems" },
      { number: "03", label: "Cross-industry intelligence" },
      { number: "04", label: "Faster innovation cycles" },
    ],
  },

  closing: {
    titleLine1: "One Intelligence.",
    titleLine2: "Many Ecosystems.",
    body: "Each brand is distinct. Each ecosystem is independent. But all are powered by the same Crediple intelligence layer — a unified backbone that accelerates growth across every domain.",
  },
} as const;

export type BrandDetail = (typeof brandsContent.brands)[number];
