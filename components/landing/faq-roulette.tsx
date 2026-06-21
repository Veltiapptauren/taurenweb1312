"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { seoFaqs } from "@/lib/seo-services";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 6500;
const SWIPE_THRESHOLD = 50;

type FaqRouletteProps = {
  visible?: boolean;
  className?: string;
};

export function FaqRoulette({ visible = true, className }: FaqRouletteProps) {
  const reduced = usePrefersReducedMotion();
  const total = seoFaqs.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragX, setDragX] = useState(0);

  const dragRef = useRef({ startX: 0 });
  const timerRef = useRef<number | null>(null);

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => {
    if (reduced || paused || !visible || dragging) return;
    timerRef.current = window.setInterval(next, AUTO_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [reduced, paused, visible, dragging, next]);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = { startX: e.clientX };
    setDragging(true);
    setPaused(true);
    setDragX(0);
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging) return;
      setDragX(e.clientX - dragRef.current.startX);
    },
    [dragging]
  );

  const finishDrag = useCallback(() => {
    if (!dragging) return;
    if (dragX < -SWIPE_THRESHOLD) next();
    else if (dragX > SWIPE_THRESHOLD) prev();
    setDragX(0);
    setDragging(false);
    window.setTimeout(() => setPaused(false), 1200);
  }, [dragging, dragX, next, prev]);

  const slideShift = dragging ? dragX * 0.12 : 0;

  return (
    <div
      className={cn(className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !dragging && setPaused(false)}
    >
      <SectionHeading
        label="Preguntas frecuentes"
        title="Todo lo que necesitas saber"
        description="Desliza hacia los lados o deja que avance solo"
        titleClassName="text-xl sm:text-2xl"
        className="mb-2"
      />

      <div className="relative mx-auto mt-12 w-full max-w-3xl px-4 sm:mt-14">
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={prev}
            className="hidden shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors hover:border-white/20 hover:text-white sm:flex sm:size-11"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div
            className="relative min-h-[300px] flex-1 overflow-hidden rounded-3xl border border-white/8 bg-gradient-to-b from-white/[0.04] via-transparent to-transparent touch-pan-y select-none cursor-grab active:cursor-grabbing sm:min-h-[320px]"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            style={{ transform: slideShift ? `translateX(${slideShift}px)` : undefined }}
          >
            {seoFaqs.map((faq, index) => {
              const isActive = index === active;
              return (
                <article
                  key={faq.question}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center px-7 py-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 sm:py-12",
                    isActive
                      ? "pointer-events-auto translate-x-0 opacity-100"
                      : "pointer-events-none translate-x-6 opacity-0"
                  )}
                  aria-hidden={!isActive}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#00aeef]/90">
                    Pregunta
                  </p>
                  <h3 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-xl sm:leading-9">
                    {faq.question}
                  </h3>
                  <div className="my-6 h-px w-full bg-gradient-to-r from-[#00aeef]/30 via-white/10 to-transparent sm:my-7" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Respuesta
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-[15px] sm:leading-8">
                    {faq.answer}
                  </p>
                </article>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            className="hidden shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/50 transition-colors hover:border-white/20 hover:text-white sm:flex sm:size-11"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={prev}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60"
            aria-label="Anterior"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={next}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60"
            aria-label="Siguiente"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
