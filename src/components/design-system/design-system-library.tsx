"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { FieldFeedback, RadioOption, SimpleCheckbox } from "@/components/shared/form-controls";
import { IconQuestion } from "@/components/shared/icons";
import { KatixButton, type KatixButtonSize, type KatixButtonState, type KatixButtonStyle } from "@/components/design-system/katix-button";
import { KatixTextLink } from "@/components/design-system/katix-text-link";
import {
  buttonComponentIntro,
  buttonStateAudit,
  buttonStyleAudit,
  designSystemSource,
  designTokens,
} from "@/lib/design-system-audit";
import { KATIX_STACK } from "@/lib/katix-layout";

const buttonStyles: KatixButtonStyle[] = ["primary", "secondary", "danger", "text"];
const buttonSizes: KatixButtonSize[] = ["large", "medium", "small"];
const buttonStates: KatixButtonState[] = ["default", "hover", "active", "disabled"];

const styleLabels: Record<KatixButtonStyle, string> = {
  primary: "Primary",
  secondary: "Secondary",
  danger: "Danger",
  text: "Text",
};

const sizeLabels: Record<KatixButtonSize, string> = {
  large: "L",
  medium: "M",
  small: "S",
};

function AuditTable({ rows }: { rows: readonly { label: string; description: string }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#e2e4e9] w-full">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-[#f8f9fa] border-b border-[#e2e4e9]">
            <th className="px-3 py-3 font-bold text-[#3d3d3d] text-[14px] leading-[20px] w-[120px]">
              項目
            </th>
            <th className="px-3 py-3 font-bold text-[#3d3d3d] text-[14px] leading-[20px]">
              説明
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-[#e2e4e9] last:border-b-0">
              <td className="align-top px-3 py-3 font-medium text-[#3d3d3d] text-[14px] leading-[20px]">
                {row.label}
              </td>
              <td className="align-top px-3 py-3 text-[#505353] text-[14px] leading-[20px]">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionCard({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`${KATIX_STACK} bg-white drop-shadow-[0px_1px_1px_rgba(61,61,61,0.08)] p-6 rounded-lg w-full`}>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-[#3d3d3d] text-[18px] leading-[26px]">{title}</h2>
        {description ? (
          <p className="text-[#656767] text-[14px] leading-[20px]">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function TokenSwatches() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {designTokens.map((token) => (
        <div
          key={token.name}
          className="border border-[#e2e4e9] flex flex-col gap-2 p-3 rounded-lg min-w-0"
        >
          <div className="flex gap-3 items-center">
            <span
              aria-hidden
              className="border border-[#e2e4e9] h-10 w-10 rounded-md shrink-0"
              style={{ backgroundColor: token.value.startsWith("#") ? token.value : "#f3f4f6" }}
            />
            <div className="min-w-0">
              <p className="font-bold text-[#3d3d3d] text-[14px] leading-[20px] truncate">
                {token.name}
              </p>
              <p className="font-mono text-[#656767] text-[12px] leading-[16px]">{token.value}</p>
            </div>
          </div>
          <p className="text-[#505353] text-[13px] leading-[18px]">{token.usage}</p>
        </div>
      ))}
    </div>
  );
}

function ButtonMatrixPreview() {
  return (
    <div className="w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="px-2 py-2 text-left text-[#656767] text-[12px] font-medium" />
            {buttonStyles.map((style) => (
              <th
                key={style}
                className="px-2 py-2 text-center font-bold text-[#3d3d3d] text-[13px] leading-[18px]"
              >
                {styleLabels[style]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {buttonStates.map((state) => (
            <tr key={state}>
              <td className="px-2 py-3 font-medium text-[#656767] text-[12px] leading-[16px] capitalize">
                {state === "disabled" ? "Disable" : state.charAt(0).toUpperCase() + state.slice(1)}
              </td>
              {buttonStyles.map((style) => (
                <td key={`${style}-${state}`} className="px-2 py-3 text-center">
                  <KatixButton style={style} size="medium" state={state}>
                    Button
                  </KatixButton>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ButtonSizePreview() {
  return (
    <div className="flex flex-wrap gap-4 items-end">
      {buttonSizes.map((size) => (
        <div key={size} className="flex flex-col gap-2 items-center">
          <KatixButton style="primary" size={size}>
            Button
          </KatixButton>
          <span className="text-[#656767] text-[12px] leading-[16px]">{sizeLabels[size]}</span>
        </div>
      ))}
    </div>
  );
}

function SelectionControlPreview() {
  const [radioValue, setRadioValue] = useState<"a" | "b">("a");
  const [checked, setChecked] = useState(true);

  return (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <RadioOption
        selected={radioValue === "a"}
        onSelect={() => setRadioValue("a")}
        label="選択肢 A"
        description="Selection Control with Caption パターン"
      />
      <RadioOption
        selected={radioValue === "b"}
        onSelect={() => setRadioValue("b")}
        label="選択肢 B"
      />
      <SimpleCheckbox
        selected={checked}
        onToggle={() => setChecked((value) => !value)}
        label="チェックボックス"
      />
      <FieldFeedback message="入力内容を確認してください" />
    </div>
  );
}

export function DesignSystemLibrary() {
  return (
    <div className={`${KATIX_STACK} pb-6`}>
      <SectionCard
        title="Design System Audit"
        description={`Figma: ${designSystemSource.fileName}`}
      >
        <a
          href={designSystemSource.figmaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#2a7fff] text-[14px] leading-[20px] underline w-fit"
        >
          Figma で開く
        </a>
      </SectionCard>

      <SectionCard title="Design Tokens" description="再利用可能なカラー・半径トークン">
        <TokenSwatches />
      </SectionCard>

      <SectionCard title="Button" description={buttonComponentIntro}>
        <div className="flex flex-col gap-4 w-full">
          <div>
            <h3 className="font-bold text-[#3d3d3d] text-[15px] leading-[22px] mb-2">Style</h3>
            <AuditTable rows={buttonStyleAudit} />
          </div>
          <div>
            <h3 className="font-bold text-[#3d3d3d] text-[15px] leading-[22px] mb-2">State</h3>
            <AuditTable rows={buttonStateAudit} />
          </div>
          <div>
            <h3 className="font-bold text-[#3d3d3d] text-[15px] leading-[22px] mb-2">
              Preview — Style × State
            </h3>
            <ButtonMatrixPreview />
          </div>
          <div>
            <h3 className="font-bold text-[#3d3d3d] text-[15px] leading-[22px] mb-2">Size</h3>
            <ButtonSizePreview />
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Text Link"
        description="本文内リンク。Help ページなどへの遷移に使用。"
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-6 items-center">
            <KatixTextLink href="/design-system">Text Link</KatixTextLink>
            <span className="inline-flex items-center gap-2 font-medium text-[#1a6fe0] text-[14px] leading-[20px] underline">
              <IconQuestion aria-hidden className="size-4 shrink-0" />
              Text Link
              <ChevronRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            </span>
            <span className="inline-flex items-center gap-2 font-medium text-[#8d9191] text-[14px] leading-[20px] underline">
              <IconQuestion aria-hidden className="size-4 shrink-0" />
              Text Link
              <ChevronRight aria-hidden className="size-4 shrink-0" strokeWidth={2} />
            </span>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        title="Selection Control"
        description="ラジオ・チェックボックス・フィードバック。既存フォームコンポーネントを再利用。"
      >
        <SelectionControlPreview />
      </SectionCard>
    </div>
  );
}
