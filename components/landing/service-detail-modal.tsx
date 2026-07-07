"use client";

import type { Service } from "@/lib/services";
import { siteConfig } from "@/lib/site";
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

function SnapSection({
  children,
  className = "",
  fill = true,
}: {
  children: ReactNode;
  className?: string;
  fill?: boolean;
}) {
  return (
    <section
      className={`flex w-full snap-start flex-col ${
        fill ? "min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-4rem)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

function ModalHeader({ title }: { title: string }) {
  return (
    <div className="fixed inset-x-0 top-0 z-30 flex h-14 items-center justify-center bg-[#1A1A1A] px-6 sm:h-16 relative">
      <Dialog.Title className="text-center text-xs font-bold uppercase tracking-[0.2em] text-white sm:text-sm md:text-base">
        {title}
      </Dialog.Title>
      <Dialog.Close
        className="absolute right-4 top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-70 sm:right-8"
        aria-label="Cerrar"
      >
        <X className="size-7 sm:size-8" strokeWidth={1.25} />
      </Dialog.Close>
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
      className={`grid flex-1 content-center gap-4 border-b border-white/10 px-6 py-8 last:border-b-0 sm:grid-cols-[minmax(140px,200px)_1fr] sm:gap-12 sm:px-10 sm:py-10 lg:px-12 ${
        highlighted ? "bg-[#1A1A1A]" : "bg-black"
      }`}
    >
      <p className="text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl lg:text-4xl">
        {label}
      </p>
      <p className="text-sm leading-relaxed text-white/90 sm:text-base sm:leading-loose lg:text-lg">
        {children}
      </p>
    </div>
  );
}

function ModalHero({
  src,
  alt,
  tagline,
  headline,
  priority = false,
}: {
  src: string;
  alt: string;
  tagline: string;
  headline: string;
  priority?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="px-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border border-white/12 bg-black p-1.5 sm:p-2">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={src}
              alt={alt}
              width={1895}
              height={691}
              priority={priority}
              quality={100}
              unoptimized
              sizes="100vw"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6 text-center sm:px-8 sm:py-8">
        <p className="text-sm text-white/80 sm:text-base">{tagline}</p>
        <h2 className="mx-auto mt-3 max-w-4xl text-2xl font-extrabold uppercase leading-tight tracking-tight text-white sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-tight">
          {headline}
        </h2>
      </div>
    </div>
  );
}

function GalleryTile({
  src,
  alt,
  width,
  height,
  className,
  layout = "cover",
  cropBottom = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  layout?: "cover" | "natural";
  cropBottom?: boolean;
}) {
  if (layout === "natural") {
    return (
      <div className={`overflow-hidden rounded-2xl bg-neutral-950 ${className ?? ""}`}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={100}
          unoptimized
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-950 ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        quality={100}
        unoptimized
        sizes="(max-width: 768px) 50vw, 1080px"
        className={`object-cover object-center ${cropBottom ? "[clip-path:inset(0_0_13%_0)]" : ""}`}
      />
    </div>
  );
}

function ServiceCta({ service }: { service: Service }) {
  const subject = encodeURIComponent(`Consulta: ${service.title}`);
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${subject}`;

  return (
    <div className="px-6 pb-16 pt-6 text-center sm:px-8">
      <p className="text-base text-white/80 sm:text-lg md:text-xl">{service.modalCta}</p>
      <a
        href={mailto}
        className="mt-5 inline-block text-3xl font-extrabold uppercase tracking-tight text-white transition-opacity hover:opacity-80 sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Conversemos
      </a>
    </div>
  );
}

function ServiceGallery({ service }: { service: Service }) {
  const left = service.images[1];
  const right = service.images[2];
  const bottom = service.images[3];
  if (!left || !right || !bottom) return null;

  return (
    <div className="border-t border-white/10 bg-black px-6 py-6 sm:px-10 sm:py-8 lg:px-12">
      <div className="grid gap-3 sm:gap-4">
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <GalleryTile
            src={left}
            alt={`${service.title} producción`}
            width={1080}
            height={1080}
            className="aspect-square"
            cropBottom={service.id === "streaming"}
          />
          <GalleryTile
            src={right}
            alt={`${service.title} experiencia`}
            width={1080}
            height={1080}
            className="aspect-square"
          />
        </div>
        <GalleryTile
          src={bottom}
          alt={`${service.title} resultado`}
          width={1799}
          height={771}
          layout="natural"
        />
      </div>
    </div>
  );
}

export function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const hero = service?.images[0];
  const hasGallery = (service?.images.length ?? 0) >= 4;

  return (
    <Dialog.Root open={!!service} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={`${montserrat.className} fixed inset-0 z-[90] h-dvh overflow-hidden bg-black p-0 text-white outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`}
        >
          <Dialog.Description className="sr-only">
            Detalle del servicio
          </Dialog.Description>
          {service ? (
            <>
              <ModalHeader title={service.modalTitle} />
              <div className="h-full snap-y snap-proximity overflow-y-auto scroll-smooth pt-14 sm:pt-16">
                <div className="w-full bg-black pb-8">
                  <SnapSection>
                    {hero ? (
                      <ModalHero
                        src={hero}
                        alt={service.title}
                        tagline={service.tagline}
                        headline={service.headline}
                        priority
                      />
                    ) : null}
                  </SnapSection>

                  <SnapSection className="justify-center border-t border-white/10">
                    <InfoRow label="Desafío">{service.desafio}</InfoRow>
                    <InfoRow label="Solución" highlighted>
                      {service.solucion}
                    </InfoRow>
                    <InfoRow label="Resultado">{service.resultado}</InfoRow>
                  </SnapSection>

                  {hasGallery ? (
                    <div className="border-t border-white/10">
                      <ServiceGallery service={service} />
                    </div>
                  ) : null}

                  <SnapSection fill={false}>
                    <ServiceCta service={service} />
                  </SnapSection>
                </div>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
