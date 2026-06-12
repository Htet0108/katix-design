"use client";

import { useEffect, useRef, useState } from "react";
import { computeBodySlotSoftWarnings } from "@/components/bike-design/detect-body-slot-soft-warning";
import type { BodyUploadSlotId } from "@/components/bike-design/photo-slot-guides";

const BODY_SLOTS: readonly BodyUploadSlotId[] = ["front", "rear", "left", "right"];

function getBodyPreviewKey(photoPreviews: Record<string, string>): string {
  return BODY_SLOTS.map((slotId) => photoPreviews[slotId] ?? "").join("\0");
}

/** Per-slot warning flags: true = warning, false = ok. Missing = no photo or still checking. */
export function useBodySlotSoftWarnings(
  photoPreviews: Record<string, string>
): Partial<Record<BodyUploadSlotId, boolean>> {
  const [warnings, setWarnings] = useState<Partial<Record<BodyUploadSlotId, boolean>>>({});
  const previewKey = getBodyPreviewKey(photoPreviews);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const hasAnyBodyPhoto = BODY_SLOTS.some((slotId) => photoPreviews[slotId]);

    if (!hasAnyBodyPhoto) {
      setWarnings({});
      return;
    }

    const requestId = ++requestIdRef.current;

    void computeBodySlotSoftWarnings(photoPreviews).then((next) => {
      if (requestId !== requestIdRef.current) return;
      setWarnings(next);
    });
  }, [previewKey, photoPreviews]);

  return warnings;
}
