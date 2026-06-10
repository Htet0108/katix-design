import type { Metadata } from "next";
import KatixDesignSystemLibraryPage from "@/components/KatixDesignSystemLibraryPage";

export const metadata: Metadata = {
  title: "デザインシステム | KATIX",
  description: "KATIX Design System コンポーネント監査と再利用パターン",
};

export default function DesignSystemPage() {
  return <KatixDesignSystemLibraryPage />;
}
