/**
 * Brands page content.
 */

import { homeColors, homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight } from "@/content/home";
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

export { homeTitleAccentStyle, getHomeTitleAccentStyle, homeLight };

/** Brand body copy — Inter Regular 20/26 from Brands Figma */
export const brandBodyStyle = {
  fontFamily: 'var(--font-inter), "Inter", sans-serif',
  fontWeight: 400,
  fontSize: "20px",
  lineHeight: "26px",
  letterSpacing: "0px",
} as const;

export const brandsContent = {
  hero: {
    titleLine1: "Tailored Systems for",
    titleAccent: "Every Sector.",
    description:
      "Every crediple brand tackles a different industry problem, all with the same rigor and intent. We don’t follow, we set the standard.",
    descriptionLine2: "",
    secondaryCta: { label: "Contact Us", href: "/contact/#contact-form" },
  },

  brands: [
    {
      number: "Brand 01",
      name: "IITIL",
      tagline: "Where Raw Data Becomes Real Decisions",
      description: [
        "Every business generates data, but few know what to do with it. Data without any structure is useless. IITIL converts raw, scattered information into clear, strategic intelligence for operational and growth insights.",
      ],
      image: card_4,
      href: "https://www.iitil.com",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Data Aggregation",
          subtext:
            "Pulling scattered data from every source into one structured system.",
        },
        {
          title: "Performance Dashboards",
          subtext:
            "Clear, visual dashboards to turn raw numbers into actionable decisions.",
        },
        {
          title: "Cross-Domain Intelligence",
          subtext:
            "Benchmarks and trends drawn from data across multiple industries.",
        },
        {
          title: "Predictive Analytics",
          subtext:
            "Predictive models to give decision-makers a head start.",
        },
        {
          title: "Strategic Frameworks",
          subtext: "Decision tools to make the right call at the right time.",
        },
      ],
      coreFocus:
        "We build the intelligence layer between raw data and real-world decisions.",
    },
    {
      number: "Brand 02",
      name: "eatskart",
      tagline: "Where Restaurants Keep More And Customers Pay Less",
      description: [
        "Most delivery platforms take a large cut from every order. By charging restaurants lower commissions, eatskart helps them earn more and pass the savings on to customers.",
        "Browse the latest menus, discover new places, track your order live, and get it delivered fast, every time.",
      ],
      image: card_7,
      href: "https://eatskart.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Lower Commissions",
          subtext:
            "We charge restaurants less, so you get lower prices. Everyone wins!",
        },
        {
          title: "Live Status Tracking",
          subtext:
            'Tracking that removes the guesswork. No more "where\'s my food?"',
        },
        {
          title: "Restaurant Discovery",
          subtext:
            "Surfacing the best local options in seconds, whether something new or familiar.",
        },
        {
          title: "Hyperlocal Marketplaces",
          subtext:
            "Local restaurants, local delivery, matched by geography. Fast and dependable.",
        },
        {
          title: "Instant Delivery",
          subtext:
            "Connecting restaurants and customers through one coordinated system.",
        },
      ],
      coreFocus:
        "We keep commissions low so restaurants earn more and customers pay less.",
    },
    {
      number: "Brand 03",
      name: "Orgatry",
      tagline: "One Platform For Your Entire Workforce",
      description: [
        "Why should HR only mean spreadsheets, chasing approvals, regular onboarding, and manual payroll runs?",
        "Orgatry replaces all of it with one connected, automated system built for modern teams.",
      ],
      image: card_5,
      href: "https://orgatry.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Full-lifecycle HRMS",
          subtext:
            "HR infrastructure that handles every stage of the workforce lifecycle.",
        },
        {
          title: "Automated Payroll",
          subtext:
            "Consistent, on-time payroll, with zero manual reconciliation.",
        },
        {
          title: "Attendance Tracking",
          subtext:
            "Automated tracking to remove the back-and-forth from leave requests.",
        },
        {
          title: "Performance Management",
          subtext:
            "Clear tracking system for consistent performance management across every team.",
        },
        {
          title: "Regulatory Compliance",
          subtext: "Reporting that stays audit-ready at all times.",
        },
      ],
      coreFocus:
        "We build the workforce infrastructure HR teams need so they can focus on people, not paperwork.",
    },
    {
      number: "Brand 04",
      name: "My Doctor Capsule",
      tagline: "The Growth Engine Behind Every Great Practice",
      description: [
        "Clinics and practitioners face the same problem: patients can't find them, or don't trust what they find.",
        "My Doctor Capsule solves both with a credible digital presence and organized patient acquisition systems for modern healthcare providers.",
      ],
      image: card_1,
      href: "https://mydoctorcapsule.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Complete Digital Identity",
          subtext:
            "End-to-end digital presence, from search results to booking pages.",
        },
        {
          title: "Lead-to-patient Funnels",
          subtext:
            "Structured acquisition designed for how patients search for and choose a provider.",
        },
        {
          title: "Healthcare Identity",
          subtext:
            "Branding to help providers look as trustworthy online as they are in practice.",
        },
        {
          title: "Profile Optimization",
          subtext:
            "Optimized listings that show up when and where patients are searching.",
        },
        {
          title: "Engagement Systems",
          subtext:
            "Communication systems to stay connected between appointments and maintain relationships.",
        },
      ],
      coreFocus:
        "We make sure good healthcare providers are impossible to miss through the right systems.",
    },
    {
      number: "Brand 05",
      name: "Loan Konnekt",
      tagline: "From Financial Confusion To Financial Clarity",
      description: [
        "The financial system is hard to navigate. Credit and lending feel like a black box.",
        "Loan Konnekt builds analytical frameworks and advisory systems to simplify financial decision-making for borrowers seeking to understand their options and lenders seeking to assess risk.",
      ],
      image: card_2,
      href: "https://loankonnekt.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Credit Analysis",
          subtext:
            "A structured approach to assessing creditworthiness for lenders.",
        },
        {
          title: "Borrower Profiling",
          subtext:
            "Comprehensive systems for accurately and fairly profiling borrowers.",
        },
        {
          title: "Credit Ecosystem",
          subtext:
            "Bringing borrowers and lenders together through a guided process.",
        },
        {
          title: "Lending Analytics",
          subtext:
            "Dashboards to convert credit and lending data into clear next steps.",
        },
        {
          title: "Structured Credit Repair",
          subtext:
            "Step-by-step pathways from where credit stands to where it needs to be.",
        },
      ],
      coreFocus:
        "We exist to make financial decision-making less complicated for borrowers and lenders alike.",
    },
    {
      number: "Brand 06",
      name: "Lawvix",
      tagline: "Where Legal Work Gets Faster",
      description: [
        "Lawvix removes friction from legal processes. Say goodbye to outdated systems.",
        "Through structured, technology-enabled workflows, we make legal access more transparent, more efficient, and more accessible. For practices and clients alike.",
      ],
      image: card_3,
      href: "https://lawvix.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Digital Case Management",
          subtext:
            "Structured tracking from the first filing to case resolution.",
        },
        {
          title: "Streamlined Onboarding",
          subtext: "Automated onboarding to remove friction from day one.",
        },
        {
          title: "Drafting Automation",
          subtext:
            "Structured templates and automation for higher accuracy and speed.",
        },
        {
          title: "Accessible Infrastructure",
          subtext:
            "Services that lower the barrier to legal help for clients.",
        },
        {
          title: "Efficient Workflows",
          subtext: "Tools to make everyday legal processes more efficient.",
        },
      ],
      coreFocus:
        "We exist to make slow, manual legal processes work the way they should have all along — fast and clear.",
    },
    {
      number: "Brand 07",
      name: "Propertizor",
      tagline: "Structured Data For An Unstructured Market",
      description: [
        "Real estate runs on scattered, outdated, or simply untrustworthy information.",
        "Propertizor fixes that by connecting buyers, sellers, and agents through verified listings and structured market data.",
      ],
      image: card_6,
      href: "https://propertizor.com/",
      featuresTitle: "What We Build",
      deliverables: [
        {
          title: "Verified Listings",
          subtext: "Smart property data to remove any guesswork from listings.",
        },
        {
          title: "Smart Matching Engines",
          subtext:
            "Matchmaking engines to connect the right buyers with the right properties.",
        },
        {
          title: "Structured Agent Management",
          subtext:
            "Systems that make agent operations easier to run and track.",
        },
        {
          title: "Live Analytics",
          subtext:
            "Real-time, actionable market intelligence for buyers, sellers, and agents.",
        },
        {
          title: "Data-driven Valuation",
          subtext:
            "Automated, consistent valuations that both buyers and sellers can trust.",
        },
      ],
      coreFocus:
        "We build the systems that make property decisions faster and more confident.",
    },
  ],

  advantage: {
    titleBefore: "Individual Brands,",
    titleAccent: "Shared Intelligence",
    subtitle:
      "What one brand learns, every brand benefits from. That's the Crediple advantage.",
    items: [
      { number: "01", label: "Scales With You" },
      { number: "02", label: "Connected By Design" },
      { number: "03", label: "Learns Across Sectors" },
      { number: "04", label: "Ship Faster, Always" },
    ],
  },

  closing: {
    titleLine1: "Built Separately.",
    titleLine2: "Powered Together.",
    body: "Every brand solves a different problem, in a different industry, for a different customer. Underneath, they share the same infrastructure — one intelligence layer for accelerated growth.",
  },
} as const;

export type BrandDetail = (typeof brandsContent.brands)[number];

/** Footer / nav brand links (live product sites). */
export const brandExternalLinks = brandsContent.brands.map((brand) => ({
  label: brand.name,
  href: brand.href,
}));
