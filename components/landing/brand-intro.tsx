"use client";

import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { brandIntroParagraphs } from "@/lib/brand-intro";
import { cn } from "@/lib/utils";

type BrandIntroProps = {
  className?: string;
};

export function BrandIntro({ className }: BrandIntroProps) {
  return (
    <ScrollReveal direction="up" className={cn("mx-auto max-w-3xl text-center", className)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00aeef]">
        Tauren Pro Eventos
      </p>
      <div className="mx-auto mt-4 h-px w-10 bg-[#00aeef]/40" aria-hidden />
      <div className="mt-5 space-y-4">
        {brandIntroParagraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="text-sm leading-relaxed text-white/50 sm:text-[15px] sm:leading-7"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </ScrollReveal>
  );
}
