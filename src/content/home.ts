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
import testimonial_1 from "@/assets/testimonial_1.png";
import testimonial_2 from "@/assets/testimonial_2.png";
import testimonial_3 from "@/assets/testimonial_3.png";

import whoWeServe1 from "@/assets/home/who_we_serve_1.png";
import whoWeServe2 from "@/assets/home/who_we_serve_2.png";
import whoWeServe3 from "@/assets/home/who_we_serve_3.png";
import whoWeServe4 from "@/assets/home/who_we_serve_4.png";
import whoWeServe5 from "@/assets/home/who_we_serve_5.png";
import whoWeServe6 from "@/assets/home/who_we_serve_6.png";

/** Exact colors from Home.pdf / Figma */
export const homeColors = {
  bg: "#000000",
  bgDeep: "#000818",
  bgSection: "#000000",
  bgCard: "#121C33",
  bgFooter: "#09101E",
  accent: "#408EF2",
  accentStrong: "#1550B4",
  accentHover: "#1248A3",
  accentSoft: "#0047AB",
  /** Primary button linear gradient (Figma) */
  buttonFrom: "#1550B4",
  bgButton: "#0047AB",
  buttonTo: "#0047AB",
  buttonGradient: "linear-gradient(180deg, #1550B4 0%, #0047AB 100%)",
  /** Title accent word gradient (Figma) — e.g. "Us" in About Us */
  titleAccentGradient:
    "linear-gradient(180deg, #90C4FF 0%, #5FA8FF 33%, #0047AB 66%, #1550B4 100%)",
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
  return { color: "#0047AB" } as const;
}

export const yakaTaglineClassName =
  "whitespace-nowrap text-center text-[9px] font-medium leading-tight tracking-wide sm:text-[10px] md:text-[11px]";


/** Light-theme section tokens from Home (1).pdf */
export const homeLight = {
  bg: "#F8FAFC",
  bgAlt: "#FBFBFB",
  bgSoft: "#F6FAFF",
  heading: "#0F172A",
  body: "#475569",
  muted: "#454545",
  border: "#E2E8F0",
  card: "#FFFFFF",
  accent: "#0047AB",
} as const;

