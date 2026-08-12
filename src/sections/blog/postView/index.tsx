"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { homeColors, homeLight } from "@/content/home";
import { InsightCard } from "@/components/ui/InsightCard";
import type { BlogParagraph, BlogPost } from "@/content/blog";

const C = homeColors;

function ParagraphText({ paragraph, isDark }: { paragraph: BlogParagraph; isDark: boolean }) {
    if (typeof paragraph === "string") {
        return (
            <p
                className="text-base leading-8 sm:text-md"
                style={{ color: isDark ? "rgba(255,255,255,0.8)" : homeLight.body }}
            >
                {paragraph}
            </p>
        );
    }
    return (
        <p
            className="font-jakarta text-base font-bold leading-8 sm:text-lg"
            style={{ color: isDark ? C.text : homeLight.heading }}
        >
            {paragraph.text}
        </p>
    );
}

export default function BlogPostView({
    post,
    relatedPosts,
}: {
    post: BlogPost;
    relatedPosts: BlogPost[];
}) {
    const { isDark } = useTheme();
    const tocSections = post.sections.filter((section) => section.inToc !== false);

    return (
        <>
            <section className="relative overflow-hidden dark:bg-black bg-white section-py !mt-12">


                <div className="relative z-10 mx-auto max-w-[1260px] px-4 sm:px-6">
                    <nav aria-label="Breadcrumb" className="mb-6">
                        <ol className="flex flex-wrap items-center gap-2 text-sm dark:text-white/60 sm:text-base">
                            <li>
                                <Link href="/" className="">Home</Link>
                            </li>
                            <li aria-hidden className="dark:text-white/30">/</li>
                            <li>
                                <Link href="/about" className="">About</Link>
                            </li>
                            <li aria-hidden className="dark:text-white/30">/</li>
                            <li>
                                <Link href="/blog" className="">Blog</Link>
                            </li>
                            <li aria-hidden className="dark:text-white/30">/</li>
                            <li aria-current="page" className="max-w-[420px] truncate dark:text-white sm:max-w-[600px]">
                                {post.title}
                            </li>
                        </ol>
                    </nav>

                    <h1 className="dark:text-white font-heading mb-2.5 px-1 text-[2rem] leading-[1.15] font-[800] tracking-tight sm:mb-5 sm:text-4xl md:mb-6 md:text-5xl lg:text-6xl leading-[1] max-w-4xl">
                        {post.title}
                    </h1>

                    <div className="font-jakarta mt-8 flex flex-wrap items-center gap-3 text-sm dark:text-white/80 sm:text-base mb-12">
                        {post.tags.map((tag) => (
                            <span key={tag} className="flex items-center gap-3">
                                <span aria-hidden className="dark:text-white/30">/</span>
                                {tag}
                            </span>
                        ))}
                        <span aria-hidden className="dark:text-white/30">/</span>
                        <span>{post.date}</span>
                    </div>
                </div>
                <div className="" aria-hidden>
                    <Image
                        src={post.image}
                        alt=""
                        fill
                        priority
                        className="!relative object-cover !h-[30rem]"
                        sizes="100vw"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/75 to-black" /> */}
                </div>
                <main className="py-20" style={{ background: isDark ? "#000000" : "#FFFFFF" }}>
                    <div className="mx-auto flex max-w-[1260px] flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start">
                        <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-[320px]">
                            <div
                                className="p-6 sm:p-8"
                                style={{
                                    background: isDark ? "rgba(255,255,255,0.04)" : "rgb(251,251,251)",
                                    border: `1px solid ${isDark ? "#232323" : homeLight.border}`,
                                    backdropFilter: "blur(60px)",
                                }}
                            >
                                <p
                                    className="font-jakarta mb-6 text-lg font-medium sm:text-2xl"
                                    style={{ color: isDark ? C.text : homeLight.heading }}
                                >
                                    Table of contents
                                </p>
                                <ol className="divide-y">
                                    {tocSections.map((section) => (
                                        <li
                                            key={section.id}
                                            className="py-4 first:pt-0 last:pb-0"
                                            style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : homeLight.border }}
                                        >
                                            <a
                                                href={`#${section.id}`}
                                                className="block text-sm leading-8 transition-colors sm:text-base"
                                                style={{ color: isDark ? "rgba(255,255,255,0.8)" : homeLight.body }}
                                            >
                                                {section.heading}
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </aside>

                        <article className="flex-1 space-y-14 sm:space-y-16">
                            <div className="space-y-4">
                                {post.intro.paragraphs.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-base leading-8 sm:text-md"
                                        style={{ color: isDark ? "rgba(255,255,255,0.8)" : homeLight.body }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                                <p
                                    className="font-jakarta text-base font-semibold leading-8 sm:text-lg"
                                    style={{ color: isDark ? C.text : homeLight.heading }}
                                >
                                    {post.intro.highlight}
                                </p>
                            </div>

                            {post.sections.map((section) => (
                                <section key={section.id} id={section.id} className="scroll-mt-28 space-y-4">
                                    <h2
                                        className="font-jakarta text-2xl font-medium sm:text-3xl"
                                        style={{ color: isDark ? C.text : homeLight.heading }}
                                    >
                                        {section.heading}
                                    </h2>
                                    <div className="space-y-4">
                                        {section.paragraphs.map((paragraph, index) => (
                                            <ParagraphText key={index} paragraph={paragraph} isDark={isDark} />
                                        ))}
                                    </div>
                                    {section.list && (
                                        <ul
                                            className="list-disc space-y-2 pl-6 text-base leading-8 sm:text-md"
                                            style={{ color: isDark ? "rgba(255,255,255,0.8)" : homeLight.body }}
                                        >
                                            {section.list.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </section>
                            ))}
                        </article>
                    </div>
                </main>

                {relatedPosts.length > 0 && (
                    <section
                        className="px-4 pb-20 sm:px-6 sm:pb-24"
                        style={{ background: isDark ? "#000000" : "#FFFFFF" }}
                    >
                        <div className="mx-auto max-w-[1260px]">
                            <div className="mb-10 sm:mb-14">
                                <h2
                                    className="font-heading text-4xl tracking-tight sm:text-6xl"
                                    style={{ color: isDark ? C.text : homeLight.heading }}
                                >
                                    More Great reads!
                                </h2>
                                <p
                                    className="font-jakarta mt-4 text-base font-medium sm:text-base"
                                    style={{ color: isDark ? "#FFFFFF" : homeLight.body }}
                                >
                                    Explore our latest thinking, stories, and expertise across technology, design, and business transformation.
                                </p>
                            </div>
                            <div className="grid gap-6 md:grid-cols-3">
                                {relatedPosts.map((related) => (
                                    <InsightCard
                                        key={related.id}
                                        href={`/blog/${related.id}`}
                                        image={related.image}
                                        title={related.title}
                                        description={related.description}
                                        views={related.views}
                                        comments={related.comments}
                                        date={related.date}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </section>


        </>
    );
}
