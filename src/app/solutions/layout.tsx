import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Technology Solutions for Business Growth | Crediple",
  description:
    "Explore a range of software, cloud, automation, and digital transformation solutions built to support modern business needs.",
  keywords: "Cloud Solutions",
  path: "/solutions",
});

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return children;
}
