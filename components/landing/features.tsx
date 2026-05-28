"use client";

import { ServicesCarousel } from "@/components/landing/services-carousel";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { TextReveal } from "@/components/motion/text-reveal";

export function Features() {
  return (
    <section id="servicios" className="relative z-20 overflow-x-clip border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal direction="up" delay={60}>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
              Nuestros servicios
            </p>
            <TextReveal
              as="h2"
              text="Donde la tecnología y la creatividad se encuentran"
              className="mt-3 block text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl"
            />
          </div>
        </ScrollReveal>
        <ServicesCarousel />
      </div>
    </section>
  );
}
