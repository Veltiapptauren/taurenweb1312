"use client";

import { InstagramIcon, LinkedinIcon } from "@/components/icons/social-icons";
import { siteConfig } from "@/lib/site";
import { Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Link from "next/link";

const serviceLinks = [
  { href: "#streaming", label: "Streaming en vivo" },
  { href: "#produccion-integral", label: "Producción integral" },
  { href: "#produccion-audiovisual", label: "Producción audiovisual" },
  { href: "#diseno-web", label: "Web y apps móviles" },
] as const;

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Casos de Éxito" },
  { href: "#tauren", label: "Tauren" },
] as const;

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/40">
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function ContactRow({
  href,
  icon: Icon,
  children,
  external,
}: {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white";

  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#0a2744] text-[#00aeef] transition-colors group-hover:bg-[#0d3056]">
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <span className="pt-1.5 leading-snug">{children}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return (
    <a href={href} className={className}>
      {content}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-black">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-9">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div>
            <Link
              href="/"
              className="inline-block text-base font-semibold tracking-tight text-white"
            >
              Tauren <span className="text-[#00aeef]">Pro</span> Eventos
            </Link>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/45">
              Streaming y eventos corporativos en Chile
            </p>
            <div className="mt-3 flex gap-2.5">
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-white/50 transition-colors hover:text-[#00aeef]"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/50 transition-colors hover:text-[#00aeef]"
              >
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </div>

          <FooterColumn title="Servicios">
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Navegación">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs text-white/55 transition-colors hover:text-white/85"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contacto">
            <ul className="space-y-4">
              <li>
                <ContactRow href={`mailto:${siteConfig.contactEmail}`} icon={Mail}>
                  {siteConfig.contactEmail}
                </ContactRow>
              </li>
              <li>
                <ContactRow href={`tel:${siteConfig.contactPhoneTel}`} icon={Phone}>
                  {siteConfig.contactPhone}
                </ContactRow>
              </li>
              <li>
                <ContactRow
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteConfig.contactAddress)}`}
                  icon={MapPin}
                  external
                >
                  {siteConfig.contactAddress}
                </ContactRow>
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div
          className="mt-7 flex flex-col gap-1.5 border-t border-white/[0.06] pt-5 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between"
          suppressHydrationWarning
        >
          <p>© {new Date().getFullYear()} {siteConfig.name}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-fit text-left transition-colors hover:text-white/60"
          >
            Volver arriba
          </button>
        </div>
      </div>
    </footer>
  );
}
