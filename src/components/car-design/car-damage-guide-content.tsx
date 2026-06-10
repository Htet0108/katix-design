"use client";

/** Bike-style ※ note (see KatixBikeRegistrationPage documents section). */
export function CarDamageDeclarationNote() {
  return (
    <div
      className="flex items-center justify-center py-1 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col gap-5 font-medium justify-center relative shrink-0 text-[14px] text-[#505353] w-full">
        <p className="leading-[20px]">
          <span className="leading-[20px]">※</span>
          気になる傷や不具合は、できるだけ事前にご申告ください。事前に状態を共有いただくことで、査定額の精度が高まり、入札後の確認もスムーズになります。
        </p>
        <p className="leading-[20px]">
          なお、未申告の内容が現車確認で判明した場合、お取引がキャンセルとなることがあります。
        </p>
      </div>
    </div>
  );
}

export function CarDamagePhotoHint() {
  return (
    <p
      className="leading-[20px] text-[14px] font-medium text-[#656767] w-full"
      data-node-id="5059:635"
    >
      各箇所の
      <span className="font-bold text-[#3d3d3d]">全体写真</span>
      と
      <span className="font-bold text-[#3d3d3d]">拡大写真</span>
      をアップロードしてください。複数ある場合は、「追加写真」から追加できます。
    </p>
  );
}

function GuideExampleSection({
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

export function CarDamageGuideExamples() {
  return (
    <>
      <GuideExampleSection
        title="「あり」を選んで写真をお願いする例"
        items={[
          "飛び石キズ、目立つサビ・凹み",
          "内装の破れ、目立つ汚れ・シミ",
          "修復歴のある箇所、気になる箇所が複数ある場合",
        ]}
      />
      <GuideExampleSection
        title="「なし」でOKな例"
        items={[
          "年式相応の薄い擦れキズ程度",
          "使用感として自然な軽微な状態",
        ]}
      />
    </>
  );
}
