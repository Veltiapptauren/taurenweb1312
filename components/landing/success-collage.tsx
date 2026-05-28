"use client";

import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { SectionHeading } from "@/components/landing/section-heading";
import { SuccessCaseModal } from "@/components/landing/success-case-modal";
import { successCases, type SuccessCase } from "@/lib/success-cases";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMemo, useState } from "react";

function CaseThumb({
  item,
  active,
  onHover,
  onClick,
}: {
  item: SuccessCase;
  active: boolean;
  onHover: () => void;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      onClick={onClick}
      className={cn(
        "group relative min-h-[120px] overflow-hidden rounded-xl border bg-black text-left transition-all duration-300 sm:min-h-[150px] lg:min-h-[170px]",
        active
          ? "border-[#00aeef]/60 opacity-100 ring-2 ring-[#00aeef]/25"
          : "border-white/10 opacity-55 hover:opacity-90"
      )}
    >
      <Image
        src={item.image}
        alt={item.company}
        fill
        sizes="(max-width: 1024px) 50vw, 20vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/35" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#00aeef]">
          {item.company}
        </p>
        <p className="mt-0.5 line-clamp-1 text-xs font-semibold text-white">
          {item.title}
        </p>
      </div>
    </button>
  );
}

export function SuccessCollage() {
  const [activeId, setActiveId] = useState(successCases[0].id);
  const [selected, setSelected] = useState<SuccessCase | null>(null);

  const featured = useMemo(
    () => successCases.find((item) => item.id === activeId) ?? successCases[0],
    [activeId]
  );

  return (
    <section id="proyectos" className="relative z-20 overflow-hidden border-t border-white/10 bg-black py-20 sm:py-28">
      <SectionGlow />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <ScrollReveal direction="up">
          <div className="mb-8 border-b border-white/10 pb-6 sm:mb-10">
            <SectionHeading
              title="Casos de éxito"
              description="Pasa el cursor para explorar. Haz clic para ver el detalle completo."
              badge="Proyectos destacados"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="scale" delay={100}>
          <div className="space-y-3 sm:space-y-4">
            <button
              type="button"
              onClick={() => setSelected(featured)}
              className="group relative block w-full overflow-hidden rounded-2xl border border-white/10 text-left transition-colors hover:border-[#00aeef]/40"
            >
              <div className="relative min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]">
                <ParallaxFrame
                  className="absolute inset-0"
                  innerClassName="relative h-full min-h-[300px] sm:min-h-[420px] lg:min-h-[540px]"
                  strength={16}
                  scale={1.06}
                >
                  <Image
                    key={featured.id}
                    src={featured.image}
                    alt={featured.company}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </ParallaxFrame>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
                    {featured.company}
                  </p>
                  <p className="mt-3 max-w-4xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    {featured.title}
                  </p>
                  <p className="mt-2 text-sm text-white/70 sm:text-base lg:text-lg">
                    {featured.subtitle}
                  </p>
                  <span className="mt-5 inline-flex text-xs font-medium uppercase tracking-widest text-white/50 transition-colors group-hover:text-[#00aeef]">
                    Ver proyecto →
                  </span>
                </div>
              </div>
            </button>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-5">
              {successCases.map((item) => (
                <CaseThumb
                  key={item.id}
                  item={item}
                  active={activeId === item.id}
                  onHover={() => setActiveId(item.id)}
                  onClick={() => {
                    setActiveId(item.id);
                    setSelected(item);
                  }}
                />
              ))}
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
