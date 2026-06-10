import type { RequiredUploadSlotId } from "@/components/katix/photo-slot-guides";

const STORAGE_KEY = "katix-upload-guide-dismissed";

type DismissPrefs = {
  slots: Partial<Record<RequiredUploadSlotId, boolean>>;
};

function readPrefs(): DismissPrefs {
  if (typeof window === "undefined") {
    return { slots: {} };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { slots: {} };
    const parsed = JSON.parse(raw) as DismissPrefs & { global?: boolean };
    return {
      slots: parsed.slots ?? {},
    };
  } catch {
    return { slots: {} };
  }
}

function writePrefs(prefs: DismissPrefs) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function shouldShowUploadGuide(slotId: RequiredUploadSlotId): boolean {
  const prefs = readPrefs();
  return !prefs.slots[slotId];
}

export function dismissUploadGuideForSlot(slotId: RequiredUploadSlotId) {
  const prefs = readPrefs();
  writePrefs({
    slots: { ...prefs.slots, [slotId]: true },
  });
}

export function resetUploadGuidePrefs() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
