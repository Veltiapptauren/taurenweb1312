"use client";

import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { ShineLink } from "@/components/motion/shine-link";
import { TextReveal } from "@/components/motion/text-reveal";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import Image from "next/image";

export function Cta() {
  return (
    <section id="contacto" className="relative border-t border-white/10 bg-black py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal direction="scale">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[360px]">
            <ParallaxFrame
              className="absolute inset-0"
              innerClassName="relative h-full min-h-[320px] sm:min-h-[360px]"
              strength={24}
              scale={1.1}
            >
              <Image
                src="/images/hero-planning.jpg"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 1152px"
                className="object-cover brightness-[0.5]"
              />
            </ParallaxFrame>
            <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/55" />
            <div className="relative z-10 px-6 py-12 text-center sm:px-10 sm:py-16">
              <TextReveal
                as="h2"
                text="¿Listo para tu próximo evento o producción?"
                className="mx-auto block max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl"
              />
              <p className="mx-auto mt-4 max-w-lg text-white/70">
                Cuéntanos tu proyecto y te respondemos con alcance, tiempos y
                presupuesto.
              </p>
              <ul className="mx-auto mt-5 max-w-lg space-y-1.5 text-sm text-white/55">
                <li>
                  <a
                    href={`tel:${siteConfig.contactPhoneTel}`}
                    className="transition-colors hover:text-white"
                  >
                    {siteConfig.contactPhone}
                  </a>
                </li>
                <li>{siteConfig.contactAddress}</li>
              </ul>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                <ShineLink
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="h-11 rounded-full bg-[#00aeef] px-6 text-sm font-medium text-black hover:opacity-90"
                >
                  {siteConfig.contactEmail}
                </ShineLink>
                <ShineLink
                  href={getWhatsAppUrl()}
                  external
                  className="h-11 rounded-full border border-white/40 px-6 text-sm font-medium text-white hover:bg-white/10"
                >
                  {siteConfig.contactPhone}
                </ShineLink>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
