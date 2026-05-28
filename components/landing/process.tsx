"use client";

import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { SectionHeading } from "@/components/landing/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import Image from "next/image";

const steps = [
  {
    step: "01",
    title: "Brief & estrategia",
    text: "Definimos objetivos, audiencia y formato del evento o pieza audiovisual.",
    image: "/images/cases/case-1.jpg",
  },
  {
    step: "02",
    title: "Producción",
    text: "Planificación, rodaje, montaje o ejecución en terreno con equipo experto.",
    image: "/images/cases/case-2.jpg",
  },
  {
    step: "03",
    title: "Post & entrega",
    text: "Edición, color, sonido y adaptación para cada canal de difusión.",
    image: "/images/cases/case-4.jpg",
  },
  {
    step: "04",
    title: "Medición",
    text: "Reporte de resultados, aprendizajes y optimización para la próxima campaña.",
    image: "/images/cases/case-5.jpg",
  },
];

export function Process() {
  return (
    <section id="proceso" className="relative overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal direction="up">
          <SectionHeading
            title="Cómo trabajamos"
            description="Un proceso claro para eventos, video y podcast."
          />
        </ScrollReveal>
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <li key={item.step}>
              <ScrollReveal direction="up" delay={index * 100}>
                <TiltCard maxTilt={5}>
                <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950">
                  <ParallaxFrame
                    className="relative h-36 w-full"
                    innerClassName="relative h-36 w-full"
                    strength={18}
                    scale={1.15}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover brightness-75 transition-[filter] duration-500 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 to-transparent" />
                  </ParallaxFrame>
                  <div className="p-5">
                    <span className="text-xs font-semibold tracking-widest text-[#00aeef]">
                      {item.step}
                    </span>
                    <h3 className="mt-2 font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.text}
                    </p>
                  </div>
                </article>
                </TiltCard>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
