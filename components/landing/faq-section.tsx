"use client";

import { FaqRoulette } from "@/components/landing/faq-roulette";
import { useInView } from "@/hooks/use-in-view";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const { ref, visible, runId } = useInView(0.12);
  const reduced = usePrefersReducedMotion();

  return (
    <section
      ref={ref}
      className="relative border-t border-white/10 bg-black py-16 sm:py-20 lg:py-24"
    >
      <div
        key={runId}
        className={cn(
          "mx-auto max-w-6xl px-4 opacity-0 sm:px-6",
          (visible || reduced) && runId > 0 && "animate-service-copy-rise"
        )}
        style={
          visible && !reduced
            ? { animationDelay: "80ms" }
            : visible
              ? { opacity: 1 }
              : undefined
        }
      >
        <FaqRoulette visible={visible} />
      </div>
    </section>
  );
}
