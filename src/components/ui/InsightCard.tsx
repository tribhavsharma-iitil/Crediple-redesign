"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, MessageCircle } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { homeLight, homeColors } from "@/content/home";

export interface InsightCardProps {
    href: string;
    image: string | import("next/image").StaticImageData;
    title: string;
    description: string;
    views: number;
    comments: number;
    date: string;
}

export function InsightCard({
    href,
    image,
    title,
    description,
    views,
    comments,
    date,
}: InsightCardProps) {
    const { isDark } = useTheme();
    const C = homeColors;

    return (
        <Link
            href={href}
            className="group block h-full overflow-hidden transition-all duration-300 hover:shadow-lg"
        >
            <article
                className="h-full"
                style={{
                    background: isDark ? "#FFFFFF0A" : "rgb(251, 251, 251)",
                    border: `1px solid ${isDark ? C.border : homeLight.border}`,
                    boxShadow: isDark
                        ? "0 10px 40px rgba(0,0,0,0.3)"
                        : "0 4px 12px rgba(0,0,0,0.08)",
                }}
            >
                <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        placeholder="blur"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="flex flex-col gap-4 p-6 min-h-[15rem] justify-between">
                    <div className="">
                        <h3
                            className="mb-2 text-lg leading-tight line-clamp-2 font-jakarta"
                            style={{ color: isDark ? C.text : homeLight.heading }}
                        >
                            {title}
                        </h3>
                        <p
                            className="text-sm leading-relaxed line-clamp-3 dark:text-[#FFFFFFCC] text-black mt-3"
                            style={{ color: isDark ? C.textMuted : homeLight.body }}
                        >
                            {description}
                        </p>
                    </div>

                    <div
                        className="flex items-center justify-between gap-4 border-t pt-4"
                        style={{
                            borderColor: isDark ? "rgba(248,248,248,0.08)" : homeLight.border,
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                <Eye size={16} style={{ color: C.textMuted }} />
                                <span className="text-xs font-medium" style={{ color: C.textMuted }}>
                                    {views}
                                </span>
                            </div>
                            {/* <div className="flex items-center gap-1">
                                <MessageCircle size={16} style={{ color: C.textMuted }} />
                                <span className="text-xs font-medium" style={{ color: C.textMuted }}>
                                    {comments}
                                </span>
                            </div> */}
                        </div>
                        <p className="text-xs font-medium" style={{ color: C.textMuted }}>
                            {date}
                        </p>
                    </div>
                </div>
            </article>
        </Link>
    );
}
