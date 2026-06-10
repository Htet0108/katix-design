import type { Metadata } from "next";
import KatixCarRegistrationPage from "@/components/car-design/registration-page";

export const metadata: Metadata = {
  title: "アップロード | 車 | KATIX",
  description: "KATIX 車写真アップロードフォーム",
};

export default function CarDesignUploadPage() {
  return <KatixCarRegistrationPage />;
}
