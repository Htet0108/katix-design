/**
 * Mobile-first layout tokens (base design: 390px viewport, 16px gutters).
 * Container grows naturally on tablet/desktop while preserving visual hierarchy.
 */

/** 390px cap at all breakpoints (mobile, tablet, desktop). */
export const KATIX_CONTAINER =
  "mx-auto w-full max-w-katix-mobile min-w-0";

/** Horizontal padding: 16px mobile, 20px tablet+. */
export const KATIX_GUTTER = "px-4 md:px-5";

/** Centered content column shared by header, body, and footer innards. */
export const KATIX_INNER = `${KATIX_CONTAINER} ${KATIX_GUTTER}`;

/** Full-width page wrapper. */
export const KATIX_PAGE_OUTER =
  "min-h-screen w-full flex flex-col bg-[#f3f4f6] overflow-x-clip";

/** Main scrollable content area between header and footer. */
export const KATIX_BODY = `${KATIX_CONTAINER} flex-1 flex flex-col min-w-0`;

/** Vertical rhythm inside the page body. */
export const KATIX_MAIN =
  "flex flex-col gap-6 items-stretch py-4 md:py-6 relative w-full min-w-0";

/** Padded content blocks aligned with header/footer. */
export const KATIX_MAIN_INNER = `${KATIX_INNER} flex flex-col gap-6 items-stretch min-w-0`;

/** Break out of a centered column to full viewport width (no horizontal scroll). */
export const KATIX_FULL_BLEED =
  "relative left-1/2 w-full max-w-[100vw] -translate-x-1/2";

/** Full-width content blocks inside padded areas. */
export const KATIX_CONTENT_WIDTH = "w-full min-w-0";

/** Vertical section stacks. */
export const KATIX_STACK =
  "flex flex-col gap-3 items-stretch w-full min-w-0";

/** Photo upload grids — 2 columns at all breakpoints (390px mobile design). */
export const KATIX_PHOTO_GRID =
  "grid grid-cols-2 gap-3 w-full min-w-0";

/** Fluid header — background spans viewport, content aligns to KATIX_INNER. */
export const KATIX_HEADER_OUTER =
  "w-full bg-white drop-shadow-[0px_2px_2px_rgba(61,61,61,0.12)] shrink-0";

export const KATIX_HEADER_INNER = `${KATIX_INNER} flex min-h-[3.75rem] items-center`;

/** Fluid footer — background spans viewport, content aligns to KATIX_INNER. */
export const KATIX_FOOTER_OUTER = "w-full bg-[#121212] text-white shrink-0";

export const KATIX_FOOTER_INNER = `${KATIX_INNER} py-8 md:py-10`;

/** @deprecated Use KATIX_PAGE_OUTER + KATIX_BODY instead. */
export const KATIX_PAGE_SHELL = KATIX_PAGE_OUTER;

/** Desktop-only design system pages (1024px+ viewport). */
export const KATIX_DS_CONTAINER = "mx-auto w-full max-w-[1200px] min-w-0";

export const KATIX_DS_GUTTER = "px-8";

export const KATIX_DS_INNER = `${KATIX_DS_CONTAINER} ${KATIX_DS_GUTTER}`;

export const KATIX_DS_MAIN =
  "flex flex-col gap-6 items-stretch py-6 relative w-full min-w-0";

export const KATIX_DS_MAIN_INNER =
  `${KATIX_DS_INNER} flex flex-col gap-6 items-stretch min-w-0`;

export const KATIX_DS_FULL_BLEED =
  "relative left-1/2 w-full max-w-[100vw] -translate-x-1/2";
