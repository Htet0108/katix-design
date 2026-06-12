"use client";

import { useEffect, useState, type ReactNode } from "react";
import { IconCamera, IconCaretRight, IconQuestion, IconTrash } from "@/components/shared/icons";
import {
  OkNgSampleComparison,
  PhotoGuideModalShell,
  PhotoSoftWarningBanner,
  UploadModalBulletTips,
} from "@/components/shared/photo-guide-shared";
import { BODY_SLOT_SOFT_WARNING_MESSAGE } from "@/components/bike-design/photo-slot-guides";
import type { PhotoUploadPreviewResult } from "@/components/bike-design/validate-upload-photo";
import { dismissUploadGuideForSlot } from "@/components/shared/photo-upload-guide-prefs";
import { KatixButton } from "@/components/design-system/katix-button";
import {
  getPhotoSlotGuide,
  getSlotProgressLabel,
  isBodyUploadSlot,
  type BodyUploadSlotId,
  type RequiredUploadSlotId,
} from "@/components/bike-design/photo-slot-guides";

function PreviewSoftWarning() {
  return <PhotoSoftWarningBanner message={BODY_SLOT_SOFT_WARNING_MESSAGE} />;
}

export type UploadGuidePhase = "guide" | "preview";

type PhotoUploadGuideModalProps = {
  open: boolean;
  slotId: string | null;
  phase: UploadGuidePhase;
  slideDirection: "prev" | "next" | null;
  previewResult: PhotoUploadPreviewResult | null;
  bodySlotWarnings: Partial<Record<BodyUploadSlotId, boolean>>;
  prevDisabled: boolean;
  onClose: () => void;
  onConfirm: (slotId: string) => void;
  onReupload: (slotId: string) => void;
  onRemovePhoto: (slotId: string) => void;
  onNavPrev: () => void;
  onNavNext: () => void;
};

const SLOT_NAV_LINK =
  "inline-flex items-center gap-1 font-medium text-[14px] leading-[20px] text-[#389656] hover:text-[#2d7a45] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#389656]";

function SlotTextNav({
  prevDisabled,
  onPrev,
  onNext,
}: {
  prevDisabled: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between w-full py-1">
      <button type="button" disabled={prevDisabled} onClick={onPrev} className={SLOT_NAV_LINK}>
        <IconCaretRight size={16} className="size-4 rotate-180" />
        前へ
      </button>
      <button type="button" onClick={onNext} className={SLOT_NAV_LINK}>
        次へ
        <IconCaretRight size={16} className="size-4" />
      </button>
    </div>
  );
}

function UploadPreviewPanel({
  slotId,
  preview,
  hasSoftWarning,
  prevDisabled,
  onReupload,
  onRemove,
  onPrev,
  onNext,
}: {
  slotId: RequiredUploadSlotId;
  preview: PhotoUploadPreviewResult;
  hasSoftWarning?: boolean;
  prevDisabled: boolean;
  onReupload: () => void;
  onRemove: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const { url, headline } = preview;

  return (
    <div className="flex flex-col gap-4 items-center px-4 pb-4 pt-2 w-full">
      <div className="flex flex-col gap-1 items-center text-center w-full">
        <h2 className="font-bold text-[20px] leading-[28px] text-[#3d3d3d]">{headline}</h2>
      </div>

      <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg border-2 border-[#e2e4e9] bg-[#f3f4f6]">
        <img
          src={url}
          alt="選択した写真のプレビュー"
          className="absolute inset-0 size-full object-contain object-center"
        />
        <button
          type="button"
          aria-label="写真を削除"
          onClick={onRemove}
          className="absolute bottom-2 left-2 z-10 flex size-10 items-center justify-center rounded-[0.5rem] border border-[#d01010] bg-white text-[#d01010] shadow-[0px_1px_2px_0px_rgba(61,61,61,0.16)] hover:bg-[#fff5f5] transition-colors"
        >
          <IconTrash size={20} className="size-5" />
        </button>
        <button
          type="button"
          aria-label="写真を変更"
          onClick={onReupload}
          className="absolute bottom-2 right-2 z-10 flex size-10 items-center justify-center rounded-[0.5rem] border border-[#389656] bg-white text-[#389656] shadow-[0px_1px_2px_0px_rgba(61,61,61,0.16)] hover:bg-[#f3faf5] transition-colors"
        >
          <IconCamera size={20} className="size-5" />
        </button>
      </div>

      {hasSoftWarning && <PreviewSoftWarning />}

      <SlotTextNav prevDisabled={prevDisabled} onPrev={onPrev} onNext={onNext} />
    </div>
  );
}

function GuideDescription({
  description,
}: {
  description: string | readonly string[];
}) {
  if (Array.isArray(description)) {
    return (
      <div className="font-medium text-[14px] leading-[20px] text-[#3d3d3d]">
        {description.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    );
  }

  return (
    <p className="font-medium text-[14px] leading-[20px] text-[#3d3d3d]">
      {description}
    </p>
  );
}

function SlidePanel({
  slotId,
  phase,
  slideDirection,
  children,
}: {
  slotId: string;
  phase: UploadGuidePhase;
  slideDirection: "prev" | "next" | null;
  children: ReactNode;
}) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!slideDirection) {
      setOffset(0);
      return;
    }

    const from = slideDirection === "next" ? 100 : -100;
    setOffset(from);

    const frame = requestAnimationFrame(() => {
      setOffset(0);
    });

    return () => cancelAnimationFrame(frame);
  }, [slotId, phase, slideDirection]);

  return (
    <div
      className="w-full transition-transform duration-300 ease-in-out will-change-transform"
      style={{ transform: `translateX(${offset}%)` }}
    >
      {children}
    </div>
  );
}

