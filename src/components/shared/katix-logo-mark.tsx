type KatixLogoMarkProps = {
  className?: string;
};

/** Stylized K mark from the KATIX brand (matches Figma header/footer icon). */
export function KatixLogoMark({ className = "size-8" }: KatixLogoMarkProps) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 32 32"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16 2C9.925 2 5 6.925 5 13v6c0 6.075 4.925 11 11 11V16H16V2z" />
      <path d="M16 2c5.247 0 9.5 3.813 9.5 8.5 0 1.953-.66 3.754-1.768 5.19L16 16V2z" />
      <path d="M16 16l-8.268 8.268C9.24 25.77 12.477 27 16 27c6.075 0 11-4.925 11-11v-6H16z" />
    </svg>
  );
}

/** White KATIX wordmark row for the footer. */
export function KatixFooterBrand() {
  return (
    <div className="flex items-center justify-center gap-2">
      <KatixLogoMark className="size-8 shrink-0 text-white" />
      <span className="font-bold text-[22px] leading-none tracking-[0.04em] text-white">
        KATIX
      </span>
    </div>
  );
}
