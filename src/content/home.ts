/**
 * Single source of truth for Home page content + PDF color tokens.
 * Content = original site copy (unchanged).
 * Colors = extracted from Home.pdf.
 */

import brand_icon_1 from "@/assets/brand_icon_1.png";
import brand_icon_2 from "@/assets/brand_icon_2.png";
import brand_icon_3 from "@/assets/brand_icon_3.png";
import brand_icon_4 from "@/assets/brand_icon_4.png";
import brand_icon_5 from "@/assets/brand_icon_5.png";
import brand_icon_6 from "@/assets/brand_icon_6.png";
import brand_icon_7 from "@/assets/brand_icon_7.png";
import brand_icon_dark_1 from "@/assets/brand_icon_dark_1.png";
import brand_icon_dark_2 from "@/assets/brand_icon_dark_2.png";
import brand_icon_dark_3 from "@/assets/brand_icon_dark_3.png";
import brand_icon_dark_4 from "@/assets/brand_icon_dark_4.png";
import brand_icon_dark_5 from "@/assets/brand_icon_dark_5.png";
import brand_icon_dark_6 from "@/assets/brand_icon_dark_6.png";
import brand_icon_dark_7 from "@/assets/brand_icon_dark_7.png";

import aboutDesk from "@/assets/home/about-desk.jpg";
import aboutCircuit from "@/assets/home/about-circuit.jpg";
import coreValues1 from "@/assets/home/core_values_1.jpg";
import coreValues2 from "@/assets/home/core_values_2.png";
import coreValues3 from "@/assets/home/core_values_3.jpg";
import coreValues4 from "@/assets/home/core_values_4.jpg";
import companyHistory1 from "@/assets/home/company_history_1.jpg";
import companyHistory2 from "@/assets/home/company_history_2.png";
import companyHistory3 from "@/assets/home/company_history_3.png";
import companyHistory4 from "@/assets/home/company_history_4.png";
import whoWeServe1 from "@/assets/home/who_we_serve_1.jpg";
import whoWeServe2 from "@/assets/home/who_we_serve_2.png";
import whoWeServe3 from "@/assets/home/who_we_serve_3.jpg";
import whoWeServe4 from "@/assets/home/who_we_serve_4.jpg";
import whoWeServe5 from "@/assets/home/who_we_serve_5.jpg";
import whoWeServe6 from "@/assets/home/who_we_serve_6.jpg";

/** Exact colors from Home.pdf / Figma */
export const homeColors = {
  bg: "#071122",
  bgDeep: "#000818",
  bgSection: "#081028",
  bgCard: "#121C33",
  bgFooter: "#09101E",
  accent: "#408EF2",
  accentStrong: "#1550B4",
  accentHover: "#1248A3",
  accentSoft: "#2F80ED",
  /** Primary button linear gradient (Figma) */
  buttonFrom: "#1550B4",
  buttonTo: "#2F80ED",
  buttonGradient: "linear-gradient(180deg, #1550B4 0%, #2F80ED 100%)",
  /** Title accent word gradient (Figma) — e.g. "Us" in About Us */
  titleAccentGradient:
    "linear-gradient(180deg, #90C4FF 0%, #5FA8FF 33%, #2F80ED 66%, #1550B4 100%)",
  text: "#F8F8F8",
  textMuted: "#98A0A8",
  textDim: "#586070",
  border: "rgba(248, 248, 248, 0.10)",
  borderStrong: "rgba(248, 248, 248, 0.18)",
  wave: "rgba(64, 142, 242, 0.35)",
  glow: "rgba(47, 128, 237, 0.28)",
} as const;

/** Shared style for homepage title accent words (Us, Ecosystem, Values, …) */
export const homeTitleAccentStyle = {
  backgroundImage: homeColors.titleAccentGradient,
  WebkitBackgroundClip: "text" as const,
  WebkitTextFillColor: "transparent",
  backgroundClip: "text" as const,
  color: "transparent",
};

/** Light PDF uses solid blue accents; dark keeps the gradient */
export function getHomeTitleAccentStyle(isDark: boolean) {
  if (isDark) return homeTitleAccentStyle;
  return { color: "#2F80ED" } as const;
}

/**
 * Hero YAKA tagline (BUG-008) — light only change from prior dark look:
 * - Light → Primary Blue #2F80ED (full string)
 * - Dark  → soft blue #B0C0F8 + white bold YAKA (unchanged from before)
 */
export function getYakaTaglineStyle(isDark: boolean) {
  return { color: isDark ? "#B0C0F8" : "#2F80ED" } as const;
}

export function getYakaNameStyle(isDark: boolean) {
  return { color: isDark ? "#F8F8F8" : "#2F80ED" } as const;
}

export const yakaTaglineClassName =
  "whitespace-nowrap text-center text-[9px] font-medium leading-tight tracking-wide sm:text-[10px] md:text-[11px]";


/** Light-theme section tokens from Home (1).pdf */
export const homeLight = {
  bg: "#F8FAFC",
  bgAlt: "#FFFFFF",
  bgSoft: "#F6FAFF",
  heading: "#0F172A",
  body: "#475569",
  muted: "#64748B",
  border: "#E2E8F0",
  card: "#FFFFFF",
  accent: "#2F80ED",
} as const;

