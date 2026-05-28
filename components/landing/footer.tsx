import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm text-white/50" suppressHydrationWarning>
            © {new Date().getFullYear()} {siteConfig.name}. Todos los derechos
            reservados.
          </p>
        </div>
        <nav aria-label="Legal" className="flex gap-6 text-sm text-white/50">
          <Link href="/robots.txt" className="hover:text-white">
            Robots
          </Link>
          <Link href="/sitemap.xml" className="hover:text-white">
            Sitemap
          </Link>
        </nav>
      </div>
    </footer>
  );
}
