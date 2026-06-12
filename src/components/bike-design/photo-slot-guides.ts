import { assets } from "@/lib/figma-assets";

export type OkNgSample = {
  src: string;
  imgClassName: string;
  caption: string;
  /** Localized NG effect on the sample (percent of preview box). */
  ngBlurWindow?: {
    left: number;
    top: number;
    width: number;
    height: number;
    effect?: "blur" | "glare";
    blurClassName?: string;
  };
};

export type PhotoSlotGuide = {
  title: string;
  description: string | readonly string[];
  okSample: OkNgSample;
  ngSample: OkNgSample;
  /** OK preview box — defaults to bike 240×120. */
  sampleBoxClassName?: string;
  tips: readonly string[];
  dataNodeId?: string;
};

/** Bike photo slots that show the upload guide modal before opening the file picker. */
export const REQUIRED_UPLOAD_SLOT_IDS = [
  "front",
  "rear",
  "left",
  "right",
  "odometer",
] as const;

export type RequiredUploadSlotId = (typeof REQUIRED_UPLOAD_SLOT_IDS)[number];

/** Bike photos shown as 1/6 … 6/6 in the upload guide modal. */
export const BIKE_UPLOAD_SLOT_TOTAL = 6;

export const BIKE_UPLOAD_SLOT_ORDER = [
  "front",
  "rear",
  "left",
  "right",
  "odometer",
] as const satisfies readonly RequiredUploadSlotId[];

export function isRequiredUploadSlot(slotId: string): slotId is RequiredUploadSlotId {
  return (REQUIRED_UPLOAD_SLOT_IDS as readonly string[]).includes(slotId);
}

export type BodyUploadSlotId = "front" | "rear" | "left" | "right";

const BODY_UPLOAD_SLOT_IDS: readonly BodyUploadSlotId[] = ["front", "rear", "left", "right"];

export function isBodyUploadSlot(slotId: RequiredUploadSlotId): slotId is BodyUploadSlotId {
  return (BODY_UPLOAD_SLOT_IDS as readonly string[]).includes(slotId);
}

/** Non-blocking preview warning copy under body-slot photos. */
export const BODY_SLOT_SOFT_WARNING_MESSAGE =
  "バイクの向きが異なるため、撮り直しをお願いする場合があります。";

export function getSlotProgressLabel(slotId: RequiredUploadSlotId): string | null {
  const bikeIndex = (BIKE_UPLOAD_SLOT_ORDER as readonly string[]).indexOf(slotId);
  if (bikeIndex >= 0) {
    return `${bikeIndex + 1} / ${BIKE_UPLOAD_SLOT_TOTAL} 枚目`;
  }
  return null;
}

export function getNextRequiredUploadSlot(
  currentSlotId: RequiredUploadSlotId,
  photoPreviews: Record<string, string>
): RequiredUploadSlotId | null {
  const currentIndex = BIKE_UPLOAD_SLOT_ORDER.indexOf(currentSlotId);
  for (let i = currentIndex + 1; i < BIKE_UPLOAD_SLOT_ORDER.length; i++) {
    const slotId = BIKE_UPLOAD_SLOT_ORDER[i];
    if (!photoPreviews[slotId]) return slotId;
  }
  return null;
}

export function getAdjacentRequiredUploadSlot(
  currentSlotId: RequiredUploadSlotId,
  direction: "prev" | "next"
): RequiredUploadSlotId | null {
  const currentIndex = BIKE_UPLOAD_SLOT_ORDER.indexOf(currentSlotId);
  if (currentIndex < 0) return null;
  const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
  if (nextIndex < 0 || nextIndex >= BIKE_UPLOAD_SLOT_ORDER.length) return null;
  return BIKE_UPLOAD_SLOT_ORDER[nextIndex];
}

const BIKE_SAMPLE_BOX = "relative h-[120px] w-full overflow-hidden bg-[#f3f4f6]";

const BIKE_SIDE_TIPS = [
  "明るい場所で撮影",
  "車体が切れないように撮影",
  "真横から撮影",
] as const;

const BIKE_FRONT_REAR_TIPS = [
  "明るい場所で撮影",
  "車体が切れないように撮影",
  "斜めではなく正面から撮影",
] as const;

