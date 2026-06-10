import type { ReactNode } from "react";
import { assets } from "@/lib/figma-assets";
import {
  KATIX_BODY,
  KATIX_HEADER_INNER,
  KATIX_HEADER_OUTER,
  KATIX_PAGE_OUTER,
} from "@/lib/katix-layout";

type KatixPageShellProps = {
  children: ReactNode;
  className?: string;
};

type KatixPageBodyProps = {
  children: ReactNode;
  className?: string;
};

export function KatixPageShell({ children, className = "" }: KatixPageShellProps) {
  return (
    <div className={[KATIX_PAGE_OUTER, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function KatixPageBody({ children, className = "" }: KatixPageBodyProps) {
  return (
    <div className={[KATIX_BODY, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function KatixHeader() {
  return (
    <header className={KATIX_HEADER_OUTER}>
      <div className={`${KATIX_HEADER_INNER} justify-center`}>
        <img alt="KATIX" className="h-6 w-auto object-contain" src={assets.logoKatix} />
      </div>
    </header>
  );
}

export { KatixFooter } from "@/components/shared/katix-footer";
