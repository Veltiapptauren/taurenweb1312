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
      <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
        Connect
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
                className="group flex items-center gap-3 text-[13px] text-white/45 transition-colors hover:text-white"
              >
                <Icon className="size-4 shrink-0" />
                <span>
                  {item.label}: {item.handle}
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
        <div className="flex h-full flex-col lg:flex-row">
          <aside className="hidden shrink-0 flex-col justify-between px-12 py-10 lg:flex lg:w-[32%]">
            <TaurenLogo
              href="/"
              onClick={() => setMenuOpen(false)}
              className="w-fit"
            />
            <SocialConnect />
          </aside>

          <div className="relative flex min-h-0 flex-1 flex-col lg:border-l lg:border-white/[0.08]">
            <div className="flex items-center justify-between px-5 py-5 sm:px-8 lg:absolute lg:inset-x-0 lg:top-0 lg:justify-end lg:px-8 lg:py-6">
              <TaurenLogo
                href="/"
                onClick={() => setMenuOpen(false)}
                className="w-fit lg:hidden"
              />
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setMenuOpen(false)}
                className="inline-flex size-11 items-center justify-center text-white transition-opacity hover:opacity-70"
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>

            <nav
              aria-label="Menú principal"
              className="flex min-h-0 flex-1 flex-col justify-center overflow-y-auto px-0 py-4 lg:py-8"
            >
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li
                    key={link.href}
                    className="border-b border-white/[0.08] first:border-t"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="group relative flex items-center justify-between gap-6 overflow-hidden px-8 py-5 sm:px-12 sm:py-6 lg:px-20 lg:py-7"
                    >
                      <span
                        className="absolute inset-y-0 left-0 w-px origin-center scale-y-0 bg-[#00aeef] transition-transform duration-300 group-hover:scale-y-100"
                        aria-hidden
                      />
                      <span
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "radial-gradient(ellipse 55% 80% at 20% 50%, rgba(0,174,239,0.28) 0%, transparent 72%)",
                        }}
                        aria-hidden
                      />
                      <span className="relative flex flex-col gap-1.5">
                        <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/35">
                          {link.hint}
                        </span>
                        <span className="text-[clamp(1.5rem,3.2vw,2.75rem)] font-bold leading-none tracking-tight text-white">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="relative size-4 shrink-0 text-[#00aeef] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:size-5"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <SocialConnect className="border-t border-white/[0.08] px-6 py-6 sm:px-8 lg:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}
