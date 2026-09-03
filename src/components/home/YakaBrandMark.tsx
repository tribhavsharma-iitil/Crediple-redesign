"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import yakaBlue from "@/assets/yaka_dark.png";
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
 * Light — Primary Blue #0047AB for the full string.
 * Mobile — compact mark so it clears the headline stack.
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
        "flex max-w-[4.25rem] flex-col items-center gap-0.5 sm:max-w-none sm:gap-1.5 md:gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-6 w-6 sm:h-10 sm:w-10 md:h-14 md:w-14 xl:h-16 xl:w-16",
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
            "max-w-[4rem] text-center text-[7.5px] font-semibold leading-[1.15] tracking-wide sm:max-w-none sm:whitespace-nowrap sm:text-[10px] md:text-[11px]",
            "text-[#0047AB] dark:text-[#ffffff]",
          )}
        >
          A{" "}
          <span className="font-[1000] text-[#0047AB] dark:text-[#ffffff]">
            YAKA
          </span>{" "}
          Enterprise
        </p>
      )}
    </div>
  );
}
