"use client";

import { TaurenWordmark } from "@/components/brand/tauren-logo";
import {
  brandIntroParagraph,
  brandIntroServiceLinks,
  brandIntroTagline,
} from "@/lib/brand-intro";
import { getWhatsAppUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type BrandIntroProps = {
  className?: string;
};

export function BrandIntro({ className }: BrandIntroProps) {
  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative flex items-center justify-center overflow-hidden sm:min-h-[420px]">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_58%,rgba(0,174,239,0.18),transparent_66%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[12%] z-0 rounded-full bg-[#00aeef]/8 blur-[60px]"
            aria-hidden
          />
          <div className="relative z-10 w-full max-w-[560px] lg:max-w-none">
            <Image
              src="/images/tauren-pro-eventos-hero.png"
              alt="Streaming y producción de eventos corporativos"
              width={1024}
              height={910}
              priority
              quality={100}
              unoptimized
              sizes="(max-width: 1024px) 100vw, 560px"
              className="h-auto w-full object-contain"
            />
          </div>
        </div>

        <div className="text-left">
          <TaurenWordmark className="mb-3 sm:mb-4" />
          <p className="text-sm font-medium leading-snug text-white/85 sm:text-base">
            {brandIntroTagline}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-white/65 sm:mt-5 sm:text-base sm:leading-7">
            {brandIntroParagraph}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-5">
            {brandIntroServiceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-white/45 transition-colors hover:border-white/20 hover:text-white/70 sm:text-[10px]"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:mt-6">
            <Link
              href={getWhatsAppUrl()}
              className="inline-flex h-10 items-center justify-center rounded-full bg-[#00aeef] px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-black transition-opacity hover:opacity-90 sm:text-xs"
            >
              Cotizar por WhatsApp
            </Link>
            <Link
              href="#contacto"
              className="inline-flex h-10 items-center justify-center rounded-full border border-white/20 px-5 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70 transition-colors hover:border-white/35 hover:text-white sm:text-xs"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
