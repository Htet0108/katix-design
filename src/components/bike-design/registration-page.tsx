"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { assets } from "@/lib/figma-assets";
import { BikeCustomerForm } from "@/components/bike-design/bike-customer-form";
import { DamagePhotosSection } from "@/components/bike-design/damage-photos-section";
import { DocumentsSection } from "@/components/bike-design/documents-section";
import {
  BIKE_UPLOAD_SLOT_ORDER,
  getAdjacentRequiredUploadSlot,
  isRequiredUploadSlot,
} from "@/components/bike-design/photo-slot-guides";
import { PhotoUploadGuideModal, type UploadGuidePhase } from "@/components/shared/photo-upload-guide-modal";
import { useBodySlotSoftWarnings } from "@/components/bike-design/use-body-slot-soft-warnings";
import {
  createOkPreviewResult,
  type PhotoUploadPreviewResult,
} from "@/components/bike-design/validate-upload-photo";
import {
  BIKE_ILLUSTRATION_PREVIEW_BOX,
  BikeIllustrationSlot,
  FREE_PLUS_PLACEHOLDER,
  PhotoUploadCard,
} from "@/components/shared/photo-upload-card";
import { useKatixForm, type KatixFormState } from "@/components/bike-design/use-katix-form";
import {
  scrollToFirstError,
  validateKatixForm,
  type KatixFormErrors,
} from "@/components/bike-design/validate-katix-form";
import {
  IconPhone,
  IconQuestion,
} from "@/components/shared/icons";
import { KatixFooter, KatixHeader, KatixPageBody, KatixPageShell } from "@/components/shared/katix-page-shell";
import { KatixSectionBanner } from "@/components/shared/katix-section-banner";
import {
  KATIX_CONTENT_WIDTH,
  KATIX_MAIN,
  KATIX_MAIN_INNER,
  KATIX_PHOTO_GRID,
  KATIX_STACK,
} from "@/lib/katix-layout";


