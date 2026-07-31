/** Shared mobile-safe YAKA placement for all page heroes. */
export const HERO_YAKA_SLOT_CLASS =
  "pointer-events-none absolute top-[4.25rem] right-2 z-20 sm:right-3 md:top-20 md:right-4 lg:top-24 lg:right-8 xl:right-12";

/**
 * Mobile: extra top space so content sits below the YAKA mark (stays centered).
 * md+: content vertically centered in the hero.
 */
export const HERO_SECTION_CLASS =
  "relative flex min-h-0 items-start justify-center overflow-x-clip pt-[9.75rem] pb-10 select-none md:min-h-[var(--hero-min-h)] md:items-center md:pt-24 md:pb-14 lg:pt-59 lg:pb-40 lg:h-[100vh]";

/** Centered hero copy — equal side padding on all breakpoints. */
export const HERO_CONTENT_CLASS =
  "relative z-10 mx-auto flex w-full flex-col items-center px-5 text-center sm:px-6";
