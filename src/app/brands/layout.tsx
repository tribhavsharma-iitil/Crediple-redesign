import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Brands",
  description:
    "Explore Crediple's brand ecosystem across healthcare, finance, legal technology, data intelligence, HR, and real estate.",
  path: "/brands",
});

export default function BrandsLayout({ children }: { children: ReactNode }) {
  return children;
}
