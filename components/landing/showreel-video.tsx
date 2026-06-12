"use client";

import Image from "next/image";

export function ShowreelVideo() {
  return (
    <div className="relative flex h-full min-h-[360px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 sm:min-h-[400px]">
      <Image
        src="/images/servicios/media/04.jpg"
        alt="Producción audiovisual Tauren Pro Eventos"
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        className="object-cover brightness-[0.85]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/15" />
      <div className="relative z-10 mt-auto p-6 pb-8 sm:p-8 sm:pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
          Showreel
        </p>
        <p className="mt-2 max-w-sm text-xl font-semibold leading-snug text-white sm:text-2xl">
          Producción audiovisual y eventos en acción
        </p>
      </div>
    </div>
  );
}
