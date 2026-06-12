"use client";

import { NavLinkFx } from "@/components/motion/nav-link-fx";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { heroSlides } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { TaurenLogo } from "@/components/brand/tauren-logo";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const DRAG_THRESHOLD = 50;
const DRAG_START = 14;

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const navLinks = [
  { href: "#servicios", label: "SERVICIOS" },
  { href: "#proyectos", label: "PROYECTOS" },
  { href: "#tauren", label: "TAUREN" },
  { href: "#contacto", label: "CONTACTO" },
] as const;

function HeroTitle({ title }: { title: string }) {
  if (title.includes("\n")) {
    const lines = title.split("\n");
    return (
      <>
        {lines[0]}
        {lines[1] ? (
          <>
            <br />
            {lines[1]}
          </>
        ) : null}
      </>
    );
  }
  const words = title.split(" ");
  if (words.length <= 2) {
    return (
      <>
        {words[0]}
        {words[1] ? (
          <>
            <br />
            {words[1]}
          </>
        ) : null}
      </>
    );
  }
  return (
    <>
      {words[0]}
      <br />
      {words.slice(1).join(" ")}
    </>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const slide = heroSlides[active];
  const gesture = useRef<{ x: number; dragged: boolean } | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % heroSlides.length);
  }, []);

  const prev = useCallback(() => {
    setActive((i) => (i - 1 + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setImageIndex(0);
  }, [active]);

  useEffect(() => {
    if (dragging) return;
    const timer = setInterval(next, 9000);
    return () => clearInterval(timer);
  }, [next, dragging]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const delta = e.clientX - g.x;
      if (!g.dragged && Math.abs(delta) > DRAG_START) g.dragged = true;
      if (g.dragged) setDragging(true);
    };

    const onUp = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g) return;
      const delta = e.clientX - g.x;
      gesture.current = null;
      setDragging(false);
      if (g.dragged && Math.abs(delta) >= DRAG_THRESHOLD) {
        if (delta < 0) next();
        else prev();
      }
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

  const onHeroPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const target = e.target as HTMLElement;
    if (target.closest("a, button, nav, header")) return;
    gesture.current = { x: e.clientX, dragged: false };
  };

  useEffect(() => {
    if (dragging || slide.video || slide.images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex((i) => (i + 1) % slide.images.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [slide, dragging]);

  useEffect(() => {
    if (!mounted) return;
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === active && !reduced) {
        video.currentTime = 0;
        void video.play();
      } else {
        video.pause();
      }
    });
  }, [active, reduced, mounted]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const update = () => setScrollY(window.scrollY);
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  return (
    <section
      className={cn(
        montserrat.className,
        "relative isolate h-[100svh] min-h-[100svh] overflow-hidden bg-neutral-950 text-white/95",
        dragging ? "cursor-grabbing select-none" : "max-sm:touch-pan-y sm:cursor-grab"
      )}
      onPointerDown={onHeroPointerDown}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            {item.video && mounted && !reduced ? (
              <video
                ref={(node) => {
                  videoRefs.current[index] = node;
                }}
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
                poster={item.images[0]}
                suppressHydrationWarning
                className="absolute inset-0 size-full object-cover object-center brightness-[0.96] saturate-[0.95]"
              />
            ) : (
              item.images.map((src, imageIdx) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === active && imageIdx === imageIndex % item.images.length
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    priority={index === 0 && imageIdx === 0}
                    sizes="100vw"
                    className="object-cover object-center brightness-[0.96] saturate-[0.95]"
                  />
                </div>
              ))
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/25 sm:bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10 sm:from-black/50 sm:via-black/20 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent sm:from-black/35 sm:via-transparent" />
      </div>

      <div className="relative z-10 flex h-full min-h-[100svh] flex-col">
        <header className="shrink-0">
          <div className="flex h-14 items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-12">
            <TaurenLogo href="/" priority className="relative z-10" />

            <nav
              aria-label="Principal"
              className="relative z-10 hidden items-center gap-5 text-[10px] font-medium tracking-[0.14em] text-white/75 md:flex lg:gap-8 lg:text-[11px]"
            >
              {navLinks.map((link) => (
                <NavLinkFx key={link.href} href={link.href}>
                  {link.label}
                </NavLinkFx>
              ))}
            </nav>

            <button
              type="button"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
              className="relative z-10 inline-flex size-10 items-center justify-center rounded-lg border border-white/20 bg-black/30 text-white/90 backdrop-blur-sm md:hidden"
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>

          {menuOpen ? (
            <nav className="border-t border-white/10 bg-black/90 px-4 py-5 backdrop-blur-md md:hidden">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLinkFx
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex min-h-11 items-center text-sm font-medium tracking-widest text-white/90"
                    >
                      {link.label}
                    </NavLinkFx>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
        </header>

        <div className="flex flex-1 flex-col justify-end px-4 pb-2 pt-8 sm:justify-center sm:px-10 sm:pb-0 sm:pt-10 lg:px-14 lg:pt-12">
          <div
            key={slide.id}
            className="w-full max-w-4xl animate-in fade-in duration-700 fill-mode-both will-change-transform"
            style={
              reduced
                ? undefined
                : {
                    transform: `translateY(${Math.min(scrollY * 0.1, 60)}px)`,
                    opacity: 1 - Math.min(scrollY / 700, 0.3),
                  }
            }
          >
            <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.25rem]">
              <HeroTitle title={slide.title} />
            </h1>
            <p className="mt-4 max-w-3xl text-[11px] font-medium uppercase leading-[1.7] tracking-[0.1em] text-white/80 sm:mt-6 sm:text-xs md:text-sm lg:text-base">
              {slide.services}
            </p>
            <Link
              href={slide.ctaHref}
              className="group mt-5 inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#00aeef]/80 hover:bg-[#00aeef]/15 hover:shadow-[0_0_28px_rgba(0,174,239,0.2)] sm:mt-8 sm:h-14 sm:px-8 sm:text-sm sm:w-auto sm:justify-start"
            >
              Ver servicio
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>

        <nav
          aria-label="Servicios del hero"
          className="shrink-0 px-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-3 sm:px-10 sm:pb-8 sm:pt-4 lg:px-14"
        >
          <div className="mb-2 flex items-center justify-center gap-1.5 sm:hidden">
            {heroSlides.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(index)}
                aria-label={item.tab}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === active ? "w-6 bg-[#00aeef]" : "w-1.5 bg-white/35"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={prev}
              aria-label="Slide anterior"
              className="hidden size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:text-white sm:inline-flex"
            >
              <ChevronLeft className="size-6" strokeWidth={1.25} />
            </button>

            <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
              {heroSlides.map((item, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "shrink-0 snap-center rounded-full border px-3.5 py-2.5 text-[10px] font-medium tracking-wide transition-all duration-300 sm:px-3.5 sm:py-2 sm:text-[10px]",
                      isActive
                        ? "border-[#00aeef]/60 bg-[#00aeef]/15 text-white shadow-[0_0_20px_rgba(0,174,239,0.15)]"
                        : "border-white/15 bg-black/30 text-white/55"
                    )}
                  >
                    <span className={isActive ? "text-[#00aeef]" : "text-white/40"}>
                      {item.id}
                    </span>
                    <span className="ml-1.5">{item.shortTab}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={next}
              aria-label="Slide siguiente"
              className="hidden size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:text-white sm:inline-flex"
            >
              <ChevronRight className="size-6" strokeWidth={1.25} />
            </button>
          </div>

          <p className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-white/40 sm:hidden">
            Desliza para cambiar
          </p>
        </nav>
      </div>
    </section>
  );
}
