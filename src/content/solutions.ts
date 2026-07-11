/**
 * Solutions page content from Crediple Solutions.pdf.
 * Colors shared with Home / About brand tokens.
 */

import { homeColors, homeTitleAccentStyle } from "@/content/home";
import foundationNetwork from "@/assets/about/foundation-network.png";
import serveFinance from "@/assets/home/serve-finance.jpg";
import aboutCircuit from "@/assets/home/about-circuit.jpg";
import valuesAnalytics from "@/assets/home/values-analytics.jpg";
import timelineServer from "@/assets/home/timeline-server.jpg";
import aboutDesk from "@/assets/home/about-desk.jpg";

export const solutionsColors = {
  ...homeColors,
  text: "#F8F8F8",
  textHeading: "#D8E0F0",
  textMuted: "#707080",
  textBody: "#586878",
  textSoftBlue: "#B0C0F8",
  textAccent: "#3888F0",
} as const;

export { homeTitleAccentStyle };

export const solutionsContent = {
  hero: {
    badge: "Smart Digital Solutions",
    titleLine1: "Scalable Systems For",
    titleAccent: "Modern Businesses.",
    description:
      "We build intelligent platforms, automation systems, and enterprise-ready digital infrastructure.",
    primaryCta: { label: "Our Brands", href: "/brands" },
    secondaryCta: { label: "Start Project", href: "/contact" },
  },

  trust: {
    label: "Trusted by 50+ institutions",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  foundation: {
    title: "Our Foundation",
    headline: "More Than a Holding Company.",
    subheadline: "A system builder across industries",
    body: "Crediple transforms traditional business models into scalable, technology driven ecosystems. We bring structure, intelligence, and scalability to every industry we build in.",
    accent:
      "We are not just building Brands. We are building systems that power industries.",
    image: foundationNetwork,
  },

  domains: {
    titleBefore: "Solution",
    titleAccent: "Domains",
    items: [
      {
        title: "FinTech Intelligence",
        desc: "Credit clarity, borrower profiling, lending workflows, and financial decision systems built for structured growth.",
        short: "Provide the best experience with AI...",
        href: "/contact",
        image: serveFinance,
      },
      {
        title: "HealthTech Systems",
        desc: "Patient acquisition, provider visibility, care workflows, and clinic operations shaped into one connected digital journey.",
        short: "Scale your retail brand with Adobe...",
        href: "/contact",
        image: aboutDesk,
      },
      {
        title: "Data Intelligence",
        desc: "Dashboards, aggregation layers, predictive signals, and decision support systems that turn scattered data into action.",
        short: "Leverage property listing marketpla...",
        href: "/contact",
        image: valuesAnalytics,
      },
      {
        title: "LegalTech Workflows",
        desc: "Case handling, client onboarding, documentation, and service delivery brought into cleaner digital operating models.",
        short: "Personalize your banking experience...",
        href: "/contact",
        image: aboutCircuit,
      },
      {
        title: "Education Institutions",
        desc: "Adaptive learning systems and administrative tools that handle thousands of users with institutional-grade reliability.",
        short: "Provide the best experience with AI...",
        href: "/contact",
        image: timelineServer,
      },
    ],
  },

  process: {
    titleBefore: "What Our",
    titleAccent: "Clients Say",
    subtitle:
      "TRUSTED BY PROFESSIONALS ACROSS HEALTHCARE, FINANCE, LEGAL AND TECH.",
    steps: [
      {
        number: "01",
        label: "Discover",
        text: "We map the industry problem, operational friction, user journey, and scale requirement before defining the system.",
      },
      {
        number: "02",
        label: "Architect",
        text: "We design the workflows, intelligence layer, data movement, and brand experience that make the solution repeatable.",
      },
      {
        number: "03",
        label: "Build",
        text: "We turn the model into digital infrastructure, dashboards, tools, and growth systems with measurable outcomes.",
      },
      {
        number: "04",
        label: "Scale",
        text: "We refine adoption, performance loops, automation, and expansion paths so every solution can grow beyond a single use case.",
      },
    ],
  },

  advantage: {
    eyebrow: "Ecosystem",
    titleBefore: "Unified",
    titleAccent: "Advantage",
    subtitle:
      "Every brand in our ecosystem benefits from the same central intelligence layer.",
    items: [
      { number: "01", label: "Digital presence systems" },
      { number: "02", label: "Customer acquisition funnels" },
      { number: "03", label: "Workflow automation" },
      { number: "04", label: "Operational intelligence" },
      { number: "05", label: "Data dashboards" },
      { number: "06", label: "Brand ecosystem design" },
    ],
  },

  cta: {
    title: "Build the system behind your next industry solution.",
    description:
      "Whether the challenge is visibility, workflow speed, data clarity, or scale, Crediple designs the operating layer that makes progress repeatable.",
    button: { label: "Contact Us", href: "/contact" },
  },
} as const;

export type SolutionsDomain = (typeof solutionsContent.domains.items)[number];
