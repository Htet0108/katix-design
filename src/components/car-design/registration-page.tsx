"use client";

import { useCallback, useRef, useState } from "react";
import { CarDamagePhotosSection } from "@/components/car-design/car-damage-photos-section";
import type { CarDamagePresence } from "@/components/car-design/car-damage-spot-types";
import { CAR_DAMAGE_SLOT_ID } from "@/components/car-design/car-damage-spot-types";
import { KatixFooter, KatixHeader, KatixPageBody, KatixPageShell } from "@/components/shared/katix-page-shell";
import { KatixSectionBanner } from "@/components/shared/katix-section-banner";
import { KATIX_MAIN, KATIX_MAIN_INNER, KATIX_STACK } from "@/lib/katix-layout";
import type { KatixFormErrors } from "@/components/bike-design/validate-katix-form";

export default function KatixCarRegistrationPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeSlotRef = useRef<string>("");
  const [photoPreviews, setPhotoPreviews] = useState<Record<string, string>>({});
  const [damageExtraSlotIds, setDamageExtraSlotIds] = useState(["car-damage-extra-0"]);
  const [damagePresence, setDamagePresence] = useState<CarDamagePresence>("yes");
  const [showErrors, setShowErrors] = useState(false);
  const [errors, setErrors] = useState<KatixFormErrors>({});

  const triggerPhotoUpload = useCallback((slotId: string) => {
    activeSlotRef.current = slotId;
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    const slotId = activeSlotRef.current;
    if (!file || !slotId) return;

    const url = URL.createObjectURL(file);
    setPhotoPreviews((prev) => ({ ...prev, [slotId]: url }));
    setErrors((prev) => {
      if (!prev[slotId]) return prev;
      const next = { ...prev };
      delete next[slotId];
      return next;
    });

    if (slotId.startsWith("car-damage-extra-")) {
      setDamageExtraSlotIds((ids) => {
        if (ids[ids.length - 1] !== slotId) return ids;
        return [...ids, `car-damage-extra-${ids.length}`];
      });
    }

    event.target.value = "";
  }, []);

  const handleSubmit = useCallback(() => {
    const nextErrors: KatixFormErrors = {};
    if (damagePresence === "yes" && !photoPreviews[CAR_DAMAGE_SLOT_ID]) {
      nextErrors[CAR_DAMAGE_SLOT_ID] = "写真をアップロードしてください";
    }
    setErrors(nextErrors);
    setShowErrors(true);
  }, [damagePresence, photoPreviews]);

  return (
    <KatixPageShell className="content-stretch relative">
      <KatixHeader />
      <KatixPageBody>
        <div className={KATIX_MAIN}>
          <div className={KATIX_MAIN_INNER}>
            <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(61,61,61,0.08)] flex flex-col gap-4 items-center p-4 relative rounded-lg shrink-0 w-full">
              <div className="flex flex-col gap-2 items-stretch text-center w-full min-w-0">
                <div className="flex flex-col font-bold justify-center text-[22px] text-[#3d3d3d] w-full">
                  <p className="leading-[32px]">車の査定登録</p>
                </div>
                <div className="flex flex-col font-medium justify-center text-[14px] text-[#505353] w-full">
                  <p className="leading-[20px]">写真と情報入力で、かんたんに査定をお申込みいただけます</p>
                </div>
              </div>
            </div>
          </div>

          <KatixSectionBanner id="katix-section-photos">
            ①　写真を撮影・アップロード
          </KatixSectionBanner>

          <div className={KATIX_MAIN_INNER}>
            <div className={`content-stretch ${KATIX_STACK}`}>
              <CarDamagePhotosSection
                damagePresence={damagePresence}
                onDamagePresenceChange={setDamagePresence}
                damageExtraSlotIds={damageExtraSlotIds}
                photoPreviews={photoPreviews}
                onPhotoUploadClick={triggerPhotoUpload}
                showErrors={showErrors}
                errors={errors}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#389656] cursor-pointer flex gap-2 items-center justify-center px-4 py-3 relative rounded-lg w-full min-w-0 hover:bg-[#2d7a45] transition-colors mt-6"
            >
              <p className="font-medium leading-[28px] text-[20px] text-white whitespace-nowrap">
                査定に進む
              </p>
            </button>
          </div>
        </div>
      </KatixPageBody>
      <KatixFooter />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFileChange}
        aria-hidden
        tabIndex={-1}
      />
    </KatixPageShell>
  );
}
