import type { Metadata } from "next";
import KatixBikeRegistrationPage from "@/components/bike-design/registration-page";

export const metadata: Metadata = {
  title: "アップロード | バイク | KATIX",
  description: "KATIX バイク写真アップロードフォーム",
};

export default function BikeDesignUploadPage() {
  return <KatixBikeRegistrationPage />;
}
