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
  textAccent: "#0047AB",
  textTrust: "#606878",
} as const;

export { homeLight, getHomeTitleAccentStyle };

export const contactContent = {
  hero: {
    titleLine1: "Got a question?",
    titleLine2: "Let's Connect",
    description:
      "We just need a couple of hours. No more than 2 working days since receiving your request.",
    sayHi: "Or just wanna say hi?",
    email: "hello@crediple.com",
    form: {
      name: { label: "Full Name", placeholder: "Enter your first name" },
      email: { label: "Email", placeholder: "Enter your email" },
      subject: { label: "Subject", placeholder: "Enter your subject" },
      description: {
        label: "Description",
        placeholder: "Please describe what you need",
      },
      submitLabel: "Send Message",
    },
  },

  info: {
    items: [
      {
        icon: "clock",
        label: "Office open",
        value: "Mon – Fri, 9 AM – 6 PM IST",
      },
      {
        icon: "mail",
        label: "Email",
        value: "hello@crediple.com",
      },
      {
        icon: "mapPin",
        label: "Address",
        value:
          "Sattva Knowledge City, Hi-Tech City, Hyderabad, Telangana, India, Pin - 500081",
      },
    ],
  },

  cta: {
    title: "Ready to design a smarter operating system for growth?",
    button: { label: "View Solutions", href: "/solutions" },
  },
} as const;
