/** Content sourced from Figma Design System — Button audit (node 3235:42). */

export const designSystemSource = {
  fileName: "Design System",
  fileKey: "vPj9rpEgd6WkYAV4WBKx5o",
  figmaUrl:
    "https://www.figma.com/design/vPj9rpEgd6WkYAV4WBKx5o/Design-System?node-id=3235-42",
} as const;

export type DesignToken = {
  name: string;
  value: string;
  cssVar?: string;
  usage: string;
};

export const designTokens: readonly DesignToken[] = [
  {
    name: "Brand",
    value: "#389656",
    cssVar: "--contents-brand",
    usage: "Primary actions, selected states, key highlights",
  },
  {
    name: "Brand / Hover",
    value: "#6DB978",
    usage: "Primary button hover background",
  },
  {
    name: "Brand / 50",
    value: "#EDF6EE",
    cssVar: "--brand-50",
    usage: "Selected control background, icon badges",
  },
  {
    name: "Link",
    value: "#2A7FFF",
    usage: "Text Link component default color",
  },
  {
    name: "Danger",
    value: "#BD0F0F",
    usage: "Destructive button background",
  },
  {
    name: "Error",
    value: "#D01010",
    cssVar: "--contents-error",
    usage: "Validation feedback, NG labels",
  },
  {
    name: "Neutral / 600",
    value: "#414758",
    cssVar: "--neutral-600",
    usage: "Section banners, dark headers",
  },
  {
    name: "Disabled / BG",
    value: "#E5E6E6",
    usage: "Disabled button background",
  },
  {
    name: "Disabled / Text",
    value: "#8D9191",
    usage: "Disabled button label",
  },
  {
    name: "Radius / Base",
    value: "8px",
    usage: "Buttons, cards, inputs",
  },
] as const;

export type AuditTableRow = {
  label: string;
  description: string;
};

export const buttonStyleAudit: readonly AuditTableRow[] = [
  {
    label: "Primary",
    description:
      "ページ上の主要な行動喚起用。プライマリボタンは、1画面に1つ（または極力1つ）に限定するのが原則。ユーザーに最も取ってほしいアクション（例：「送信」「次へ」「完了」など）を明確に示すために使用する。",
  },
  {
    label: "Secondary",
    description:
      "補助的な行動を促すためのボタン。プライマリボタンに次ぐ重要度を持ち、主に「キャンセル」「戻る」「後で設定」など、補足的な操作に使用する。",
  },
  {
    label: "Danger",
    description:
      "取り消しや削除など、注意が必要な行動に使用する。ユーザーにリスクを伴う操作であることを明確に示し、誤操作を防ぐ目的を持つ。",
  },
  {
    label: "Text",
    description:
      "コンテキスト上で軽い操作を行う際に使用する。「編集」「閉じる」「スキップ」など、画面遷移を伴わない軽い操作で使用。",
  },
  {
    label: "Text Link",
    description:
      "本文や説明文内に組み込むリンクとして使用します。Helpページへの遷移などボタンではなくテキストの一部として扱い、明確にリンクであることが視覚的に分かるようにします。",
  },
] as const;

export const buttonStateAudit: readonly AuditTableRow[] = [
  {
    label: "Default",
    description: "通常状態。ユーザーがまだ操作していない。",
  },
  {
    label: "Hover",
    description: "マウスオーバー中の状態。操作可能であることを視覚的に示す（主にPC）",
  },
  {
    label: "Active",
    description: "押下中（タップ・クリック中）の状態。",
  },
  {
    label: "Disable",
    description: "操作不可な状態。",
  },
] as const;

export const buttonComponentIntro =
  "ボタンはクリック可能な要素であり、アクションをトリガーするために使用されます。ボタンはユーザーに行動喚起を伝え、ユーザーがページを様々な方法で操作できるようにします。ボタンラベルは、ユーザーがボタンを操作したときに発生するアクションを表します。" as const;

export const libraryComponents = [
  {
    id: "button",
    name: "Button",
    figmaNodeId: "3235:42",
    description: buttonComponentIntro,
  },
  {
    id: "text-link",
    name: "Text Link",
    description: "本文内リンク。アイコン付きで遷移先を示すパターン。",
  },
  {
    id: "selection-control",
    name: "Selection Control",
    description: "ラジオ・チェックボックスなど、フォーム内の選択 UI。",
  },
] as const;
