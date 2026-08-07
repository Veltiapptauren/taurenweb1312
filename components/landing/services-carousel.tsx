"use client";

import { ServiceDetailModal } from "@/components/landing/service-detail-modal";
import { services, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 9500;
const TRANSITION_MS = 1200;
const MOBILE_TRANSITION_MS = 380;
const DRAG_THRESHOLD = 48;
const DRAG_START = 12;

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
  const [paused, setPaused] = useState(false);
  const gesture = useRef<Gesture | null>(null);
  const total = services.length;
  const transitionMs = mobile ? MOBILE_TRANSITION_MS : TRANSITION_MS;
  const activeService = services[active];

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((index: number) => {
    setPaused(true);
    setActive(((index % total) + total) % total);
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
    if (modalService || dragging || paused) return;
    const timer = setInterval(next, AUTO_MS);
    return () => clearInterval(timer);
  }, [next, modalService, dragging, paused]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const delta = e.clientX - g.x;
      if (!g.dragged && Math.abs(delta) > DRAG_START) {
        g.dragged = true;
        setDragging(true);
        setPaused(true);
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
      <div className="relative w-full overflow-x-clip pt-2 sm:pt-6">
        <div className="sm:hidden">
          <div
            role="region"
            aria-roledescription="carrusel"
            aria-label="Servicios"
            className="relative overflow-hidden rounded-2xl border border-[#00aeef]/40 bg-neutral-950 shadow-[0_0_40px_rgba(0,174,239,0.18)]"
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              startGesture(activeService, e.clientX);
            }}
          >
            <div
              className="relative aspect-[4/5] w-full touch-pan-x select-none"
              style={{
                transform: dragging
                  ? `translate3d(${dragOffset * 0.28}px, 0, 0)`
                  : undefined,
                transition: dragging
                  ? "none"
                  : `transform ${transitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              <div key={activeService.id} className="absolute inset-0 animate-in fade-in duration-300">
                <Image
                  src={activeService.images[0]}
                  alt={activeService.title}
                  fill
                  sizes="100vw"
                  priority
                  draggable={false}
                  className="object-cover brightness-[0.92]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 pt-20 text-center">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#00aeef]">
                    {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-tight text-white">
                    {activeService.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    {activeService.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[11px] uppercase tracking-[0.08em] text-white/70 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mt-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
                    Toca para ver detalle
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 px-0.5">
            <button
              type="button"
              onClick={() => {
                setPaused(true);
                prev();
              }}
              aria-label="Anterior"
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors active:scale-95"
            >
              <ChevronLeft className="size-6" />
            </button>
            <div className="flex flex-1 items-center justify-center gap-1.5">
              {services.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={item.title}
                  aria-current={index === active ? "true" : undefined}
                  className="inline-flex min-h-11 min-w-8 items-center justify-center"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300",
                      index === active ? "w-7 bg-[#00aeef]" : "w-1.5 bg-white/30"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setPaused(true);
                next();
              }}
              aria-label="Siguiente"
              className="inline-flex size-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-colors active:scale-95"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>

        <div className="relative hidden min-h-[420px] sm:block lg:min-h-[500px]">
          <div
            className={cn("relative overflow-x-clip", canHover && hovering && "cursor-none")}
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

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-20 bg-gradient-to-r from-black via-black/80 to-transparent lg:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-20 bg-gradient-to-l from-black via-black/80 to-transparent lg:w-28" />

            <div
              className="relative flex min-h-[420px] select-none items-center justify-center py-10 lg:min-h-[500px]"
              style={{ perspective: "1800px" }}
            >
              {services.map((item, index) => {
                const offset = getOffset(index);
                if (Math.abs(offset) > 2) return null;
                const isActive = offset === 0;
                const isSide = Math.abs(offset) === 1;
                const scale = isActive ? 1 : isSide ? 0.88 : 0.74;
                const rotateY = isActive ? 0 : offset * -12;
                const slideX = offset * spread + (dragging ? dragOffset * 0.35 : 0);

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
                      "absolute left-1/2 top-1/2 aspect-[16/9] overflow-hidden rounded-2xl border bg-neutral-950 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      canHover && hovering ? "cursor-none" : "cursor-pointer",
                      isActive
                        ? "z-30 w-[min(94vw,780px)] border-[#00aeef]/55 shadow-[0_0_80px_rgba(0,174,239,0.22)]"
                        : isSide
                          ? "z-20 w-[min(100%,560px)] border-white/20"
                          : "z-10 w-[min(100%,460px)] border-white/10"
                    )}
                    style={{
                      transition: dragging
                        ? "none"
                        : `transform ${TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1), opacity ${TRANSITION_MS}ms ease, box-shadow ${TRANSITION_MS}ms ease`,
                      transform: `translate3d(calc(-50% + ${slideX}px), -50%, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity: isActive ? 1 : isSide ? 0.78 : 0.45,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={item.images[0]}
                      alt={item.title}
                      fill
                      sizes="780px"
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
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/5" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-7 pb-8 text-center">
                      <h3
                        className={cn(
                          "font-semibold leading-tight text-white",
                          isActive ? "text-2xl lg:text-3xl" : "text-lg"
                        )}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={cn(
                          "mt-3",
                          isActive ? "opacity-100" : "max-h-0 overflow-hidden opacity-0"
                        )}
                        style={{
                          transition: dragging
                            ? "none"
                            : `opacity ${TRANSITION_MS}ms ease, max-height ${TRANSITION_MS}ms ease`,
                        }}
                      >
                        <div className="mt-2.5 flex max-w-full flex-wrap items-center justify-center gap-x-2 gap-y-1.5">
                          {item.tags.map((tag, tagIndex) => (
                            <span key={tag} className="inline-flex max-w-full items-center">
                              {tagIndex > 0 ? (
                                <span aria-hidden className="mr-2 text-xs text-white/25">
                                  |
                                </span>
                              ) : null}
                              <span className="whitespace-nowrap text-xs font-normal uppercase leading-snug tracking-[0.1em] text-white/50">
                                {tag}
                              </span>
                            </span>
                          ))}
                        </div>
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
            className="absolute left-3 top-1/2 z-40 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/80 text-white backdrop-blur-md transition-colors active:scale-95 lg:size-14"
          >
            <ChevronLeft className="size-6 lg:size-7" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-3 top-1/2 z-40 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/80 text-white backdrop-blur-md transition-colors active:scale-95 lg:size-14"
          >
            <ChevronRight className="size-6 lg:size-7" />
          </button>
        </div>
      </div>

      <ServiceDetailModal
        service={modalService}
        onClose={() => setModalService(null)}
      />
    </>
  );
}
