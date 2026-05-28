"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import type { SuccessCase } from "@/lib/success-cases";
import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type SuccessCaseModalProps = {
  successCase: SuccessCase | null;
  onClose: () => void;
};

type CurtainPhase = "idle" | "drop" | "hold" | "exit" | "done";

const DROP_MS = 1150;
const HOLD_MS = 400;
const EXIT_MS = 750;

export function SuccessCaseModal({ successCase, onClose }: SuccessCaseModalProps) {
  const [phase, setPhase] = useState<CurtainPhase>("idle");

  useEffect(() => {
    if (!successCase) {
      setPhase("idle");
      return;
    }

    setPhase("drop");
    document.body.style.overflow = "hidden";

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

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        {isOpen ? (
          <Dialog.Content className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-black text-white outline-none">
            <Dialog.Description className="sr-only">
              Detalle del caso de éxito
            </Dialog.Description>
            <div className="sticky top-0 z-10 flex items-center justify-center border-b border-white/10 bg-black px-6 py-6 sm:py-8">
              <Dialog.Title className="max-w-4xl text-center text-lg font-bold uppercase tracking-[0.1em] text-white sm:text-xl md:text-2xl">
                {successCase!.title}
              </Dialog.Title>
              <Dialog.Close
                className="absolute right-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 sm:right-8"
                aria-label="Cerrar"
              >
                <X className="size-8 sm:size-9" strokeWidth={1.25} />
              </Dialog.Close>
            </div>

            <div className="relative h-[38vh] min-h-[260px] w-full sm:min-h-[320px] lg:min-h-[380px]">
              <Image
                src={successCase!.image}
                alt={successCase!.company}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-10 sm:py-14 lg:max-w-7xl lg:py-20">
              <div className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:pb-14">
                <p className="text-center text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-left lg:text-4xl">
                  Cliente
                </p>
                <div className="text-center lg:text-left">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
                    {successCase!.company}
                  </p>
                  <p className="mt-2 text-lg text-white/80 sm:text-xl">
                    {successCase!.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid gap-8 py-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:py-14">
                <p className="text-center text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-left lg:text-4xl">
                  Proyecto
                </p>
                <p className="text-center text-base leading-relaxed text-white/85 sm:text-lg sm:leading-loose lg:text-left">
                  {successCase!.description}
                </p>
              </div>

              <div className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:pt-14">
                <p className="text-center text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-left lg:text-4xl">
                  Servicios
                </p>
                <div className="rounded-2xl bg-neutral-900/90 px-6 py-8 sm:px-8 sm:py-10">
                  <ul className="flex flex-wrap justify-center gap-3 lg:justify-start">
                    {successCase!.services.map((service) => (
                      <li
                        key={service}
                        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
                      >
                        {service}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-8 text-center text-sm font-semibold uppercase tracking-widest text-[#00aeef] lg:text-left">
                    Año {successCase!.year}
                  </p>
                </div>
              </div>
            </div>
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
