"use client";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import { useEffect, useId, useRef, useState } from "react";

type TextRevealProps = {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = "span",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [runId, setRunId] = useState(0);
  const reduced = usePrefersReducedMotion();
  const animId = useId().replace(/:/g, "");
  const words = text.split(" ");

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setRunId((id) => id + 1);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -5% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes ${animId}-shine {
              0% { background-position: 140% center; }
              100% { background-position: -40% center; }
            }
            .${animId}-word {
              background-image: linear-gradient(
                100deg,
                #ffffff 0%,
                #ffffff 36%,
                #9ee8ff 42%,
                #00aeef 50%,
                #d4f6ff 54%,
                #ffffff 60%,
                #ffffff 100%
              );
              background-size: 300% 100%;
              background-position: 140% center;
              -webkit-background-clip: text;
              background-clip: text;
              color: transparent;
              -webkit-text-fill-color: transparent;
            }
            .${animId}-word.${animId}-active {
              animation: ${animId}-shine 2.8s cubic-bezier(0.33, 1, 0.45, 1) forwards;
            }
          `,
        }}
      />
      <Tag ref={ref as never} className={className}>
        {words.map((word, index) => (
          <span
            key={`${word}-${index}-${runId}`}
            className={cn(
              `${animId}-word mr-[0.25em] inline-block`,
              visible && `${animId}-active`
            )}
            style={{
              animationDelay: visible ? `${delay + index * 200}ms` : undefined,
            }}
          >
            {word}
          </span>
        ))}
      </Tag>
    </>
  );
}
