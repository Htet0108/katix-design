"use client";

import type { ReactNode } from "react";
import { FieldFeedback } from "@/components/shared/form-controls";
import { IconCamera, IconPlus } from "@/components/shared/icons";

function RequiredBadge() {
  return (
    <div className="bg-[#fae7e7] flex items-center justify-center overflow-clip px-2 py-0.5 relative rounded shrink-0">
      <span className="leading-[16px] text-[12px] font-bold text-[#d01010]">必須</span>
    </div>
  );
}

function OptionalBadge() {
  return (
    <div className="bg-[#e2e4e9] flex items-center justify-center overflow-clip px-2 py-0.5 relative rounded shrink-0">
      <span className="leading-[16px] text-[12px] font-bold text-[#1c1f26]">任意</span>
    </div>
  );
}

export type PhotoUploadCardProps = {
  slotId: string;
  title: ReactNode;
  badge?: "required" | "optional";
  subtitle?: string;
  buttonLabel?: string;
  previewUrl?: string;
  placeholder?: ReactNode;
  previewBoxClassName?: string;
  /** @deprecated Use previewBoxClassName */
  previewContainerClassName?: string;
  /** @deprecated Use previewBoxClassName */
  uploadedPreviewClassName?: string;
  cardClassName?: string;
  bodyClassName?: string;
  dataNodeId?: string;
  headerClassName?: string;
  previewHug?: boolean;
  illustrationPreviewBox?: string;
  stackBody?: boolean;
  errorMessage?: string;
  /** true = warning icon, false = success icon. Omit while checking or when no photo. */
  hasSoftWarning?: boolean;
  /** `bar` = full-width CTA (bike). `corner` = camera icon bottom-right on preview (car). */
  uploadTrigger?: "bar" | "corner";
  onUploadClick: (slotId: string) => void;
};

/** Standard document preview slot (140:91 ratio at mobile reference size). */
export const DOC_PREVIEW_BOX =
  "relative w-full aspect-[140/91] overflow-hidden rounded";

/** Tall record document preview slot (140:195 ratio). */
export const DOC_RECORD_PREVIEW_BOX =
  "relative w-full aspect-[140/195] overflow-hidden rounded";

/** @deprecated Use DOC_RECORD_PREVIEW_BOX */
export const DOC_RECORD_PREVIEW_BOX_HUG =
  "relative w-full overflow-hidden rounded";

/** Bike / odometer illustration slot (square, scales with card width). */
export const BIKE_ILLUSTRATION_PREVIEW_BOX =
  "relative w-3/4 max-w-full aspect-square overflow-hidden rounded mx-auto";

/** Car upload card preview slot (full-width square, Figma Card_upload). */
export const CAR_ILLUSTRATION_PREVIEW_BOX =
  "relative w-full aspect-square overflow-hidden rounded";

/** Illustration content box inside BIKE_ILLUSTRATION_PREVIEW_BOX. */
export const BIKE_ILLUSTRATION_INNER =
  "relative w-full h-full overflow-hidden";

/** Centers a bike illustration inside the preview slot. */
export function BikeIllustrationSlot({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[75%] aspect-square overflow-hidden">{children}</div>
    </div>
  );
}

export function ScratchIllustrationPlaceholder({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <img
        alt={alt}
        className="absolute h-[63.54%] left-0 max-w-none top-[18.23%] w-full object-contain"
        src={src}
      />
    </div>
  );
}

export const FREE_PLUS_PLACEHOLDER = (
  <BikeIllustrationSlot>
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <IconPlus className="size-10 shrink-0 text-[#389656] w-[40%] h-auto max-w-10" />
    </div>
  </BikeIllustrationSlot>
);

export function DocIllustrationPlaceholder({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <img
      alt={alt}
      className="absolute inset-0 size-full object-cover pointer-events-none"
      src={src}
    />
  );
}

