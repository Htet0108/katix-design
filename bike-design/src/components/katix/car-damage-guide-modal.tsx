"use client";

import { useEffect } from "react";
import { PhotoGuideModalShell } from "@/components/katix/photo-guide-shared";

type CarDamageGuideModalProps = {
  open: boolean;
  onClose: () => void;
};

function ModalSection({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-1 w-full text-left">
      <p className="font-bold text-[14px] leading-[20px] text-[#3d3d3d]">{title}</p>
      <ul className="list-none space-y-0.5">
        {items.map((item) => (
          <li key={item} className="text-[14px] font-medium leading-[20px] text-[#505353]">
            ・{item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CarDamageGuideModal({ open, onClose }: CarDamageGuideModalProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <PhotoGuideModalShell
      open={open}
      onClose={onClose}
      titleId="car-damage-guide-title"
      dataNodeId="car-damage-guide-modal"
    >
      <div className="flex flex-col gap-4 overflow-y-auto px-4 py-4 w-full max-h-[calc(100vh-2rem)]">
        <h2
          id="car-damage-guide-title"
          className="font-bold text-[20px] leading-[28px] text-[#3d3d3d] w-full text-center"
        >
          申告の目安
        </h2>

        <p className="text-[14px] font-medium leading-[20px] text-[#505353] w-full">
          外装の傷・サビ・凹みに加え、内装（シートの破れ・シミ、ダッシュボードのキズなど）も申告対象です。
        </p>

        <ModalSection
          title="「なし」でOKな例"
          items={[
            "年式相応の薄い擦れキズ程度",
            "使用感として自然な軽微な状態",
          ]}
        />

        <ModalSection
          title="「あり」を選んで写真をお願いする例"
          items={[
            "飛び石キズ、目立つサビ・凹み",
            "内装の破れ、目立つ汚れ・シミ",
            "修復歴のある箇所、気になる箇所が複数ある場合",
          ]}
        />

        <p className="text-[14px] font-medium leading-[20px] text-[#505353] w-full">
          事前にお知らせいただくことで、査定額の精度が上がり、入札後の現車確認もスムーズに進められます。
        </p>

        <button
          type="button"
          className="bg-[#389656] font-medium leading-[28px] text-[18px] text-white px-6 py-3 rounded-lg w-full hover:bg-[#2d7a45] transition-colors"
          onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </PhotoGuideModalShell>
  );
}
