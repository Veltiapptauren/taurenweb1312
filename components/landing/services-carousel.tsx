"use client";

import { ServiceDetailModal } from "@/components/landing/service-detail-modal";
import { services, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 9500;
const TRANSITION_MS = 1200;
const DRAG_THRESHOLD = 50;
const DRAG_START = 14;

function getSpread() {
  if (typeof window === "undefined") return 320;
  if (window.innerWidth < 640) return 0;
  if (window.innerWidth >= 1280) return 440;
  if (window.innerWidth >= 768) return 360;
  return 280;
}

function isMobileWidth() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < 640;
}

type Gesture = {
  x: number;
  service: Service;
  dragged: boolean;
};

export function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const [spread, setSpread] = useState(320);
  const [mobile, setMobile] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [modalService, setModalService] = useState<Service | null>(null);
  const gesture = useRef<Gesture | null>(null);
  const total = services.length;

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const update = () => {
      setSpread(getSpread());
      setMobile(isMobileWidth());
    };
    const hoverMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const setHoverCap = () => setCanHover(hoverMq.matches);
    update();
    setHoverCap();
    window.addEventListener("resize", update);
    hoverMq.addEventListener("change", setHoverCap);
    return () => {
      window.removeEventListener("resize", update);
      hoverMq.removeEventListener("change", setHoverCap);
    };
  }, []);

  useEffect(() => {
    if (modalService || dragging) return;
    const timer = setInterval(next, AUTO_MS);
    return () => clearInterval(timer);
  }, [next, modalService, dragging]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const delta = e.clientX - g.x;
      if (!g.dragged && Math.abs(delta) > DRAG_START) {
        g.dragged = true;
        setDragging(true);
      }
      if (g.dragged) setDragOffset(delta);
    };

    const onUp = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const delta = e.clientX - g.x;
      gesture.current = null;
      setDragging(false);
      setDragOffset(0);

      if (g.dragged) {
        if (Math.abs(delta) >= DRAG_THRESHOLD) {
          if (delta < 0) next();
          else prev();
        }
        return;
      }

      setModalService(g.service);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [next, prev]);

  const getOffset = (index: number) => {
    let diff = index - active;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const startGesture = (service: Service, clientX: number) => {
    gesture.current = { x: clientX, service, dragged: false };
  };

  return (
    <>
      <div className="relative w-full">
        <div className="relative min-h-[300px] sm:min-h-[280px] lg:min-h-[340px]">
          <div
            className={cn("relative", canHover && hovering && "cursor-none")}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => {
              setHovering(false);
              gesture.current = null;
              setDragging(false);
              setDragOffset(0);
            }}
            onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
          >
            {canHover && hovering && !dragging ? (
              <div
                className="pointer-events-none fixed z-[70] flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 px-3 text-center backdrop-blur-[2px] sm:size-32"
                style={{ left: cursor.x, top: cursor.y }}
              >
                <span className="text-[11px] font-medium uppercase leading-tight tracking-wide text-white sm:text-xs">
                  descubre más
                </span>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 hidden w-20 bg-gradient-to-r from-black via-black/80 to-transparent sm:block lg:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 hidden w-20 bg-gradient-to-l from-black via-black/80 to-transparent sm:block lg:w-28" />

            <div
              className="relative flex min-h-[300px] select-none items-center justify-center py-2 sm:min-h-[280px] sm:py-8 lg:min-h-[340px]"
              style={{ perspective: mobile ? undefined : "1800px" }}
            >
              {services.map((item, index) => {
                const offset = getOffset(index);
                if (mobile ? offset !== 0 : Math.abs(offset) > 2) return null;
                const isActive = offset === 0;
                const isSide = Math.abs(offset) === 1;
                const scale = mobile ? 1 : isActive ? 1 : isSide ? 0.88 : 0.74;
                const rotateY = mobile ? 0 : isActive ? 0 : offset * -12;
                const slideX = mobile ? dragOffset * 0.2 : offset * spread + (dragging ? dragOffset * 0.35 : 0);

                return (
                  <button
                    key={item.id}
                    type="button"
                    onPointerDown={(e) => {
                      if (e.button !== 0) return;
                      startGesture(item, e.clientX);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setModalService(item);
                      }
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "absolute left-1/2 top-1/2 aspect-[4/5] overflow-hidden rounded-2xl border bg-neutral-950 ease-[cubic-bezier(0.22,1,0.36,1)] sm:aspect-[16/9]",
                      canHover && hovering ? "cursor-none" : "cursor-pointer",
                      isActive
                        ? "z-30 w-[calc(100vw-2rem)] max-w-[780px] border-[#00aeef]/55 shadow-[0_0_60px_rgba(0,174,239,0.2)] sm:w-[min(94vw,780px)] sm:shadow-[0_0_80px_rgba(0,174,239,0.22)]"
                        : isSide
                          ? "z-20 w-[min(82vw,560px)] border-white/20"
                          : "z-10 w-[min(72vw,460px)] border-white/10"
                    )}
                    style={{
                      transition: dragging
                        ? "none"
                        : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease, box-shadow ${TRANSITION_MS}ms ease`,
                      transform: mobile
                        ? `translate3d(calc(-50% + ${slideX}px), -50%, 0) scale(${scale})`
                        : `translate3d(calc(-50% + ${slideX}px), -50%, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity: mobile ? 1 : isActive ? 1 : isSide ? 0.78 : 0.45,
                      transformStyle: mobile ? undefined : "preserve-3d",
                    }}
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 780px"
                      priority={isActive}
                      draggable={false}
                      className={cn(
                        "pointer-events-none object-cover",
                        isActive ? "brightness-[0.92]" : "brightness-[0.65]"
                      )}
                      style={{
                        transition: dragging
                          ? "none"
                          : `filter ${TRANSITION_MS}ms ease, opacity ${TRANSITION_MS}ms ease`,
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10 sm:via-black/50 sm:to-black/5" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 pb-5 sm:p-7 sm:pb-8">
                      <h3
                        className={cn(
                          "font-semibold leading-tight text-white",
                          isActive ? "text-lg sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"
                        )}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={cn(
                          "mt-2.5 sm:mt-3",
                          isActive ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"
                        )}
                        style={{
                          transition: dragging
                            ? "none"
                            : `opacity ${TRANSITION_MS}ms ease, max-height ${TRANSITION_MS}ms ease`,
                        }}
                      >
                        <div className="flex gap-1.5 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0 [&::-webkit-scrollbar]:hidden">
                          {item.tags.map((tag, tagIndex) => (
                            <span
                              key={tag}
                              className={cn(
                                "inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide sm:shrink sm:px-3 sm:text-[11px]",
                                tagIndex === 0
                                  ? "border-[#00aeef]/50 bg-[#00aeef]/15 text-[#7ddfff]"
                                  : "border-white/15 bg-white/8 text-white/80"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/50 sm:hidden">
                          Toca para ver detalle
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-40 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/75 text-white backdrop-blur-md transition-colors active:scale-95 sm:left-3 sm:size-12 lg:size-14"
          >
            <ChevronLeft className="size-5 sm:size-6 lg:size-7" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-40 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/75 text-white backdrop-blur-md transition-colors active:scale-95 sm:right-3 sm:size-12 lg:size-14"
          >
            <ChevronRight className="size-5 sm:size-6 lg:size-7" />
          </button>
        </div>

        <div className="mt-6 flex flex-col items-center gap-3 sm:mt-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 sm:hidden"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="flex justify-center gap-2">
              {services.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={item.title}
                  className={cn(
                    "h-2 cursor-pointer rounded-full transition-all duration-500",
                    index === active ? "w-8 bg-[#00aeef] sm:w-10" : "w-2 bg-white/30"
                  )}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 sm:hidden"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40 sm:hidden">
            Desliza o usa las flechas
          </p>
        </div>
      </div>

      <ServiceDetailModal
        service={modalService}
        onClose={() => setModalService(null)}
      />
    </>
  );
}
