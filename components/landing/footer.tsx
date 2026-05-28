"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import { getWhatsAppUrl, siteConfig } from "@/lib/site";
import Link from "next/link";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#tauren", label: "Tauren" },
  { href: "#contacto", label: "Contacto" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <TaurenLogo href="#tauren" imageClassName="h-8 sm:h-9 sm:max-w-[240px]" />
            <p className="mt-2 text-xs leading-relaxed text-white/40">
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="transition-colors hover:text-white/70"
              >
                {siteConfig.contactEmail}
              </a>
              <span className="mx-2 text-white/20">·</span>
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white/70"
              >
                {siteConfig.contactPhone}
              </a>
              <span className="mx-2 text-white/20">·</span>
              <span>{siteConfig.contactAddress}</span>
            </p>
          </div>

          <nav
            aria-label="Pie de página"
            className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/45"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-white/80"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit transition-colors hover:text-white/60"
          >
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  );
}
