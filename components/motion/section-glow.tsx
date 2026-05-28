export function SectionGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-32 top-1/4 h-64 w-64 rounded-full bg-[#00aeef]/10 blur-[100px]" />
      <div className="absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-[#00aeef]/8 blur-[120px]" />
    </div>
  );
}
