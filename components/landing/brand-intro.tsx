"use client";

import { brandIntroParagraphs } from "@/lib/brand-intro";
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
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 sm:aspect-[16/11]">
          <Image
            src="/images/servicios/produccion-integral/02.jpg"
            alt="Evento corporativo Tauren Pro Eventos"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
          <Link
            href="#servicios"
            className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-md transition-colors hover:border-[#00aeef]/60 hover:bg-[#00aeef]/15"
          >
            <span className="inline-flex size-5 items-center justify-center rounded-full bg-white/90 text-[10px] text-black">
              ▶
            </span>
            Explorar
          </Link>
        </div>

        <div className="text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00aeef]">
            Tauren Pro Eventos
          </p>
          <div className="mt-5 space-y-5 sm:space-y-6">
            {brandIntroParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "text-sm leading-relaxed sm:text-base sm:leading-8",
                  index === 0 ? "font-medium text-white/95" : "text-white/75"
                )}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
