"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { seoFaqs } from "@/lib/seo-services";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total]
  );

  const select = useCallback(
    (index: number) => {
      setPaused(true);
      goTo(index);
    },
    [goTo]
  );

  useEffect(() => {
    if (reduced || paused || !visible) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [reduced, paused, visible, total]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <SectionHeading
        label="Preguntas frecuentes"
        title="Todo lo que necesitas saber"
        description="Selecciona una pregunta para ver su respuesta."
        titleClassName="text-xl sm:text-2xl"
        className="mb-8 sm:mb-10"
      />

      <div className="mx-auto w-full max-w-6xl lg:hidden">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
            {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => select(active - 1)}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors active:scale-95"
              aria-label="Pregunta anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => select(active + 1)}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors active:scale-95"
              aria-label="Siguiente pregunta"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2.5" role="list">
          {seoFaqs.map((item, index) => {
            const isActive = index === active;
            return (
              <div
                key={item.question}
                role="listitem"
                className={cn(
                  "overflow-hidden rounded-2xl border transition-colors",
                  isActive
                    ? "border-[#00aeef]/55 bg-[#00aeef]/10"
                    : "border-white/10 bg-white/[0.02]"
                )}
              >
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => select(index)}
                  className="flex w-full items-start gap-3 px-4 py-4 text-left"
                >
                  <span
                    className={cn(
                      "mt-0.5 text-[11px] font-semibold tracking-[0.14em]",
                      isActive ? "text-[#00aeef]" : "text-white/30"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "min-w-0 flex-1 text-sm font-semibold leading-snug",
                      isActive ? "text-white" : "text-white/65"
                    )}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-0.5 size-4 shrink-0 transition-transform duration-300",
                      isActive ? "rotate-180 text-[#00aeef]" : "text-white/30"
                    )}
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out",
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 px-4 pb-4 pt-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
                        Respuesta
                      </p>
                      <p className="mt-2.5 text-sm leading-relaxed text-white/70">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mx-auto hidden w-full max-w-6xl gap-8 lg:grid lg:grid-cols-[minmax(15rem,0.85fr)_minmax(0,1.55fr)]">
        <div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">
            Explora las preguntas
          </p>
          <div
            className="flex h-[360px] flex-col gap-2 overflow-y-auto pr-2"
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
                  onClick={() => select(index)}
                  className={cn(
                    "group flex min-h-[76px] items-center gap-3 border px-5 py-3 text-left transition-colors",
                    isActive
                      ? "border-[#00aeef]/60 bg-[#00aeef]/10 text-white"
                      : "border-white/[0.08] bg-white/[0.02] text-white/55 hover:border-white/20 hover:text-white"
                  )}
                >
                  <span
                    className={cn(
                      "text-[11px] font-semibold tracking-[0.16em]",
                      isActive ? "text-[#00aeef]" : "text-white/30"
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="line-clamp-2 flex-1 text-sm font-medium leading-snug">
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

        <div>
          <div className="overflow-hidden border border-white/[0.1]">
            <div className="relative min-h-[210px]">
              <Image
                src="/images/hero-eventos.jpg"
                alt=""
                fill
                sizes="800px"
                className="object-cover"
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/30" />
              <div className="relative z-10 px-10 py-10 lg:px-12">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00aeef]">
                  Pregunta
                </p>
                <h3 className="mt-3 max-w-2xl text-2xl font-semibold leading-snug text-white">
                  {faq.question}
                </h3>
              </div>
            </div>
            <div className="border-t border-white/[0.08] bg-black px-10 py-8 lg:px-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                Respuesta
              </p>
              <p className="mt-3 max-w-2xl text-[15px] leading-8 text-white/65">
                {faq.answer}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <span className="mr-auto text-[11px] font-medium uppercase tracking-[0.16em] text-white/35">
              {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => select(active - 1)}
              className="flex size-11 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-[#00aeef]/50 hover:text-[#00aeef]"
              aria-label="Pregunta anterior"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => select(active + 1)}
              className="flex size-11 items-center justify-center border border-white/10 text-white/60 transition-colors hover:border-[#00aeef]/50 hover:text-[#00aeef]"
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
