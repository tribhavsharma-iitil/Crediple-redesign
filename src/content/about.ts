/**
 * About page content + layout tokens from About.pdf.
 * Text colors sampled from About.pdf spans.
 */

import { homeColors } from "@/content/home";

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
  /** Title accent blue (Technology & Strategy / Philosophy) — #0047AB */
  textAccent: "#0047AB",
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
    titleLine1: "We build systems that",
    titleAccent: "outlast trends",
    description:
      "Crediple builds scalable technology systems for the industries shaping the future.",
    primaryCta: { label: "See What We've Built", href: "/brands/#brand-01" },
  },

  trust: {
    label: "Chosen by 50+ institutions and counting",
    marks: ["HD", "SB", "IC", "BF", "TC"],
  },

  foundation: {
    title: "Our Core",
    headline: "A System Builder Across Industries.",
    body: "We rebuild traditional business models as scalable, technology-driven systems. Crediple's approach is consistent across industries — bring structure and intelligence to fragmented processes.",
    subtitle: "Our goal is to create a systemic infrastructure that powers future industries.",
  },

  philosophy: {
    titleBefore: "Our Operating Philosophy",
    titleAccent: "",
    subtitle: "Every opportunity must pass three questions.",
    banner: "Built only when all three align.",
    pillars: [
      {
        label: "Transparent",
        title: "Transparent Systems",
        desc: "Create objective workflows with clarity, transparency, and immutable audit logs across operations.",
      },
      {
        label: "Scale",
        title: "Scalable Infrastructure",
        desc: "Build technology that adjusts to growing business needs without added complexity or engineering.",
      },
      {
        label: "Optimize",
        title: "Scalable Frameworks",
        desc: "Deployment frameworks built and tested for repeatable delivery at any complexity.",
      },
      {
        label: "Compound",
        title: "Ecosystem Growth",
        desc: "Interconnected solutions that compound and grow one another over time.",
      },
    ],
  },

  future: {
    titleBefore: "Building the Next Connected Ecosystem",
    titleAccent: "",
    body: "We're building toward a point where different industries talk to each other seamlessly — healthcare, finance, real estate, legal, and data systems.",
    primaryCta: { label: "Explore what's next", href: "/solutions" },
    items: [
      {
        stat: "92%",
        title: "Healthcare Systems",
        desc: "Where clinical operations meet legal-grade documentation and compliance.",
      },
      {
        stat: "87%",
        title: "Legal Practice",
        desc: "Where casework and documentation meet structured data systems and automation.",
      },
      {
        stat: "95%",
        title: "Financial Intelligence",
        desc: "Where lending decisions meet real-time data intelligence and predictive analytics.",
      },
      {
        stat: "98%",
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
