import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Us | Crediple Technology Company",
  description:
    "Discover Crediple's vision, expertise, and commitment to delivering innovative technology solutions for businesses worldwide.",
  keywords: "Technology Solutions for Business",
  path: "/about/",
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
