/**
 * Contact page content + shared brand tokens.
 */

import { homeColors, homeLight, getHomeTitleAccentStyle } from "@/content/home";

export const contactColors = {
  ...homeColors,
  text: "#F8F8F8",
  textHeading: "#D8E0F0",
  textMuted: "#98A0A8",
  textSoftBlue: "#B0C0F8",
  textAccent: "#3888F0",
  textTrust: "#606878",
} as const;

export { homeLight, getHomeTitleAccentStyle };

export const contactContent = {
  hero: {
    titleLine1: "Create The Future",
    titleAccent: "With Crediple.",
    description:
      "Partner with us to build scalable digital solutions and high-impact business ecosystems. Innovation starts here.",
    primaryCta: { label: "Know About Us", href: "/about" },
    secondaryCta: { label: "Explore Brands", href: "/brands/#brand-01" },
  },

  form: {
    titleBefore: "Contact us for more",
    titleAccent: "Information",
    intro:
      "We just need a couple of hours. No more than 2 working days since receiving your request.",
    addressLabel: "Address",
    address:
      "Sattva Knowledge City, Hi-Tech City, Hyderabad, Telangana, India, Pin - 500081",
    emailLabel: "Email",
    email: "hello@crediple.com",
    hoursLabel: "Office open",
    hours: "Mon – Fri, 9 AM – 6 PM IST",
    submitLabel: "Send Message",
  },

  cta: {
    title: "Ready to design a smarter operating system for growth?",
    button: { label: "View Solutions", href: "/solutions" },
  },
} as const;
