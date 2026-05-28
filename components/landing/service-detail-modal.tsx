"use client";

import type { Service } from "@/lib/services";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

type ServiceDetailModalProps = {
  service: Service | null;
  onClose: () => void;
};

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  return (
    <Dialog.Root open={!!service} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-black text-white outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <Dialog.Description className="sr-only">
            Detalle del servicio
          </Dialog.Description>
          {service ? (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-center border-b border-white/10 bg-black px-6 py-6 sm:py-8">
                <Dialog.Title className="text-center text-lg font-bold uppercase tracking-[0.12em] text-white sm:text-xl md:text-2xl">
                  {service.title}
                </Dialog.Title>
                <Dialog.Close
                  className="absolute right-4 top-1/2 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-full text-white transition-opacity hover:opacity-70 sm:right-8"
                  aria-label="Cerrar"
                >
                  <X className="size-8 sm:size-9" strokeWidth={1.25} />
                </Dialog.Close>
              </div>

              <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-10 sm:px-10 sm:py-14 lg:max-w-7xl lg:py-20">
                <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:pb-14">
                  <p className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Desafío
                  </p>
                  <p className="text-base leading-relaxed text-white/85 sm:text-lg sm:leading-loose">
                    {service.desafio}
                  </p>
                </div>

                <div className="grid gap-10 py-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:py-14">
                  <p className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Solución
                  </p>
                  <p className="rounded-2xl bg-neutral-900/90 px-6 py-8 text-base leading-relaxed text-white/85 sm:px-8 sm:py-10 sm:text-lg sm:leading-loose">
                    {service.solucion}
                  </p>
                </div>

                <div className="grid gap-10 border-t border-white/10 pt-10 lg:grid-cols-[200px_1fr] lg:gap-16 lg:pt-14">
                  <p className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
                    Resultado
                  </p>
                  <p className="text-base leading-relaxed text-white/85 sm:text-lg sm:leading-loose">
                    {service.resultado}
                  </p>
                </div>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
