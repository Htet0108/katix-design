"use client";

import { KATIX_PHOTO_GRID, KATIX_STACK } from "@/lib/katix-layout";
import {
  CAR_ILLUSTRATION_PREVIEW_BOX,
  PhotoUploadCard,
} from "@/components/shared/photo-upload-card";
import { IconPlus } from "@/components/shared/icons";

const APPEAL_EXAMPLES = [
  "純正オプション、純正パーツ",
  "カスタム箇所",
  "メンテナンスノート(整備記録簿)、保証書など",
] as const;

const FREE_PLUS_PLACEHOLDER = (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <IconPlus className="size-10 shrink-0 text-[#389656]" />
  </div>
);

type CarOptionAppealSectionProps = {
  extraSlotIds: string[];
  photoPreviews: Record<string, string>;
  onPhotoUploadClick: (slotId: string) => void;
};

export function CarOptionAppealSection({
  extraSlotIds,
  photoPreviews,
  onPhotoUploadClick,
}: CarOptionAppealSectionProps) {
  return (
    <div className={`flex flex-col gap-3 items-stretch w-full min-w-0 ${KATIX_STACK}`}>
      <p className="font-bold text-[20px] leading-[28px] text-[#3d3d3d] w-full">
        オプション・アピールポイント
      </p>

      <div className="flex flex-col gap-2 w-full">
        <p className="leading-[20px] text-[14px] font-medium text-[#656767] w-full">
          以下に該当する写真は、金額アップに繋がる可能性がありますので、できるだけアップロードしてください。
        </p>
        <ul className="list-none space-y-0.5 w-full">
          {APPEAL_EXAMPLES.map((item) => (
            <li key={item} className="text-[14px] font-medium leading-[20px] text-[#505353]">
              ・{item}
            </li>
          ))}
        </ul>
      </div>

      <div className={KATIX_PHOTO_GRID}>
        {extraSlotIds.map((slotId) => (
          <PhotoUploadCard
            key={slotId}
            slotId={slotId}
            title="自由アップロード"
            badge="optional"
            uploadTrigger="corner"
            previewUrl={photoPreviews[slotId]}
            illustrationPreviewBox={CAR_ILLUSTRATION_PREVIEW_BOX}
            placeholder={FREE_PLUS_PLACEHOLDER}
            onUploadClick={onPhotoUploadClick}
          />
        ))}
      </div>
    </div>
  );
}
