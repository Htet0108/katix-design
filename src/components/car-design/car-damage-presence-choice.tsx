"use client";

import type { CarDamagePresence } from "@/components/car-design/car-damage-spot-types";

type CarDamagePresenceChoiceProps = {
  value: CarDamagePresence | null;
  onChange: (value: CarDamagePresence) => void;
  hasError?: boolean;
};

const OPTIONS: { value: CarDamagePresence; label: string }[] = [
  { value: "yes", label: "あり" },
  { value: "no", label: "なし" },
];

export function CarDamagePresenceChoice({
  value,
  onChange,
  hasError = false,
}: CarDamagePresenceChoiceProps) {
  return (
    <div
      role="group"
      aria-label="傷サビ凹みの有無"
      className="flex gap-2 items-stretch w-full"
      data-node-id="5059:616"
      data-name="Container"
    >
      {OPTIONS.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={`flex flex-1 items-center justify-center rounded-lg border border-solid px-3 py-4 min-h-[56px] text-center transition-colors ${
              selected
                ? "bg-[#edf6ee] border-[#389656]"
                : hasError
                  ? "bg-white border-[#d01010]"
                  : "bg-white border-[#e2e4e9] hover:border-[#c5c9ce]"
            }`}
          >
            <span
              className={`font-bold text-[18px] leading-[28px] ${
                selected ? "text-[#389656]" : "text-[#3d3d3d]"
              }`}
            >
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
