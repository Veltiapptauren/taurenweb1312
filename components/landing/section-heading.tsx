import { TextReveal } from "@/components/motion/text-reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  badge?: string;
  className?: string;
  titleClassName?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  badge,
  className,
  titleClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      {label ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00aeef]">
          {label}
        </p>
      ) : null}
      <TextReveal
        as="h2"
        text={title}
        className={cn(
          "mt-3 block text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl",
          !label && "mt-0",
          titleClassName
        )}
      />
      {description ? (
        <p className="mt-4 text-sm text-white/60 sm:text-base">{description}</p>
      ) : null}
      {badge ? (
        <p className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          <span className="size-1.5 rounded-full bg-[#00aeef]" />
          {badge}
        </p>
      ) : null}
    </div>
  );
}
