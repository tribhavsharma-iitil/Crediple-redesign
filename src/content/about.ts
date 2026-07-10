/**
 * About page content + layout tokens from About.pdf.
 * Text colors sampled from About.pdf spans.
 */

import { homeColors } from "@/content/home";
import foundationNetwork from "@/assets/about/foundation-network.png";

/** PDF-accurate text + shared brand colors */
export const aboutColors = {
  ...homeColors,
  /** Hero / primary white */
  text: "#F8F8F8",
  /** Section titles, pillars, future headlines — #D8E0F0 */
  textHeading: "#D8E0F0",
  /** Soft gray body (hero desc, intros) — #707080 */
  textMuted: "#707080",
  /** Foundation body — #586878 */
  textBody: "#586878",
  /** Soft blue accent line (foundation) — #B0C0F8 */
  textSoftBlue: "#B0C0F8",
  /** Title accent blue (Technology & Strategy / Philosophy) — #3888F0 */
  textAccent: "#3888F0",
  /** Soft accent (verdict) — #90C0F8 */
  textAccentSoft: "#90C0F8",
  /** Closing secondary / copyright — #E4E6F1 */
  textClosing: "#E4E6F1",
  /** Closing muted line — #C0C0D0 */
  textClosingMuted: "#C0C0D0",
  /** Badge / YAKA soft */
  textBadge: "#58A8F8",
  /** Trust label — #606878 */
  textTrust: "#606878",
} as const;

export const aboutContent = {
  hero: {
    badge: "Unified Digital Ecosystem",
    titleLine1: "Building Businesses",
    titleLine2: "Through",
    titleAccent: "Technology & Strategy.",
    description:
      "Crediple creates scalable digital ecosystems for modern industries and future-ready growth.",
    primaryCta: { label: "Our Ecosystem", href: "/brands" },
    secondaryCta: { label: "Contact Us", href: "/contact" },
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

  philosophy: {
    titleBefore: "Our Operating",
    titleAccent: "Philosophy",
    intro: "Every vertical we enter is evaluated on three principles:",
    principles: [
      {
        number: "01",
        text: "Can we standardise this process?",
      },
      {
        number: "02",
        text: "Can it be scaled through technology?",
      },
      {
        number: "03",
        text: "Can it improve decision making or access?",
      },
    ],
    verdict: "If the answer is yes — we build it.",
    pillars: [
      { number: "01", label: "Transparent systems" },
      { number: "02", label: "Scalable digital infrastructure" },
      { number: "03", label: "Industry ready technology frameworks" },
      { number: "04", label: "Long term ecosystem value" },
    ],
  },

  future: {
    titleBefore: "Future",
    titleAccent: "Direction",
    headlineLine1: "Our focus is not just expansion.",
    headlineLine2: "It is ecosystem convergence.",
    body: "Where healthcare, finance, legal systems, and data intelligence begin to interact seamlessly under one unified structure.",
    cta: { label: "Read More", href: "/solutions" },
    items: [
      {
        title: "Healthcare Professionals",
        desc: "Scale your retail brand with Adobe Commerce and Magento.",
      },
      {
        title: "Finance & Fintech",
        desc: "Powering next-gen financial ops at institutional scale.",
      },
      {
        title: "Legal Practices",
        desc: "Leverage property listing marketplaces and legal workflows.",
      },
      {
        title: "Enterprise & Corporates",
        desc: "Enterprise-grade digital backbone for complex ops.",
      },
    ],
  },

  closing: {
    brand: "Crediple",
    line1: "Crediple is not a traditional holding company.",
    line2:
      "It is a multi-domain system architecture designed to transform how industries operate.",
    copyright: "© 2026 Crediple. Building systems that power industries.",
  },
} as const;
