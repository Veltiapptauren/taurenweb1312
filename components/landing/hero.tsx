"use client";

import { NavLinkFx } from "@/components/motion/nav-link-fx";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { heroSlides } from "@/lib/hero-slides";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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

function chunkHeroTags(tags: string[]): string[][] {
  if (tags.length <= 3) return [tags];
  if (tags.length === 4) return [tags.slice(0, 2), tags.slice(2)];
  if (tags.length === 5) return [tags.slice(0, 3), tags.slice(3)];
  const rows: string[][] = [];
  for (let i = 0; i < tags.length; i += 3) rows.push(tags.slice(i, i + 3));
  return rows;
}

function HeroTagRows({ tags }: { tags: string[] }) {
  return (
    <div className="mt-3 flex max-w-xl flex-col gap-1 sm:mt-4 sm:max-w-2xl sm:gap-1.5">
      {chunkHeroTags(tags).map((row) => (
        <p
          key={row.join("|")}
          className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[10px] font-medium uppercase leading-snug tracking-[0.1em] text-white/75 sm:gap-x-2 sm:text-[11px] md:text-xs"
        >
          {row.map((tag, tagIndex) => (
            <span key={tag} className="inline-flex shrink-0 items-center whitespace-nowrap">
              {tagIndex > 0 ? (
                <span aria-hidden className="mr-1.5 text-white/35 sm:mr-2">
                  |
                </span>
              ) : null}
              {tag}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export function Hero() {
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const reduced = usePrefersReducedMotion();
  const slide = heroSlides[active];
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
    const timer = setInterval(next, 9000);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    if (slide.video || slide.images.length <= 1) return;
    const timer = setInterval(() => {
      setImageIndex((i) => (i + 1) % slide.images.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [slide]);

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
        "relative isolate h-[100svh] min-h-[100svh] overflow-hidden bg-neutral-950 text-white/95"
      )}
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
            <h1 className="text-[2rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-4xl md:text-[2.75rem] lg:text-5xl">
              <HeroTitle title={slide.title} />
            </h1>
            <HeroTagRows tags={slide.tags} />
            <Link
              href={slide.ctaHref}
              className="group mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/40 bg-white/10 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-all duration-300 hover:border-[#00aeef]/80 hover:bg-[#00aeef]/15 hover:shadow-[0_0_28px_rgba(0,174,239,0.2)] sm:mt-6 sm:h-12 sm:w-auto sm:justify-start sm:px-7 sm:text-xs"
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
        </nav>
      </div>
    </section>
  );
}
