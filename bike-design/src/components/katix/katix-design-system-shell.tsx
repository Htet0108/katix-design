import type { ReactNode } from "react";
import { assets } from "@/lib/figma-assets";
import {
  KATIX_DS_FULL_BLEED,
  KATIX_DS_INNER,
  KATIX_DS_MAIN,
  KATIX_DS_MAIN_INNER,
  KATIX_HEADER_OUTER,
  KATIX_PAGE_OUTER,
} from "@/lib/katix-layout";
import { KatixDesignBackLink } from "@/components/katix/katix-design-menu";

type KatixDesignSystemShellProps = {
  children: ReactNode;
};

function KatixDesignSystemHeader() {
  return (
    <header className={KATIX_HEADER_OUTER}>
      <div className={`${KATIX_DS_INNER} flex min-h-[3.75rem] items-center justify-center`}>
        <img alt="KATIX" className="h-6 w-auto object-contain" src={assets.logoKatix} />
      </div>
    </header>
  );
}

type KatixDesignSystemBannerProps = {
  title: string;
  subtitle?: string;
};

export function KatixDesignSystemBanner({ title, subtitle }: KatixDesignSystemBannerProps) {
  return (
    <section className={`${KATIX_DS_FULL_BLEED} shrink-0 bg-[#414758]`}>
      <div className={`${KATIX_DS_INNER} flex flex-col gap-1 py-5`}>
        <h1 className="font-bold text-[24px] leading-[32px] text-white">{title}</h1>
        {subtitle ? (
          <p className="text-[14px] leading-[20px] text-white/80">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

export function KatixDesignSystemShell({ children }: KatixDesignSystemShellProps) {
  return (
    <div className={KATIX_PAGE_OUTER}>
      <KatixDesignSystemHeader />

      <div className="lg:hidden flex flex-1 items-center justify-center px-6 py-12">
        <section className="bg-white drop-shadow-[0px_1px_1px_rgba(61,61,61,0.08)] flex flex-col gap-4 items-center p-6 rounded-lg w-full max-w-md text-center">
          <p className="text-[#3d3d3d] text-[16px] leading-[24px] font-bold">
            デスクトップ表示専用
          </p>
          <p className="text-[#656767] text-[14px] leading-[20px]">
            このページは画面幅 1024px 以上のデスクトップ向けです。
          </p>
          <KatixDesignBackLink />
        </section>
      </div>

      <main className={`hidden lg:flex flex-1 flex-col w-full ${KATIX_DS_MAIN} gap-0`}>
        {children}
      </main>
    </div>
  );
}

export function KatixDesignSystemContent({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${KATIX_DS_MAIN_INNER} flex flex-col gap-6 pb-6 pt-4`}>
      {children}
    </div>
  );
}

export function KatixDesignSystemNav({
  children,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  "aria-label": string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`${KATIX_DS_MAIN_INNER} flex flex-col gap-3 max-w-xl pb-2 pt-4`}
    >
      {children}
    </nav>
  );
}
