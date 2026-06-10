import type { Metadata } from "next";
import KatixHomePage from "@/components/top/home-page";

export const metadata: Metadata = {
  title: "デザイン確認メニュー | KATIX",
  description: "KATIX デザイン確認メニュー",
};

export default function Home() {
  return <KatixHomePage />;
}
