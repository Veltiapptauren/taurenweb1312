"use client";

import { ShowreelVideo } from "@/components/landing/showreel-video";
import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { ShineLink } from "@/components/motion/shine-link";
import { TextReveal } from "@/components/motion/text-reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import { services } from "@/lib/services";
import Image from "next/image";

export function Features() {
  return (
    <section id="servicios" className="relative z-20 overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
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

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-stretch">
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

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item, index) => (
            <li key={item.id}>
              <ScrollReveal direction="scale" delay={index * 90}>
                <TiltCard className="h-full">
                <article className="group relative h-[340px] overflow-hidden rounded-xl border border-white/10 bg-neutral-950 sm:h-[380px]">
                  <ParallaxFrame
                    className="absolute inset-0"
                    innerClassName="relative h-full w-full"
                    strength={18}
                    scale={1.1}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover brightness-[0.75] transition-[filter] duration-700 group-hover:brightness-90"
                    />
                  </ParallaxFrame>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 transition-colors duration-500 group-hover:via-black/65" />
                  <div className="absolute inset-x-0 bottom-0 z-10 p-5 pb-6">
                    <span className="text-[10px] font-semibold tracking-widest text-[#00aeef]">
                      {item.number}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold leading-tight text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65 opacity-100 transition-opacity duration-300 lg:opacity-0 lg:group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </article>
                </TiltCard>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
