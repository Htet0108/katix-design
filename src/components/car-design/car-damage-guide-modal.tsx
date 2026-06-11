"use client";

import { useEffect, useState } from "react";
import {
  CarDamageDeclarationNote,
  CarDamageGuideExamples,
} from "@/components/car-design/car-damage-guide-content";
import { CarDamagePresenceChoice } from "@/components/car-design/car-damage-presence-choice";
import type { CarDamagePresence } from "@/components/car-design/car-damage-spot-types";
import { PhotoGuideModalShell } from "@/components/shared/photo-guide-shared";

type CarDamageGuideModalProps = {
  open: boolean;
  initialPresence: CarDamagePresence | null;
  onClose: () => void;
  onConfirm: (value: CarDamagePresence) => void;
};

export function CarDamageGuideModal({
  open,
  initialPresence,
  onClose,
  onConfirm,
}: CarDamageGuideModalProps) {
  const [selectedPresence, setSelectedPresence] = useState<CarDamagePresence | null>(null);
  const [showSelectionError, setShowSelectionError] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSelectedPresence(initialPresence);
    setShowSelectionError(false);
  }, [open, initialPresence]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    if (!selectedPresence) {
      setShowSelectionError(true);
      return;
    }
    onConfirm(selectedPresence);
  };

  const handlePresenceChange = (value: CarDamagePresence) => {
    setSelectedPresence(value);
    setShowSelectionError(false);
  };

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
          傷・破れなどの申告について
        </h2>

        <CarDamageDeclarationNote />

        <CarDamageGuideExamples />

        <div className="flex flex-col gap-2 items-stretch w-full">
          <p className="font-bold text-[14px] leading-[20px] text-[#3d3d3d]">
            上をご確認のうえ、該当する内容を選んでください
          </p>
          <CarDamagePresenceChoice
            value={selectedPresence}
            onChange={handlePresenceChange}
            hasError={showSelectionError}
          />
          {showSelectionError && (
            <p className="text-[13px] font-medium leading-5 text-[#d01010]">
              選択してください
            </p>
          )}
        </div>

        <button
          type="button"
          className="bg-[#389656] font-medium leading-[28px] text-[18px] text-white px-6 py-3 rounded-lg w-full hover:bg-[#2d7a45] transition-colors"
          onClick={handleConfirm}
        >
          この内容で回答する
        </button>
      </div>
    </PhotoGuideModalShell>
  );
}
