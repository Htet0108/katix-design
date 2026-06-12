"use client";

import type { CarDamagePresence } from "@/components/car-design/car-damage-spot-types";

type CarDamagePresenceStepProps = {
  presence: CarDamagePresence | null;
  onOpen: () => void;
  hasError?: boolean;
};

const ANSWER_PREFIX = "（傷・破れなど）";

const ANSWER_LABEL: Record<CarDamagePresence, string> = {
  yes: `${ANSWER_PREFIX}あり`,
  no: `${ANSWER_PREFIX}なし`,
};

const STATUS_TEXT_CLASS = "min-w-0 text-[14px] font-medium leading-[20px] text-[#3d3d3d]";

const ACTION_BUTTON_CLASS =
  "pointer-events-none shrink-0 rounded border border-solid border-[#389656] bg-white px-3 py-1.5 text-[13px] font-medium leading-5 text-[#389656]";

function RequiredBadge() {
  return (
    <div className="bg-[#fae7e7] flex items-center justify-center overflow-clip px-2 py-0.5 relative rounded shrink-0 pointer-events-none">
      <span className="leading-[16px] text-[12px] font-bold text-[#d01010]">必須</span>
    </div>
  );
}

export function CarDamagePresenceStep({
  presence,
  onOpen,
  hasError = false,
}: CarDamagePresenceStepProps) {
  const answered = presence !== null;
  const borderClass = hasError && !answered ? "border-[#d01010]" : "border-transparent";
  const statusText = answered && presence ? ANSWER_LABEL[presence] : `${ANSWER_PREFIX}未回答`;

  return (
    <div className="flex flex-col gap-1 w-full min-w-0">
      <button
        type="button"
        onClick={onOpen}
        className={`bg-white flex items-center justify-between gap-3 overflow-hidden relative rounded border border-solid shadow-[0px_1px_2px_0px_rgba(61,61,61,0.08)] w-full cursor-pointer px-3 py-3 text-left hover:opacity-70 transition-opacity touch-manipulation ${borderClass}`}
        aria-haspopup="dialog"
        aria-label={answered ? `${statusText}の回答を変更` : "傷・破れなどについて回答"}
      >
        <span className={`${STATUS_TEXT_CLASS} flex-1 pointer-events-none`}>{statusText}</span>
        <RequiredBadge />
        <span className={ACTION_BUTTON_CLASS} aria-hidden>
          {answered ? "変更する" : "回答する"}
        </span>
      </button>
    </div>
  );
}
