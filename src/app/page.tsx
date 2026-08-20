import type { Metadata } from "next";
import Hero from "@/sections/home/hero";
import Brands from "@/sections/home/brands";
import About from "@/sections/home/about";
import Timeline from "@/sections/home/timeline";
import Serve from "@/sections/home/serve";
import Testimonials from "@/sections/home/testimonials";
import Insights from "@/sections/home/insights";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  createPageMetadata,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  keywords: [...DEFAULT_KEYWORDS],
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Brands />
      <Timeline />
      <Serve />
      <Testimonials />
      <Insights />
    </>
  );
}
