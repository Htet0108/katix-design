"use client";

/** Bike-style ※ note (see KatixBikeRegistrationPage documents section). */
export function CarDamageDeclarationNote() {
  return (
    <div
      className="flex items-center justify-center py-1 relative shrink-0 w-full"
      data-name="Container"
    >
      <div className="flex flex-col font-medium justify-center relative shrink-0 text-[14px] text-[#505353] w-full">
        <p className="leading-[20px]">
          <span className="leading-[20px]">※</span>
          未申告の内容が現車確認で判明した場合、お取引がキャンセルとなることがあります。事前にご申告いただくことで、入札後の確認がスムーズになり、より適正な査定につながります。
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
