import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { IconQuestion } from "@/components/shared/icons";

export type KatixTextLinkState = "default" | "hover" | "active" | "disabled";

type KatixTextLinkProps = {
  href: string;
  children: ReactNode;
  state?: KatixTextLinkState;
  showIcons?: boolean;
  className?: string;
};

const stateClasses: Record<KatixTextLinkState, string> = {
  default: "text-[#2a7fff]",
  hover: "text-[#1a6fe0]",
  active: "text-[#1558b8]",
  disabled: "text-[#8d9191] pointer-events-none",
};

export function KatixTextLink({
  href,
  children,
  state = "default",
  showIcons = true,
  className = "",
}: KatixTextLinkProps) {
  const isInteractive = state === "default";

  return (
    <Link
      href={href}
      aria-disabled={state === "disabled" ? true : undefined}
      className={[
        "inline-flex items-center gap-2 font-medium text-[14px] leading-[20px] underline",
        stateClasses[state],
        isInteractive ? "hover:text-[#1a6fe0] active:text-[#1558b8]" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showIcons ? (
        <IconQuestion aria-hidden className="size-4 shrink-0" />
      ) : null}
      <span>{children}</span>
      {showIcons ? (
        <ChevronRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
      ) : null}
    </Link>
  );
}
