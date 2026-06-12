"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { cieloMilanoTranslations, type CieloLocale } from "@/lib/cielo-milano-i18n";

type Props = {
  locale: CieloLocale;
  garmentId: string;
  garmentImageSrc: string;
  className?: string;
};

const KEYFRAMES = `
@keyframes cm-reveal {
  0%   { opacity: 0; transform: scale(1.12) translateY(8px); }
  15%  { opacity: 1; }
  85%  { opacity: 1; transform: scale(1.04) translateY(-4px); }
  100% { opacity: 1; transform: scale(1.04) translateY(-4px); }
}
@keyframes cm-float {
  0%   { transform: scale(1.04) translateY(-4px); }
  50%  { transform: scale(1.07) translateY(-10px); }
  100% { transform: scale(1.04) translateY(-4px); }
}
@keyframes cm-vignette {
  0%   { opacity: 0; }
  20%  { opacity: 1; }
  100% { opacity: 1; }
}
@keyframes cm-shimmer {
  0%   { opacity: 0; transform: translateX(-120%) rotate(25deg); }
  30%  { opacity: 0.18; }
  60%  { opacity: 0; transform: translateX(120%) rotate(25deg); }
  100% { opacity: 0; }
}
@keyframes cm-badge {
  0%   { opacity: 0; transform: translateY(-6px); }
  40%  { opacity: 0; }
  70%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 1; }
}
`;

export function OutfitPreview({
  locale,
  garmentId,
  garmentImageSrc,
  className,
}: Props) {
  const t = cieloMilanoTranslations[locale];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <style suppressHydrationWarning>{KEYFRAMES}</style>

      <div className="absolute inset-0 bg-[#0d0b09]" />

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 80% at 50% 60%, #2a2218 0%, transparent 100%)",
        }}
      />

      <div className="relative flex min-h-[520px] w-full items-center justify-center p-4 lg:min-h-[620px]">
        <div
          key={garmentId}
          className="relative aspect-[3/4] h-[480px] max-h-[600px] w-auto overflow-hidden rounded-xl lg:h-[580px]"
          style={{ boxShadow: "0 0 0 1px rgba(201,169,98,0.12), 0 40px 80px -20px rgba(0,0,0,0.9)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              animation: "cm-reveal 1.4s cubic-bezier(0.4,0,0.2,1) forwards, cm-float 8s ease-in-out 1.4s infinite",
            }}
          >
            <Image
              key={garmentId}
              src={garmentImageSrc}
              alt=""
              fill
              sizes="480px"
              className="object-cover object-top"
              priority
              unoptimized
            />
          </div>

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(13,11,9,0.2) 0%, transparent 30%, transparent 60%, rgba(13,11,9,0.65) 100%)",
              animation: "cm-vignette 1.6s ease forwards",
              opacity: 0,
            }}
          />

          <div
            className="pointer-events-none absolute inset-0 overflow-hidden"
            aria-hidden
          >
            <div
              className="absolute inset-y-0 w-24 bg-white/40"
              style={{
                left: "-10%",
                animation: "cm-shimmer 3s ease 0.8s forwards",
                opacity: 0,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-4 top-4 z-10"
        style={{ animation: "cm-badge 2.2s ease forwards", opacity: 0 }}
      >
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#c9a962]/30 bg-[#0d0b09]/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#c9a962]/90 backdrop-blur-sm">
          <Sparkles className="size-3 text-[#c9a962]" />
          {t.modelDefault}
        </span>
      </div>
    </div>
  );
}
