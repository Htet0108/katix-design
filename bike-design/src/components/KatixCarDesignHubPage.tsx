import {
  KatixDesignBackLink,
  KatixDesignMenuBanner,
  KatixDesignMenuItem,
  KatixDesignMenuNav,
  KatixDesignMenuShell,
} from "@/components/katix/katix-design-menu";

export default function KatixCarDesignHubPage() {
  return (
    <KatixDesignMenuShell>
      <KatixDesignMenuBanner
        title="車"
        subtitle="確認したい画面を選択してください"
      />

      <KatixDesignMenuNav aria-label="車画面一覧">
        <KatixDesignBackLink />
        <KatixDesignMenuItem href="/car-design/upload" label="傷サビ凹み" marker={1} />
      </KatixDesignMenuNav>
    </KatixDesignMenuShell>
  );
}
