"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import { brandIntroParagraphs } from "@/lib/brand-intro";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BrandIntroProps = {
  className?: string;
};

export function BrandIntro({ className }: BrandIntroProps) {
  return (
    <div className={cn("mx-auto max-w-6xl", className)}>
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="relative aspect-[5/4] overflow-hidden sm:aspect-[16/12] lg:min-h-[420px] lg:aspect-auto">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_58%,rgba(0,174,239,0.24),transparent_66%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-[8%] z-0 rounded-full bg-[#00aeef]/10 blur-[80px]"
            aria-hidden
          />
          <div className="absolute inset-0 z-10 [mask-image:radial-gradient(ellipse_94%_90%_at_50%_54%,#000_38%,transparent_100%)]">
            <div className="absolute inset-0 scale-[1.14] sm:scale-[1.18] lg:scale-[1.22]">
              <Image
                src="/images/tauren-pro-eventos-hero.png"
                alt="Tauren Pro Eventos producción integral de eventos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover object-[50%_56%]"
              />
            </div>
          </div>
        </div>

        <div className="text-left">
          <TaurenLogo href="" imageClassName="h-9 w-auto max-w-[240px] sm:h-11 sm:max-w-[280px]" />
          <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
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
