"use client";

import { SectionHeading } from "@/components/landing/section-heading";
import { ShineLink } from "@/components/motion/shine-link";
import { SectionGlow } from "@/components/motion/section-glow";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { seoServiceProfiles } from "@/lib/seo-services";
import { getWhatsAppUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const CARD_STYLES = [
  { bg: "bg-[#8b2e2e]", icon: "text-white" },
  { bg: "bg-[#b8860b]", icon: "text-white" },
  { bg: "bg-[#1e5c45]", icon: "text-white" },
  { bg: "bg-[#0e7490]", icon: "text-white" },
];

const ICONS = [
  () => (
    <svg viewBox="0 0 64 64" fill="none" className="size-full">
      <rect x="8" y="16" width="34" height="28" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M42 26l12-7v26l-12-7V26z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <circle cx="18" cy="24" r="3" fill="currentColor" opacity="0.9" />
      <path d="M14 48h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 64 64" fill="none" className="size-full">
      <path d="M12 44V28l20-12 20 12v16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <path d="M20 44V34h24v10" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.55" />
      <path d="M28 44v-6h8v6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <path d="M18 20l4-6h20l4 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      <circle cx="32" cy="26" r="3" fill="currentColor" opacity="0.85" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 64 64" fill="none" className="size-full">
      <rect x="10" y="18" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <circle cx="26" cy="30" r="7" stroke="currentColor" strokeWidth="2" opacity="0.65" />
      <circle cx="26" cy="30" r="3" fill="currentColor" opacity="0.85" />
      <path d="M42 26l12-6v20l-12-6V26z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" opacity="0.7" />
      <path d="M16 48h24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 64 64" fill="none" className="size-full">
      <rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M16 44h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <path d="M20 36v8M28 36v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      <rect x="40" y="20" width="16" height="28" rx="3" stroke="currentColor" strokeWidth="2" opacity="0.7" />
      <path d="M45 24h6M45 30h6M45 36h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.55" />
      <circle cx="48" cy="42" r="1.5" fill="currentColor" opacity="0.8" />
    </svg>
  ),
];

function ServiceCard({
  profile,
  index,
  active,
  runId,
}: {
  profile: (typeof seoServiceProfiles)[number];
  index: number;
  active: boolean;
  runId: number;
}) {
  const style = CARD_STYLES[index % CARD_STYLES.length];
  const Icon = ICONS[index % ICONS.length];
  const reduced = usePrefersReducedMotion();
  const show = active || reduced;
  const cardDelay = index * 120;
  const iconDelay = cardDelay + 180;
  const copyDelay = cardDelay + 420;

  return (
    <article
      id={profile.anchor}
      className="scroll-mt-24 flex flex-col lg:max-w-[240px]"
    >
      <div
        key={`card-${index}-${runId}`}
        className={cn(
          "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] opacity-0",
          style.bg,
          show && runId > 0 && "animate-service-card-drop"
        )}
        style={show && !reduced ? { animationDelay: `${cardDelay}ms` } : show ? { opacity: 1 } : undefined}
      >
        <div
          className={cn("size-[72px] sm:size-20", style.icon, show && runId > 0 && "animate-service-icon-dance")}
          style={show && !reduced ? { animationDelay: `${iconDelay}ms` } : undefined}
        >
          <Icon />
        </div>
      </div>

      <div
        key={`copy-${index}-${runId}`}
        className={cn("mt-5 opacity-0 sm:mt-6", show && runId > 0 && "animate-service-copy-rise")}
        style={show && !reduced ? { animationDelay: `${copyDelay}ms` } : show ? { opacity: 1 } : undefined}
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-base font-semibold leading-snug text-white sm:text-lg">
          {profile.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/55">
          {profile.bullets[0]}
        </p>
        <ShineLink
          href={getWhatsAppUrl(`Hola, quiero cotizar ${profile.name.toLowerCase()}`)}
          external
          className="mt-5 h-10 rounded-full border border-[#00aeef]/30 bg-[#00aeef]/10 px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#00aeef] transition-all hover:border-[#00aeef] hover:bg-[#00aeef] hover:text-black sm:text-xs"
        >
          <span className="flex items-center gap-2">
            Cotizar
            <svg viewBox="0 0 16 16" fill="none" className="size-3.5" aria-hidden>
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </ShineLink>
      </div>
    </article>
  );
}

export function Process() {
  const { ref: gridRef, visible: gridVisible, runId: gridRunId } = useInView(0.15);
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="proceso"
      className="relative overflow-hidden border-t border-white/10 bg-black py-16 sm:py-20 lg:py-24"
    >
      <SectionGlow />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          label="Cómo trabajamos"
          title="Lo que dominamos para que tu evento salga impecable."
          description="Un proceso claro en cada área: brief, producción, entrega y seguimiento."
          titleClassName="text-2xl sm:text-3xl lg:text-4xl"
          className="mb-8 sm:mb-10"
        />

        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6 lg:flex lg:items-end lg:justify-between lg:gap-5"
        >
          {seoServiceProfiles.map((profile, index) => (
            <div
              key={profile.id}
              className={cn(
                "lg:flex-1",
                index === 1 && "lg:mt-7",
                index === 2 && "lg:mt-14",
                index === 3 && "lg:mt-[84px]"
              )}
            >
              <ServiceCard
                profile={profile}
                index={index}
                active={gridVisible || reduced}
                runId={gridRunId}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
