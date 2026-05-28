import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type TaurenLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

export function TaurenLogo({
  href = "/",
  className,
  imageClassName,
  priority = false,
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
      className={cn(
        "relative z-10 inline-flex shrink-0 items-center transition-opacity hover:opacity-90",
        className
      )}
    >
      {image}
    </Link>
  );
}
