import type { Metadata } from "next";
import KatixCarDesignHubPage from "@/components/car-design/hub-page";

export const metadata: Metadata = {
  title: "車 | KATIX",
  description: "KATIX 車デザイン確認メニュー",
};

export default function CarDesignPage() {
  return <KatixCarDesignHubPage />;
}
