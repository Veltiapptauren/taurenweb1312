import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cielo-serif",
});

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function ProbadorVirtualLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${cormorant.variable} font-sans [&_.font-serif]:font-[family-name:var(--font-cielo-serif)]`}>
      {children}
    </div>
  );
}
