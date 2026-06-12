"use client";

import { ServiceDetailModal } from "@/components/landing/service-detail-modal";
import { services, type Service } from "@/lib/services";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const AUTO_MS = 9500;
const IMAGE_CYCLE_MS = 3800;
const TRANSITION_MS = 1200;
const DRAG_THRESHOLD = 50;
const DRAG_START = 14;

function getSpread() {
  if (typeof window === "undefined") return 320;
  if (window.innerWidth >= 1280) return 440;
  if (window.innerWidth >= 768) return 360;
  return 280;
}

type Gesture = {
  x: number;
  service: Service;
  dragged: boolean;
};

export function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const [spread, setSpread] = useState(320);
  const [dragOffset, setDragOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [modalService, setModalService] = useState<Service | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const gesture = useRef<Gesture | null>(null);
  const total = services.length;
  const activeService = services[active];

  const next = useCallback(() => {
    setActive((i) => (i + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const update = () => setSpread(getSpread());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    if (modalService || dragging) return;
    const timer = setInterval(next, AUTO_MS);
    return () => clearInterval(timer);
  }, [next, modalService, dragging]);

  useEffect(() => {
    if (modalService || dragging || activeService.images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex((i) => (i + 1) % activeService.images.length);
    }, IMAGE_CYCLE_MS);
    return () => clearInterval(timer);
  }, [activeService, modalService, dragging]);

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
        <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]">
          <div
            className={cn("relative", hovering && "cursor-none")}
            onPointerEnter={() => setHovering(true)}
            onPointerLeave={() => {
              setHovering(false);
              gesture.current = null;
              setDragging(false);
              setDragOffset(0);
            }}
            onPointerMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
          >
            {hovering && !dragging ? (
              <div
                className="pointer-events-none fixed z-[70] flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/50 bg-white/15 px-3 text-center backdrop-blur-[2px] sm:size-32"
                style={{ left: cursor.x, top: cursor.y }}
              >
                <span className="text-[11px] font-medium uppercase leading-tight tracking-wide text-white sm:text-xs">
                  descubre más
                </span>
              </div>
            ) : null}

            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-black via-black/80 to-transparent sm:w-20 lg:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-black via-black/80 to-transparent sm:w-20 lg:w-28" />

            <div
              className="relative flex min-h-[220px] select-none items-center justify-center py-6 sm:min-h-[280px] sm:py-8 lg:min-h-[340px]"
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
                      hovering ? "cursor-none" : "cursor-pointer",
                      isActive
                        ? "z-30 w-[min(94vw,780px)] border-[#00aeef]/55 shadow-[0_0_80px_rgba(0,174,239,0.22)]"
                        : isSide
                          ? "z-20 w-[min(82vw,560px)] border-white/20"
                          : "z-10 w-[min(72vw,460px)] border-white/10"
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
                      src={
                        isActive
                          ? item.images[imageIndex % item.images.length]
                          : item.images[0]
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 94vw, 780px"
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
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 pb-6 sm:p-7 sm:pb-8">
                      <span className="text-xs font-semibold tracking-[0.25em] text-[#00aeef]">
                        {item.number}
                      </span>
                      <h3
                        className={cn(
                          "mt-2 font-semibold leading-tight text-white",
                          isActive ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"
                        )}
                      >
                        {item.title}
                      </h3>
                      <div
                        className={cn(
                          "mt-3 flex flex-wrap gap-1.5 sm:gap-2",
                          isActive
                            ? "max-h-24 opacity-100 sm:max-h-28"
                            : "max-h-0 overflow-hidden opacity-0"
                        )}
                        style={{
                          transition: dragging
                            ? "none"
                            : `opacity ${TRANSITION_MS}ms ease, max-height ${TRANSITION_MS}ms ease`,
                        }}
                      >
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={cn(
                              "inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide sm:px-3 sm:text-[11px]",
                              tagIndex === 0
                                ? "border-[#00aeef]/50 bg-[#00aeef]/15 text-[#7ddfff]"
                                : "border-white/15 bg-white/8 text-white/80"
                            )}
                          >
                            {tag}
                          </span>
                        ))}
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
            className="absolute left-1 top-1/2 z-40 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/70 text-white backdrop-blur-md transition-colors hover:border-[#00aeef]/60 hover:bg-black sm:left-3 lg:size-14"
          >
            <ChevronLeft className="size-6 lg:size-7" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-1 top-1/2 z-40 flex size-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/70 text-white backdrop-blur-md transition-colors hover:border-[#00aeef]/60 hover:bg-black sm:right-3 lg:size-14"
          >
            <ChevronRight className="size-6 lg:size-7" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {services.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActive(index)}
              aria-label={item.title}
              className={cn(
                "h-2 cursor-pointer rounded-full transition-all duration-500",
                index === active ? "w-10 bg-[#00aeef]" : "w-2 bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>

      <ServiceDetailModal
        service={modalService}
        onClose={() => setModalService(null)}
      />
    </>
  );
}
