# カチエックス フロントエンド 実装ガイド

このドキュメントは、カチエックスの **フロントエンド共通の実装ガイドライン** です。
弊社の社内フロントエンド担当と、UI のコード納品をお願いしているデザインパートナー様の **両方** に読んでいただくことを想定しています。

書いてある内容は「こうしておくと、後で本体コード（`apps/user` / `apps/top`）に組み込みやすい／メンテナンスしやすい」というチームの合意事項です。
完璧に守るというより、**迷ったときの拠り所**として活用してもらえれば嬉しいです。

> **最終更新: 2026-04-20**
> 内容に違和感があれば気軽に相談・PR をください。ガイドはチームで育てていく前提です。

---

## 目次

1. [このドキュメントの読み方](#1-このドキュメントの読み方)
2. [スコープ（作るもの／作らないもの）](#2-スコープ作るもの作らないもの)
3. [採用技術スタック](#3-採用技術スタック)
4. [クイックスタート](#4-クイックスタート)
5. [共通コンポーネントカタログ](#5-共通コンポーネントカタログ)
6. [スタイリングのお作法](#6-スタイリングのお作法)
7. [ファイル配置・命名](#7-ファイル配置命名)
8. [アクセシビリティの目安](#8-アクセシビリティの目安)
9. [納品 / マージ前のセルフチェック](#9-納品--マージ前のセルフチェック)
10. [気をつけたいポイント集](#10-気をつけたいポイント集)
11. [FAQ](#11-faq)

---

## 1. このドキュメントの読み方

| 読み手 | 主に見るところ |
|---|---|
| 社内フロントエンド担当 | §3 スタック・§5 共通コンポーネント・§6 スタイリング・§7 ファイル配置 |
| デザインパートナー様 | §2 スコープ・§4 クイックスタート・§5 共通コンポーネント・§9 セルフチェック |
| 初参加・オンボーディング中 | §4 クイックスタートを上から順にひととおり |

**強制ではなく合意事項**として書いています。デザインや要件の都合でガイドから外れたい場合は、いったん相談いただけると助かります（「こうしたいけど OK ですか？」で十分です）。

---

## 2. スコープ（作るもの／作らないもの）

### 作るもの
- **静的な UI（ハリボテ）**。Figma デザインと同じ見た目・文言・レイアウトを再現したページ／コンポーネント。
- 画面内で完結する **UI 状態**（モーダルの開閉、タブ切替、ラジオ／チェックの選択、アコーディオン展開など）。`useState` 等で気軽に実装してください。
- `lucide-react` アイコン、プレースホルダー画像の配置。

### 作らないもの
（パートナー様の納品スコープからは外れますが、社内担当が後から足すフェーズです）

- API 連携、サーバーコンポーネント内の `fetch` / DB アクセス
- フォームバリデーション、エラーメッセージ分岐ロジック
- 認証・認可・権限制御
- SEO メタデータの精緻な作り込み（暫定タイトルだけで OK）
- 国際化（`next-intl` 等）
- テスト（ユニット／E2E は社内側で追加します）

### 画面ごとの実装対象デザイン

| ページ | Figma リンク |
|---|---|
| トップ | `TODO: 発注時に窓口から共有` |
| 査定アップロード | `TODO: 発注時に窓口から共有` |
| （以降、発注ごとに追記） | |

---

## 3. 採用技術スタック

社内 (`apps/user` / `apps/top`) と揃える前提で、以下のバージョン帯を**おすすめの基準**としています。
`@latest` で入れると Tailwind v4 や shadcn `base-nova` に切り替わってしまい、本体コードと噛み合わなくなることが多いので、**できればバージョンを指定して**入れていただけると助かります。

| 種別 | パッケージ | 推奨バージョン | メモ |
|---|---|---|---|
| Runtime | Node.js | **20.x** | `.nvmrc` を置いておくと安心 |
| Framework | `next` | **16.x**（`16.0.10` 以降） | App Router / `src/` ディレクトリ |
| | `react` / `react-dom` | **19.x** | |
| CSS | `tailwindcss` | **3.4.x** | v4 は本体と非互換のため、ここでは v3 系を採用しています |
| | `@tailwindcss/typography` | ^0.5.16 | |
| | `tailwindcss-animate` | ^1.0.7 | v4 系の `tw-animate-css` ではなくこちら |
| UI | `shadcn` (CLI) | **2.x**（`2.4.x` 動作確認済み） | `devDependencies` に入れておけば OK |
| | shadcn/ui スタイル | **`default`**（Radix UI ベース） | 本体と揃えるためこちらを使います |
| | `@radix-ui/*` | shadcn が自動で追加 | |
| Icon | `lucide-react` | **^0.474.0** | 本体側と合わせるため |
| Util | `class-variance-authority` | ^0.7.1 | shadcn が自動追加 |
| | `clsx` | ^2.1.1 | |
| | `tailwind-merge` | **^2.6.0** | shadcn `default` 系と組み合わせる前提 |
| Lang | `typescript` | ^5 | |

### なぜ揃えたいのか

- Tailwind v3 と v4 では **CSS 変数の書き方**（`hsl(var(--primary))` か、直接 `hsl(...)` か）が異なり、トークン運用がそのまま移植できません。
- shadcn の `default` （Radix）と `base-nova` （Base UI）は **`<Button>` / `<Tabs>` 等の API 自体が違います**（`asChild` vs `render`、`TabsTrigger` vs `Tabs.Tab` など）。
- 本体側に取り込む際、揃っていれば**ほぼコピペで動く**状態を目指せるので、レビューもラクになります。

> 別のバージョンで進めたい事情がある場合は遠慮なく相談ください。事情を伺ったうえで、本体側を寄せるか／このガイドを更新するかを一緒に決めましょう。

---

## 4. クイックスタート

### 4-1. プロジェクト作成

```bash
npx create-next-app@16 my-katix-ui \
  --typescript --tailwind --eslint --app --src-dir \
  --import-alias "@/*"
cd my-katix-ui
```

生成直後に Tailwind を **v3 に固定**しておきます（2026 年現在、`create-next-app` は v4 を入れてくるため）。

```bash
npm uninstall tailwindcss @tailwindcss/postcss
npm install -D tailwindcss@^3.4 postcss@^8 autoprefixer@^10
npx tailwindcss init -p
```

> Node のバージョン固定が必要なら `.nvmrc` に `20` と書いておくと便利です（任意）。

### 4-2. shadcn/ui を初期化

```bash
npx shadcn@2.4.1 init --defaults \
  --style=default \
  --base-color=slate \
  --css-variables
```

完了後、`components.json` が以下に近い形になっていれば OK です。
もし `style` が `base-nova` になっていたら、上のコマンドの `--style=default` が効いていない可能性が高いので、もう一度実行してみてください。

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

### 4-3. `src/app/globals.css` を以下で上書き

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 0 1.96% 10%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --primary: 139 46% 40.4%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 0 1.96% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --input: 214.3 31.8% 91.4%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --destructive: 0 100% 50%;
    --destructive-foreground: 210 40% 98%;
    --ring: 215 20.2% 65.1%;
    --radius: 0.5rem;
    --primary-hover: 139 39% 58%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

> ブランドカラーは**緑系**（`--primary: 139 46% 40.4%` ＝ `hsl(139, 46%, 40.4%)`）です。
> 値は**数値のみ**を CSS 変数に入れ、Tailwind 側で `hsl(var(--primary))` とラップする形式にしています（v3 系の標準的なやり方です）。

### 4-4. `tailwind.config.ts` を以下で上書き

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        midnight: "#2c3e50",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
}

export default config
```

### 4-5. Tailwind プラグインをインストール

```bash
npm install @tailwindcss/typography@^0.5.16 tailwindcss-animate@^1.0.7
```

### 4-6. shadcn/ui コンポーネントを追加

実装で使いそうなものを最初にまとめて入れておくと、その後がスムーズです。
（足りなくなったら都度 `add` で追加してください）

```bash
npx shadcn@2.4.1 add button card separator badge tabs dialog radio-group checkbox input textarea label
```

アイコンは **`lucide-react`**（shadcn/ui 初期化時に自動インストール済み）を使ってください。

### 4-7. `src/app/layout.tsx` を整備

フォントは **Inter / Geist のどちらでも構いません**。プロジェクト内で 1 種類に統一されていれば OK です。

```tsx
import type { Metadata } from "next"
import { Inter } from "next/font/google" // または: import { Geist } from "next/font/google"
import "./globals.css"

const font = Inter({ subsets: ["latin"] })
// const font = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "カチエックス",
  description: "カチエックス - バイク／車の一括査定・買取サービス",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className="h-full">
      <body className={`${font.className} min-h-full flex flex-col`}>
        {children}
      </body>
    </html>
  )
}
```

> **メモ**: 本体コード (`apps/user`) は現在 Inter を使っています。Geist を採用した場合は、本体取り込み時に揃える可能性があります。

### 4-8. 起動確認

```bash
npm run dev
```

`http://localhost:3000` で初期ページが開けば準備完了です。

---

## 5. 共通コンポーネントカタログ

以下の共通パーツは、**1 箇所で実装して使い回す**形にしておくと、後の修正が一気に楽になります。

### 5-1. `src/components/common/header.tsx`

全ページで使う共通ヘッダー。
ロゴ（`K` バッジ + `KATIX` テキスト）と、PC では CTA 2 種（「バイクを売る」「相場をチェック」）、モバイルではハンバーガーメニュー。

```tsx
import { Header } from "@/components/common"
<Header />
```

### 5-2. `src/components/common/footer.tsx`

全ページで使う共通フッター。ロゴ表示有無は `logo` プロップで切り替え。
リンク項目は Figma に従ってください。**ページごとに項目を変えない**ことだけ揃えておくと、後の修正が一箇所で済みます。

```tsx
import { Footer } from "@/components/common"
<Footer logo={true} />
```

### 5-3. `src/components/common/badge-required.tsx` / `badge-optional.tsx`

フォーム項目ラベル用の「必須」「任意」バッジ。
`photo-section` / `document-section` / `vehicle-info-section` などで何度も使うので、共通化しておくと重複実装を避けられます。

```tsx
import { BadgeRequired, BadgeOptional } from "@/components/common"
{required ? <BadgeRequired /> : <BadgeOptional />}
```

### 5-4. `src/components/common/vehicle-image-placeholder.tsx`

車両写真が未設定のときのプレースホルダ。
`bg-muted` のグラデ背景 + `lucide-react` の `Bike`（または `Car`）アイコン。**絵文字を使わない**原則の見本にもなっています。

### 5-5. `src/components/common/index.ts`

バレル export は**このファイルだけ**で行います（`custom/**/index.ts` は作らない方針）。
理由は、ツリーシェイクが効きやすく、import 元が一意で把握しやすくなるためです。

```ts
export { Header } from "./header"
export { Footer } from "./footer"
export { BadgeRequired } from "./badge-required"
export { BadgeOptional } from "./badge-optional"
export { VehicleImagePlaceholder } from "./vehicle-image-placeholder"
```

---

## 6. スタイリングのお作法

### 6-1. 絵文字は使わない

絵文字は **UI コード・コメント・ドキュメント文言のいずれにも使わない** 方針です。

- 画像の代替として絵文字を置くのは避け、写真がある箇所は `next/image` で実画像を、未着手の場合は `VehicleImagePlaceholder` などで表現してください。
- プレースホルダーは `lucide-react` のアイコン、単色の矩形、`bg-muted` などの装飾、または「画像準備中」のようなテキストで表現します。

### 6-2. 色はセマンティックトークンで

`bg-primary`, `text-foreground`, `border-border` などのトークンを優先して使ってください。16 進やハードコード `hsl()` の直接指定はできるだけ避けたいです。

```tsx
// 良い例
<div className="bg-primary/10 text-primary border border-primary" />

// 避けたい例
<div className="bg-[#40A260]" />
<svg fill="hsl(139, 46%, 40.4%)" />
```

#### 透明度はスラッシュ記法で

```tsx
<div className="bg-primary/5 border-primary/30" />
```

`hsl(var(--primary) / 0.15)` のように CSS で組み立てると、Tailwind v3/v4 で挙動差が出やすいので、**Tailwind クラス側のスラッシュ記法**（`/5` `/10` `/20` …）の方が扱いやすいです。

#### SVG の色は `currentColor` で

インライン SVG の色は、`fill` / `stroke` に色を直書きせず、**`currentColor` を使い、親に `text-primary` などを付けて制御**するのがおすすめです。

```tsx
// 良い例
<span className="text-primary">
  <svg viewBox="0 0 24 24" fill="currentColor">...</svg>
</span>

// 避けたい例
<svg fill="hsl(139, 46%, 40.4%)" stroke="#bababa" />
```

### 6-3. レスポンシブは「スマホ / PC」の 2 区分

レスポンシブは **モバイルファースト**で、**スマホ（デフォルト）と PC（`lg:` = 1024px）の 2 区分**を基本にしています。
モバイルのデザイン基準幅は **iPhone 相当の 375〜430px** あたりを想定してください。

```tsx
{/* スマホ: 縦積み → PC: 横並び */}
<div className="flex flex-col lg:flex-row gap-4">

{/* スマホ: 非表示 → PC: 表示 */}
<nav className="hidden lg:flex">

{/* スマホ: 表示 → PC: 非表示 */}
<button className="block lg:hidden">
```

- `sm:` / `md:` を補助的に使うのは OK です。
- できれば `sm: → md: → lg:` の 3 段並列指定は避け、`lg:` を主軸にしておくと差分が読みやすくなります。

### 6-4. メインカラムの最大幅

全ページ通して `max-w-[1080px] mx-auto px-4` を基本にしておくと、レイアウトのズレが減ります。
スマホでより狭く見せたい場合も、`max-w-[430px]` のような独自幅を入れず、`px-4` で十分な余白を確保する形がおすすめです。

### 6-5. クラス結合

`cn()` は shadcn/ui の初期化で `src/lib/utils.ts` に自動生成されます。条件付きクラスの結合に使ってください。

```tsx
import { cn } from "@/lib/utils"

<div className={cn("rounded-lg border", isActive && "border-primary")} />
```

### 6-6. shadcn/ui コンポーネントの上書き

- **`className` で `variant` の配色（`bg-*` / `hover:bg-*` / `text-*`）を打ち消す形は、できれば避けたい**です。後から variant 自体を見直したいときに、上書きが点在していると追いきれなくなります。
- 打ち消したくなる場面が出てきたら、`ui/*.tsx` 側に新しい variant を追加するか、`components/custom/` にラッパーを置く方向で相談してください。
- レイアウト系の上書き（`w-full`, `mt-4`, `px-6` など）は気にせず使って大丈夫です。

---

## 7. ファイル配置・命名

```
src/
├── app/
│   ├── layout.tsx                 # ルートレイアウト
│   ├── globals.css                # CSS 変数・テーマ定義
│   └── [feature]/
│       ├── layout.tsx             # セクション共通レイアウト（Header / Footer）
│       └── page.tsx               # ページ本体
├── components/
│   ├── ui/                        # shadcn/ui プリミティブ（Button, Card 等）。基本は手で直接編集しない
│   ├── common/                    # 全画面共通（Header, Footer, Badge*, Placeholder 等）
│   │   └── index.ts               # バレル export はここだけ
│   └── custom/
│       └── [feature]/             # 画面ごとのコンポーネント（index.ts は作らない方針）
└── lib/
    └── utils.ts                   # cn() 等（shadcn/ui が自動生成）
```

- **ファイル名**: kebab-case（例: `car-model-input.tsx`）
- **コンポーネント名**: PascalCase（例: `CarModelInput`）
- バレル export（`index.ts`）は `components/common/index.ts` のみ。`custom/**` には作らない方針です。
- `constants/` `hooks/` `types/` は、静的 UI の範囲では基本的に作らなくて大丈夫です。モックデータはコンポーネントファイル内にベタ書きで OK（後から外出し／API 化は社内で対応します）。

### セクション共通レイアウトの例

`app/upload/layout.tsx`:

```tsx
import { Header, Footer } from "@/components/common"

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      {children}
      <Footer logo />
    </>
  )
}
```

`app/upload/page.tsx`:

```tsx
export default function UploadPage() {
  return (
    <main className="flex-1 bg-muted">
      <div className="max-w-[1080px] mx-auto px-4 py-6">
        {/* ページコンテンツ */}
      </div>
    </main>
  )
}
```

> ページ内で `<Header />` / `<Footer />` を独自に書き起こすと差分が分散しがちです。`layout.tsx` から共通コンポーネントを差し込む形に揃えておくと、変更が一箇所で済みます。

---

## 8. アクセシビリティの目安

静的 UI の段階でも、以下のあたりを意識しておくと、後の手戻りが少なくなります。

### 8-1. フォーム系

- ラジオ／チェックボックスは shadcn/ui の **`<RadioGroup>` / `<Checkbox>`** を使うのがおすすめです。
  `<button>` で見た目だけ真似ると、キーボード操作やスクリーンリーダー対応で後から作り直しになりがちです。
- `<input>` / `<textarea>` / `<select>` には `<label>` または `aria-label` を添えてください。
- 必須／任意は `BadgeRequired` / `BadgeOptional` を使い、`<label>` との関連付けは `htmlFor` で書いておくと安心です。

### 8-2. モーダル

- shadcn/ui の **`<Dialog>`** を使うのがおすすめです。
  自作 `<div role="dialog">` でも見た目は出せますが、`Esc` 閉じやフォーカストラップの実装が必要になり、結構な手間になります。

### 8-3. 画像

- 装飾目的の画像は `alt=""`（空文字）で OK。
- 意味を持つ画像は、日本語で内容が伝わる alt を書いてください（例: `alt="右前から見た車両写真のサンプル"`）。
- ロゴは `alt="KATIX"` で揃えています。

### 8-4. アイコンのみのボタン

- `aria-label` を添えてください（例: ハンバーガー → `aria-label="メニューを開く"`）。

---

## 9. 納品 / マージ前のセルフチェック

リリース／納品の前に、以下をざっと確認してもらえると、後工程がスムーズです。
社内でも PR 出す前のセルフチェックとして使ってください。

### 9-1. チェックリスト

- [ ] `npm run build` がエラーなく完了する
- [ ] `npm run lint` がエラーなく完了する
- [ ] 全ページが `http://localhost:3000` で表示され、コンソールにエラーが出ていない
- [ ] 絵文字・色リテラル直書きが無い（下のコマンドで確認）
- [ ] `components.json` の `"style"` が `"default"` / `package.json` の `tailwindcss` が **3.x**
- [ ] Header / Footer が全ページ `layout.tsx` 経由で挿入されている
- [ ] ラジオ／チェックボックス／モーダルが shadcn/ui で実装されている

### 9-2. 機械チェック用コマンド

```bash
# 絵文字・色リテラル混入チェック
rg -n "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src
rg -n "fill=\"#|fill=\"hsl|stroke=\"#|stroke=\"hsl" src
```

### 9-3. 納品形式（パートナー様向け）

- **zip でお渡しいただければ OK** です。
- 容量節約のため、以下は含めずに送っていただけると助かります。
  - `node_modules/` / `.next/` / `*.tsbuildinfo` / `.env*`
- `package-lock.json` は、同じバージョンを再現するために**含めて**ください。
- `README.md` に **起動手順**（`npm ci && npm run dev`）と **対応ページ一覧** があると、受け入れがスムーズです。

---

## 10. 気をつけたいポイント集

過去に実際に発生した「あとで直すのが大変だったパターン」の備忘録です。
新規実装時もコードレビュー時も、思い出すヒントになれば。

### 10-1. スタックまわり

- `tailwindcss@4.x` を入れてしまう
- `globals.css` に `@import "tailwindcss";` / `@theme inline` が混入
- `components.json` の `"style"` が `"base-nova"` になっている
- `@base-ui/react` / `tw-animate-css` が依存に入る
- `lucide-react` のメジャーが `^1.x`（本体と互換性が取れません）

### 10-2. shadcn/ui の使い方

- `<Button className="bg-primary hover:bg-primary-hover ...">` のように variant の背景・ホバー色を `className` で打ち消している
- `<Button>` に `size="xs"` / `size="icon-xs"` 等を渡している（`default` style には存在しないサイズです）

### 10-3. 自作で代替してしまう

- `<button onClick={...}>` でラジオ／チェックボックスの見た目を自作（a11y 対応がごっそり抜けがち）
- `<div role="dialog">` で自作モーダル（`Esc` 閉じ・フォーカストラップが未実装になりがち）
- `BadgeRequired` / `BadgeOptional` / `RadioOption` を 2 箇所以上で重複定義

### 10-4. 色

- SVG に `fill="#..."` / `fill="hsl(...)"` を直書き（`currentColor` を使う）
- `hsl(var(--primary) / 0.15)` のような透明度表現（Tailwind の `bg-primary/15` を使う）
- JS 文字列で色を条件分岐（例: `activeStep >= 1 ? "#40A260" : "#bababa"` → `text-primary` / `text-muted-foreground` を切り替える）

### 10-5. レイアウト

- ページ内で `<Header />` / `<Footer />` を独自実装（`layout.tsx` から差す）
- `max-w-[430px]` など独自のモバイル最大幅を入れる
- `sm: md: lg:` の 3 段並列指定

### 10-6. リポジトリ衛生

- `node_modules/` / `.next/` が Git にコミットされている
- `README.md` が `create-next-app` の初期状態のまま

---

## 11. FAQ

**Q. `useState` を使った UI 状態管理は OK ですか？**
A. もちろん OK です。モーダル開閉、タブ切替、ラジオ選択など「画面内で閉じる状態」は `useState` で気軽に実装してください。API 通信や永続化は実装不要です。

**Q. shadcn/ui の variant にない配色を使いたいときは？**
A. まずは窓口に相談ください。デザインの意図を踏まえて、`variant` を追加するか、`components/custom/` にラッパーを作るかを一緒に決められればと思います。

**Q. フォントは Geist でも OK ですか？**
A. OK です。Inter / Geist のどちらでも構いません。**プロジェクト内で 1 種類に統一**されていれば大丈夫です（本体側の取り込み時に揃える可能性はあります）。

**Q. 画像の実画像が無い場合は？**
A. `VehicleImagePlaceholder` を使うか、`bg-muted` の矩形 + テキスト「画像準備中」で表現してください。絵文字は使わないでください。

**Q. ダークモードの実装は？**
A. 今のところ不要です。`tailwind.config.ts` に `darkMode: ["class"]` はありますが、`dark:` クラスを新たに書く必要はありません。

**Q. 他のアイコンライブラリを使いたい**
A. 原則 `lucide-react` で揃えています。デザインに合うアイコンが見つからない場合は相談ください。

**Q. Next.js 16 の情報が少なくて不安です**
A. `apps/user` / `apps/top` も同じ 16 系で動いています。App Router 前提・`app/layout.tsx`・`app/page.tsx` のファイル構成さえ守れば、Pages Router 時代との差はそれほど大きくありません。詰まったら `node_modules/next/dist/docs/` を覗いたり、窓口で相談してください。

**Q. ガイドに書かれている方針と違うやり方をしたい**
A. 大歓迎です。理由を添えて相談ください。チームで検討して、ガイド側を更新するか／個別対応するかを決めましょう。