export const homeContent = {
  hero: {
    badge: "Unified Digital Ecosystem",
    titleLine1: "Tailored systems for every sector, every business.",
    titleLine2: "",
    description:
      "Crediple unifies innovative companies across healthcare, finance, legal technology, education, and AI into one powerful digital ecosystem.",
    primaryCta: { label: "Explore Brands", href: "/brands/#brand-01" },
  },

  ecosystem: {
    titleBefore: "Our Ecosystem",
    titleAccent: "",
    subtitle: "The power of diverse industries, unified by data.",
    brands: [
      {
        name: "Iitil",
        description:
          "Data intelligence ecosystem transforming fragmented business data into strategic decision-making systems.",
        href: "https://www.iitil.com",
        icon: brand_icon_4,
        iconDark: brand_icon_dark_4,
        clickable: true,
      },
      {
        name: "eatskart",
        description:
          "Your food, your way. Explore top restaurants, track orders in real time, and enjoy fast, reliable delivery to your doorstep.",
        href: "https://eatskart.com/",
        icon: brand_icon_7,
        iconDark: brand_icon_dark_7,
        clickable: true,
      },
      {
        name: "Orgatry",
        description:
          "Comprehensive HRMS solutions streamlining workforce management, payroll, attendance, and organisational workflows.",
        href: "https://orgatry.com/",
        icon: brand_icon_5,
        iconDark: brand_icon_dark_5,
        clickable: true,
      },
      {
        name: "My Doctor Capsule",
        description:
          "Healthcare ecosystem focused on digital patient acquisition, healthcare visibility, and modern clinical growth systems.",
        href: "https://mydoctorcapsule.com/",
        icon: brand_icon_1,
        iconDark: brand_icon_dark_1,
        clickable: true,
      },
      {
        name: "Loan Konnekt",
        description:
          "Structured financial intelligence and lending ecosystem simplifying credit analysis and borrower journeys.",
        href: "https://loankonnekt.com/",
        icon: brand_icon_2,
        iconDark: brand_icon_dark_2,
        clickable: true,
      },
      {
        name: "Lawvix",
        description:
          "LegalTech platform focused on structured legal workflows, documentation automation, and digital legal access.",
        href: "https://lawvix.com/",
        icon: brand_icon_3,
        iconDark: brand_icon_dark_3,
        clickable: true,
      },
      {
        name: "Propertizor",
        description:
          "Intelligent property platform connecting buyers, sellers, and agents with data-driven real estate insights.",
        href: "https://propertizor.com/",
        icon: brand_icon_6,
        iconDark: brand_icon_dark_6,
        clickable: true,
      },
    ],
  },

  about: {
    titleBefore: "About Us",
    titleAccent: "",
    subtitle: "The power of diverse industries, unified by data.",
    mission: {
      label: "MISSION",
      title: "The Impact We Create",
      text: "To transform complex business challenges into seamless digital experiences through innovative technology, intelligent automation, and customer-first solutions.",
    },
    vision: {
      label: "VISION",
      title: "Inspired by Tomorrow",
      text: "To become the world's most trusted digital innovation ecosystem, empowering businesses to grow smarter, innovate faster, and scale without limits through intelligent, future-ready technology.",
    },
  },

  values: {
    titleBefore: "The Values",
    titleBefore1: 'Behind Every',
    titleBefore2: 'Innovation',
    titleAccent: "",
    subtitle:
      "The values that define who we are, how we work, and the impact we create.",
    cta: { label: "Explore", href: "/about" },
    items: [
      {
        number: "1",
        title: "Architectural Excellence",
        desc: "We don't just build businesses; we build ecosystems. Every solution under the Crediple umbrella must be scalable, secure and sophisticated.",
      },
      {
        number: "2",
        title: "Uncompromising Integrity",
        desc: "In health, finance, law, data and technology, trust is our primary currency. We lead with transparency and professional rigor in every transaction.",
      },
      {
        number: "3",
        title: "Strategic Synergy",
        desc: "We believe the whole is greater than the sum of its parts. We leverage cross industry insights to create a unique competitive advantage for our partners.",
      },
      {
        number: "4",
        title: "Relentless Innovation",
        desc: "We reject the status quo. We are committed to constant iteration, ensuring our SaaS platforms remain the gold standard in a rapidly shifting global economy.",
      },
    ],
  },

  timeline: {
    titleBefore: "The road so far",
    titleAccent: "",
    subtitle: "Our journey",
    items: [
      {
        period: "2018-2019",
        tag: "STARTED IN",
        title: "Foundation of Crediple",
        highlights: [
          "Founded Crediple to simplify financial access for Indian SMEs and individuals with a strong cross-domain leadership team.",
        ],
      },
      {
        period: "2020-2022",
        tag: "SUCCESSFULLY DONE",
        title: "Healthcare service and Finances and digital Brands",
        highlights: [
          "Developed research-driven credit solutions, operational frameworks, and service lifecycle processes.",
        ],
      },
      {
        period: "2022-2024",
        tag: "FUTURE READY TECHNOLOGIES",
        title: "Focused on Future ready solution",
        highlights: [
          "Expanded into a structured credit services platform with enhanced offerings and partner training programs.",
        ],
      },
      {
        period: "2025-2026",
        tag: "PRESENT",
        title: "Service across India",
        highlights: [
          "Built a multi-domain enterprise ecosystem and launched multiple brands through strategic market expansion.",
        ],
      },
    ],
  },

  serve: {
    titleBefore: "Solutions for Every Sector",
    titleAccent: "",
    subtitle:
      "Industry specific solutions that drive efficiency and sustainable growth.",
    items: [
      {
        title: "Healthcare",
        heading: "Digitising clinical workflows",
        desc: "HIPAA-aligned platforms for seamless patient management, billing, & compliance.",
        short: "HIPAA-aligned platforms for seamless patient management, billing, & compliance.",
        href: "/solutions",
        image: whoWeServe1,
      },
      {
        title: "Finance & Fintech",
        heading: "Powering next-gen financial ops",
        desc: "Banks, NBFCs, and fintech startups rely on our infrastructure to automate reconciliation, reporting, and regulatory compliance at scale.",
        short: "Financial infrastructure for smarter lending and sustainable growth.",
        href: "/solutions",
        image: whoWeServe3,
      },
      {
        title: "Legal Practices",
        heading: "Technology meets jurisprudence",
        desc: "Law firms and solo advocates use our tools to manage case files, automate documentation, and serve clients faster with end-to-end legal tech.",
        short: "Legal workflow infrastructure to reduce paperwork and speed up legal services.",
        href: "/solutions",
        image: whoWeServe4,
      },
      {
        title: "Enterprise Clients",
        heading: "Enterprise-grade digital backbone",
        desc: "Helping enterprises modernise systems and streamline data integration.",
        short: "Helping enterprises modernise systems and streamline data integration.",
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
    title: "What industry leaders think about us",
    subtitle:
      "From startups to large enterprises, we build scalable digital solutions that power growth and innovation.",
    items: [
      {
        name: "Rajiv Sharma",
        role: "",
        company: "",
        text: "Crediple transformed our entire clinical workflow. What used to take days now takes hours. Their infrastructure is rock solid and the support team genuinely understands enterprise healthcare needs.",
        image: testimonial_1,
      },
      {
        name: "Priya Nair",
        role: "",
        company: "",
        text: "We integrated Crediple's fintech platform across 3 cities in under a month. The reconciliation automation alone saved us 40 hours a week. Truly a game changer for our operations.",
        image: testimonial_2,
      },
      {
        name: "Arjun Mehta",
        role: "",
        company: "",
        text: "Our firm was drowning in paperwork. Crediple built us a case management system that feels like it was made specifically for us. Client satisfaction has never been higher.",
        image: testimonial_3,
      },
    ],
  },

  cta: {
    title: "Ready for Institutional Excellence?",
    description:
      "Join the ecosystem that's redefining the future of global industry. Let's discuss your next strategic move.",
  },

  insights: {
    title: "Latest Insights",
    subtitle:
      "Explore our latest thinking, stories, and expertise across technology, design, and business transformation.",
    ctaLabel: "Check Insights",
    ctaHref: "/blog",
  },
} as const;

export type HomeBrand = (typeof homeContent.ecosystem.brands)[number];
export type HomeValue = (typeof homeContent.values.items)[number];
export type HomeTimelineItem = (typeof homeContent.timeline.items)[number];
export type HomeServeItem = (typeof homeContent.serve.items)[number];
export type HomeTestimonial = (typeof homeContent.testimonials.items)[number];