const ODOMETER_TIPS = [
  "明るい場所で撮影",
  "反射やピンぼけに注意",
  "トリップメーターと間違えないように注意",
] as const;

const SLOT_GUIDES: Record<RequiredUploadSlotId, PhotoSlotGuide> = {
  front: {
    dataNodeId: "2053:716",
    title: "前全面の写真",
    description: "全体がしっかりわかるようにご撮影ください",
    sampleBoxClassName: BIKE_SAMPLE_BOX,
    okSample: {
      src: assets.guideSampleFront,
      imgClassName: "absolute inset-0 size-full object-cover pointer-events-none",
      caption: "車体全体が写っている",
    },
    ngSample: {
      src: assets.guideSampleFront,
      imgClassName:
        "absolute inset-0 size-[145%] max-w-none object-cover object-top pointer-events-none blur-[0.5px] brightness-75",
      caption: "車体が切れている・暗い",
    },
    tips: BIKE_FRONT_REAR_TIPS,
  },
  rear: {
    dataNodeId: "2058:10920",
    title: "後全面の写真",
    description: ["ナンバーの有無がしっかりわかるように", "ご撮影ください"],
    sampleBoxClassName: BIKE_SAMPLE_BOX,
    okSample: {
      src: assets.guideSampleRear,
      imgClassName:
        "absolute h-full left-[-2.11%] max-w-none top-0 w-[104.22%] pointer-events-none",
      caption: "ナンバーが確認できる",
    },
    ngSample: {
      src: assets.guideSampleRear,
      imgClassName:
        "absolute h-[130%] left-[-15%] max-w-none top-[10%] w-[130%] pointer-events-none brightness-50",
      caption: "ナンバーが読み取れない",
    },
    tips: BIKE_FRONT_REAR_TIPS,
  },
  left: {
    dataNodeId: "2058:10970",
    title: "左前面の写真",
    description: "画面内に車体が収まるようにご撮影ください",
    sampleBoxClassName: BIKE_SAMPLE_BOX,
    okSample: {
      src: assets.guideSampleLeft,
      imgClassName:
        "absolute h-[100.12%] left-[-0.85%] max-w-none top-[-0.06%] w-[101.69%] pointer-events-none",
      caption: "左側面全体が写っている",
    },
    ngSample: {
      src: assets.guideSampleLeft,
      imgClassName:
        "absolute h-[140%] left-[-20%] max-w-none top-[-5%] w-[140%] pointer-events-none rotate-6",
      caption: "斜め・車体が切れている",
    },
    tips: BIKE_SIDE_TIPS,
  },
  right: {
    dataNodeId: "2058:10997",
    title: "右前面の写真",
    description: "画面内に車体が収まるようにご撮影ください",
    sampleBoxClassName: BIKE_SAMPLE_BOX,
    okSample: {
      src: assets.guideSampleRight,
      imgClassName:
        "absolute h-[100.12%] left-[-0.85%] max-w-none top-[-0.06%] w-[101.69%] pointer-events-none",
      caption: "右側面全体が写っている",
    },
    ngSample: {
      src: assets.guideSampleRight,
      imgClassName:
        "absolute h-[140%] left-[-20%] max-w-none top-[-5%] w-[140%] pointer-events-none -rotate-6",
      caption: "斜め・車体が切れている",
    },
    tips: BIKE_SIDE_TIPS,
  },
  odometer: {
    dataNodeId: "2058:11016",
    title: "オドメーターの写真",
    description: "総走行距離がわかるようにご撮影ください",
    sampleBoxClassName: BIKE_SAMPLE_BOX,
    okSample: {
      src: assets.guideSampleOdometer,
      imgClassName: "absolute inset-0 size-full object-cover pointer-events-none",
      caption: "総走行距離がはっきり読める",
    },
    ngSample: {
      src: assets.guideSampleOdometerNg,
      imgClassName: "absolute inset-0 size-full object-cover pointer-events-none",
      caption: "反射・ピンぼけで読めない",
    },
    tips: ODOMETER_TIPS,
  },
};

export function getPhotoSlotGuide(slotId: string): PhotoSlotGuide | null {
  if (isRequiredUploadSlot(slotId)) {
    return SLOT_GUIDES[slotId];
  }
  return null;
}
