import {
  BODY_SLOT_SOFT_WARNING_MESSAGE,
  isBodyUploadSlot,
  type BodyUploadSlotId,
  type RequiredUploadSlotId,
} from "@/components/bike-design/photo-slot-guides";

export type PhotoUploadSoftWarning = {
  message: string;
};

const BODY_SLOTS: readonly BodyUploadSlotId[] = ["front", "rear", "left", "right"];

function loadImageSizeFromElement(src: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("image load failed"));
    image.src = src;
  });
}

/** Reads display dimensions with EXIF orientation applied when supported. */
async function loadDisplaySize(src: string): Promise<{ width: number; height: number }> {
  try {
    const blob = await fetch(src).then((response) => response.blob());
    if (typeof createImageBitmap === "function") {
      const bitmap = await createImageBitmap(blob, { imageOrientation: "from-image" });
      const size = { width: bitmap.width, height: bitmap.height };
      bitmap.close();
      return size;
    }
  } catch {
    // Fall back to element dimensions below.
  }

  return loadImageSizeFromElement(src);
}

async function urlsMatchSameImage(a: string, b: string): Promise<boolean> {
  if (a === b) return true;

  const [bufA, bufB] = await Promise.all([
    fetch(a).then((response) => response.arrayBuffer()),
    fetch(b).then((response) => response.arrayBuffer()),
  ]);

  if (bufA.byteLength !== bufB.byteLength) return false;

  const viewA = new Uint8Array(bufA);
  const viewB = new Uint8Array(bufB);
  for (let i = 0; i < viewA.length; i++) {
    if (viewA[i] !== viewB[i]) return false;
  }

  return true;
}

/** Heuristic aspect-ratio checks per slot — prototype stand-in for side detection. */
function shouldWarnByAspectRatio(slotId: BodyUploadSlotId, width: number, height: number): boolean {
  if (width <= 0 || height <= 0) return false;

  const aspect = width / height;

  if (slotId === "left" || slotId === "right") {
    // Side shots are usually landscape.
    return aspect < 1.25 || height > width * 1.05;
  }

  // Front/rear head-on shots are usually not wide side profiles.
  return aspect > 1.55;
}

async function matchesOtherBodySlotPhoto(
  url: string,
  slotId: BodyUploadSlotId,
  photoPreviews: Partial<Record<BodyUploadSlotId, string>>
): Promise<boolean> {
  for (const otherSlotId of BODY_SLOTS) {
    if (otherSlotId === slotId) continue;

    const otherUrl = photoPreviews[otherSlotId];
    if (!otherUrl) continue;

    if (await urlsMatchSameImage(url, otherUrl)) {
      return true;
    }
  }

  return false;
}

/** Computes per-slot warning flags for all body slots that have photos. */
export async function computeBodySlotSoftWarnings(
  photoPreviews: Record<string, string>
): Promise<Partial<Record<BodyUploadSlotId, boolean>>> {
  const bodyPreviews: Partial<Record<BodyUploadSlotId, string>> = {};
  for (const slotId of BODY_SLOTS) {
    const url = photoPreviews[slotId];
    if (url) bodyPreviews[slotId] = url;
  }

  const next: Partial<Record<BodyUploadSlotId, boolean>> = {};

  await Promise.all(
    BODY_SLOTS.map(async (slotId) => {
      const url = bodyPreviews[slotId];
      if (!url) return;

      const result = await detectBodySlotSoftWarning(url, slotId, bodyPreviews);
      next[slotId] = Boolean(result);
    })
  );

  return next;
}

/** Non-blocking check for likely wrong-side or orientation issues. */
export async function detectBodySlotSoftWarning(
  url: string,
  slotId: RequiredUploadSlotId,
  photoPreviews: Partial<Record<BodyUploadSlotId, string>> = {}
): Promise<PhotoUploadSoftWarning | null> {
  if (!isBodyUploadSlot(slotId)) return null;

  try {
    if (await matchesOtherBodySlotPhoto(url, slotId, photoPreviews)) {
      return { message: BODY_SLOT_SOFT_WARNING_MESSAGE };
    }

    const { width, height } = await loadDisplaySize(url);
    if (shouldWarnByAspectRatio(slotId, width, height)) {
      return { message: BODY_SLOT_SOFT_WARNING_MESSAGE };
    }
  } catch {
    return null;
  }

  return null;
}
