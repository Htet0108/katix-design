"use client";

import type { ReactNode } from "react";
import { IconWarningCircle } from "@/components/shared/icons";
import {
  IconCheckboxChecked,
  IconCheckboxOutline,
  IconRadioChecked,
  IconRadioUnchecked,
} from "@/components/shared/icons";

const SELECTED_BOX =
  "bg-[#edf6ee] border-[#389656]";
const UNSELECTED_BOX = "bg-white border-[#e2e4e9]";
const SELECTED_TEXT = "text-[#389656]";
const UNSELECTED_TEXT = "text-[#3d3d3d]";

export function FieldFeedback({ message }: { message: string }) {
  return (
    <div
      role="alert"
      className="bg-[#fae7e7] flex gap-1 items-center px-1 py-1.5 rounded w-full"
      data-name="feedback"
    >
      <IconWarningCircle className="shrink-0 text-[#d01010]" size={20} />
      <p className="flex-1 text-[13px] font-medium text-[#d01010] leading-normal tracking-[-0.6px]">
        {message}
      </p>
    </div>
  );
}

export function FormTextarea({
  value,
  onChange,
  placeholder,
  className = "",
  hasError = false,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  hasError?: boolean;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`block h-[104px] min-h-[104px] w-full resize-y rounded border border-solid bg-white px-[16px] py-[12px] text-[14px] text-[#3d3d3d] outline-none placeholder:text-[#8d9191] leading-[20px] shrink-0 ${
        hasError ? "border-[#d01010]" : "border-[#e2e4e9]"
      } ${className}`}
      data-name="Text area"
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    />
  );
}

export function RadioOption({
  selected,
  onSelect,
  label,
  description,
  className = "",
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  description?: string;
  className?: string;
}) {
  const hasDescription = Boolean(description);
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`cursor-pointer border border-solid content-stretch flex gap-[8px] w-full shrink-0 text-left ${
        hasDescription ? "items-center px-[16px] py-[10px]" : "items-center px-[16px] py-[12px]"
      } relative rounded-lg ${selected ? SELECTED_BOX : UNSELECTED_BOX} ${className}`}
      data-name="Selection Control"
    >
      {selected ? (
        <IconRadioChecked className="size-6 shrink-0 text-[#389656]" />
      ) : (
        <IconRadioUnchecked className="size-6 shrink-0 text-[#8d9191]" />
      )}
      <span
        className={`flex flex-[1_0_0] flex-col min-w-px ${
          hasDescription ? "gap-[2px] items-start justify-center" : "justify-center"
        }`}
      >
        <span
          className={`font-medium ${hasDescription ? "leading-[24px] text-[16px]" : "leading-[20px] text-[14px]"} ${
            selected ? SELECTED_TEXT : UNSELECTED_TEXT
          }`}
        >
          {label}
        </span>
        {description && (
          <span className="block leading-[20px] text-[14px] font-normal text-[#656767]">
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

export function RadioOptionWithDetail({
  selected,
  onSelect,
  label,
  hint,
  placeholder,
  detailValue,
  onDetailChange,
  detailError,
}: {
  selected: boolean;
  onSelect: () => void;
  label: string;
  hint: string;
  placeholder: string;
  detailValue: string;
  onDetailChange: (value: string) => void;
  detailError?: string;
}) {
  if (!selected) {
    return (
      <RadioOption selected={false} onSelect={onSelect} label={label} />
    );
  }

  return (
    <div
      className={`border border-solid content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative rounded-lg shrink-0 w-full ${SELECTED_BOX}`}
      data-name="Selection Control"
    >
      <button
        type="button"
        onClick={onSelect}
        className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full text-left"
      >
        <IconRadioChecked className="size-6 shrink-0 text-[#389656]" />
        <span className={`leading-[20px] text-[14px] font-medium ${SELECTED_TEXT}`}>
          {label}
        </span>
      </button>
      <p className="leading-[20px] text-[14px] font-normal text-[#3d3d3d] w-full">
        {hint}
      </p>
      <FormTextarea
        value={detailValue}
        onChange={onDetailChange}
        placeholder={placeholder}
        hasError={Boolean(detailError)}
      />
      {detailError && <FieldFeedback message={detailError} />}
    </div>
  );
}

export function SimpleCheckbox({
  selected,
  onToggle,
  label,
  className = "",
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`cursor-pointer border border-solid content-stretch flex gap-[8px] items-center px-[16px] py-[12px] relative rounded-lg shrink-0 w-full text-left ${
        selected ? SELECTED_BOX : UNSELECTED_BOX
      } ${className}`}
      data-name="Selection Control"
    >
      {selected ? (
        <IconCheckboxChecked className="size-6 shrink-0 text-[#389656]" />
      ) : (
        <IconCheckboxOutline className="size-6 shrink-0 text-[#8d9191]" />
      )}
      <span
        className={`block leading-[20px] text-[14px] font-medium flex-1 ${
          selected ? SELECTED_TEXT : UNSELECTED_TEXT
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function DetailCheckbox({
  selected,
  onToggle,
  label,
  description,
  placeholder,
  detailValue,
  onDetailChange,
  detailError,
}: {
  selected: boolean;
  onToggle: () => void;
  label: string;
  description: ReactNode;
  placeholder: string;
  detailValue: string;
  onDetailChange: (value: string) => void;
  detailError?: string;
}) {
  if (!selected) {
    return (
      <SimpleCheckbox selected={false} onToggle={onToggle} label={label} />
    );
  }

  return (
    <div
      className={`border border-solid content-stretch flex flex-col gap-[8px] items-start justify-center px-[16px] py-[12px] relative rounded-lg shrink-0 w-full ${SELECTED_BOX}`}
      data-name="Selection Control"
    >
      <button
        type="button"
        onClick={onToggle}
        className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full text-left"
      >
        <IconCheckboxChecked className="size-6 shrink-0 text-[#389656]" />
        <span className={`leading-[20px] text-[14px] font-medium ${SELECTED_TEXT}`}>
          {label}
        </span>
      </button>
      <div className="text-[14px] font-normal text-[#3d3d3d] w-full whitespace-pre-wrap leading-[20px]">
        {description}
      </div>
      <FormTextarea
        value={detailValue}
        onChange={onDetailChange}
        placeholder={placeholder}
        hasError={Boolean(detailError)}
      />
      {detailError && <FieldFeedback message={detailError} />}
    </div>
  );
}

export function FieldLabel({
  title,
  required = false,
  optional = false,
  hint,
}: {
  title: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
}) {
  return (
    <>
      <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
        <p className="leading-[24px] text-[16px] font-bold text-[#3d3d3d] whitespace-nowrap">
          {title}
        </p>
        {required && (
          <div className="bg-[#fae7e7] flex items-center justify-center overflow-clip px-2 py-0.5 relative rounded shrink-0">
            <span className="leading-[16px] text-[12px] font-bold text-[#d01010]">必須</span>
          </div>
        )}
        {optional && !required && (
          <div className="bg-[#e2e4e9] flex items-center justify-center overflow-clip px-2 py-0.5 relative rounded shrink-0">
            <span className="leading-[16px] text-[12px] font-bold text-[#1c1f26]">任意</span>
          </div>
        )}
      </div>
      {hint && (
        <p className="leading-[20px] text-[14px] font-medium text-[#656767] w-full">
          {hint}
        </p>
      )}
    </>
  );
}
