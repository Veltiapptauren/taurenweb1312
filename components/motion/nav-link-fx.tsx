"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

type NavLinkFxProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export function NavLinkFx({ href, children, className, onClick }: NavLinkFxProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group relative transition-colors hover:text-white",
        className
      )}
    >
      {children}
      <span
        className="absolute -bottom-1 left-0 h-px w-0 bg-[#00aeef] transition-all duration-300 group-hover:w-full"
        aria-hidden
      />
    </Link>
  );
}
