"use client";

import { ParallaxFrame } from "@/components/motion/parallax-frame";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SectionGlow } from "@/components/motion/section-glow";
import { TextReveal } from "@/components/motion/text-reveal";
import { successCases, type SuccessCase } from "@/lib/success-cases";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
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
    <section id="proyectos" className="relative z-20 overflow-hidden border-t border-white/10 bg-black py-16 sm:py-24">
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
        <div className="relative overflow-hidden rounded-2xl border-2 border-black bg-black p-1 shadow-xl">
          <div className="grid grid-cols-1 gap-1 sm:h-[520px] sm:grid-cols-3 sm:grid-rows-2 lg:h-[580px]">
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
                  className={`group relative overflow-hidden bg-black text-left transition-all duration-300 ${item.gridClass} ${
                    isDimmed ? "opacity-45" : "opacity-100"
                  } ${isHovered ? "z-10 ring-2 ring-[#00aeef]" : ""}`}
                >
                  <ParallaxFrame
                    className="absolute inset-0"
                    innerClassName="relative h-full w-full"
                    strength={isHovered ? 14 : 8}
                    scale={isHovered ? 1.14 : 1.08}
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
                    className={`absolute inset-0 bg-black/25 transition-colors duration-300 ${
                      isHovered ? "bg-black/10" : ""
                    }`}
                  />
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3 transition-opacity duration-300 sm:p-4 ${
                      isHovered ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#00aeef]">
                      {item.company}
                    </p>
                    <p className="mt-1 text-sm font-bold text-white sm:text-base">
                      {item.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 sm:p-8">
            <p className="max-w-3xl text-lg font-bold leading-tight text-white sm:text-2xl lg:text-3xl">
              {preview.title}
            </p>
            <p className="mt-1 text-sm text-white/85 sm:text-base">
              {preview.subtitle}
            </p>
          </div>
        </div>
        </ScrollReveal>
      </div>

      <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 text-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
            {selected && (
              <>
                <div className="relative h-52 w-full sm:h-64">
                  <Image
                    src={selected.image}
                    alt={selected.company}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 672px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <Dialog.Close className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70">
                    <X className="size-5" />
                    <span className="sr-only">Cerrar</span>
                  </Dialog.Close>
                </div>
                <div className="p-6 sm:p-8">
                  <Dialog.Title className="text-2xl font-bold tracking-tight text-white">
                    {selected.title}
                  </Dialog.Title>
                  <Dialog.Description className="mt-1 text-white/60">
                    {selected.subtitle} · {selected.company}
                  </Dialog.Description>
                  <p className="mt-4 text-sm leading-relaxed text-white/80">
                    {selected.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selected.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/85"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                  <p className="mt-6 text-sm font-semibold text-[#00aeef]">
                    Año {selected.year}
                  </p>
                </div>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
