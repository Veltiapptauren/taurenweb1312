"use client";

import { brandIntroParagraphs } from "@/lib/brand-intro";
import { cn } from "@/lib/utils";

type BrandIntroProps = {
  className?: string;
};

export function BrandIntro({ className }: BrandIntroProps) {
  return (
    <div className={cn("relative mx-auto max-w-4xl", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/70 px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-[#00aeef]/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 size-56 rounded-full bg-[#00aeef]/8 blur-3xl" />

        <div className="relative text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#00aeef] sm:text-[11px]">
            Tauren Pro Eventos
          </p>
          <div className="mx-auto mt-4 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#00aeef]/60 sm:w-14" />
            <span className="size-1.5 rounded-full bg-[#00aeef]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#00aeef]/60 sm:w-14" />
          </div>

          <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-7">
            {brandIntroParagraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={cn(
                  "mx-auto max-w-3xl text-sm leading-relaxed sm:text-base sm:leading-8",
                  index === 0
                    ? "font-medium text-white/90"
                    : index === 1
                      ? "text-white/70"
                      : "text-white/60"
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
