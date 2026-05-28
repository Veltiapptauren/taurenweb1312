"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

type ParallaxFrameProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  strength?: number;
  scale?: number;
};

export function ParallaxFrame({
  children,
  className,
  innerClassName,
  strength = 28,
  scale = 1.12,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    const update = () => {
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      const progress = (viewport - rect.top) / (viewport + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      setOffset((clamped - 0.5) * strength);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced, strength]);

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div
        className={cn("h-full w-full will-change-transform", innerClassName)}
        style={
          reduced
            ? undefined
            : {
                transform: `translate3d(0, ${offset}px, 0) scale(${scale})`,
              }
        }
      >
        {children}
      </div>
    </div>
  );
}
