"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "INICIO", hint: "VOLVER A" },
  { href: "#servicios", label: "SERVICIOS", hint: "EXPLORA NUESTROS" },
  { href: "#proyectos", label: "PROYECTOS", hint: "DESCUBRE NUESTROS" },
  { href: "#tauren", label: "TAUREN", hint: "CONOCE" },
  { href: "#contacto", label: "CONTACTO", hint: "ESCRÍBENOS" },
] as const;

const socialLinks = [
  {
    href: siteConfig.instagram,
    label: "Instagram",
    handle: "@taurenproeventos",
    icon: InstagramIcon,
    external: true,
  },
  {
    href: siteConfig.linkedin,
    label: "LinkedIn",
    handle: "Tauren Pro Eventos",
    icon: LinkedinIcon,
    external: true,
  },
  {
    href: `mailto:${siteConfig.contactEmail}`,
    label: "Email",
    handle: siteConfig.contactEmail,
    icon: Mail,
    external: false,
  },
] as const;

function SocialConnect({ className }: { className?: string }) {
  return (
    <div className={className}>
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/40">
        Conéctate
      </p>
      <ul className="mt-5 flex flex-col gap-3.5">
        {socialLinks.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex min-w-0 items-center gap-3 text-[13px] text-white/45 transition-colors hover:text-white"
              >
                <Icon className="size-4 shrink-0" />
                <span className="truncate">
                  <span className="text-white/70 group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="text-white/40">: {item.handle}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] bg-transparent">
      <div
        className={cn(
          "mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-12",
          menuOpen && "pointer-events-none opacity-0"
        )}
      >
        <TaurenLogo href="/" priority className="relative z-10" />

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
          className="relative z-10 inline-flex size-10 items-center justify-center text-white/90"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-[80] bg-black transition-opacity duration-300",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!menuOpen}
      >
        <div className="flex h-dvh w-full flex-col lg:flex-row">
          <aside className="hidden w-[38%] max-w-[28rem] shrink-0 flex-col justify-between px-12 py-10 xl:px-14 xl:py-12 lg:flex">
            <TaurenLogo
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-fit"
            />
            <SocialConnect className="max-w-[15rem]" />
          </aside>

          <div className="relative flex min-h-0 min-w-0 flex-1 flex-col lg:border-l lg:border-white/[0.08]">
            <div className="flex shrink-0 items-center justify-between px-5 py-4 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:z-20 lg:justify-end lg:px-10 lg:py-8">
              <TaurenLogo
                href="/"
                onClick={() => setMenuOpen(false)}
                className="w-fit lg:hidden"
                imageClassName="h-8 sm:h-10"
              />
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-11 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                <X className="size-7" strokeWidth={1.25} />
              </button>
            </div>

            <nav
              aria-label="Menú principal"
              className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain lg:overflow-hidden"
            >
              <ul className="flex min-h-full w-full flex-col lg:h-full">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="flex border-b border-white/[0.08] first:border-t lg:min-h-0 lg:flex-1"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative flex w-full items-center justify-between gap-4 overflow-hidden px-5 py-5 sm:px-10 sm:py-6 lg:px-16 lg:py-0 xl:px-20"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-[#00aeef] transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                        style={{
                          background:
                            "radial-gradient(ellipse 60% 90% at 16% 50%, rgba(0,174,239,0.32) 0%, transparent 70%)",
                        }}
                        aria-hidden
                      />
                      <span className="relative flex min-w-0 flex-col gap-1.5 sm:gap-2">
                        <span className="text-[10px] font-medium uppercase tracking-[0.26em] text-white/40 sm:text-[11px]">
                          {link.hint}
                        </span>
                        <span
                          className="font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-white"
                          style={{
                            fontSize: "clamp(2rem, 8.2vh, 5.25rem)",
                          }}
                        >
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="relative size-5 shrink-0 text-[#00aeef] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:size-6 lg:size-7"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <SocialConnect className="shrink-0 border-t border-white/[0.08] px-5 py-5 sm:px-8 lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
