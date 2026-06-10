"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";

export function PhotoGuideModalShell({
  open,
  onClose,
  titleId,
  children,
  dataNodeId,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  children: ReactNode;
  dataNodeId?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 touch-manipulation"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="bg-white flex flex-col items-start overflow-clip relative rounded-lg shadow-[0px_1px_2px_0px_rgba(61,61,61,0.08)] w-full max-w-[358px] max-h-[calc(100vh-2rem)] touch-manipulation"
        data-node-id={dataNodeId}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

export function UploadModalBulletTips({ tips }: { tips: readonly string[] }) {
  return (
    <div className="bg-white border border-[#e2e4e9] flex flex-col gap-1 items-start justify-center px-3 py-2 rounded-lg w-full">
      <p className="font-bold leading-[20px] text-[14px] text-[#3d3d3d] w-full">
        撮影のポイント
      </p>
      <div className="flex flex-col items-start px-2 w-full">
        {tips.map((tip) => (
          <p key={tip} className="leading-[20px] text-[14px] font-medium text-[#505353]">
            ・{tip}
          </p>
        ))}
      </div>
    </div>
  );
}

function SampleBadge({ label, tone }: { label: string; tone: "ok" | "ng" }) {
  const styles =
    tone === "ok"
      ? "bg-[#389656] text-white"
      : "bg-[#d01010] text-white";

  return (
    <span
      className={`absolute top-1.5 left-1.5 z-10 rounded px-1.5 py-0.5 text-[11px] font-bold leading-4 ${styles}`}
    >
      {label}
    </span>
  );
}

function alignedSampleImageStyle(
  left: number,
  top: number,
  width: number,
  height: number
): CSSProperties {
  return {
    width: `${(100 / width) * 100}%`,
    height: `${(100 / height) * 100}%`,
    left: `${(-left / width) * 100}%`,
    top: `${(-top / height) * 100}%`,
  };
}

function NgMeterGlareOverlay({
  src,
  window,
}: {
  src: string;
  window: { left: number; top: number; width: number; height: number };
}) {
  const { left, top, width, height } = window;
  const imgStyle = alignedSampleImageStyle(left, top, width, height);

  return (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 68% 58% at 50% 48%, #000 18%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 68% 58% at 50% 48%, #000 18%, transparent 100%)",
        }}
      >
        <img
          alt=""
          src={src}
          className="absolute max-w-none object-cover pointer-events-none blur-[2px] brightness-125 contrast-[0.55] saturate-50"
          style={imgStyle}
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 58% 46% at 46% 40%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.62) 32%, rgba(255,255,255,0.18) 58%, transparent 82%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(125deg, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.2) 38%, transparent 52%, rgba(210,228,255,0.28) 68%, transparent 100%)",
        }}
      />
    </div>
  );
}

function NgBlurWindow({
  src,
  window,
}: {
  src: string;
  window: {
    left: number;
    top: number;
    width: number;
    height: number;
    blurClassName?: string;
  };
}) {
  const { left, top, width, height, blurClassName = "blur-[1px]" } = window;
  const imgStyle = alignedSampleImageStyle(left, top, width, height);

  return (
    <div
      aria-hidden
      className="absolute overflow-hidden pointer-events-none"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    >
      <img
        alt=""
        src={src}
        className={`absolute max-w-none object-cover pointer-events-none ${blurClassName}`}
        style={imgStyle}
      />
    </div>
  );
}

function NgMeterOverlay({
  src,
  window,
}: {
  src: string;
  window: {
    left: number;
    top: number;
    width: number;
    height: number;
    effect?: "blur" | "glare";
    blurClassName?: string;
  };
}) {
  if (window.effect === "glare") {
    return <NgMeterGlareOverlay src={src} window={window} />;
  }

  return <NgBlurWindow src={src} window={window} />;
}

export function OkNgSampleComparison({
  okSample,
  ngSample,
  boxClassName = "relative h-[120px] w-full overflow-hidden bg-[#f3f4f6]",
}: {
  okSample: { src: string; imgClassName: string; caption: string };
  ngSample: {
    src: string;
    imgClassName: string;
    caption: string;
    ngBlurWindow?: {
      left: number;
      top: number;
      width: number;
      height: number;
      effect?: "blur" | "glare";
      blurClassName?: string;
    };
  };
  boxClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-3 w-full">
        <div className="flex flex-1 flex-col gap-1.5 items-center min-w-0">
          <div
            className={`${boxClassName} rounded border-2 border-[#389656] w-full`}
          >
            <SampleBadge label="OK" tone="ok" />
            <img alt="" className={okSample.imgClassName} src={okSample.src} />
          </div>
          <p className="text-[11px] font-medium leading-4 text-[#505353] text-center w-full">
            {okSample.caption}
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-1.5 items-center min-w-0">
          <div
            className={`${boxClassName} rounded border-2 border-[#d01010] w-full`}
          >
            <SampleBadge label="NG" tone="ng" />
            <img alt="" className={ngSample.imgClassName} src={ngSample.src} />
            {ngSample.ngBlurWindow && (
              <NgMeterOverlay src={ngSample.src} window={ngSample.ngBlurWindow} />
            )}
          </div>
          <p className="text-[11px] font-medium leading-4 text-[#505353] text-center w-full">
            {ngSample.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
