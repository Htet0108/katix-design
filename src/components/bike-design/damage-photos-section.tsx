"use client";

import { assets } from "@/lib/figma-assets";
import { IconQuestion } from "@/components/shared/icons";
import type { KatixFormErrors } from "@/components/bike-design/validate-katix-form";
import { DAMAGE_SLOT_ID } from "@/components/bike-design/damage-spot-types";
import { KATIX_PHOTO_GRID, KATIX_STACK } from "@/lib/katix-layout";
import {
  BIKE_ILLUSTRATION_PREVIEW_BOX,
  BikeIllustrationSlot,
  PhotoUploadCard,
  ScratchIllustrationPlaceholder,
} from "@/components/shared/photo-upload-card";

const DAMAGE_SCRATCH_PLACEHOLDER = (
  <BikeIllustrationSlot>
    <ScratchIllustrationPlaceholder src={assets.skeletonScratch} />
  </BikeIllustrationSlot>
);

type DamagePhotosSectionProps = {
  photoPreviews: Record<string, string>;
  onPhotoUploadClick: (slotId: string) => void;
  showErrors: boolean;
  errors: KatixFormErrors;
};

export function DamagePhotosSection({
  photoPreviews,
  onPhotoUploadClick,
  showErrors,
  errors,
}: DamagePhotosSectionProps) {
  const fieldError = (key: string) => (showErrors ? errors[key] : undefined);

  return (
    <div className={`flex flex-col gap-3 items-stretch w-full min-w-0 ${KATIX_STACK}`}>
      <div className="flex flex-wrap w-full items-center justify-between gap-2">
        <p className="font-bold leading-[28px] text-[20px] text-[#3d3d3d]">
          傷・サビ・凹み
        </p>
        <a
          href="https://bike.katix.co.jp/guideline#caution"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-wrap gap-1 items-center shrink-0"
        >
          <IconQuestion className="size-5 shrink-0 text-[#2a7fff]" />
          <span className="font-medium leading-[20px] text-[14px] text-[#2a7fff] underline">
            査定に関する注意点
          </span>
        </a>
      </div>

      <p className="leading-[20px] text-[14px] font-normal text-[#505353] w-full">
        複数ある場合は「その他写真」に追加してください
      </p>

      <div className={KATIX_PHOTO_GRID}>
        <PhotoUploadCard
          slotId={DAMAGE_SLOT_ID}
          dataNodeId="1896:777"
          title="傷サビ凹み"
          badge="optional"
          previewUrl={photoPreviews[DAMAGE_SLOT_ID]}
          illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
          placeholder={DAMAGE_SCRATCH_PLACEHOLDER}
          errorMessage={fieldError(DAMAGE_SLOT_ID)}
          onUploadClick={onPhotoUploadClick}
        />
      </div>
    </div>
  );
}
