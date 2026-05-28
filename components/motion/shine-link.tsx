"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type ShineLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function ShineLink({ href, children, className, external }: ShineLinkProps) {
  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden transition-colors",
    className
  );

  const shine = (
    <span
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      aria-hidden
    />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {shine}
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {shine}
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
