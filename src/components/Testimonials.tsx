import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/data";

export function Testimonials({ count = 4, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {TESTIMONIALS.slice(0, count).map((t) => (
        <li key={t.org}>
          <figure className={`flex h-full flex-col rounded-2xl p-8 ${dark ? "border border-white/15 bg-white/5" : "card"}`}>
            <Quote aria-hidden="true" className="h-8 w-8 text-accent" />
            <blockquote className={`mt-5 flex-1 text-lg leading-relaxed ${dark ? "text-white/90" : "text-ink"}`}>{t.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              <span aria-hidden="true" className="h-10 w-1 shrink-0 rounded-full bg-accent" />
              <span><span className={`block font-semibold ${dark ? "text-white" : "text-ink"}`}>{t.who}</span><span className={`text-sm ${dark ? "text-white/70" : "text-muted"}`}>{t.org}</span></span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
