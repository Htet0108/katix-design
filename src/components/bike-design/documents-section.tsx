"use client";

import { assets } from "@/lib/figma-assets";
import { IconQuestion } from "@/components/shared/icons";
import { RadioOption } from "@/components/shared/form-controls";
import {
  DOC_PREVIEW_BOX,
  DOC_RECORD_PREVIEW_BOX,
  DocIllustrationPlaceholder,
  PhotoUploadCard,
} from "@/components/shared/photo-upload-card";
import type { KatixFormErrors } from "@/components/bike-design/validate-katix-form";
import { KATIX_CONTENT_WIDTH, KATIX_PHOTO_GRID } from "@/lib/katix-layout";
import type { InspectionType } from "@/components/bike-design/use-katix-form";

type DocumentsSectionProps = {
  inspectionType: InspectionType;
  onInspectionTypeChange: (value: InspectionType) => void;
  onPhotoUploadClick: (slotId: string) => void;
  photoPreviews: Record<string, string>;
  errors: KatixFormErrors;
  showErrors: boolean;
};

export function DocumentsSection({
  inspectionType,
  onInspectionTypeChange,
  onPhotoUploadClick,
  photoPreviews,
  errors,
  showErrors,
}: DocumentsSectionProps) {
  const isLegacy = inspectionType === "legacy";
  const photoError = (slotId: string) => (showErrors ? errors[slotId] : undefined);

  return (
    <div
      className={`flex flex-col gap-2 items-stretch relative w-full min-w-0 ${KATIX_CONTENT_WIDTH}`}
      data-node-id={isLegacy ? "1733:6569" : "1828:11142"}
    >
      <p className="leading-[20px] text-[14px] font-medium text-[#3d3d3d] w-full">
        お持ちの車検証の書類を選択してください
      </p>

      <div className="flex flex-col gap-3 items-stretch w-full min-w-0">
        <RadioOption
          selected={inspectionType === "electronic"}
          onSelect={() => onInspectionTypeChange("electronic")}
          label="電子車検証をお持ちの方"
          description="2023年以降に発行されたはがきサイズのICタグ付きの紙です"
        />
        <RadioOption
          selected={inspectionType === "legacy"}
          onSelect={() => onInspectionTypeChange("legacy")}
          label="旧車検証をお持ちの方"
          description="2023年以前の発行で、氏名・住所が記載されたA4サイズの紙です"
        />

        {isLegacy ? (
          <div className={KATIX_PHOTO_GRID}>
            <PhotoUploadCard
              slotId="doc-legacy"
              dataNodeId="1828:11134"
              title="車検証 (全体)"
              badge="required"
              subtitle="A4・A5サイズ"
              buttonLabel="写真を追加"
              previewUrl={photoPreviews["doc-legacy"]}
              stackBody
              previewBoxClassName={DOC_PREVIEW_BOX}
              placeholder={<DocIllustrationPlaceholder src={assets.docLegacy} />}
              errorMessage={photoError("doc-legacy")}
              onUploadClick={onPhotoUploadClick}
            />
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-1 items-center py-1">
              <IconQuestion className="size-5 shrink-0 text-[#2a7fff]" />
              <span className="font-medium leading-[20px] text-[14px] text-[#2a7fff] underline">
                記録事項をお持ちでない方
              </span>
            </div>

            <div className={KATIX_PHOTO_GRID}>
              <PhotoUploadCard
                slotId="doc-electronic"
                title={
                  <>
                    <span className="block leading-[20px]">電子車検証 </span>
                    <span className="block leading-[20px]">(全体)</span>
                  </>
                }
                badge="required"
                subtitle="はがきサイズ・ICタグ付き"
                previewUrl={photoPreviews["doc-electronic"]}
                headerClassName="min-h-14 items-start py-2"
                previewBoxClassName={DOC_PREVIEW_BOX}
                placeholder={<DocIllustrationPlaceholder src={assets.docElectronic} />}
                errorMessage={photoError("doc-electronic")}
                onUploadClick={onPhotoUploadClick}
              />

              <PhotoUploadCard
                slotId="doc-record"
                title="自動車検査記録事項 (全体)"
                badge="required"
                subtitle="A4の紙"
                previewUrl={photoPreviews["doc-record"]}
                headerClassName="min-h-14 items-start py-2"
                previewBoxClassName={DOC_RECORD_PREVIEW_BOX}
                placeholder={<DocIllustrationPlaceholder src={assets.docRecord} />}
                errorMessage={photoError("doc-record")}
                onUploadClick={onPhotoUploadClick}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
