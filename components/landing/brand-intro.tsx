"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { brandIntroParagraphs } from "@/lib/brand-intro";

export function BrandIntro() {
  return (
    <section className="relative border-t border-white/10 bg-black py-8 sm:py-10">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <ScrollReveal direction="up">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00aeef]">
            Tauren Pro Eventos
          </p>
          <div className="mx-auto mt-3 h-px w-10 bg-[#00aeef]/40" aria-hidden />
          <div className="mt-4 space-y-3">
            {brandIntroParagraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-white/50 sm:text-[14px] sm:leading-6"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
