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
 * Dark — unchanged from before (soft blue + white bold YAKA).
 * Light — Primary Blue #2F80ED for the full string (was black/grey).
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
        "flex flex-col items-center gap-1.5 sm:gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-9 w-9 sm:h-12 sm:w-12 md:h-14 md:w-14 xl:h-16 xl:w-16",
          logoClassName,
        )}
      >
        {logo ? (
          <Image
            src={logo}
            alt="YAKA"
            fill
            priority={priority}
            sizes="(max-width: 640px) 36px, 64px"
            className="object-contain"
          />
        ) : (
          <>
            <Image
              src={yakaLight}
              alt="YAKA"
              fill
              priority={priority}
              sizes="(max-width: 640px) 36px, 64px"
              className="object-contain dark:hidden"
            />
            <Image
              src={yakaBlue}
              alt="YAKA"
              fill
              priority={priority}
              sizes="(max-width: 640px) 36px, 64px"
              className="hidden object-contain dark:block"
            />
          </>
        )}
      </div>
      {showTagline && (
        <p
          className={cn(
            "whitespace-nowrap text-center text-[9px] font-medium leading-tight tracking-wide sm:text-[10px] md:text-[11px]",
            "text-[#2F80ED] dark:text-[#B0C0F8]",
          )}
        >
          A{" "}
          <span className="font-bold text-[#2F80ED] dark:text-[#F8F8F8]">
            YAKA
          </span>{" "}
          Enterprise
        </p>
      )}
    </div>
  );
}
