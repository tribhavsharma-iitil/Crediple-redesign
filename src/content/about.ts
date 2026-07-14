/**
 * About page content + layout tokens from About.pdf.
 * Text colors sampled from About.pdf spans.
 */

import { homeColors } from "@/content/home";
import coreValues3 from "@/assets/home/core_values_3.jpg";

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
    titleLine1: "We Build Systems that",
    titleAccent: "Outlast Trends.",
    description:
      "Crediple builds scalable technology systems for the industries shaping the future.",
    primaryCta: { label: "See What We've Built", href: "/brands" },
    secondaryCta: { label: "Get in Touch", href: "/contact" },
  },

  trust: {
    label: "Chosen by 50+ institutions and counting",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  foundation: {
    title: "Our Core",
    headline: "A System Builder Across Industries.",
    body: "We rebuild traditional business models as scalable, technology-driven systems. Crediple's approach is consistent across industries — bring structure and intelligence to fragmented processes.",
    accent:
      "Our goal is to create a systemic infrastructure that powers future industries.",
    image: coreValues3,
  },

  philosophy: {
    titleBefore: "Our Operating",
    titleAccent: "Philosophy",
    intro: "Before we enter any industry, we test it against three questions.",
    principles: [
      {
        number: "01",
        text: "Can we standardise the workflow?",
      },
      {
        number: "02",
        text: "Can technology scale it?",
      },
      {
        number: "03",
        text: "Can we improve decision-making?",
      },
    ],
    verdict: "If the answer is yes, we build it.",
    pillars: [
      { number: "01", label: "Transparent Systems" },
      { number: "02", label: "Scalable Infrastructure" },
      { number: "03", label: "Industry-Ready Frameworks" },
      { number: "04", label: "Compounding Ecosystem Value" },
    ],
  },

  future: {
    titleBefore: "What Comes",
    titleAccent: "Next",
    headline: "The next phase is a more connected ecosystem.",
    body: "We're building toward a point where different industries talk to each other seamlessly — healthcare, finance, real estate, legal, and data systems.",
    primaryCta: { label: "Explore What's Next", href: "/solutions" },
    secondaryCta: { label: "Know More", href: "/brands" },
    items: [
      {
        title: "Healthcare Systems",
        desc: "Where clinical operations meet legal-grade documentation and compliance.",
      },
      {
        title: "Legal Practice",
        desc: "Where casework and documentation meet structured data systems and automation.",
      },
      {
        title: "Finance",
        desc: "Where lending decisions meet real-time data intelligence and predictive analytics.",
      },
      {
        title: "Data Intelligence",
        desc: "Where clinical decision-making meets enterprise-grade data intelligence and analytics.",
      },
    ],
  },

  closing: {
    brand: "Crediple",
    line: "A multi-domain architecture, built to transform how industries operate.",
    copyright: "© 2018 Crediple. Building systems that power industries.",
  },
} as const;
