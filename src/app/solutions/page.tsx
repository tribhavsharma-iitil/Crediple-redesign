import SolutionsHero from "@/sections/solutions/hero";
import SolutionsFoundation from "@/sections/solutions/foundation";
import SolutionsDomains from "@/sections/solutions/domains";
import SolutionsProcess from "@/sections/solutions/process";
import SolutionsAdvantage from "@/sections/solutions/advantage";
// import SolutionsCta from "@/sections/solutions/cta";

export default function SolutionsPage() {
  return (
    <>
      <SolutionsHero />
      <SolutionsFoundation />
      <SolutionsDomains />
      <SolutionsProcess />
      <SolutionsAdvantage />
      {/* <SolutionsCta /> */}
    </>
  );
}
