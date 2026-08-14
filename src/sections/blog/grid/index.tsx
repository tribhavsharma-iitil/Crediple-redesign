"use client";

import { useTheme } from "@/context/ThemeContext";
import { InsightCard } from "@/components/ui/InsightCard";
import type { getBlogPosts } from "@/content/blog";

export default function BlogGrid({ posts }: { posts: ReturnType<typeof getBlogPosts> }) {
    const { isDark } = useTheme();

    return (
        <main
            id="blog-grid"
            className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 !pb-10"
            style={{ background: isDark ? "#000000" : "#FFFFFF" }}
        >
            <div className="mx-auto grid max-w-[1260px] gap-6 md:grid-cols-3">
                {posts.map((post) => (
                    <div key={post.id} className="h-full">
                        <InsightCard
                            href={`/blog/${post.id}`}
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            views={post.views}
                            comments={post.comments}
                            date={post.date}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
