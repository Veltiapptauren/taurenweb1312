import { PageEffects } from "@/components/motion/page-effects";
import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { SuccessCollage } from "@/components/landing/success-collage";
import { FaqSection } from "@/components/landing/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <PageEffects />
      <main className="overflow-x-clip">
        <Hero />
        <Features />
        <SuccessCollage />
        <Process />
        <FaqSection />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
