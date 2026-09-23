import type { Metadata } from "next";
import { createPageMetadata, DEFAULT_KEYWORDS } from "@/lib/seo";
import OurJourneyHero from "@/sections/ourJourney/hero";
import OurJourneyFoundation from "@/sections/ourJourney/foundation";
import Timeline from "@/sections/home/timeline";

export const metadata: Metadata = createPageMetadata({
    title: "Our Journey | Crediple",
    description:
        "From a single idea to a multi-sector ecosystem — explore the milestones behind Crediple's growth.",
    path: "/our-journey",
    keywords: [...DEFAULT_KEYWORDS, "our journey", "timeline", "company history"],
});

export default function OurJourneyPage() {
    return (
        <>
            <OurJourneyHero />
            <OurJourneyFoundation />
            <Timeline />
        </>
    );
}
