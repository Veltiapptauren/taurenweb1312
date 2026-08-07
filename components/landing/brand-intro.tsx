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
    <div id="tauren" className={cn("mx-auto max-w-6xl scroll-mt-20 sm:scroll-mt-24", className)}>
      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative flex items-center justify-center overflow-hidden px-1 sm:min-h-[420px] sm:px-0">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_58%,rgba(0,174,239,0.18),transparent_66%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[18%] z-0 rounded-full bg-[#00aeef]/8 blur-[60px] sm:inset-[12%]"
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
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:mt-5 sm:text-base sm:leading-7">
            {brandIntroParagraph}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5 sm:mt-5">
            {brandIntroServiceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center rounded-full border border-white/10 px-3.5 py-2.5 text-xs font-medium uppercase tracking-wide text-white/45 transition-colors hover:border-white/20 hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:mt-6 sm:flex-row sm:items-center">
            <Link
              href={getWhatsAppUrl()}
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#00aeef] px-5 text-xs font-semibold uppercase tracking-[0.08em] text-black transition-opacity hover:opacity-90"
            >
              Cotizar por WhatsApp
            </Link>
            <Link
              href="#contacto"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-5 text-xs font-semibold uppercase tracking-[0.08em] text-white/70 transition-colors hover:border-white/35 hover:text-white"
            >
              Solicitar propuesta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
