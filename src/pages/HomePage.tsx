import HeroSection from '../components/sections/HeroSection';
import BrandsSection from '../components/sections/BrandsSection';
import AboutSection from '../components/sections/AboutSection';
import MilestonesSection from '../components/sections/MilestonesSection';
import WhoWeServeSection from '../components/sections/WhoWeServeSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTABanner from '../components/sections/CTABanner';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandsSection />
      <AboutSection /> 
      <MilestonesSection />
      <WhoWeServeSection />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
