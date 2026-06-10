import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  KatixHeader,
  KatixPageBody,
  KatixPageShell,
} from "@/components/shared/katix-page-shell";
import {
  KATIX_FULL_BLEED,
  KATIX_INNER,
  KATIX_MAIN,
  KATIX_MAIN_INNER,
} from "@/lib/katix-layout";

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#389656] focus-visible:outline-offset-2";

export function KatixDesignMenuShell({ children }: { children: ReactNode }) {
  return (
    <KatixPageShell>
      <KatixHeader />
      <KatixPageBody>
        <main className={`${KATIX_MAIN} gap-0`}>{children}</main>
      </KatixPageBody>
    </KatixPageShell>
  );
}

type KatixDesignMenuBannerProps = {
  title: string;
  subtitle?: string;
};

export function KatixDesignMenuBanner({ title, subtitle }: KatixDesignMenuBannerProps) {
  return (
    <section className={`${KATIX_FULL_BLEED} shrink-0 bg-[#414758]`}>
      <div className={`${KATIX_INNER} flex flex-col gap-1 py-4`}>
        <h1 className="font-bold text-[20px] leading-[28px] text-white">{title}</h1>
        {subtitle ? (
          <p className="text-[14px] leading-[20px] text-white/80">{subtitle}</p>
        ) : null}
      </div>
    </section>
  );
}

export function KatixDesignMenuNav({
  children,
  "aria-label": ariaLabel,
}: {
  children: ReactNode;
  "aria-label": string;
}) {
  return (
    <nav
      aria-label={ariaLabel}
      className={`${KATIX_MAIN_INNER} flex flex-col gap-3 pb-2 pt-4`}
    >
      {children}
    </nav>
  );
}

export function KatixDesignBackLink({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className={[
        "inline-flex w-fit items-center gap-1",
        "font-medium text-[#389656] text-[14px] leading-[20px] underline",
        "transition-colors hover:text-[#2f7d48] active:text-[#286f3f]",
        focusRing,
      ].join(" ")}
    >
      <ChevronLeft aria-hidden className="size-4 shrink-0" strokeWidth={2} />
      <span>メニューに戻る</span>
    </Link>
  );
}

type KatixDesignMenuItemProps = {
  href: string;
  label: string;
  Icon?: LucideIcon;
  marker?: number | "bullet";
};

function KatixDesignMenuItemMarker({ marker }: { marker: number | "bullet" }) {
  if (marker === "bullet") {
    return (
      <span className="flex h-10 w-10 shrink-0 items-center justify-center">
        <span aria-hidden className="size-2 rounded-full bg-[#389656]" />
      </span>
    );
  }

  return (
    <span className="bg-[#edf6ee] flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-bold text-[#389656] text-[15px] leading-none tabular-nums">
      {marker}
    </span>
  );
}

export function KatixDesignMenuItem({ href, label, Icon, marker }: KatixDesignMenuItemProps) {
  return (
    <Link
      href={href}
      className={[
        "bg-white border border-transparent drop-shadow-[0px_1px_1px_rgba(61,61,61,0.08)] flex gap-4 items-center min-h-[56px] p-4 rounded-lg w-full",
        "font-bold text-[#3d3d3d] text-[16px] leading-[24px]",
        "transition-[border-color] hover:border-[#389656] active:border-[#389656]",
        focusRing,
      ].join(" ")}
    >
      {marker !== undefined ? (
        <KatixDesignMenuItemMarker marker={marker} />
      ) : Icon ? (
        <span className="bg-[#edf6ee] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#389656]">
          <Icon aria-hidden size={20} strokeWidth={1.75} />
        </span>
      ) : null}
      <span className="flex flex-1 min-w-0">{label}</span>
      <ChevronRight aria-hidden className="size-5 shrink-0 text-[#389656]" strokeWidth={2} />
    </Link>
  );
}

export function KatixDesignMenuPlaceholder({ label }: { label: string }) {
  return (
    <div
      aria-disabled="true"
      className="bg-[#f8f9fa] border border-dashed border-[#d8dcde] flex items-center min-h-[56px] p-4 rounded-lg w-full font-medium text-[#939696] text-[15px] leading-[22px]"
    >
      {label}
    </div>
  );
}
