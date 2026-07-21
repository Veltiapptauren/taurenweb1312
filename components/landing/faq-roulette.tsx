"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { seoFaqs } from "@/lib/seo-services";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const AUTO_MS = 6500;

export function FaqRoulette({
  visible = true,
  className,
}: {
  visible?: boolean;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const total = seoFaqs.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const faq = seoFaqs[active];

  const goTo = (index: number) => setActive(((index % total) + total) % total);

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = window.setInterval(() => goTo(active + 1), AUTO_MS);
    return () => clearInterval(id);
  }, [reduced, paused, visible, active, total]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <SectionHeading
        label="Preguntas frecuentes"
        title="Todo lo que necesitas saber"
        description="Selecciona una pregunta para ver su respuesta."
        titleClassName="text-xl sm:text-2xl"
        className="mb-8 sm:mb-10"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-5 lg:grid-cols-[minmax(15rem,0.85fr)_minmax(0,1.55fr)] lg:gap-8">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
            Explora las preguntas
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-2 lg:h-[360px] lg:flex-col lg:gap-2 lg:overflow-y-auto lg:overflow-x-hidden lg:pr-2"
            role="tablist"
            aria-label="Preguntas frecuentes"
          >
            {seoFaqs.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.question}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => goTo(index)}
                  className={cn(
                    "group flex min-w-[13rem] items-center gap-3 border px-4 py-3 text-left transition-colors lg:min-h-[76px] lg:min-w-0 lg:px-5",
                    isActive
                      ? "border-[#00aeef]/60 bg-[#00aeef]/10 text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "text-[10px] font-semibold tracking-[0.2em]",
                      isActive ? "text-[#00aeef]" : "text-white/30"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="line-clamp-2 flex-1 text-xs font-medium leading-snug sm:text-sm">
                    {item.question}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-4 shrink-0",
                      isActive ? "text-[#00aeef]" : "opacity-0 group-hover:opacity-50"
                    )}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden border border-white/[0.1]">
            <div className="relative min-h-[180px] sm:min-h-[210px]">
              <Image
                src="/images/hero-eventos.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
              <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00aeef]">
                  Pregunta
                </p>
                <h3 className="mt-3 max-w-2xl text-xl font-semibold leading-snug text-white sm:text-2xl">
                  {faq.question}
                </h3>
              </div>
            </div>
            <div className="border-t border-white/[0.08] bg-black px-6 py-7 sm:px-10 sm:py-8 lg:px-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                Respuesta
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-[15px] sm:leading-8">
                {faq.answer}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="mr-auto text-[10px] font-medium uppercase tracking-[0.2em] text-white/35">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              className="flex size-10 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-[#00aeef]/50 hover:text-[#00aeef]"
              aria-label="Pregunta anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              className="flex size-10 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-[#00aeef]/50 hover:text-[#00aeef]"
              aria-label="Siguiente pregunta"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
