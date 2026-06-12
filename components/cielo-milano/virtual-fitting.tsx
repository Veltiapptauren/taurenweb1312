"use client";

import { OutfitPreview } from "@/components/cielo-milano/outfit-preview";
import {
  cieloDefaultLocale,
  cieloMilanoTranslations,
  getColorLabel,
  getGarmentCopy,
  type CieloLocale,
} from "@/lib/cielo-milano-i18n";
import {
  cieloGarments,
  cieloMilanoBrand,
  cieloSizes,
  type CieloGarment,
} from "@/lib/cielo-milano";
import { cn } from "@/lib/utils";
import { ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

function LanguageSwitcher({
  locale,
  onChange,
}: {
  locale: CieloLocale;
  onChange: (locale: CieloLocale) => void;
}) {
  return (
    <div className="inline-flex rounded-full border border-[#1a1410]/12 bg-white/60 p-0.5">
      {(["es", "it"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => onChange(code)}
          className={cn(
            "rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors",
            locale === code
              ? "bg-[#1a1410] text-[#f5f0e8]"
              : "text-[#1a1410]/50 hover:text-[#1a1410]/80",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

export function VirtualFitting() {
  const [locale, setLocale] = useState<CieloLocale>(cieloDefaultLocale);
  const [garmentId, setGarmentId] = useState(cieloGarments[0].id);
  const [colorId, setColorId] = useState(cieloGarments[0].colors[0].id);
  const [size, setSize] = useState<(typeof cieloSizes)[number]>("42");

  const t = cieloMilanoTranslations[locale];

  const garment = useMemo(
    () => cieloGarments.find((g) => g.id === garmentId) ?? cieloGarments[0],
    [garmentId],
  );

  const garmentCopy = useMemo(
    () => getGarmentCopy(locale, garment.id),
    [locale, garment.id],
  );

  const colorLabel = useMemo(
    () => getColorLabel(locale, garment.id, colorId),
    [locale, garment.id, colorId],
  );

  const selectGarment = (g: CieloGarment) => {
    setGarmentId(g.id);
    setColorId(g.colors[0].id);
  };

  return (
    <div className="min-h-screen bg-[#f5f0e8] text-[#1a1410]">
      <header className="border-b border-[#1a1410]/8 bg-[#f5f0e8]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#1a1410]/45">
              {cieloMilanoBrand.tagline}
            </p>
            <h1 className="font-serif text-2xl font-light tracking-wide sm:text-3xl">
              {cieloMilanoBrand.name}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher locale={locale} onChange={setLocale} />
            <span className="hidden items-center gap-1.5 rounded-full border border-[#c9a962]/40 bg-[#c9a962]/10 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#8a7340] sm:inline-flex">
              <Sparkles className="size-3" />
              {t.experienceBadge}
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_380px] lg:gap-10 lg:py-12 sm:px-6">
        <section className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.2em] text-[#1a1410]/50">
            {t.previewOutfit}
          </p>
          <div className="relative mt-4 flex flex-1 flex-col overflow-hidden rounded-2xl border border-[#1a1410]/10 shadow-md">
            <OutfitPreview
              locale={locale}
              garmentId={garment.id}
              garmentImageSrc={garment.productImage}
              className="min-h-[520px] lg:min-h-[620px]"
            />
            <div className="relative z-10 flex flex-wrap items-end justify-between gap-2 border-t border-[#1a1410]/8 bg-[#f5f0e8]/35 px-4 py-3 backdrop-blur-sm sm:px-5">
              <div>
                <p className="font-serif text-lg text-[#1a1410]">
                  {garmentCopy.name}
                </p>
                <p className="text-xs text-[#1a1410]/55">
                  {t.sizeLabel} {size} · {colorLabel}
                </p>
              </div>
              <p className="font-serif text-xl text-[#8a7340]">{garment.price}</p>
            </div>
          </div>
        </section>

        <aside className="flex flex-col gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1a1410]/50">
              {t.selectGarment}
            </p>
            <ul className="mt-3 space-y-2">
              {cieloGarments.map((g) => {
                const active = g.id === garmentId;
                const copy = getGarmentCopy(locale, g.id);
                return (
                  <li key={g.id}>
                    <button
                      type="button"
                      onClick={() => selectGarment(g)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl border p-2.5 text-left transition-all",
                        active
                          ? "border-[#c9a962] bg-white shadow-sm"
                          : "border-transparent bg-white/50 hover:border-[#1a1410]/10 hover:bg-white",
                      )}
                    >
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-[#ebe4d6]">
                        <Image
                          src={g.image}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{copy.name}</p>
                        <p className="text-[11px] text-[#1a1410]/50">
                          {copy.category} · {g.price}
                        </p>
                      </div>
                      <ChevronRight
                        className={cn(
                          "size-4 shrink-0 text-[#c9a962] transition-opacity",
                          active ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1a1410]/50">
              {t.color}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {garment.colors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  aria-label={getColorLabel(locale, garment.id, c.id)}
                  title={getColorLabel(locale, garment.id, c.id)}
                  className={cn(
                    "size-9 rounded-full border-2 transition-transform hover:scale-105",
                    colorId === c.id
                      ? "border-[#c9a962] ring-2 ring-[#c9a962]/30"
                      : "border-[#1a1410]/15",
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-[#1a1410]/55">{colorLabel}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#1a1410]/50">
              {t.size}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {cieloSizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "min-w-[44px] rounded-lg border px-3 py-2 text-sm transition-colors",
                    size === s
                      ? "border-[#1a1410] bg-[#1a1410] text-[#f5f0e8]"
                      : "border-[#1a1410]/15 bg-white/60 hover:bg-white",
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              toast.success(t.cartToast, {
                style: {
                  background: "#1a1410",
                  color: "#f5f0e8",
                },
              })
            }
            className="mt-auto w-full rounded-xl bg-[#c9a962] py-3.5 text-sm font-semibold uppercase tracking-wider text-[#1a1410] transition-opacity hover:opacity-90"
          >
            {t.addToCart}
          </button>
        </aside>
      </div>

      <footer className="border-t border-[#1a1410]/8 px-4 py-5 text-center text-[11px] text-[#1a1410]/40 sm:px-6">
        <p>{cieloMilanoBrand.city}</p>
        <p className="mt-1">{t.footerCredit}</p>
      </footer>
    </div>
  );
}
