"use client";

import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { TextReveal } from "@/components/motion/text-reveal";
import { SuccessCaseModal } from "@/components/landing/success-case-modal";
import { successCases, type SuccessCase } from "@/lib/success-cases";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";

export function SuccessCollage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selected, setSelected] = useState<SuccessCase | null>(null);

  const preview = useMemo(() => {
    if (hoveredId) {
      return successCases.find((item) => item.id === hoveredId) ?? successCases[0];
    }
    return successCases[0];
  }, [hoveredId]);

  return (
    <section id="proyectos" className="relative z-20 overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal direction="up">
          <div className="mb-10 max-w-2xl">
            <TextReveal
              as="h2"
              text="Casos de éxito"
              className="block text-3xl font-semibold tracking-tight text-white sm:text-4xl"
            />
            <p className="mt-4 text-white/60">
              Pasa el cursor para explorar proyectos. Haz clic para ver el detalle
              de cada empresa.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={120}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
            <div className="grid grid-cols-1 gap-px bg-white/10 sm:h-[520px] sm:grid-cols-3 sm:grid-rows-2 lg:h-[560px]">
              {successCases.map((item) => {
                const isHovered = hoveredId === item.id;
                const isDimmed = hoveredId !== null && !isHovered;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
                    onTouchStart={() => setHoveredId(item.id)}
                    onClick={() => setSelected(item)}
                    className={cn(
                      "group relative min-h-[200px] overflow-hidden bg-black text-left transition-all duration-300 sm:min-h-0 sm:h-full",
                      item.gridClass,
                      isDimmed ? "opacity-50" : "opacity-100",
                      isHovered && "z-10 ring-2 ring-inset ring-[#00aeef]"
                    )}
                  >
                    <ParallaxFrame
                      className="absolute inset-0"
                      innerClassName="relative h-full w-full"
                      strength={isHovered ? 12 : 6}
                      scale={isHovered ? 1.1 : 1.05}
                    >
                      <Image
                        src={item.image}
                        alt={item.company}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </ParallaxFrame>
                    <div
                      className={cn(
                        "absolute inset-0 transition-colors duration-300",
                        isHovered ? "bg-black/15" : "bg-black/30"
                      )}
                    />
                    <div
                      className={cn(
                        "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-3 pb-3 pt-10 transition-opacity duration-300 sm:px-4 sm:pb-4",
                        isHovered ? "opacity-100" : "opacity-0 sm:opacity-0"
                      )}
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00aeef] sm:text-xs">
                        {item.company}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-white">
                        {item.title}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/10 bg-black px-5 py-5 sm:px-7 sm:py-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#00aeef]">
                {preview.company}
              </p>
              <p className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-white sm:text-2xl">
                {preview.title}
              </p>
              <p className="mt-1.5 text-sm text-white/65 sm:text-base">
                {preview.subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <SuccessCaseModal
        successCase={selected}
        onClose={() => setSelected(null)}
      />
    </section>
  );
}
