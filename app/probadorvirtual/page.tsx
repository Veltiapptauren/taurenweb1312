import { VirtualFitting } from "@/components/cielo-milano/virtual-fitting";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Probador virtual · Cielo Milano",
  description: "Probador virtual de alta moda para Cielo Milano, Milano.",
  robots: { index: false, follow: false },
};

export default function ProbadorVirtualPage() {
  return <VirtualFitting />;
}