export function PhotoUploadGuideModal({
  open,
  slotId,
  phase,
  slideDirection,
  previewResult,
  bodySlotWarnings,
  prevDisabled,
  onClose,
  onConfirm,
  onReupload,
  onRemovePhoto,
  onNavPrev,
  onNavNext,
}: PhotoUploadGuideModalProps) {
  const guide = slotId ? getPhotoSlotGuide(slotId) : null;
  const [dontShowForSlot, setDontShowForSlot] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDontShowForSlot(false);
  }, [open, slotId]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open || !slotId || !guide) return null;

  const requiredSlotId = slotId as RequiredUploadSlotId;
  const progressLabel = getSlotProgressLabel(requiredSlotId);

  const handleConfirm = () => {
    if (dontShowForSlot) {
      dismissUploadGuideForSlot(requiredSlotId);
    }
    onConfirm(slotId);
  };

  return (
    <PhotoGuideModalShell
      open={open}
      onClose={onClose}
      titleId="photo-upload-guide-title"
      dataNodeId={guide.dataNodeId}
      showCloseButton
    >
      {progressLabel && (
        <p className="w-full shrink-0 text-center text-[12px] font-bold leading-4 text-[#389656] px-10 pt-4 pb-1">
          {progressLabel}
        </p>
      )}

      <div className="flex-1 min-h-0 overflow-x-clip overflow-y-auto w-full max-h-[calc(100vh-8rem)]">
        <SlidePanel slotId={slotId} phase={phase} slideDirection={slideDirection}>
          {phase === "preview" && previewResult ? (
            <UploadPreviewPanel
              slotId={requiredSlotId}
              preview={previewResult}
              hasSoftWarning={
                isBodyUploadSlot(requiredSlotId)
                  ? bodySlotWarnings[requiredSlotId]
                  : undefined
              }
              prevDisabled={prevDisabled}
              onReupload={() => onReupload(slotId)}
              onRemove={() => onRemovePhoto(slotId)}
              onPrev={onNavPrev}
              onNext={onNavNext}
            />
          ) : (
            <div className="flex flex-col gap-4 items-center px-4 pb-4 pt-2 w-full">
              <div className="flex flex-col gap-1 items-center text-center w-full text-[#3d3d3d]">
                <h2
                  id="photo-upload-guide-title"
                  className="font-bold text-[20px] leading-[28px] min-h-[32px] flex items-center justify-center w-full"
                >
                  {guide.title}
                </h2>
                <GuideDescription description={guide.description} />
              </div>

              <OkNgSampleComparison
                okSample={guide.okSample}
                ngSample={guide.ngSample}
                boxClassName={guide.sampleBoxClassName}
              />

              <UploadModalBulletTips tips={guide.tips} />

              <div className="flex gap-1 items-center py-1 w-full">
                <IconQuestion size={16} className="size-4 shrink-0 text-[#2a7fff]" />
                <span className="font-medium leading-[20px] text-[14px] text-[#2a7fff] underline">
                  車両全体すべての撮影仕方を見る
                </span>
                <IconCaretRight size={16} className="size-4 shrink-0 text-[#2a7fff]" />
              </div>

              <div className="flex flex-col gap-2 items-start w-full px-1">
                <label className="flex gap-2 items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dontShowForSlot}
                    onChange={(e) => setDontShowForSlot(e.target.checked)}
                    className="mt-0.5 size-4 shrink-0 accent-[#389656]"
                  />
                  <span className="text-[13px] font-medium leading-5 text-[#505353]">
                    この説明を次回から表示しない
                  </span>
                </label>
              </div>

              <KatixButton style="primary" size="large" onClick={handleConfirm} className="w-full">
                <IconCamera size={24} className="size-6 shrink-0 text-white" />
                写真を追加する
              </KatixButton>

              <SlotTextNav
                prevDisabled={prevDisabled}
                onPrev={onNavPrev}
                onNext={onNavNext}
              />
            </div>
          )}
        </SlidePanel>
      </div>
    </PhotoGuideModalShell>
  );
}
