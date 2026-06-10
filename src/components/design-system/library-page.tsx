import { KatixDesignBackLink } from "@/components/shared/katix-design-menu";
import { DesignSystemLibrary } from "@/components/design-system/design-system-library";
import {
  KatixDesignSystemBanner,
  KatixDesignSystemContent,
  KatixDesignSystemShell,
} from "@/components/design-system/katix-design-system-shell";

export default function KatixDesignSystemLibraryPage() {
  return (
    <KatixDesignSystemShell>
      <KatixDesignSystemBanner
        title="コンポーネントライブラリ"
        subtitle="Design System 監査内容と再利用パターン"
      />

      <KatixDesignSystemContent>
        <KatixDesignBackLink />
        <DesignSystemLibrary />
      </KatixDesignSystemContent>
    </KatixDesignSystemShell>
  );
}
