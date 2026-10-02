"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { INSIGHTS, type Insight } from "@/lib/data";

const TONE: Record<Insight["category"], string> = {
  "Notícias": "bg-brand-tint text-brand-dark",
  "Metodologia": "bg-accent-tint text-accent-ink",
  "Histórias de campo": "bg-amber-100 text-amber-900",
};

export function InsightCard({ i }: { i: Insight }) {
  return (
    <article className="card group relative flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
        <span className={`rounded-full px-3 py-1 ${TONE[i.category]}`}>{i.category}</span>
        {(i.date || i.meta) && <span className="text-muted">{i.date ?? i.meta}</span>}
      </div>
      <h3 className="mt-5 text-xl font-bold leading-snug">
        {i.href ? <Link href={i.href} className="after:absolute after:inset-0 after:content-['']">{i.title}</Link> : i.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{i.body}</p>
      {i.date && i.meta && <p className="mt-4 text-sm text-muted">{i.meta}</p>}
      {i.href && <span className="link-arrow mt-5 text-[0.95rem]">Saber mais <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>}
    </article>
  );
}

export function InsightBrowser() {
  const cats = ["Todos", "Notícias", "Metodologia", "Histórias de campo"] as const;
  const [cat, setCat] = useState<(typeof cats)[number]>("Todos");
  const shown = INSIGHTS.filter((i) => cat === "Todos" || i.category === cat);
  return (
    <div>
      <div role="group" aria-label="Filtrar por tipo" className="mb-10 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}
            className={`min-h-11 rounded-full border px-5 text-[0.95rem] font-semibold transition-colors ${cat === c ? "border-navy-900 bg-navy-900 text-white" : "border-slate-300 bg-white text-ink hover:border-brand hover:text-brand"}`}>
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{shown.length} artigos apresentados</p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((i) => <li key={i.id}><InsightCard i={i} /></li>)}
      </ul>
    </div>
  );
}
