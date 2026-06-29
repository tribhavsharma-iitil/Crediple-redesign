import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Solutions",
  description:
    "Explore Crediple's software development, workflow automation, data intelligence, cloud, and digital transformation solutions.",
  path: "/solutions",
});

export default function SolutionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