function scrollToSection(element: HTMLElement | null) {
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

type KatixBikeRegistrationViewProps = {
  form: KatixFormState;
  photoPreviews: Record<string, string>;
  photoSoftWarnings: Partial<Record<"front" | "rear" | "left" | "right", boolean>>;
  freeSlotIds: string[];
  otherDocsSlotIds: string[];
  errors: KatixFormErrors;
  showErrors: boolean;
  onPhotoUploadClick: (slotId: string) => void;
  onSubmit: () => void;
};

function KatixBikeRegistrationView({
  form,
  photoPreviews,
  photoSoftWarnings,
  freeSlotIds,
  otherDocsSlotIds,
  errors,
  showErrors,
  onPhotoUploadClick,
  onSubmit,
}: KatixBikeRegistrationViewProps) {
  const photoSectionRef = useRef<HTMLDivElement>(null);
  const infoSectionRef = useRef<HTMLDivElement>(null);
  const photoError = (slotId: string) => (showErrors ? errors[slotId] : undefined);

  return (
    <KatixPageShell className="content-stretch relative" data-node-id="1828:10582" data-name="Updated">
      <KatixHeader />
      <KatixPageBody>
      <div className={KATIX_MAIN} data-node-id="1828:10587" data-name="Content">
        <div className={KATIX_MAIN_INNER}>
        <div className="bg-white content-stretch drop-shadow-[0px_1px_1px_rgba(61,61,61,0.08)] flex flex-col gap-4 items-center p-4 relative rounded-lg shrink-0 w-full" data-node-id="1828:10588" data-name="Heading">
          <div className="flex flex-col gap-2 items-stretch text-center w-full min-w-0">
            <div className="flex flex-col font-bold justify-center text-[22px] text-[#3d3d3d] w-full">
              <p className="leading-[32px]">バイクの査定登録</p>
            </div>
            <div className="flex flex-col  font-medium justify-center relative shrink-0 text-[0px] text-[#505353] w-full" data-node-id="1828:10591">
              <p className="mb-0 text-[14px]">
                <span className="[word-break:break-word]  font-medium leading-[20px] not-italic text-[#389656]">写真６枚と情報入力</span>
                <span className="leading-[20px]">で、かんたんに査定を</span>
              </p>
              <p className="leading-[20px] text-[14px]">お申込みいただけます</p>
            </div>
          </div>
          <div className="content-stretch flex flex-wrap gap-4 sm:gap-10 items-center justify-center relative shrink-0 w-full" data-node-id="1828:10592" data-name="Container">
            <button
              type="button"
              onClick={() => scrollToSection(photoSectionRef.current)}
              className="content-stretch flex gap-2 items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              data-node-id="1828:10593"
              data-name="Group"
              aria-label="写真をアップロードのセクションへ移動"
            >
              <div className="bg-[#389656] flex items-center justify-center rounded-full shrink-0 size-6">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="1828:10595" data-name="Status">
                  <div className="[word-break:break-word] flex flex-col  font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1828:10596">
                    <p className="leading-[16px]">1</p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col  font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#3d3d3d] whitespace-nowrap" data-node-id="1828:10597">
                <p className="leading-[20px]">写真をアップロード</p>
              </div>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection(infoSectionRef.current)}
              className="content-stretch flex gap-2 items-center relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              data-node-id="1828:10598"
              data-name="Group"
              aria-label="情報を入力のセクションへ移動"
            >
              <div className="bg-[#389656] flex items-center justify-center rounded-full shrink-0 size-6">
                <div className="content-stretch flex items-center justify-center relative shrink-0" data-node-id="1828:10600" data-name="Status">
                  <div className="[word-break:break-word] flex flex-col  font-bold justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap" data-node-id="1828:10601">
                    <p className="leading-[16px]">2</p>
                  </div>
                </div>
              </div>
              <div className="[word-break:break-word] flex flex-col  font-bold justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-[#3d3d3d] whitespace-nowrap" data-node-id="1828:10602">
                <p className="leading-[20px]">情報を入力</p>
              </div>
            </button>
          </div>
        </div>
        </div>
        <KatixSectionBanner ref={photoSectionRef} id="katix-section-photos">
          ①　写真を撮影・アップロード
        </KatixSectionBanner>
        <div className={KATIX_MAIN_INNER}>
        <div className={`content-stretch ${KATIX_STACK}`} data-node-id="1836:12433" data-name="stack">
          <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[20px] text-[#3d3d3d] w-full" data-node-id="1836:12434">
            <p className="leading-[28px]">車体全体</p>
          </div>
          <div className={`content-stretch ${KATIX_PHOTO_GRID}`} data-node-id="1836:12435" data-name="Column">
              <PhotoUploadCard
                slotId="front"
                title="前面"
                badge="required"
                previewUrl={photoPreviews.front}
                illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                placeholder={
                  <BikeIllustrationSlot>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-full left-[21.66%] max-w-none top-0 w-[56.69%]" src={assets.bikeFront} />
                    </div>
                  </BikeIllustrationSlot>
                }
                errorMessage={photoError("front")}
                hasSoftWarning={photoSoftWarnings.front}
                onUploadClick={onPhotoUploadClick}
              />
              <PhotoUploadCard
                slotId="rear"
                title="後面"
                badge="required"
                previewUrl={photoPreviews.rear}
                illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                placeholder={
                  <BikeIllustrationSlot>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-full left-[20.64%] max-w-none top-0 w-[58.72%]" src={assets.skeletonRear} />
                    </div>
                  </BikeIllustrationSlot>
                }
                errorMessage={photoError("rear")}
                hasSoftWarning={photoSoftWarnings.rear}
                onUploadClick={onPhotoUploadClick}
              />
              <PhotoUploadCard
                slotId="left"
                title="左面"
                badge="required"
                previewUrl={photoPreviews.left}
                illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                placeholder={
                  <BikeIllustrationSlot>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[63.54%] left-0 max-w-none top-[18.23%] w-full" src={assets.skeletonLeft} />
                    </div>
                  </BikeIllustrationSlot>
                }
                errorMessage={photoError("left")}
                hasSoftWarning={photoSoftWarnings.left}
                onUploadClick={onPhotoUploadClick}
              />
              <PhotoUploadCard
                slotId="right"
                title="右面"
                badge="required"
                previewUrl={photoPreviews.right}
                illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                placeholder={
                  <BikeIllustrationSlot>
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <img alt="" className="absolute h-[63.54%] left-0 max-w-none top-[18.23%] w-full" src={assets.skeletonRight} />
                    </div>
                  </BikeIllustrationSlot>
                }
                errorMessage={photoError("right")}
                hasSoftWarning={photoSoftWarnings.right}
                onUploadClick={onPhotoUploadClick}
              />
          </div>
        </div>
        <div className={`content-stretch ${KATIX_STACK}`} data-node-id="1836:meter-section" data-name="stack">
          <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[20px] text-[#3d3d3d] w-full">
            <p className="leading-[28px]">メーター</p>
          </div>
          <div className={`content-stretch ${KATIX_PHOTO_GRID}`}>
            <PhotoUploadCard
              slotId="odometer"
              title="総走行距離"
              badge="required"
              previewUrl={photoPreviews.odometer}
              illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
              placeholder={
                <BikeIllustrationSlot>
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      alt=""
                      className="absolute inset-0 size-full object-contain pointer-events-none"
                      src={assets.skeletonOdometer}
                    />
                  </div>
                </BikeIllustrationSlot>
              }
              errorMessage={photoError("odometer")}
              onUploadClick={onPhotoUploadClick}
            />
          </div>
        </div>
        <DamagePhotosSection
          photoPreviews={photoPreviews}
          onPhotoUploadClick={onPhotoUploadClick}
          showErrors={showErrors}
          errors={errors}
        />
        <div className={`content-stretch ${KATIX_STACK}`} data-node-id="1836:12487" data-name="stack">
          <div className="flex flex-wrap w-full items-center justify-between gap-2" data-node-id="1836:12488">
            <p className="font-bold leading-[28px] text-[20px] text-[#3d3d3d]">
              その他写真
            </p>
            <a
              href="https://bike.katix.co.jp/guideline#purchase-price-up-point"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap gap-1 items-center shrink-0"
            >
              <IconQuestion className="size-5 shrink-0 text-[#2a7fff]" />
              <span className="font-medium leading-[20px] text-[14px] text-[#2a7fff] underline">
                高額査定ポイント
              </span>
            </a>
          </div>
          <div className={`content-stretch ${KATIX_PHOTO_GRID}`} data-node-id="1836:12489">
            {(["custom", ...freeSlotIds] as const).map((slotId) =>
              slotId === "custom" ? (
                <PhotoUploadCard
                  key={slotId}
                  slotId={slotId}
                  title="カスタム写真"
                  badge="optional"
                  previewUrl={photoPreviews.custom}
                  illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                  placeholder={
                    <BikeIllustrationSlot>
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <img
                          alt=""
                          className="absolute h-[74.87%] left-0 max-w-none top-[12.57%] w-full"
                          src={assets.skeletonCustom}
                        />
                      </div>
                    </BikeIllustrationSlot>
                  }
                  onUploadClick={onPhotoUploadClick}
                />
              ) : (
                <PhotoUploadCard
                  key={slotId}
                  slotId={slotId}
                  title="自由に追加"
                  badge="optional"
                  previewUrl={photoPreviews[slotId]}
                  illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                  placeholder={FREE_PLUS_PLACEHOLDER}
                  onUploadClick={onPhotoUploadClick}
                />
              )
            )}
          </div>
        </div>
        <div className={`content-stretch ${KATIX_STACK}`} data-node-id="1828:10679" data-name="stack">
          <div className="content-stretch flex flex-col gap-0.5 items-start relative shrink-0 w-full" data-node-id="1828:10680" data-name="Title">
            <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[#3d3d3d] w-full" data-node-id="1828:10681">
              <p className="leading-[28px]">書類</p>
            </div>
            <p className="leading-[20px] text-[14px] text-[#505353] w-full" data-node-id="1828:10683">
              <span className="text-[#505353]">必要な書類をそろえると、</span>
              <span className="font-bold text-[#389656]">入札数UP↗</span>
              <span className="text-[#389656]">︎</span>
              <span>につながります</span>
            </p>
          </div>
          <DocumentsSection
            inspectionType={form.inspectionType}
            onInspectionTypeChange={form.setInspectionType}
            onPhotoUploadClick={onPhotoUploadClick}
            photoPreviews={photoPreviews}
            errors={errors}
            showErrors={showErrors}
          />
          <div className="content-stretch flex items-center justify-center py-1 relative shrink-0 w-full" data-node-id="1828:10685" data-name="Container">
            <div className={`[word-break:break-word] flex flex-col font-medium justify-center not-italic relative shrink-0 text-[14px] text-[#505353] ${KATIX_CONTENT_WIDTH}`} data-node-id="1828:10686">
              <p>
                <span className="[word-break:break-word] font-['Helvetica_Neue:Medium'] leading-[20px] not-italic">※</span>
                <span className="leading-[20px]">個人情報はマスクを処理しますので、ご安心ください</span>
              </p>
            </div>
          </div>
        </div>
        <div className={`content-stretch ${KATIX_STACK}`} data-node-id="1828:10687" data-name="stack">
          <div className="content-stretch flex flex-wrap items-start justify-between gap-2 relative shrink-0 w-full" data-node-id="1828:10688" data-name="その他書類">
            <div className="[word-break:break-word] flex flex-col font-bold justify-center leading-[0] not-italic relative shrink-0 text-[20px] text-[#3d3d3d]" data-node-id="1828:10689">
              <p className="leading-[28px]">その他書類</p>
            </div>
            <div className="flex flex-wrap gap-1 items-center shrink-0 py-1" data-node-id="1828:10690" data-name="Container">
              <IconQuestion className="size-5 shrink-0 text-[#2a7fff]" />
              <span className="font-medium leading-[20px] text-[14px] text-[#2a7fff] underline">
                その他書類とは
              </span>
            </div>
          </div>
          <div className={`content-stretch ${KATIX_PHOTO_GRID}`} data-node-id="1828:10693" data-name="Column">
            {otherDocsSlotIds.map((slotId) => (
              <PhotoUploadCard
                key={slotId}
                slotId={slotId}
                title="その他書類"
                badge="optional"
                previewUrl={photoPreviews[slotId]}
                illustrationPreviewBox={BIKE_ILLUSTRATION_PREVIEW_BOX}
                placeholder={FREE_PLUS_PLACEHOLDER}
                onUploadClick={onPhotoUploadClick}
              />
            ))}
          </div>
        </div>
        </div>
        <KatixSectionBanner ref={infoSectionRef} id="katix-section-info">
          ②　バイク・お客様の情報を入力
        </KatixSectionBanner>
        <div className={KATIX_MAIN_INNER}>
        <BikeCustomerForm form={form} errors={errors} showErrors={showErrors} />
        <div className={`[word-break:break-word] flex flex-col font-['Helvetica_Neue:Medium'] justify-center not-italic relative shrink-0 text-[14px] text-[#505353] ${KATIX_CONTENT_WIDTH}`} data-node-id="1828:10825">
          <p className="leading-[20px]">※近日中に専任スタッフからご登録内容確認のご連絡を差し上げます。ご不明な点はお気軽にお尋ねください。</p>
        </div>
        <button
          type="button"
          onClick={onSubmit}
          className="bg-[#389656] cursor-pointer flex gap-2 items-center justify-center px-4 py-3 relative rounded-lg w-full min-w-0 hover:bg-[#2d7a45] transition-colors"
          data-node-id="1828:10826"
          data-name="Button"
        >
          <p className="[word-break:break-word] font-medium leading-[28px] not-italic relative shrink-0 text-[20px] text-white whitespace-nowrap" data-node-id="I1828:10826;3389:1714">
            査定に進む
          </p>
        </button>
        <div className={`flex flex-col gap-4 items-stretch p-4 relative rounded-lg w-full min-w-0 ${KATIX_CONTENT_WIDTH}`} data-node-id="1828:10827" data-name="Heading">
          <div className="flex flex-col gap-1 items-stretch text-center w-full min-w-0">
            <div className="flex flex-col font-bold justify-center text-[24px] text-[#3d3d3d] w-full">
              <p className="leading-[32px]">お問い合わせ窓口</p>
            </div>
            <div className="flex flex-col  font-medium justify-center relative shrink-0 text-[0px] text-[#505353] w-full whitespace-pre-wrap" data-node-id="1828:10830">
              <p className="leading-[20px] mb-0 text-[14px]">（受付時間）</p>
              <p className="leading-[20px] mb-0 text-[14px]">{`平日：10:00~18:00　/　土日祝：10:00~17:00　`}</p>
              <p className="text-[14px]">
                <span className="leading-[20px]">（メール）</span>
                <span className="[text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid  font-medium leading-[20px] not-italic underline">dev+support@bike-katix.jp</span>
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#e2e4e9] flex gap-2 items-center justify-center px-4 py-3 rounded-lg w-fit self-center">
            <IconPhone className="size-5 shrink-0 text-[#3d3d3d]" />
            <div className="[word-break:break-word] flex flex-col  font-bold justify-center leading-[0] not-italic relative shrink-0 text-[0px] text-[#389656] whitespace-nowrap" data-node-id="1828:10833">
              <p className="leading-[20px] text-[#3d3d3d] text-[14px]">0120-847-293</p>
            </div>
          </div>
        </div>
        </div>
      </div>
      </KatixPageBody>
      <KatixFooter />
    </KatixPageShell>
  );
}

export default function KatixBikeRegistrationPage() {
  const form = useKatixForm();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeSlotRef = useRef<string>("");
  const [photoPreviews, setPhotoPreviews] = useState<Record<string, string>>({});
  const [freeSlotIds, setFreeSlotIds] = useState(["free-0"]);
  const [otherDocsSlotIds, setOtherDocsSlotIds] = useState(["other-docs-0"]);
  const [uploadGuideSlotId, setUploadGuideSlotId] = useState<string | null>(null);
  const [uploadGuidePhase, setUploadGuidePhase] = useState<UploadGuidePhase>("guide");
  const [uploadGuideSlide, setUploadGuideSlide] = useState<"prev" | "next" | null>(null);
  const [previewResult, setPreviewResult] = useState<PhotoUploadPreviewResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<KatixFormErrors>({});
  const [showErrors, setShowErrors] = useState(false);
  const photoSoftWarnings = useBodySlotSoftWarnings(photoPreviews);

  useEffect(() => {
    if (uploadGuideSlotId !== null) return;
    setUploadGuidePhase("guide");
    setUploadGuideSlide(null);
    setPreviewResult(null);
  }, [uploadGuideSlotId]);

  useEffect(() => {
    if (!showErrors) return;
    const current = validateKatixForm(form, photoPreviews);
    setErrors((prev) => {
      const next: KatixFormErrors = {};
      for (const key of Object.keys(prev)) {
        if (current[key]) next[key] = current[key];
      }
      return Object.keys(next).length === Object.keys(prev).length &&
        Object.keys(next).every((k) => next[k] === prev[k])
        ? prev
        : next;
    });
  }, [
    showErrors,
    form,
    photoPreviews,
    form.inspectionType,
    form.numberPlate,
    form.meterHistory,
    form.loanStatus,
    form.bikeConditions,
    form.accidents,
    form.owner,
    form.originalDocuments,
    form.details,
  ]);

  const triggerPhotoUpload = useCallback((slotId: string) => {
    activeSlotRef.current = slotId;
    fileInputRef.current?.click();
  }, []);

  const handlePhotoUploadClick = useCallback(
    (slotId: string) => {
      if (isRequiredUploadSlot(slotId)) {
        setUploadGuideSlide(null);
        setUploadGuideSlotId(slotId);
        const preview = photoPreviews[slotId];
        if (preview && isRequiredUploadSlot(slotId)) {
          setUploadGuidePhase("preview");
          setPreviewResult(createOkPreviewResult(preview, slotId));
        } else {
          setUploadGuidePhase("guide");
          setPreviewResult(null);
        }
        return;
      }
      triggerPhotoUpload(slotId);
    },
    [triggerPhotoUpload, photoPreviews]
  );

  const handleUploadGuideConfirm = useCallback(
    (slotId: string) => {
      triggerPhotoUpload(slotId);
    },
    [triggerPhotoUpload]
  );

  const handleUploadGuideClose = useCallback(() => {
    setUploadGuideSlotId(null);
  }, []);

  const handleRemovePhoto = useCallback((slotId: string) => {
    if (!isRequiredUploadSlot(slotId)) return;

    setPhotoPreviews((prev) => {
      const url = prev[slotId];
      if (url?.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
      const next = { ...prev };
      delete next[slotId];
      return next;
    });

    if (previewResult?.url.startsWith("blob:")) {
      URL.revokeObjectURL(previewResult.url);
    }

    setPreviewResult(null);
    setUploadGuidePhase("guide");
    setUploadGuideSlide(null);
  }, [previewResult]);

  const navigateGuideSlot = useCallback(
    (targetSlot: (typeof BIKE_UPLOAD_SLOT_ORDER)[number], direction: "prev" | "next") => {
      setUploadGuideSlide(direction);
      setUploadGuideSlotId(targetSlot);
      const preview = photoPreviews[targetSlot];
      if (preview) {
        setUploadGuidePhase("preview");
        setPreviewResult(createOkPreviewResult(preview, targetSlot));
      } else {
        setUploadGuidePhase("guide");
        setPreviewResult(null);
      }
    },
    [photoPreviews]
  );

  const handleGuideNavPrev = useCallback(() => {
    const current = uploadGuideSlotId;
    if (!current || !isRequiredUploadSlot(current)) return;

    const prevSlot = getAdjacentRequiredUploadSlot(current, "prev");
    if (!prevSlot) return;

    navigateGuideSlot(prevSlot, "prev");
  }, [uploadGuideSlotId, navigateGuideSlot]);

  const handleGuideNavNext = useCallback(() => {
    const current = uploadGuideSlotId;
    if (!current || !isRequiredUploadSlot(current)) return;

    const nextSlot = getAdjacentRequiredUploadSlot(current, "next");
    if (!nextSlot) {
      handleUploadGuideClose();
      return;
    }

    navigateGuideSlot(nextSlot, "next");
  }, [uploadGuideSlotId, navigateGuideSlot, handleUploadGuideClose]);

  const handlePhotoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      const slot = activeSlotRef.current;
      if (!file || !slot) return;

      e.target.value = "";

      if (isRequiredUploadSlot(slot) && uploadGuideSlotId !== null) {
        const url = URL.createObjectURL(file);

        setPreviewResult(createOkPreviewResult(url, slot));
        setUploadGuidePhase("preview");
        setUploadGuideSlide(null);
        setPhotoPreviews((prev) => ({ ...prev, [slot]: url }));
        setErrors((prev) => {
          if (!prev[slot]) return prev;
          const next = { ...prev };
          delete next[slot];
          return next;
        });
      } else {
        const url = URL.createObjectURL(file);
        setPhotoPreviews((prev) => ({ ...prev, [slot]: url }));
        setErrors((prev) => {
          if (!prev[slot]) return prev;
          const next = { ...prev };
          delete next[slot];
          return next;
        });
      }

      if (slot.startsWith("free-")) {
        setFreeSlotIds((ids) => {
          if (ids[ids.length - 1] !== slot) return ids;
          return [...ids, `free-${ids.length}`];
        });
      } else if (slot.startsWith("other-docs-")) {
        setOtherDocsSlotIds((ids) => {
          if (ids[ids.length - 1] !== slot) return ids;
          return [...ids, `other-docs-${ids.length}`];
        });
      }

    },
    [uploadGuideSlotId]
  );

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handlePhotoChange}
        aria-hidden
      />
      <PhotoUploadGuideModal
        open={uploadGuideSlotId !== null}
        slotId={uploadGuideSlotId}
        phase={uploadGuidePhase}
        slideDirection={uploadGuideSlide}
        previewResult={previewResult}
        bodySlotWarnings={photoSoftWarnings}
        prevDisabled={
          !uploadGuideSlotId ||
          !isRequiredUploadSlot(uploadGuideSlotId) ||
          BIKE_UPLOAD_SLOT_ORDER[0] === uploadGuideSlotId
        }
        onClose={handleUploadGuideClose}
        onConfirm={handleUploadGuideConfirm}
        onReupload={handleUploadGuideConfirm}
        onRemovePhoto={handleRemovePhoto}
        onNavPrev={handleGuideNavPrev}
        onNavNext={handleGuideNavNext}
      />
      {submitted && (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-[#389656] px-6 py-3 text-white shadow-lg">
          査定申込内容を送信しました（プロトタイプ）
        </div>
      )}
      <div className="katix-prototype-root">
        <KatixBikeRegistrationView
          form={form}
          photoPreviews={photoPreviews}
          photoSoftWarnings={photoSoftWarnings}
          freeSlotIds={freeSlotIds}
          otherDocsSlotIds={otherDocsSlotIds}
          errors={errors}
          showErrors={showErrors}
          onPhotoUploadClick={handlePhotoUploadClick}
          onSubmit={() => {
            const nextErrors = validateKatixForm(form, photoPreviews);
            if (Object.keys(nextErrors).length > 0) {
              setErrors(nextErrors);
              setShowErrors(true);
              requestAnimationFrame(() => scrollToFirstError(nextErrors));
              return;
            }
            setErrors({});
            setShowErrors(false);
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
          }}
        />
      </div>
    </>
  );
}

