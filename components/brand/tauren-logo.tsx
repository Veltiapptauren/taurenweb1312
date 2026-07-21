import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type TaurenLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  onClick?: () => void;
};

type TaurenWordmarkProps = {
  className?: string;
};

export function TaurenWordmark({ className }: TaurenWordmarkProps) {
  return (
    <div className={cn("inline-flex flex-col gap-1", className)}>
      <span className="text-2xl font-semibold leading-none tracking-tight text-white sm:text-[1.75rem]">
        Tauren
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-[#00aeef] sm:text-[11px]">
        Pro Eventos
      </span>
    </div>
  );
}

export function TaurenLogo({
  href = "/",
  className,
  imageClassName,
  priority = false,
  onClick,
}: TaurenLogoProps) {
  const image = (
    <Image
      src={siteConfig.logo}
      alt={siteConfig.name}
      width={320}
      height={88}
      priority={priority}
      className={cn("h-10 w-auto max-w-[min(52vw,280px)] sm:h-12 sm:max-w-[320px]", imageClassName)}
    />
  );

  if (!href) return image;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative z-10 inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        className
      )}
    >
      {image}
    </Link>
  );
}
