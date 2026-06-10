"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

export type KatixButtonStyle = "primary" | "secondary" | "danger" | "text";
export type KatixButtonSize = "large" | "medium" | "small";
export type KatixButtonState = "default" | "hover" | "active" | "disabled";

type KatixButtonProps = {
  style?: KatixButtonStyle;
  size?: KatixButtonSize;
  state?: KatixButtonState;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "style">;

const sizeClasses: Record<KatixButtonSize, string> = {
  large: "gap-2 px-6 py-3 text-[20px] leading-[28px] min-h-[52px]",
  medium: "gap-2 px-5 py-2.5 text-[16px] leading-[24px] min-h-[40px]",
  small: "gap-1.5 px-4 py-1.5 text-[14px] leading-[20px] min-h-[28px]",
};

const styleStateClasses: Record<
  KatixButtonStyle,
  Record<KatixButtonState, string>
> = {
  primary: {
    default: "bg-[#389656] text-white",
    hover: "bg-[#6db978] text-white",
    active: "bg-[#2f7d48] text-white",
    disabled: "bg-[#e5e6e6] text-[#8d9191] cursor-not-allowed",
  },
  secondary: {
    default: "bg-white border border-[#389656] text-[#389656]",
    hover: "bg-[#edf6ee] border border-[#389656] text-[#389656]",
    active: "bg-[#e2f0e4] border border-[#2f7d48] text-[#2f7d48]",
    disabled:
      "bg-white border border-[#e5e6e6] text-[#8d9191] cursor-not-allowed",
  },
  danger: {
    default: "bg-[#bd0f0f] text-white",
    hover: "bg-[#d01010] text-white",
    active: "bg-[#9a0c0c] text-white",
    disabled: "bg-[#e5e6e6] text-[#8d9191] cursor-not-allowed",
  },
  text: {
    default: "bg-transparent text-[#389656]",
    hover: "bg-transparent text-[#6db978] underline",
    active: "bg-transparent text-[#2f7d48] underline",
    disabled: "bg-transparent text-[#8d9191] cursor-not-allowed",
  },
};

const interactiveHoverClasses: Partial<Record<KatixButtonStyle, string>> = {
  primary: "hover:bg-[#6db978] active:bg-[#2f7d48]",
  secondary: "hover:bg-[#edf6ee] active:bg-[#e2f0e4]",
  danger: "hover:bg-[#d01010] active:bg-[#9a0c0c]",
  text: "hover:text-[#6db978] hover:underline active:text-[#2f7d48]",
};

export function KatixButton({
  style = "primary",
  size = "large",
  state = "default",
  children,
  className = "",
  disabled,
  type = "button",
  ...props
}: KatixButtonProps) {
  const isDisabled = disabled || state === "disabled";
  const isStaticPreview = state !== "default";
  const visualState = isDisabled ? "disabled" : state;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        sizeClasses[size],
        styleStateClasses[style][visualState],
        !isStaticPreview && !isDisabled ? interactiveHoverClasses[style] : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
