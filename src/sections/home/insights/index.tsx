"use client";

import { motion } from "framer-motion";
import { homeContent, homeColors, homeLight } from "@/content/home";
import { getBlogPosts } from "@/content/blog";
import { useTheme } from "@/context/ThemeContext";
import { HomeReveal, HomeItem } from "@/components/home/HomeReveal";
import { InsightCard } from "@/components/ui/InsightCard";
import { homeFadeUp, homeFadeLeft } from "@/lib/animations";
import { useHomeMotion } from "@/hooks/useHomeMotion";
import Link from "next/link";

const { insights } = homeContent;
const C = homeColors;

export default function Insights() {
    const { isDark } = useTheme();
    const { stagger, viewport } = useHomeMotion();
    const posts = getBlogPosts();

    return (
        <section
            id="insights"
            className="relative scroll-mt-20 overflow-hidden section-py sm:scroll-mt-24"
            style={{ background: isDark ? "#000000" : "white" }}
        >
            <div className="relative z-10 mx-auto w-full max-w-[1260px] px-4 sm:px-6">
                <div className="flex flex-col gap-4 sm:gap-6 mb-12 sm:mb-14 md:mb-16 justify-between sm:flex-row sm:items-end">
                    <HomeReveal variants={homeFadeLeft} className="flex-1">
                        <h2
                            className="font-heading mb-3 text-3xl font-black tracking-tight sm:text-4xl md:text-5xl lg:text-6xl"
                            style={{ color: isDark ? C.text : homeLight.heading }}
                        >
                            {insights.title}
                        </h2>
                        <p
                            className="mt-3 text-left text-sm sm:text-base font-medium"
                            style={{ color: isDark ? "#FFFFFF" : homeLight.body }}
                        >
                            {insights.subtitle}
                        </p>
                    </HomeReveal>

                    <HomeReveal variants={homeFadeUp}>
                        <Link
                            href={insights.ctaHref}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-normal no-underline transition-opacity hover:opacity-90 whitespace-nowrap"
                            style={{
                                background: C.accentSoft,
                                color: "#FFFFFF",
                                boxShadow: `0 6px 20px rgba(0, 71, 171, 0.2)`,
                            }}
                        >
                            {insights.ctaLabel}
                        </Link>
                    </HomeReveal>
                </div>

                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewport}
                    className="grid grid-cols-1 gap-6 md:grid-cols-3"
                >
                    {posts.map((post) => (
                        <HomeItem key={post.id} variants={homeFadeUp}>
                            <InsightCard
                                href={`/blog/${post.id}`}
                                image={post.image}
                                title={post.title}
                                description={post.description}
                                views={post.views}
                                comments={post.comments}
                                date={post.date}
                            />
                        </HomeItem>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