export const homeContent = {
  hero: {
    badge: "Unified Digital Ecosystem",
    titleLine1: "One Holding.",
    titleLine2: "Multiple Innovations.",
    description:
      "Crediple unifies innovative companies across healthcare, finance, legal technology, education, and AI into one powerful digital ecosystem.",
    primaryCta: { label: "Explore Brands", href: "/brands" },
  },

  trust: {
    label: "Trusted by 50+ institutions",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  ecosystem: {
    titleBefore: "Our",
    titleAccent: "Ecosystem",
    subtitle: "The power of diverse industries, unified by data.",
    brands: [
      {
        name: "Iitil",
        description:
          "Data intelligence ecosystem transforming fragmented business data into strategic decision-making systems.",
        href: "https://www.iitil.com",
        cta: "Explore IITIL",
        icon: brand_icon_4,
        iconDark: brand_icon_dark_4,
        clickable: true,
      },
      {
        name: "EatsKart",
        description:
          "Your food, your way. Explore top restaurants, track orders in real time, and enjoy fast, reliable delivery to your doorstep.",
        href: "https://eatskart.com/",
        cta: "Explore Eatskart",
        icon: brand_icon_7,
        iconDark: brand_icon_dark_7,
        clickable: true,
      },
      {
        name: "Orgatry",
        description:
          "Comprehensive HRMS solutions streamlining workforce management, payroll, attendance, and organisational workflows.",
        href: "https://orgatry.com",
        cta: "Explore Orgatry",
        icon: brand_icon_5,
        iconDark: brand_icon_dark_5,
        clickable: false,
      },
      {
        name: "My Doctor Capsule",
        description:
          "Healthcare ecosystem focused on digital patient acquisition, healthcare visibility, and modern clinical growth systems.",
        href: "https://www.mydoctorcapsule.com",
        cta: "Explore My Doctor Capsule",
        icon: brand_icon_1,
        iconDark: brand_icon_dark_1,
        clickable: false,
      },
      {
        name: "Loan Konnekt",
        description:
          "Structured financial intelligence and lending ecosystem simplifying credit analysis and borrower journeys.",
        href: "https://www.loankonnekt.com",
        cta: "Explore Loan Konnekt",
        icon: brand_icon_2,
        iconDark: brand_icon_dark_2,
        clickable: false,
      },
      {
        name: "Lawvix",
        description:
          "LegalTech platform focused on structured legal workflows, documentation automation, and digital legal access.",
        href: "https://www.lawvix.com",
        cta: "Explore Lawvix",
        icon: brand_icon_3,
        iconDark: brand_icon_dark_3,
        clickable: false,
      },
      {
        name: "Propertizor",
        description:
          "Intelligent property platform connecting buyers, sellers, and agents with data-driven real estate insights.",
        href: "https://propertizor.com",
        cta: "Explore Propertizor",
        icon: brand_icon_6,
        iconDark: brand_icon_dark_6,
        clickable: false,
      },
    ],
  },

  about: {
    titleBefore: "About",
    titleAccent: "Us",
    mission: {
      title: "MISSION",
      text: "To engineer the digital infrastructure of tomorrow. Crediple exists to bridge the gap between complex industry challenges and streamlined technological solutions. By nurturing a powerhouse portfolio of fintech, healthtech and legal platforms, we dismantle barriers to efficiency and empower professionals to operate at their absolute peak.",
    },
    vision: {
      title: "VISION",
      text: "To become the definitive global benchmark for multi sector digital transformation. Our vision is a future where the Crediple ecosystem is the invisible engine driving professional success across every major industry, turning high level complexity into accessible, high performance growth.",
    },
    missionImage: aboutDesk,
    visionImage: aboutCircuit,
  },

  values: {
    titleBefore: "Our Core",
    titleAccent: "Values",
    items: [
      {
        number: "01",
        title: "Architectural Excellence",
        desc: "We don't just build businesses; we build ecosystems. Every solution under the Crediple umbrella must be scalable, secure and sophisticated.",
        image: coreValues2,
      },
      {
        number: "02",
        title: "Uncompromising Integrity",
        desc: "In health, finance, law, data and technology, trust is our primary currency. We lead with transparency and professional rigor in every transaction.",
        image: coreValues1,
      },
      {
        number: "03",
        title: "Strategic Synergy",
        desc: "We believe the whole is greater than the sum of its parts. We leverage cross industry insights to create a unique competitive advantage for our partners.",
        image: coreValues4,
      },
      {
        number: "04",
        title: "Relentless Innovation",
        desc: "We reject the status quo. We are committed to constant iteration, ensuring our SaaS platforms remain the gold standard in a rapidly shifting global economy.",
        image: coreValues3,
      },
    ],
  },

  timeline: {
    titleBefore: "Company",
    titleAccent: "History",
    images: [
      companyHistory2,
      companyHistory3,
      companyHistory4,
      companyHistory1,
    ],
    items: [
      {
        period: "2018-2019",
        tag: "STARTED IN",
        title: "Foundation of Crediple",
        highlights: [
          "Crediple incorporated to simplify financial access for Indian SMEs and individuals",
          "Core founding team assembled across FinTech, LegalTech & HealthTech domains",
          "Seed funding secured; operations commenced from Udaipur, Rajasthan",
        ],
      },
      {
        period: "2020-2022",
        tag: "SUCCESSFULLY DONE",
        title: "Healthcare service and Finances and digital Brands",
        highlights: [
          "Deep research driven development of credit improvement methodologies",
          "Structuring service frameworks for credit audit, correction, and score enhancement",
          "Building the initial operational blueprint and service lifecycle design",
        ],
      },
      {
        period: "2022-2024",
        tag: "FUTURE READY TECHNOLOGIES",
        title: "Focused on Future ready solution",
        highlights: [
          "Transition from concept to a structured credit services platform ecosystem",
          "Service lines expansion of credit audit, correction, score improvement, and optimisation",
          "Development of training frameworks for credit partners and internal teams",
        ],
      },
      {
        period: "2025-2026",
        tag: "PRESENT",
        title: "Service across India",
        highlights: [
          "6 years of primary market research across multiple verticals, channels, and customer segments",
          "Development of a multi domain enterprise ecosystem across health, finance, law, technology, data, HR, and property management",
          "Phased launch of multiple brands through structured and controlled market entry",
        ],
      },
    ],
  },

  serve: {
    titleBefore: "Who We",
    titleAccent: "Serve",
    items: [
      {
        title: "Healthcare Professionals",
        heading: "Digitising clinical workflows",
        desc: "From independent practitioners to multi-specialty hospitals, we deliver HIPAA-aligned platforms that streamline patient management, billing, and compliance.",
        short: "Digitising clinical workflows for modern care teams...",
        href: "/solutions",
        image: whoWeServe1,
      },
      {
        title: "Finance & Fintech",
        heading: "Powering next-gen financial ops",
        desc: "Banks, NBFCs, and fintech startups rely on our infrastructure to automate reconciliation, reporting, and regulatory compliance at scale.",
        short: "Powering next-gen financial ops at institutional scale...",
        href: "/solutions",
        image: whoWeServe3,
      },
      {
        title: "Legal Practices",
        heading: "Technology meets jurisprudence",
        desc: "Law firms and solo advocates use our tools to manage case files, automate documentation, and serve clients faster with end-to-end legal tech.",
        short: "Technology meets jurisprudence for modern firms...",
        href: "/solutions",
        image: whoWeServe4,
      },
      {
        title: "Enterprise & Corporates",
        heading: "Enterprise-grade digital backbone",
        desc: "Large organisations trust Crediple to modernise legacy systems, integrate cross-functional data pipelines, and maintain operational continuity.",
        short: "Enterprise-grade digital backbone for complex ops...",
        href: "/solutions",
        image: whoWeServe5,
      },
      {
        title: "Education Institutions",
        heading: "Reinventing learning systems",
        desc: "From edtech platforms to traditional institutions, we build adaptive learning systems and administrative tools that handle thousands of users seamlessly.",
        short: "Reinventing learning systems for institutions at scale...",
        href: "/solutions",
        image: whoWeServe6,
      },
      {
        title: "Tech Startups",
        heading: "Launch faster, scale smarter",
        desc: "Early-stage and growth-stage teams plug into our ecosystem to access shared infrastructure, reducing time-to-market without sacrificing quality.",
        short: "Launch faster, scale smarter with shared infrastructure...",
        href: "/solutions",
        image: whoWeServe2,
      },
    ],
  },

  testimonials: {
    titleBefore: "What Our",
    titleAccent: "Clients Say",
    subtitle:
      "TRUSTED BY PROFESSIONALS ACROSS HEALTHCARE, FINANCE, LEGAL AND TECH.",
    items: [
      {
        name: "Rajiv Sharma",
        role: "CEO, MediTech Solutions",
        text: "Crediple transformed our entire clinical workflow. What used to take days now takes hours. Their infrastructure is rock solid and the support team genuinely understands enterprise healthcare needs.",
      },
      {
        name: "Priya Nair",
        role: "CFO, FinVault India",
        text: "We integrated Crediple's fintech platform across 3 cities in under a month. The reconciliation automation alone saved us 40 hours a week. Truly a game changer for our operations.",
      },
      {
        name: "Arjun Mehta",
        role: "Founder, LexCore",
        text: "Our firm was drowning in paperwork. Crediple built us a case management system that feels like it was made specifically for us. Client satisfaction has never been higher.",
      },
    ],
  },

  cta: {
    title: "Ready for Institutional Excellence?",
    description:
      "Join the ecosystem that's redefining the future of global industry. Let's discuss your next strategic move.",
  },
} as const;

export type HomeBrand = (typeof homeContent.ecosystem.brands)[number];
export type HomeValue = (typeof homeContent.values.items)[number];
export type HomeTimelineItem = (typeof homeContent.timeline.items)[number];
export type HomeServeItem = (typeof homeContent.serve.items)[number];
export type HomeTestimonial = (typeof homeContent.testimonials.items)[number];
