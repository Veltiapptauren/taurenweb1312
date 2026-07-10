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
      className={`flex w-full flex-col ${
        fill ? "min-h-[calc(100dvh-3rem)] sm:min-h-[calc(100dvh-3.5rem)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

function ModalHeader({ title }: { title: string }) {
  return (
    <div className="fixed inset-x-0 top-0 z-30 flex h-12 items-center justify-center bg-black px-4 sm:h-14 sm:px-6">
      <Dialog.Title className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white sm:text-xs md:text-sm">
        {title}
      </Dialog.Title>
      <Dialog.Close
        className="absolute right-3 top-1/2 inline-flex size-8 -translate-y-1/2 items-center justify-center text-white transition-opacity hover:opacity-70 sm:right-6"
        aria-label="Cerrar"
      >
        <X className="size-6 sm:size-7" strokeWidth={1.25} />
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
    <div className="flex h-[calc(100dvh-3rem)] w-full flex-col gap-[clamp(0.75rem,2.2vh,1.25rem)] px-[clamp(1rem,5vw,3.5rem)] pb-[clamp(1.75rem,8vh,5rem)] pt-[clamp(0.5rem,1.8vh,1rem)] sm:h-[calc(100dvh-3.5rem)]">
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[clamp(0.75rem,1.5vw,1.25rem)]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div className="shrink-0 text-center">
        <p className="text-[clamp(0.75rem,1.5vw,1rem)] text-white/75">
          {tagline}
        </p>
        <h2 className="mx-auto mt-[clamp(0.25rem,0.8vh,0.5rem)] max-w-4xl text-[clamp(1.35rem,3.8vw,3rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
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
  layout?: "cover" | "natural" | "contain";
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

  if (layout === "contain") {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-neutral-950 ${className ?? ""}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          quality={100}
          unoptimized
          sizes="(max-width: 768px) 100vw, 1080px"
          className="object-contain object-center"
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
        className={`object-cover ${cropBottom ? "object-[center_35%]" : "object-center"}`}
      />
    </div>
  );
}

function ServiceCta({
  service,
  compact = false,
}: {
  service: Service;
  compact?: boolean;
}) {
  const subject = encodeURIComponent(`Consulta: ${service.title}`);
  const mailto = `mailto:${siteConfig.contactEmail}?subject=${subject}`;

  return (
    <div
      className={
        compact
          ? "px-4 pb-4 pt-0 text-center sm:pb-6"
          : "px-6 pb-[max(3rem,env(safe-area-inset-bottom))] pt-6 text-center sm:px-10 sm:pt-8 lg:px-12"
      }
    >
      <p className="text-base text-white/80 sm:text-lg md:text-xl">
        {service.modalCta}
      </p>
      <a
        href={mailto}
        className="mt-4 inline-block text-3xl font-extrabold uppercase tracking-tight text-white transition-opacity hover:opacity-80 sm:mt-5 sm:text-4xl md:text-5xl lg:text-6xl"
      >
        Conversemos
      </a>
    </div>
  );
}

function ServiceGalleryGrid({ service }: { service: Service }) {
  const left = service.images[1];
  const right = service.images[2];
  if (!left || !right) return null;

  return (
    <div className="border-t border-white/10 bg-black px-6 py-6 sm:px-10 sm:py-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4">
        <GalleryTile
          src={left}
          alt={`${service.title} producción`}
          width={1080}
          height={1080}
          className="aspect-square"
        />
        <GalleryTile
          src={right}
          alt={`${service.title} experiencia`}
          width={1080}
          height={1080}
          className="aspect-square"
        />
      </div>
    </div>
  );
}

function ServiceClosing({ service }: { service: Service }) {
  const bottom = service.images[3];
  if (!bottom) return <ServiceCta service={service} />;

  return (
    <div className="flex h-[calc(100dvh-3rem)] w-full flex-col gap-[clamp(0.75rem,2.2vh,1.25rem)] px-[clamp(1rem,5vw,3.5rem)] pb-[clamp(1.75rem,8vh,5rem)] pt-[clamp(0.5rem,1.8vh,1rem)] sm:h-[calc(100dvh-3.5rem)]">
      <div className="relative min-h-0 w-full flex-1 overflow-hidden rounded-[clamp(0.75rem,1.5vw,1.25rem)]">
        <Image
          src={bottom}
          alt={`${service.title} resultado`}
          fill
          quality={100}
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
      </div>
      <div className="shrink-0">
        <ServiceCta service={service} compact />
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
              <div className="h-full overflow-y-auto scroll-smooth pt-12 sm:pt-14">
                <div className="w-full bg-black">
                  <SnapSection fill={false}>
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
                    <>
                      <ServiceGalleryGrid service={service} />
                      <SnapSection className="border-t border-white/10" fill={false}>
                        <ServiceClosing service={service} />
                      </SnapSection>
                    </>
                  ) : null}

                  {!hasGallery ? (
                    <SnapSection className="border-t border-white/10" fill={false}>
                      <ServiceCta service={service} />
                    </SnapSection>
                  ) : null}
                </div>
              </div>
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
