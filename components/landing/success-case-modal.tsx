"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import { successCases, type SuccessCase, type SuccessCaseGallery } from "@/lib/success-cases";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-6 py-5 sm:px-8 sm:py-6 lg:px-10">
      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/45">
        {label}
      </p>
      <p className="mt-1.5 text-sm font-medium leading-snug text-white/90 sm:text-[15px]">
        {value}
      </p>
    </div>
  );
}

function RichSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-white/10 bg-black px-6 py-10 sm:px-10 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
          {title}
        </p>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

function GalleryImage({
  src,
  alt,
  width,
  height,
  className,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl bg-neutral-950", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={100}
        unoptimized
        sizes="100vw"
        className="block h-auto w-full object-cover"
      />
    </div>
  );
}

function GalleryFill({
  src,
  alt,
  aspect,
  className,
}: {
  src: string;
  alt: string;
  aspect: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-neutral-950", aspect, className)}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        unoptimized
        sizes="(max-width: 1024px) 100vw, 1200px"
        className="object-cover"
      />
    </div>
  );
}

function CaseGallery({
  gallery,
  title,
}: {
  gallery: SuccessCaseGallery;
  title: string;
}) {
  return (
    <div className="border-t border-white/10 bg-black px-6 py-8 sm:px-10 sm:py-10 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-3 sm:gap-4">
        <GalleryFill src={gallery.wide} alt={`${title} - panel y audiencia`} aspect="aspect-[1024/439]" />
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-2">
          <GalleryFill src={gallery.left} alt={`${title} - coffee break`} aspect="aspect-[1024/682]" />
          <GalleryFill src={gallery.right} alt={`${title} - conversatorio`} aspect="aspect-[1024/682]" />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-[1369fr_676fr]">
          <GalleryFill src={gallery.smallLeft} alt={`${title} - ponente`} aspect="aspect-[1369/630]" />
          <GalleryFill src={gallery.smallRight} alt={`${title} - transmisión`} aspect="aspect-[676/630]" />
        </div>
      </div>
    </div>
  );
}

type SuccessCaseModalProps = {
  successCase: SuccessCase | null;
  onClose: () => void;
  onSelect: (successCase: SuccessCase) => void;
};

type CurtainPhase = "idle" | "drop" | "hold" | "exit" | "done";

const DROP_MS = 1150;
const HOLD_MS = 400;
const EXIT_MS = 750;

function HeroOverlay({
  indexLabel,
  title,
  titleLines,
  subtitle,
}: {
  indexLabel: string | null;
  title: string;
  titleLines?: string[];
  subtitle: string;
}) {
  const lines = titleLines ?? [title];

  return (
    <>
      <div className="absolute bottom-20 left-4 sm:bottom-24 sm:left-8 lg:bottom-28 lg:left-14">
        <div className="max-w-[56rem] drop-shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
          {indexLabel ? (
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/75">
              {indexLabel}
            </span>
          ) : null}
          <Dialog.Title className="mt-3 text-[1.35rem] font-black uppercase leading-[0.9] tracking-[-0.02em] text-white sm:mt-4 sm:text-[2.35rem] md:text-[2.75rem] lg:text-[3.05rem]">
            {lines.map((line) => (
              <span key={line} className="block sm:whitespace-nowrap">
                {line}
              </span>
            ))}
          </Dialog.Title>
          <p className="mt-3 max-w-3xl text-sm font-semibold leading-snug text-white/75 sm:mt-4 sm:text-base lg:text-lg">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-1 text-white/70">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">
          Desliza
        </span>
        <span className="text-sm">↓</span>
      </div>
    </>
  );
}

function BackPill({ onClose }: { onClose: () => void }) {
  return (
    <Dialog.Close
      onClick={onClose}
      className="fixed left-4 top-20 z-[95] inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/75 transition-opacity hover:opacity-85 sm:left-8"
      aria-label="Volver a casos de éxito"
    >
      <span className="inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-black/30 backdrop-blur">
        <ArrowLeft className="size-4" strokeWidth={2} />
      </span>
      Casos de éxito
    </Dialog.Close>
  );
}

