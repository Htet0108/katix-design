import { forwardRef, type ReactNode } from "react";
import { KATIX_FULL_BLEED, KATIX_INNER } from "@/lib/katix-layout";

type KatixSectionBannerProps = {
  id?: string;
  children: ReactNode;
};

/** Full-viewport #414758 band; text aligns to KATIX_INNER like header/footer. */
export const KatixSectionBanner = forwardRef<HTMLElement, KatixSectionBannerProps>(
  function KatixSectionBanner({ id, children }, ref) {
    return (
      <section
        id={id}
        ref={ref}
        className={`${KATIX_FULL_BLEED} shrink-0 scroll-mt-4 bg-[#414758]`}
      >
        <div className={`${KATIX_INNER} py-4`}>
          <h2 className="font-bold text-[20px] leading-[28px] text-white">{children}</h2>
        </div>
      </section>
    );
  }
);
