import { PageEffects } from "@/components/motion/page-effects";
import { Cta } from "@/components/landing/cta";
import { Features } from "@/components/landing/features";
import { ServicesShowcase } from "@/components/landing/services-showcase";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { SuccessCollage } from "@/components/landing/success-collage";
import { FaqSection } from "@/components/landing/faq-section";
import { JsonLd } from "@/components/seo/json-ld";
import { getAbsoluteUrl, siteConfig } from "@/lib/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es-CL",
    type: "website",
    images: [
      {
        url: getAbsoluteUrl(siteConfig.ogImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — streaming y eventos corporativos`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [getAbsoluteUrl(siteConfig.ogImage)],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <PageEffects />
      <main>
        <Hero />
        <Features />
        <SuccessCollage />
        <ServicesShowcase />
        <Process />
        <FaqSection />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
