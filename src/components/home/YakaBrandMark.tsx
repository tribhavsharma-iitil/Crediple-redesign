"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import yakaBlue from "@/assets/yaka_blue.png";
import yakaLight from "@/assets/yaka_light.png";
import { cn } from "@/lib/utils";

type YakaBrandMarkProps = {
  className?: string;
  logoClassName?: string;
  showTagline?: boolean;
  logo?: StaticImageData;
  priority?: boolean;
};

/**
 * Hero YAKA mark + tagline.
 * Dark — soft blue + white bold YAKA.
 * Light — Primary Blue #2F80ED for the full string.
 * Mobile — compact so it doesn't crowd the hero headline.
 */
export default function YakaBrandMark({
  className,
  logoClassName,
  showTagline = true,
  logo,
  priority = true,
}: YakaBrandMarkProps) {
  return (
    <div
      className={cn(
        "flex max-w-[4.5rem] flex-col items-center gap-0.5 sm:max-w-none sm:gap-1.5 md:gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-7 w-7 sm:h-10 sm:w-10 md:h-14 md:w-14 xl:h-16 xl:w-16",
          logoClassName,
        )}
      >
        {logo ? (
          <Image
            src={logo}
            alt="YAKA"
            fill
            priority={priority}
            sizes="(max-width: 640px) 28px, 64px"
            className="object-contain"
          />
        ) : (
          <>
            <Image
              src={yakaLight}
              alt="YAKA"
              fill
              priority={priority}
              sizes="(max-width: 640px) 28px, 64px"
              className="object-contain dark:hidden"
            />
            <Image
              src={yakaBlue}
              alt="YAKA"
              fill
              priority={priority}
              sizes="(max-width: 640px) 28px, 64px"
              className="hidden object-contain dark:block"
            />
          </>
        )}
      </div>
      {showTagline && (
        <p
          className={cn(
            "max-w-[4.25rem] text-center text-[8px] font-medium leading-[1.2] tracking-wide sm:max-w-none sm:whitespace-nowrap sm:text-[10px] md:text-[11px]",
            "text-[#2F80ED] dark:text-[#B0C0F8]",
          )}
        >
          A{" "}
          <span className="font-bold text-[#2F80ED] dark:text-[#B0C0F8]">
            YAKA
          </span>{" "}
          Enterprise
        </p>
      )}
    </div>
  );
}
