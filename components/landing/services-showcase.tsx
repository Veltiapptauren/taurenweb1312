"use client";

import { ShowreelVideo } from "@/components/landing/showreel-video";
import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { ShineLink } from "@/components/motion/shine-link";
import { TextReveal } from "@/components/motion/text-reveal";
import Image from "next/image";

export function ServicesShowcase() {
  return (
    <section className="relative z-20 overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal direction="up">
          <div id="tauren" className="max-w-2xl scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
              Servicios
            </p>
            <TextReveal
              as="h2"
              text="Producción integral para marcas y empresas"
              className="mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            />
            <p className="mt-4 text-base text-white/60">
              Eventos, contenido audiovisual y podcast con el mismo estándar de
              calidad de principio a fin.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-2 lg:items-stretch">
          <ScrollReveal direction="left" delay={80} className="h-full">
            <ShowreelVideo />
          </ScrollReveal>
          <ScrollReveal direction="right" delay={160} className="h-full">
            <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 sm:min-h-[400px]">
              <ParallaxFrame
                className="absolute inset-0"
                innerClassName="relative h-full min-h-[360px] sm:min-h-[400px]"
                strength={20}
                scale={1.08}
              >
                <Image
                  src="/images/hero-eventos.jpg"
                  alt="Evento corporativo Tauren Pro Eventos"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover brightness-[0.85]"
                />
              </ParallaxFrame>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15" />
              <div className="relative z-10 mt-auto p-6 pb-8 sm:p-8 sm:pb-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
                  Experiencia
                </p>
                <p className="mt-2 max-w-sm text-xl font-semibold leading-snug text-white sm:text-2xl">
                  Más de una década creando experiencias memorables
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/75">
                  Desde la planificación hasta la entrega final de piezas
                  audiovisuales.
                </p>
                <ShineLink
                  href="#contacto"
                  className="mt-5 text-sm font-medium text-[#00aeef] hover:opacity-90"
                >
                  Conversemos tu proyecto →
                </ShineLink>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
