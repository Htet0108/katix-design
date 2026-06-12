import { getPhotoSlotGuide, type RequiredUploadSlotId } from "@/components/bike-design/photo-slot-guides";

export type PhotoUploadPreviewResult = {
  url: string;
  headline: string;
};

export function createOkPreviewResult(
  url: string,
  slotId: RequiredUploadSlotId
): PhotoUploadPreviewResult {
  const guide = getPhotoSlotGuide(slotId);
  const title = guide?.title ?? "写真";
  return {
    url,
    headline: title,
  };
}
