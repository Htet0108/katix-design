import {
  KatixDesignBackLink,
  KatixDesignMenuBanner,
  KatixDesignMenuItem,
  KatixDesignMenuNav,
  KatixDesignMenuShell,
} from "@/components/shared/katix-design-menu";

export default function KatixBikeDesignHubPage() {
  return (
    <KatixDesignMenuShell>
      <KatixDesignMenuBanner
        title="バイク"
        subtitle="確認したい画面を選択してください"
      />

      <KatixDesignMenuNav aria-label="バイク画面一覧">
        <KatixDesignBackLink />
        <KatixDesignMenuItem
          href="/bike-design/upload"
          label="アップロードページ"
          marker={1}
        />
      </KatixDesignMenuNav>
    </KatixDesignMenuShell>
  );
}
