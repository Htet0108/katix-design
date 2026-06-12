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
    { label: "運営会社", href: "#" },
    { label: "個人情報保護方針", href: "#" },
  ],
  [
    { label: "利用規約", href: "#" },
    { label: "参画業者募集", href: "#" },
  ],
] as const;

export function KatixFooter() {
  return (
    <footer className={`${KATIX_FOOTER_OUTER} bg-[#121212]`} data-name="Footer">
      <div className={KATIX_FOOTER_INNER}>
        <nav
          aria-label="フッターナビゲーション"
          className="grid grid-cols-2 gap-x-8 gap-y-3 w-fit mx-auto"
        >
          {footerNavColumns.map((column, columnIndex) => (
            <ul key={columnIndex} className="flex flex-col gap-3 items-center min-w-0">
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
