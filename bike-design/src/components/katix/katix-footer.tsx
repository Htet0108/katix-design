import Link from "next/link";
import {
  KATIX_FOOTER_INNER,
  KATIX_FOOTER_OUTER,
} from "@/lib/katix-layout";
import { assets } from "@/lib/figma-assets";

const footerLinkClass =
  "text-[14px] leading-[20px] font-medium text-white hover:text-white/80 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2";

const footerNavColumns = [
  [
    { label: "出品の始め方ガイド", href: "#" },
    { label: "よくあるご質問", href: "#" },
    { label: "取引の流れ", href: "#" },
    { label: "参画業者募集", href: "#" },
    { label: "会社紹介", href: "#" },
  ],
  [
    { label: "撮影の仕方", href: "#" },
    { label: "利用料について", href: "#" },
    { label: "売上金・振込について", href: "#" },
    { label: "ご利用規約", href: "#" },
  ],
] as const;

export function KatixFooter() {
  return (
    <footer className={`${KATIX_FOOTER_OUTER} bg-[#121212]`} data-name="Footer">
      <div className={KATIX_FOOTER_INNER}>
        <nav
          aria-label="フッターナビゲーション"
          className="grid grid-cols-2 gap-x-8 gap-y-3 w-full"
        >
          {footerNavColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-3 min-w-0">
              {column.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className={footerLinkClass}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="mt-8 mb-6 flex justify-center">
          <img
            alt="KATIX"
            className="h-8 w-auto max-w-full object-contain"
            src={assets.logoKatixFooter}
          />
        </div>

        <p className="text-center text-[12px] leading-[16px] text-white/80">
          Copyright © bike.katix.co.jp
        </p>
      </div>
    </footer>
  );
}
