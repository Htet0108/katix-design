import { Bike, Car, Layers3 } from "lucide-react";
import {
  KatixDesignMenuBanner,
  KatixDesignMenuItem,
  KatixDesignMenuNav,
  KatixDesignMenuShell,
} from "@/components/katix/katix-design-menu";

const homeMenuItems = [
  {
    href: "/bike-design",
    label: "バイク",
    Icon: Bike,
  },
  {
    href: "/car-design",
    label: "車",
    Icon: Car,
  },
  {
    href: "/design-system",
    label: "デザインシステム",
    Icon: Layers3,
  },
] as const;

export default function KatixHomePage() {
  return (
    <KatixDesignMenuShell>
      <KatixDesignMenuBanner
        title="デザイン確認メニュー"
        subtitle="確認したい画面を選択してください"
      />

      <KatixDesignMenuNav aria-label="デザイン画面一覧">
        {homeMenuItems.map(({ href, label, Icon }) => (
          <KatixDesignMenuItem key={href} href={href} label={label} Icon={Icon} />
        ))}
      </KatixDesignMenuNav>
    </KatixDesignMenuShell>
  );
}
