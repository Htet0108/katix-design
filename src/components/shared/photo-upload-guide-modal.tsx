"use client";

import { useEffect, useState } from "react";
import { IconCamera, IconCaretRight, IconQuestion } from "@/components/shared/icons";
import {
  OkNgSampleComparison,
  PhotoGuideModalShell,
  UploadModalBulletTips,
} from "@/components/shared/photo-guide-shared";
import { dismissUploadGuideForSlot } from "@/components/shared/photo-upload-guide-prefs";
import {
  getPhotoSlotGuide,
  getSlotProgressLabel,
  type RequiredUploadSlotId,
} from "@/components/bike-design/photo-slot-guides";

type PhotoUploadGuideModalProps = {
  open: boolean;
  slotId: string | null;
  onClose: () => void;
  onConfirm: (slotId: string) => void;
};

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

export function PhotoUploadGuideModal({
  open,
  slotId,
  onClose,
  onConfirm,
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

  const progressLabel = getSlotProgressLabel(slotId as RequiredUploadSlotId);

  const handleConfirm = () => {
    if (dontShowForSlot) {
      dismissUploadGuideForSlot(slotId as RequiredUploadSlotId);
    }
    onConfirm(slotId);
  };

  return (
    <PhotoGuideModalShell
      open={open}
      onClose={onClose}
      titleId="photo-upload-guide-title"
      dataNodeId={guide.dataNodeId}
    >
      <div className="flex flex-col gap-4 items-center overflow-x-clip overflow-y-auto px-4 py-4 w-full">
        {progressLabel && (
          <p className="text-[12px] font-bold leading-4 text-[#389656] w-full text-center">
            {progressLabel}
          </p>
        )}

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

        <button
          type="button"
          className="bg-[#389656] flex gap-2 items-center justify-center px-6 py-3 rounded-lg w-full hover:bg-[#2d7a45] transition-colors"
          onClick={handleConfirm}
        >
          <IconCamera size={24} className="size-6 shrink-0 text-white" />
          <span className="font-medium leading-[28px] text-[20px] text-white whitespace-nowrap">
            写真を追加する
          </span>
        </button>

        <button
          type="button"
          className="font-medium leading-[24px] text-[16px] text-[#656767] py-1"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </PhotoGuideModalShell>
  );
}
