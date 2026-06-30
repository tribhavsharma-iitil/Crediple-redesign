import Hero from "@/sections/home/hero";
import Brands from "@/sections/home/brands";
import About from "@/sections/home/about";
import Timeline from "@/sections/home/timeline";
import Serve from "@/sections/home/serve";
import Testimonials from "@/sections/home/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Brands />
      <About />
      <Timeline />
      <Serve />
      <Testimonials />
    </>
  );
}
