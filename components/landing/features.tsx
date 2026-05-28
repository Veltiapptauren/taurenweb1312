"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { ServicesCarousel } from "@/components/landing/services-carousel";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";

export function Features() {
  return (
    <section id="servicios" className="relative z-20 overflow-x-clip border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal direction="up" delay={60}>
          <SectionHeading
            label="Nuestros servicios"
            title="Donde la tecnología y la creatividad se encuentran"
            titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          />
        </ScrollReveal>
        <ServicesCarousel />
      </div>
    </section>
  );
}
