import Link from "next/link";
import type { Metadata } from "next";
import type { ComponentType } from "react";
import { ArrowLeft, ChevronRight, Cookie, FileText, Mail, Shield } from "lucide-react";
import {
  COMPANY_ADDRESS,
  COMPANY_NAME,
  CONTACT_EMAIL,
  LAST_UPDATED,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Legal Information",
  description:
    "Review Crediple's privacy policy, terms of service, cookie policy, and contact information.",
  path: "/legal",
});

type LegalSection = {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  intro: string;
  groups: {
    heading: string;
    items: string[];
  }[];
};

const legalSections: LegalSection[] = [
  {
    id: "privacy-policy",
    title: "1. Privacy Policy",
    icon: Shield,
    intro:
      "This Privacy Policy describes how Crediple India Private Limited collects, uses, and protects your personal information when you use our website, services, or technology solutions.",
    groups: [
      {
        heading: "Information We Collect",
        items: [
          "Name and contact details, including phone, email, and identity information where required.",
          "Financially related data, device data, transactional data, and communication records.",
        ],
      },
      {
        heading: "Purpose of Data Collection",
        items: [
          "Service delivery, credit analysis support, platform improvement, and legal compliance.",
          "Operational communication related to Crediple services and digital solutions.",
        ],
      },
      {
        heading: "Data Sharing and Security",
        items: [
          "We may share data with authorised lending partners, financial institutions, technology service providers, or regulatory authorities when required.",
          "We do not sell personal data to unauthorised third parties.",
          "We use encryption, secure servers, access controls, and authentication procedures, while recognising that no digital environment can be guaranteed absolutely secure.",
        ],
      },
      {
        heading: "User Rights and Retention",
        items: [
          "You may request access, correction, deletion subject to legal obligations, or withdrawal of consent where applicable.",
          "Data is retained only as long as necessary for service fulfilment, legal compliance, and dispute resolution.",
        ],
      },
    ],
  },
  {
    id: "terms-of-service",
    title: "2. Terms of Service",
    icon: FileText,
    intro:
      "By accessing or using Crediple's website, platforms, or services, you agree to these Terms of Service. If you do not agree, you must not use the services.",
    groups: [
      {
        heading: "Nature of Services",
        items: [
          "Crediple provides structured services including creditworthiness facilitation, credit analysis support, financial awareness services, and technology-driven solutions.",
          "Crediple does not lend directly, act as a bank or NBFC, or guarantee credit approval or score improvement.",
        ],
      },
      {
        heading: "User Responsibilities",
        items: [
          "Users must be legally competent to contract under Indian law and provide accurate, complete information.",
          "Users must not misuse the platform, submit false or misleading data, attempt unauthorised access, or use services unlawfully.",
        ],
      },
      {
        heading: "Intellectual Property and Service Changes",
        items: [
          "The Crediple brand name, logos, software, designs, processes, frameworks, and methodologies are the property of Crediple India Private Limited or its licensors.",
          "Crediple may modify, suspend, or discontinue services at any time without prior notice.",
        ],
      },
      {
        heading: "Disclaimers and Jurisdiction",
        items: [
          "Services are provided on an as-is and as-available basis without warranties of any kind.",
          "These terms are governed by Indian law and fall under the exclusive jurisdiction of courts in India.",
        ],
      },
    ],
  },
  {
    id: "cookie-policy",
    title: "3. Cookie Policy",
    icon: Cookie,
    intro:
      "This Cookie Policy explains how Crediple uses cookies and similar technologies to operate the website, improve performance, and support future marketing or campaign tracking.",
    groups: [
      {
        heading: "Necessary Cookies",
        items: [
          "Necessary cookies are required for website functionality and cannot be disabled through our cookie preference controls.",
        ],
      },
      {
        heading: "Analytics Cookies",
        items: [
          "Analytics cookies help us understand site performance and how visitors interact with Crediple pages.",
        ],
      },
      {
        heading: "Marketing Cookies",
        items: [
          "Marketing cookies may be used for future marketing, campaign tracking, and relevant engagement across Crediple digital properties.",
        ],
      },
      {
        heading: "Cookie Control",
        items: [
          "You can manage consent through the cookie banner or your browser settings.",
          "Disabling cookies in your browser may cause some website features to work less effectively.",
        ],
      },
    ],
  },
];

export default function LegalPage() {
  return (
    /* 1. Replaced 'min-h-screen' with 'w-full clear-both block' to ensure 
         no absolute or floated layout elements compress the page container height.
    */
    <div className="w-full clear-both block" style={{ background: "var(--background)" }}>
      
      {/* 2. Swapped the explicit template class 'grid' on the <main> tag to a clean, 
           stacked flex column. This prevents the browser layout engine from pinning 
           height boundaries mid-screen on highly expanded responsive text cards.
      */}
      <main className="mx-auto flex flex-col max-w-[1440px] w-full gap-6 px-5 py-12 sm:px-6 sm:py-16">
        {legalSections.map((section) => {
          const Icon = section.icon;

          return (
            <section
              key={section.id}
              id={section.id}
              className="rounded-[24px] p-5 sm:p-7 block"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--card-border)",
                boxShadow: "0 18px 54px rgba(0,0,0,0.12)",
              }}
            >
              <div className="mb-5 flex items-start gap-4">
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    background: "var(--icon-accent-bg)",
                    border: "1px solid var(--icon-accent-border)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    className="text-xl font-bold sm:text-2xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {section.intro}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {section.groups.map((group) => (
                  <div
                    key={group.heading}
                    className="rounded-lg p-4"
                    style={{
                      background: "var(--card-inner)",
                      border: "1px solid var(--border-subtle)",
                    }}
                  >
                    <h3
                      className="mb-3 text-sm font-semibold"
                      style={{ color: "var(--accent-color)" }}
                    >
                      {group.heading}
                    </h3>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item} className="flex gap-2 text-sm leading-relaxed">
                          <ChevronRight
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: "var(--accent-color)" }}
                          />
                          <span style={{ color: "var(--text-secondary)" }}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        <section
          id="contact-information"
          className="rounded-lg p-5 sm:p-7 block"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--card-border)",
          }}
        >
          <div className="mb-5 flex items-start gap-4">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: "var(--icon-accent-bg)",
                border: "1px solid var(--icon-accent-border)",
              }}
            >
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h2
                className="text-xl font-bold sm:text-2xl"
                style={{ color: "var(--text-primary)" }}
              >
                4. Contact Information
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                Company Name: {COMPANY_NAME}
              </p>
            </div>
          </div>

          <dl className="grid gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Contact Email
              </dt>
              <dd className="mt-1" style={{ color: "var(--text-secondary)" }}>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:underline">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Address
              </dt>
              <dd className="mt-1" style={{ color: "var(--text-secondary)" }}>
                {COMPANY_ADDRESS}
              </dd>
            </div>
            <div>
              <dt className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Last Updated
              </dt>
              <dd className="mt-1" style={{ color: "var(--text-secondary)" }}>
                {LAST_UPDATED}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}