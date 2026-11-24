import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import CorporateFilings from "@/components/corporate/CorporateFilings";

export const metadata: Metadata = createPageMetadata({
  title: "Corporate Secretarial | Crediple",
  description:
    "View and download Crediple India Private Limited corporate secretarial filings.",
  path: "/corporate-secretarial/",
  keywords: [
    "Crediple corporate secretarial",
    "MGT-7A",
    "annual return",
  ],
});

export default function CorporateSecretarialPage() {
  return (
    <main
      className="mx-auto min-h-[70vh] w-full max-w-[1260px] px-4 py-12 pt-28 sm:px-6 sm:py-20 sm:pt-32"
      style={{ background: "var(--background)" }}
    >
      <header className="mb-8 max-w-3xl sm:mb-10">
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-[0.18em]"
          style={{ color: "var(--accent-color)" }}
        >
          Corporate Disclosures
        </p>
        <h1
          className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
          style={{ color: "var(--text-primary)" }}
        >
          Corporate Secretarial
        </h1>
        <p
          className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Access the statutory filings and annual return documents of Crediple
          India Private Limited.
        </p>
      </header>

      <CorporateFilings />
    </main>
  );
}
