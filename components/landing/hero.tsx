"use client";

import { NavLinkFx } from "@/components/motion/nav-link-fx";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { heroSlides } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";
import { ArrowRight, Menu, X } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { TaurenLogo } from "@/components/brand/tauren-logo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

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
      {words.slice(0, 2).join(" ")}
      <br />
      {words.slice(2).join(" ")}
    </>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const reduced = usePrefersReducedMotion();
  const slide = heroSlides[active];

  const goTo = useCallback((index: number) => {
    setActive(index);
  }, []);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 9000);
    return () => clearInterval(timer);
  }, [next]);

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
      className={`${montserrat.className} relative isolate min-h-[92dvh] overflow-hidden bg-neutral-950 text-white/95`}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        {heroSlides.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== active}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center brightness-[0.82] saturate-[0.85]"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[92dvh] flex-col">
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
              className="relative z-10 inline-flex size-9 items-center justify-center rounded-md border border-white/20 text-white/80 md:hidden"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>

          {menuOpen && (
            <nav className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur-md md:hidden">
              <ul className="flex flex-col gap-2.5 text-xs font-medium tracking-widest text-white/85">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLinkFx
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLinkFx>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </header>

        <div className="flex flex-1 items-center px-4 pt-6 sm:px-8 lg:px-12">
          <div
            key={slide.id}
            className="w-full max-w-3xl animate-in fade-in duration-700 fill-mode-both will-change-transform"
            style={
              reduced
                ? undefined
                : {
                    transform: `translateY(${Math.min(scrollY * 0.1, 60)}px)`,
                    opacity: 1 - Math.min(scrollY / 700, 0.3),
                  }
            }
          >
            <h1 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white/95 sm:text-4xl md:text-5xl lg:text-6xl">
              <HeroTitle title={slide.title} />
            </h1>
            <p className="mt-4 max-w-2xl text-[10px] font-normal uppercase leading-relaxed tracking-[0.1em] text-white/70 sm:mt-5 sm:text-[11px] md:text-xs">
              {slide.services}
            </p>
            <Link
              href={slide.ctaHref}
              className="group mt-7 inline-flex h-11 items-center gap-2.5 rounded-full border border-white/40 bg-white/10 px-6 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#00aeef]/80 hover:bg-[#00aeef]/15 hover:shadow-[0_0_28px_rgba(0,174,239,0.2)] sm:mt-8 sm:h-12 sm:px-7"
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
          className="shrink-0 px-4 pb-5 pt-2 sm:px-8 sm:pb-6 lg:px-12"
        >
          <div className="flex max-w-full gap-1.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-2 [&::-webkit-scrollbar]:hidden">
            {heroSlides.map((item, index) => {
              const isActive = index === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "shrink-0 rounded-full border px-2.5 py-1.5 text-[9px] font-medium tracking-wide transition-all duration-300 sm:px-3.5 sm:py-2 sm:text-[10px]",
                    isActive
                      ? "border-[#00aeef]/60 bg-[#00aeef]/10 text-white"
                      : "border-white/10 bg-white/[0.04] text-white/40 hover:border-white/25 hover:text-white/65"
                  )}
                >
                  <span className={isActive ? "text-[#00aeef]" : "text-white/35"}>
                    {item.id}
                  </span>
                  <span className="ml-1.5">{item.shortTab}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </section>
  );
}
