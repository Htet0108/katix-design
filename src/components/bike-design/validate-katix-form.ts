import type { KatixFormState } from "@/components/bike-design/use-katix-form";

export type KatixFormErrors = Record<string, string>;

export const ERROR_SELECT = "選択してください";
export const ERROR_INPUT = "入力してください";
export const ERROR_PHOTO = "写真を追加してください";

const CONDITION_DETAIL_KEYS = ["battery", "immobile", "oil", "idle", "noise"] as const;
const ACCIDENT_DETAIL_KEYS = ["tip", "riding", "crash"] as const;

const REQUIRED_PHOTO_SLOTS = ["front", "rear", "left", "right", "odometer"] as const;

export function validateKatixForm(
  form: KatixFormState,
  photoPreviews: Record<string, string>
): KatixFormErrors {
  const errors: KatixFormErrors = {};
  const { inspectionType, bikeConditions, accidents, owner, originalDocuments, details } =
    form;

  for (const slot of REQUIRED_PHOTO_SLOTS) {
    if (!photoPreviews[slot]) {
      errors[slot] = ERROR_PHOTO;
    }
  }

  if (inspectionType === "electronic") {
    if (!photoPreviews["doc-electronic"]) {
      errors["doc-electronic"] = ERROR_PHOTO;
    }
    if (!photoPreviews["doc-record"]) {
      errors["doc-record"] = ERROR_PHOTO;
    }
  } else if (!photoPreviews["doc-legacy"]) {
    errors["doc-legacy"] = ERROR_PHOTO;
  }

  if (bikeConditions.size === 0) {
    errors.bikeConditions = ERROR_SELECT;
  } else {
    for (const key of CONDITION_DETAIL_KEYS) {
      if (bikeConditions.has(key) && !details[key]?.trim()) {
        errors[`detail-${key}`] = ERROR_INPUT;
      }
    }
  }

  if (accidents.size === 0) {
    errors.accidents = ERROR_SELECT;
  } else {
    for (const key of ACCIDENT_DETAIL_KEYS) {
      if (accidents.has(key) && !details[key]?.trim()) {
        errors[`detail-${key}`] = ERROR_INPUT;
      }
    }
  }

  if (!details.bikeDescription?.trim()) {
    errors.bikeDescription = ERROR_INPUT;
  }

  if (owner === "other" && !details.ownerOther?.trim()) {
    errors.ownerOther = ERROR_INPUT;
  }

  if (originalDocuments.size === 0) {
    errors.originalDocuments = ERROR_SELECT;
  }

  return errors;
}

export function scrollToFirstError(errors: KatixFormErrors) {
  const firstKey = Object.keys(errors)[0];
  if (!firstKey) return;

  const el =
    document.querySelector(`[data-error-field="${firstKey}"]`) ??
    document.querySelector(`[data-photo-slot="${firstKey}"]`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
}
