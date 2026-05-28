"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { brandIntroParagraphs } from "@/lib/brand-intro";

export function BrandIntro() {
  return (
    <section className="relative border-t border-white/10 bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal direction="up">
          <div className="max-w-3xl border-l border-[#00aeef]/25 pl-5 sm:pl-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00aeef]">
              Tauren Pro Eventos
            </p>
            <div className="mt-4 space-y-4">
              {brandIntroParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-white/50 sm:text-[15px] sm:leading-7"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
