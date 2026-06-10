import type { Metadata } from "next";
import KatixBikeDesignHubPage from "@/components/bike-design/hub-page";

export const metadata: Metadata = {
  title: "バイク | KATIX",
  description: "KATIX バイクデザイン確認メニュー",
};

export default function BikeDesignPage() {
  return <KatixBikeDesignHubPage />;
}
