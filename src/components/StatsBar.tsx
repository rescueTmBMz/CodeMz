import { STATS } from "@/lib/data";
import { CountUp } from "./CountUp";

export function StatsBar() {
  return (
    <section aria-label="Números da Celinka Survey" className="border-b border-line bg-white">
      <div className="container-x">
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`px-4 py-10 sm:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 0 ? "lg:pl-0" : ""}`}>
              <dd className="font-display text-4xl font-extrabold tracking-tight text-brand sm:text-5xl"><CountUp value={s.value} suffix={s.suffix} /></dd>
              <dt className="mt-3 font-semibold text-ink">{s.label}</dt>
              <dd className="text-sm text-muted">{s.note}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
