"use client";

import type { Service } from "@/lib/services";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import type { ReactNode } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

type ServiceDetailModalProps = {
  service: Service | null;
  onClose: () => void;
};

function PlatformIcons() {
  const icons = [
    {
      label: "LinkedIn",
      path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2 M2 9h4v12H2z M4 4a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
    },
    {
      label: "Facebook",
      path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
    },
    {
      label: "YouTube",
      path: "M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z M9.75 15.02V8.98L15.5 12l-5.75 3.02z",
    },
    {
      label: "Twitch",
      path: "M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7",
    },
    {
      label: "X",
      path: "M4 4l6.5 8.5L4 20h2.5l5-6.5L16 20h6l-7-9 6.5-7H19l-4.5 5.5L10 4H4z",
    },
  ];

  return (
    <div className="flex items-center justify-center gap-6 border-t border-white/10 bg-black py-4 sm:gap-8 sm:py-5">
      {icons.map((icon) => (
        <svg
          key={icon.label}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5 text-white/80 sm:size-6"
          aria-hidden
        >
          <path d={icon.path} />
        </svg>
      ))}
    </div>
  );
}

function InfoRow({
  label,
  children,
  highlighted = false,
}: {
  label: string;
  children: ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 border-b border-white/10 px-6 py-8 sm:grid-cols-[180px_1fr] sm:gap-10 sm:px-10 sm:py-10 lg:px-16 lg:py-12 ${
        highlighted ? "bg-neutral-900/80" : "bg-black"
      }`}
    >
      <p className="text-xl font-bold uppercase tracking-tight text-white sm:text-2xl lg:text-3xl">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-white/85 sm:text-base sm:leading-loose lg:text-lg">
        {children}
      </p>
    </div>
  );
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const hero = service?.images[0];
  const gridLeft = service?.images[1];
  const gridRight = service?.images[2];
  const bottom = service?.images[3];

  return (
    <Dialog.Root open={!!service} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={`${montserrat.className} fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-black text-white outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
        >
          <Dialog.Description className="sr-only">
            Detalle del servicio
          </Dialog.Description>
          {service ? (
            <>
              <div className="sticky top-0 z-10 flex items-center justify-center border-b border-white/10 bg-neutral-950 px-6 py-5 sm:py-6">
                <Dialog.Title className="text-center text-sm font-bold uppercase tracking-[0.18em] text-white sm:text-base md:text-lg">
                  {service.modalTitle}
                </Dialog.Title>
                <Dialog.Close
                  className="absolute right-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-70 sm:right-8"
                  aria-label="Cerrar"
                >
                  <X className="size-7 sm:size-8" strokeWidth={1.25} />
                </Dialog.Close>
              </div>

              {hero ? (
                <div className="relative aspect-[21/9] w-full min-h-[200px] sm:min-h-[280px] lg:min-h-[360px]">
                  <Image
                    src={hero}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div className="px-6 py-10 text-center sm:px-10 sm:py-14 lg:py-16">
                <p className="text-sm text-white/70 sm:text-base">{service.tagline}</p>
                <h2 className="mx-auto mt-4 max-w-4xl text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:mt-5 sm:text-3xl md:text-4xl lg:text-5xl">
                  {service.headline}
                </h2>
              </div>

              <div className="border-t border-white/10">
                <InfoRow label="Desafío">{service.desafio}</InfoRow>
                <InfoRow label="Solución" highlighted>
                  {service.solucion}
                </InfoRow>
                <InfoRow label="Resultado">{service.resultado}</InfoRow>
              </div>

              {gridLeft && gridRight ? (
                <div className="grid border-t border-white/10 lg:grid-cols-[1.35fr_1fr]">
                  <div className="border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
                    <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
                      <Image
                        src={gridLeft}
                        alt={`${service.title} producción`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                    {service.id === "streaming" ? <PlatformIcons /> : null}
                  </div>
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/11] lg:aspect-auto lg:min-h-full">
                    <Image
                      src={gridRight}
                      alt={`${service.title} experiencia`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              ) : null}

              {bottom ? (
                <div className="relative aspect-[21/9] w-full min-h-[180px] border-t border-white/10 sm:min-h-[240px] lg:min-h-[300px]">
                  <Image
                    src={bottom}
                    alt={`${service.title} experiencia`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
