import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Our Brands & Ventures | Crediple",
  description:
    "Discover Crediple's portfolio of AI, healthcare, fintech, HR, legal, and enterprise SaaS brands delivering innovative technology solutions worldwide.",
  keywords: "Crediple",
  path: "/brands",
});

export default function BrandsLayout({ children }: { children: ReactNode }) {
  return children;
}
