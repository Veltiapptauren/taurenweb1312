"use client";

import { BrandIntro } from "@/components/landing/brand-intro";
import { SectionHeading } from "@/components/landing/section-heading";
import { ServicesCarousel } from "@/components/landing/services-carousel";
import { ServicesSeoSection } from "@/components/landing/services-seo-section";
import { SectionGlow } from "@/components/motion/section-glow";

export function Features() {
  return (
    <section
      id="servicios"
      className="relative z-20 overflow-x-clip border-t border-white/10 bg-black py-8 sm:py-16 lg:py-20"
    >
      <SectionGlow />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <BrandIntro className="pb-10 sm:pb-14 lg:pb-16" />

        <div className="border-t border-white/10 pt-10 sm:pt-16 lg:pt-20">
          <SectionHeading
            label="Nuestros servicios"
            title="Soluciones para eventos corporativos"
            description="Streaming, producción integral, audiovisual, desarrollo web y apps móviles con un solo equipo."
            titleClassName="text-xl sm:text-3xl lg:text-4xl"
            className="mb-6 px-1 sm:mb-12"
          />
          <div className="pt-4 sm:pt-14 lg:pt-16">
            <ServicesCarousel />
          </div>
        </div>

        <ServicesSeoSection />
      </div>
    </section>
  );
}
