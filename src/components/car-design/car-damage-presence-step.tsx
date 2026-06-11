"use client";

import type { CarDamagePresence } from "@/components/car-design/car-damage-spot-types";

type CarDamagePresenceStepProps = {
  presence: CarDamagePresence | null;
  onOpen: () => void;
  hasError?: boolean;
};

const ANSWER_MICROCOPY: Record<
  CarDamagePresence | "unanswered",
  { label: string; description: string }
> = {
  unanswered: {
    label: "未回答",
    description: "傷サビ凹みの有無",
  },
  yes: {
    label: "あり",
    description: "該当あり",
  },
  no: {
    label: "なし",
    description: "該当なし",
  },
};

const ACTION_BUTTON_CLASS =
  "shrink-0 rounded border border-solid border-[#389656] bg-white px-3 py-1.5 text-[13px] font-medium leading-5 text-[#389656] hover:bg-[#edf6ee] transition-colors";

export function CarDamagePresenceStep({
  presence,
  onOpen,
  hasError = false,
}: CarDamagePresenceStepProps) {
  const answered = presence !== null;
  const borderClass = hasError && !answered ? "border-[#d01010]" : "border-transparent";
  const copy = answered ? ANSWER_MICROCOPY[presence] : ANSWER_MICROCOPY.unanswered;

  return (
    <div className="flex flex-col gap-1 w-full min-w-0">
      <div
        className={`bg-white flex flex-col items-stretch overflow-hidden relative rounded border border-solid shadow-[0px_1px_2px_0px_rgba(61,61,61,0.08)] w-full ${borderClass}`}
      >
        <div className="flex items-center justify-between gap-3 px-3 py-3 w-full">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            {answered ? (
              <p className="min-w-0 text-[14px] font-medium leading-[20px] text-[#3d3d3d]">
                {copy.label}
                <span className="text-[#656767]">（{copy.description}）</span>
              </p>
            ) : (
              <>
                <span className="shrink-0 rounded px-1.5 py-0.5 text-[11px] font-bold leading-4 bg-[#fff4e5] text-[#b45309]">
                  {copy.label}
                </span>
                <p className="min-w-0 text-[12px] font-medium leading-4 text-[#656767]">
                  {copy.description}
                </p>
              </>
            )}
          </div>
          <button type="button" onClick={onOpen} className={ACTION_BUTTON_CLASS} aria-haspopup="dialog">
            {answered ? "変更" : "回答"}
          </button>
        </div>
      </div>
    </div>
  );
}
