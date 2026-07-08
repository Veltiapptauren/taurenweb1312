"use client";

import { TaurenLogo } from "@/components/brand/tauren-logo";
import { NavLinkFx } from "@/components/motion/nav-link-fx";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#servicios", label: "SERVICIOS" },
  { href: "#proyectos", label: "PROYECTOS" },
  { href: "#tauren", label: "TAUREN" },
  { href: "#contacto", label: "CONTACTO" },
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] bg-transparent">
      <div className="mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-8 lg:px-12">
        <TaurenLogo href="/" priority className="relative z-10" />

        <button
          type="button"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="relative z-10 inline-flex size-10 items-center justify-center rounded-lg text-white/90"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 top-14 z-[60] origin-top border-b border-white/10 bg-black/90 backdrop-blur-md transition-all duration-200",
          menuOpen ? "opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        )}
      >
        <nav aria-label="Menú móvil" className="px-4 py-5 sm:px-8">
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
      </div>
    </header>
  );
}

