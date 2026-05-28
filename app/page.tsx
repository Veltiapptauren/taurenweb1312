import { PageEffects } from "@/components/motion/page-effects";
import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { ServicesShowcase } from "@/components/landing/services-showcase";
import { Footer } from "@/components/landing/footer";
import { BrandIntro } from "@/components/landing/brand-intro";
import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { SuccessCollage } from "@/components/landing/success-collage";
import { JsonLd } from "@/components/seo/json-ld";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <PageEffects />
      <main>
        <Hero />
        <BrandIntro />
        <Features />
        <SuccessCollage />
        <ServicesShowcase />
        <Process />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