export function SuccessCaseModal({ successCase, onClose, onSelect }: SuccessCaseModalProps) {
  const [phase, setPhase] = useState<CurtainPhase>("idle");
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!successCase) {
      setPhase("idle");
      return;
    }

    setPhase("drop");
    document.body.style.overflow = "hidden";
    contentRef.current?.scrollTo({ top: 0 });

    const holdTimer = setTimeout(() => setPhase("hold"), DROP_MS);
    const exitTimer = setTimeout(() => setPhase("exit"), DROP_MS + HOLD_MS);
    const doneTimer = setTimeout(
      () => setPhase("done"),
      DROP_MS + HOLD_MS + EXIT_MS
    );

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, [successCase]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setPhase("idle");
      onClose();
    }
  };

  const showCurtain =
    phase === "drop" || phase === "hold" || phase === "exit";
  const isOpen = !!successCase;
  const caseIndex = successCase
    ? successCases.findIndex((item) => item.id === successCase.id)
    : -1;
  const indexLabel =
    caseIndex >= 0
      ? `${String(caseIndex + 1).padStart(2, "0")}/${String(successCase!.indexTotal).padStart(2, "0")}`
      : null;
  const nextCase =
    successCase && caseIndex >= 0
      ? successCases[(caseIndex + 1) % successCases.length]
      : null;
  const nextIndexLabel =
    nextCase && caseIndex >= 0
      ? `${String(((caseIndex + 1) % successCases.length) + 1).padStart(2, "0")}/${String(successCase!.indexTotal).padStart(2, "0")}`
      : null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        {isOpen ? (
          <Dialog.Content ref={contentRef} className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-black text-white outline-none">
            <Dialog.Description className="sr-only">
              Detalle del caso de éxito
            </Dialog.Description>

            <BackPill onClose={onClose} />

            <div className="w-full">
              <div className="relative h-screen min-h-[560px] w-full">
                <Image
                  src={successCase!.image}
                  alt={successCase!.company}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

                <HeroOverlay
                  indexLabel={indexLabel}
                  title={successCase!.title}
                  titleLines={successCase!.titleLines}
                  subtitle={successCase!.subtitle}
                />
              </div>

              <div className="w-full border-t border-white/10 bg-[#111111]">
                <div className="grid grid-cols-1 divide-y divide-white/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
                  <MetaItem label="Cliente" value={successCase!.client} />
                  <MetaItem label="Año" value={successCase!.year} />
                  <MetaItem label="Ubicación" value={successCase!.location} />
                  <MetaItem
                    label="Soluciones"
                    value={successCase!.services.join("-")}
                  />
                </div>
              </div>
            </div>

            <div className="mx-auto w-full max-w-6xl px-6 py-8 sm:px-10 sm:py-10">
              <div className="grid gap-10 py-10 lg:grid-cols-[1fr_320px] lg:items-start">
                <p className="max-w-3xl text-sm leading-relaxed text-white/85 sm:text-base sm:leading-loose lg:text-lg">
                  {successCase!.description}
                </p>
                <div className="space-y-10 lg:pt-1">
                  {successCase!.stats.map((stat) => {
                      const plus = stat.value.endsWith("+");
                      const base = plus ? stat.value.slice(0, -1) : stat.value;
                      return (
                        <div key={stat.label}>
                          <p className="text-5xl font-extrabold leading-none text-white sm:text-6xl">
                            {base}
                            {plus ? <span className="text-[#ff3b30]">+</span> : null}
                          </p>
                          <p className="mt-3 max-w-[240px] text-xs leading-snug text-white/60 sm:text-sm">
                            {stat.label}
                          </p>
                        </div>
                      );
                  })}
                </div>
              </div>
            </div>

            <CaseGallery gallery={successCase!.gallery} title={successCase!.title} />

            <RichSection title="EL DESAFIO">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
                    DESAFIO
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base sm:leading-loose lg:text-lg">
                    {successCase!.desafio}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
                    NUESTRA SOLUCIÓN
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base sm:leading-loose lg:text-lg">
                    {successCase!.solucion}
                  </p>
                </div>
              </div>
            </RichSection>

            <div className="border-t border-white/10 bg-black">
              {successCase!.gallery.device ? (
                <div className="px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
                  <div className="mx-auto w-full max-w-6xl">
                    <GalleryImage
                      src={successCase!.gallery.device}
                      alt={`${successCase!.title} - entrega multiformato`}
                      width={1024}
                      height={432}
                    />
                  </div>
                </div>
              ) : null}

              <div className="px-6 pb-12 sm:px-10 sm:pb-14 lg:px-12">
                <div className="mx-auto w-full max-w-6xl">
                  <div className="grid gap-10 border-t border-white/10 pt-10 sm:pt-12 lg:grid-cols-[220px_1fr] lg:gap-14">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/55">
                        REFLEXIONES FINALES
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/75 sm:text-base sm:leading-loose lg:text-lg">
                      {successCase!.reflexiones}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {nextCase ? (
              <div className="border-t border-white/10 bg-black">
                <button
                  type="button"
                  onClick={() => onSelect(nextCase)}
                  className="group relative block w-full overflow-hidden bg-black text-left"
                  aria-label="Abrir siguiente caso de éxito"
                >
                  <div className="relative h-[62vh] min-h-[420px] w-full">
                    <Image
                      src={nextCase.image}
                      alt={nextCase.company}
                      fill
                      sizes="100vw"
                      priority={false}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/35" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-16 left-4 sm:bottom-20 sm:left-8 lg:bottom-24 lg:left-14">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/65">
                        Siguiente proyecto
                      </p>
                      <p className="mt-3 max-w-3xl text-[1.5rem] font-black uppercase leading-[0.92] tracking-[-0.02em] text-white sm:text-[2.2rem] md:text-[2.55rem] lg:text-[2.85rem]">
                        {nextCase.title}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm font-semibold leading-snug text-white/70 sm:text-base lg:text-lg">
                        {nextCase.subtitle}
                      </p>
                      {nextIndexLabel ? (
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
                          {nextIndexLabel}
                        </p>
                      ) : null}
                    </div>

                    <span className="absolute right-4 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/25 text-white/90 backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.04] sm:right-8 lg:right-14">
                      <ArrowUpRight className="size-5" strokeWidth={2} />
                    </span>
                  </div>
                </button>
              </div>
            ) : null}

          </Dialog.Content>
        ) : null}
        {showCurtain ? (
          <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center bg-[#02172d] will-change-[transform,opacity]",
                phase === "drop" && "animate-curtain-drop-down",
                phase === "exit" && "animate-curtain-vanish"
              )}
            >
              <TaurenLogo href={undefined} imageClassName="h-14 sm:h-16" />
            </div>
          </div>
        ) : null}
      </Dialog.Portal>
    </Dialog.Root>
  );
}
