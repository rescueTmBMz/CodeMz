import { PARTNERS, type PartnerKey } from "@/lib/data";

export function PartnerLogos({ keys, size = "md" }: { keys: PartnerKey[]; size?: "sm" | "md" }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
      {keys.map((k) => {
        const p = PARTNERS[k];
        return (
          <li key={k} className="flex items-center">
            {p.logo ? (
              <img src={p.logo} alt={p.name} loading="lazy" className={`w-auto object-contain ${size === "sm" ? "h-7 max-w-[5.5rem]" : "h-10 max-w-[7rem]"}`} />
            ) : (
              <span className="rounded-md bg-surface px-2.5 py-1 text-xs font-bold text-ink">{p.name}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function PartnerWall({ filter }: { filter?: "intl" | "nat" }) {
  const items = (Object.keys(PARTNERS) as PartnerKey[]).filter((k) => !filter || PARTNERS[k].type === filter);
  return (
    <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-6">
      {items.map((k) => {
        const p = PARTNERS[k];
        return (
          <li key={k} className="flex min-h-36 flex-col items-center justify-center gap-3 bg-white p-5 text-center">
            {p.logo ? (
              <img src={p.logo} alt="" loading="lazy" className="h-14 w-auto max-w-[8rem] object-contain grayscale transition hover:grayscale-0" />
            ) : (
              <span className="font-display text-xl font-extrabold text-slate-500" aria-hidden="true">FJC</span>
            )}
            <span className="text-sm font-medium text-ink">{p.name}</span>
          </li>
        );
      })}
    </ul>
  );
}
