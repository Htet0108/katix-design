"use client";

import { useEffect } from "react";
import {
  CarDamageDeclarationNote,
  CarDamageGuideExamples,
} from "@/components/car-design/car-damage-guide-content";
import { PhotoGuideModalShell } from "@/components/shared/photo-guide-shared";

type CarDamageGuideModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function CarDamageGuideModal({
  open,
  onClose,
  onConfirm,
}: CarDamageGuideModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <PhotoGuideModalShell
      open={open}
      onClose={onClose}
      titleId="car-damage-guide-title"
      dataNodeId="car-damage-guide-modal"
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 w-full max-h-[calc(100vh-2rem)]">
        <h2
          id="car-damage-guide-title"
          className="font-bold text-[20px] leading-[28px] text-[#3d3d3d] w-full text-center"
        >
          申告の目安
        </h2>

        <CarDamageDeclarationNote />

        <CarDamageGuideExamples />

        <button
          type="button"
          className="bg-[#389656] font-medium leading-[28px] text-[18px] text-white px-6 py-3 rounded-lg w-full hover:bg-[#2d7a45] transition-colors"
          onClick={onConfirm}
        >
          内容を確認しました
        </button>
      </div>
    </PhotoGuideModalShell>
  );
}
