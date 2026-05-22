import HeroSection from '../components/sections/heroSection';
import BrandsSection from '../components/sections/brandsSection';
import AboutSection from '../components/sections/aboutSection';
import MilestonesSection from '../components/sections/milestonesSection';
import WhoWeServeSection from '../components/sections/whoWeServeSection';
import TestimonialsSection from '../components/sections/testimonialsSection';
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