export function DocRecordIllustrationPlaceholder({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
  return (
    <img
      alt={alt}
      className="block w-full h-auto pointer-events-none"
      src={src}
    />
  );
}

const DEFAULT_CARD = "flex flex-col w-full";
const DEFAULT_HEADER = "min-h-9 shrink-0";
const DEFAULT_BODY = "p-3";
const CORNER_BODY = "p-3 gap-2 items-center";
const CTA_CLASSES =
  "border border-[#389656] flex gap-2 items-center justify-center px-4 py-2 min-h-10 w-full rounded-lg shrink-0";
const CORNER_CAMERA_CLASSES =
  "absolute bottom-0 right-0 bg-white border border-[#389656] flex items-center justify-center p-2 rounded shrink-0";

/** Uploaded photo — fully visible, centered, aspect ratio preserved (no crop). */
const UPLOADED_PHOTO_CLASSES =
  "absolute inset-0 size-full object-contain object-center rounded pointer-events-none";

function UploadedPhotoPreview({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="アップロード済み"
      className={UPLOADED_PHOTO_CLASSES}
    />
  );
}

function CornerCameraButton() {
  return (
    <div className={CORNER_CAMERA_CLASSES} data-name="Button / Secondary" aria-hidden>
      <IconCamera className="size-5 shrink-0 text-[#389656]" />
    </div>
  );
}

function UploadStatusCheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 10" fill="none" className={className} aria-hidden>
      <path
        d="M1 5.25L4.25 8.5L11 1.75"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadStatusExclamationIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 4 14" fill="none" className={className} aria-hidden>
      <path d="M2 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="2" cy="12.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function PreviewStatusBadge({ status }: { status: "ok" | "warning" }) {
  const badgeClassName =
    status === "ok"
      ? "border-[#389656] bg-[#ecf7ef] text-[#389656]"
      : "border-[#f0a500] bg-[#fff8e6] text-[#f0a500]";

  return (
    <div
      className={`absolute top-2 right-2 z-10 flex size-8 items-center justify-center rounded-full border-2 shadow-[0px_1px_2px_0px_rgba(61,61,61,0.12)] ${badgeClassName}`}
      aria-hidden
    >
      {status === "ok" ? (
        <UploadStatusCheckIcon className="size-3" />
      ) : (
        <UploadStatusExclamationIcon className="h-3.5 w-1" />
      )}
    </div>
  );
}

export function PhotoUploadCard({
  slotId,
  title,
  badge,
  subtitle,
  buttonLabel = "写真を追加",
  previewUrl,
  placeholder,
  previewBoxClassName,
  previewContainerClassName = DOC_PREVIEW_BOX,
  uploadedPreviewClassName,
  cardClassName = DEFAULT_CARD,
  bodyClassName = DEFAULT_BODY,
  dataNodeId,
  headerClassName = DEFAULT_HEADER,
  previewHug = false,
  illustrationPreviewBox,
  stackBody = false,
  errorMessage,
  hasSoftWarning,
  uploadTrigger = "bar",
  onUploadClick,
}: PhotoUploadCardProps) {
  const uploadPreviewBox =
    previewBoxClassName ??
    uploadedPreviewClassName ??
    previewContainerClassName;
  const fixedPreviewBox = illustrationPreviewBox ?? uploadPreviewBox;
  const activePreviewBox =
    previewUrl && previewHug ? uploadPreviewBox : fixedPreviewBox;
  const useCornerTrigger = uploadTrigger === "corner";
  const ariaTitle = typeof title === "string" ? title : slotId;

  const previewContent = previewUrl ? (
    <UploadedPhotoPreview src={previewUrl} />
  ) : (
    placeholder
  );

  return (
    <div
      className="flex flex-col gap-1 w-full min-w-0 self-start"
      data-error-field={errorMessage ? slotId : undefined}
    >
      <button
        type="button"
        data-photo-slot={slotId}
        data-node-id={dataNodeId}
        onClick={() => onUploadClick(slotId)}
        className={`bg-white flex flex-col items-stretch overflow-hidden relative rounded border border-solid shadow-[0px_1px_2px_0px_rgba(61,61,61,0.08)] w-full cursor-pointer text-left hover:opacity-70 transition-opacity touch-manipulation ${
          errorMessage ? "border-[#d01010]" : "border-transparent"
        } ${cardClassName}`}
        aria-label={`${ariaTitle}の写真をアップロード`}
        aria-invalid={Boolean(errorMessage)}
      >
        <div
          className={`flex gap-1 items-center px-3 py-2 w-full pointer-events-none ${headerClassName}`}
        >
          <div className="flex flex-1 flex-col font-bold justify-center min-w-0 text-[14px] text-[#3d3d3d]">
            {typeof title === "string" ? (
              <span className="block leading-[20px]">{title}</span>
            ) : (
              title
            )}
          </div>
          {badge === "required" && <RequiredBadge />}
          {badge === "optional" && <OptionalBadge />}
        </div>
        <div
          className={`flex flex-col w-full pointer-events-none ${
            useCornerTrigger
              ? CORNER_BODY
              : `gap-3 items-stretch shrink-0 ${bodyClassName}`
          }`}
          data-name="Container"
        >
          {subtitle && (
            <span className="block leading-[20px] text-[14px] font-medium text-[#656767] w-full shrink-0">
              {subtitle}
            </span>
          )}
          <div data-photo-preview className={`w-full shrink-0 ${activePreviewBox}`}>
            {previewContent}
            {previewUrl && hasSoftWarning !== undefined && (
              <PreviewStatusBadge status={hasSoftWarning ? "warning" : "ok"} />
            )}
            {useCornerTrigger && <CornerCameraButton />}
          </div>
          {!useCornerTrigger && (
            <div className={CTA_CLASSES} data-name="Button">
              <span className="font-medium leading-6 text-base text-[#389656]">
                {buttonLabel}
              </span>
              <IconCamera className="size-5 shrink-0 text-[#389656]" />
            </div>
          )}
        </div>
      </button>
      {errorMessage && <FieldFeedback message={errorMessage} />}
    </div>
  );
}
