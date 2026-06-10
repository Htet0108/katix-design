"use client";

import { useState } from "react";
import { assets } from "@/lib/figma-assets";
import type { KatixFormErrors } from "@/components/bike-design/validate-katix-form";
import { RadioOption } from "@/components/shared/form-controls";
import { CarDamageGuideModal } from "@/components/car-design/car-damage-guide-modal";
import { CarDamagePhotoHint } from "@/components/car-design/car-damage-guide-content";
import {
  CAR_DAMAGE_SLOT_ID,
  type CarDamagePresence,
} from "@/components/car-design/car-damage-spot-types";
import { KATIX_PHOTO_GRID, KATIX_STACK } from "@/lib/katix-layout";
import {
  CAR_ILLUSTRATION_PREVIEW_BOX,
  PhotoUploadCard,
} from "@/components/shared/photo-upload-card";
import { IconPlus } from "@/components/shared/icons";

const CAR_DAMAGE_SCRATCH_PLACEHOLDER = (
  <img
    alt=""
    className="absolute inset-0 size-full object-contain pointer-events-none"
    src={assets.carSkeletonScratch}
  />
);

const CAR_FREE_PLUS_PLACEHOLDER = (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <IconPlus className="size-10 shrink-0 text-[#389656]" />
  </div>
);

type CarDamagePhotosSectionProps = {
  damagePresence: CarDamagePresence | null;
  onDamagePresenceChange: (value: CarDamagePresence) => void;
  damageExtraSlotIds: string[];
  photoPreviews: Record<string, string>;
  onPhotoUploadClick: (slotId: string) => void;
  showErrors: boolean;
  errors: KatixFormErrors;
};

export function CarDamagePhotosSection({
  damagePresence,
  onDamagePresenceChange,
  damageExtraSlotIds,
  photoPreviews,
  onPhotoUploadClick,
  showErrors,
  errors,
}: CarDamagePhotosSectionProps) {
  const [guideOpen, setGuideOpen] = useState(false);
  const [pendingPresence, setPendingPresence] = useState<CarDamagePresence | null>(null);
  const fieldError = (key: string) => (showErrors ? errors[key] : undefined);
  const showUploadCards = damagePresence === "yes";

  const handlePresenceSelect = (value: CarDamagePresence) => {
    if (value === damagePresence) return;
    setPendingPresence(value);
    setGuideOpen(true);
  };

  const handleGuideClose = () => {
    setGuideOpen(false);
    setPendingPresence(null);
  };

  const handleGuideConfirm = () => {
    if (pendingPresence) {
      onDamagePresenceChange(pendingPresence);
    }
    setGuideOpen(false);
    setPendingPresence(null);
  };

  return (
    <>
      <div
        className={`flex flex-col gap-3 items-stretch w-full min-w-0 ${KATIX_STACK}`}
        data-node-id="4974:3044"
        data-name="stack"
      >
        <p
          className="font-bold leading-[28px] text-[20px] text-[#3d3d3d]"
          data-node-id="4974:3045"
        >
          傷サビ凹み
        </p>

        <p
          className="leading-[20px] text-[14px] font-medium text-[#656767] w-full"
          data-node-id="4974:3377"
        >
          外装の傷・サビ・凹みに加え、内装の破れや汚れも対象です。該当する場合は
          <span className="font-bold text-[#3d3d3d]">「あり」</span>
          を選択してください。
        </p>

        <div
          className="flex flex-col gap-2 items-stretch w-full"
          data-node-id="5059:616"
          data-name="Container"
        >
          <RadioOption
            selected={damagePresence === "yes"}
            onSelect={() => handlePresenceSelect("yes")}
            label="あり"
          />
          <RadioOption
            selected={damagePresence === "no"}
            onSelect={() => handlePresenceSelect("no")}
            label="なし"
          />
          {fieldError("damagePresence") && (
            <p className="text-[13px] font-medium leading-5 text-[#d01010]">
              {fieldError("damagePresence")}
            </p>
          )}
        </div>

        {showUploadCards && (
          <>
            <CarDamagePhotoHint />
            <div className={KATIX_PHOTO_GRID} data-node-id="5059:591" data-name="Container">
              <PhotoUploadCard
                slotId={CAR_DAMAGE_SLOT_ID}
                dataNodeId="5059:592"
                title="傷サビ凹み"
                badge="required"
                uploadTrigger="corner"
                previewUrl={photoPreviews[CAR_DAMAGE_SLOT_ID]}
                illustrationPreviewBox={CAR_ILLUSTRATION_PREVIEW_BOX}
                placeholder={CAR_DAMAGE_SCRATCH_PLACEHOLDER}
                errorMessage={fieldError(CAR_DAMAGE_SLOT_ID)}
                onUploadClick={onPhotoUploadClick}
              />
              {damageExtraSlotIds.map((slotId) => (
                <PhotoUploadCard
                  key={slotId}
                  slotId={slotId}
                  dataNodeId="5059:593"
                  title="追加写真"
                  badge="optional"
                  uploadTrigger="corner"
                  previewUrl={photoPreviews[slotId]}
                  illustrationPreviewBox={CAR_ILLUSTRATION_PREVIEW_BOX}
                  placeholder={CAR_FREE_PLUS_PLACEHOLDER}
                  onUploadClick={onPhotoUploadClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {pendingPresence && (
        <CarDamageGuideModal
          open={guideOpen}
          onClose={handleGuideClose}
          onConfirm={handleGuideConfirm}
        />
      )}
    </>
  );
}
