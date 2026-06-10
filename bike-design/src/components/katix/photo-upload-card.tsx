"use client";

import type { ReactNode } from "react";
import { FieldFeedback } from "@/components/katix/form-controls";
import { IconCamera, IconPlus } from "@/components/katix/icons";

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

const DEFAULT_CARD = "flex flex-col h-full min-h-0";
const DEFAULT_HEADER = "min-h-9 shrink-0";
const DEFAULT_BODY = "p-3";
const CORNER_BODY = "p-3 gap-2 items-center";
const CTA_CLASSES =
  "border border-[#389656] flex gap-2 items-center justify-center px-4 py-2 min-h-10 w-full rounded-lg shrink-0";
const CORNER_CAMERA_CLASSES =
  "absolute bottom-0 right-0 bg-white border border-[#389656] flex items-center justify-center p-2 rounded shrink-0";

function CornerCameraButton() {
  return (
    <div className={CORNER_CAMERA_CLASSES} data-name="Button / Secondary" aria-hidden>
      <IconCamera className="size-5 shrink-0 text-[#389656]" />
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
  uploadTrigger = "bar",
  onUploadClick,
}: PhotoUploadCardProps) {
  const uploadPreviewBox =
    previewBoxClassName ??
    uploadedPreviewClassName ??
    previewContainerClassName;
  const fixedPreviewBox = illustrationPreviewBox ?? uploadPreviewBox;
  const useUploadPreviewBox = previewUrl && previewHug;
  const activePreviewBox = useUploadPreviewBox ? uploadPreviewBox : fixedPreviewBox;
  const useCornerTrigger = uploadTrigger === "corner";
  const ariaTitle = typeof title === "string" ? title : slotId;

  const previewContent = previewUrl ? (
    previewHug ? (
      <img
        src={previewUrl}
        alt="アップロード済み"
        className="block w-full h-auto object-cover rounded"
      />
    ) : (
      <img
        src={previewUrl}
        alt="アップロード済み"
        className="absolute inset-0 size-full object-cover rounded"
      />
    )
  ) : (
    placeholder
  );

  return (
    <div
      className="flex flex-col gap-1 w-full min-w-0 justify-self-stretch"
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
              : `gap-3 items-stretch ${stackBody ? "shrink-0" : "flex-1 min-h-0"} ${bodyClassName}`
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
            {useCornerTrigger && <CornerCameraButton />}
          </div>
          {!useCornerTrigger && (
            <div
              className={`${CTA_CLASSES} ${stackBody ? "" : "mt-auto"}`}
              data-name="Button"
            >
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
