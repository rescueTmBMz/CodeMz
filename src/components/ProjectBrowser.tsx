"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PROJECTS, SECTORS, type Project } from "@/lib/data";
import { PartnerLogos } from "./Partners";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="card group relative flex h-full flex-col p-7 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift">
      <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider">
        <span className="rounded-full bg-accent-tint px-3 py-1 text-accent-ink">{p.sector}</span>
        <span className="text-muted">{p.year}</span>
      </div>
      <h3 className="mt-5 text-xl font-bold leading-snug">
        <Link href={`/projetos/${p.slug}/`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-[-3px]">{p.title}</Link>
      </h3>
      <p className="mt-3 leading-relaxed text-muted">{p.summary}</p>
      <div className="mt-6 flex-1" />
      <PartnerLogos keys={p.partners} size="sm" />
      <p className="mt-4 border-t border-line pt-4 text-sm text-muted">Cliente: <span className="font-semibold text-ink">{p.client}</span></p>
      <span className="link-arrow mt-4 text-[0.95rem]">Ler estudo de caso <ArrowRight aria-hidden="true" className="h-4 w-4" /></span>
    </article>
  );
}

export function ProjectBrowser({ limit }: { limit?: number }) {
  const [sector, setSector] = useState<string>("Todos");
  const filtered = PROJECTS.filter((p) => sector === "Todos" || p.sector === sector);
  const shown = limit ? filtered.slice(0, limit) : filtered;
  const tabs = ["Todos", ...SECTORS];

  return (
    <div>
      <div role="group" aria-label="Filtrar projectos por sector" className="mb-10 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t} type="button" aria-pressed={sector === t} onClick={() => setSector(t)}
            className={`min-h-11 rounded-full border px-5 text-[0.95rem] font-semibold transition-colors ${sector === t ? "border-navy-900 bg-navy-900 text-white" : "border-slate-300 bg-white text-ink hover:border-brand hover:text-brand"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status" aria-live="polite">{shown.length} projectos apresentados</p>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p, i) => (
          <li key={p.slug} className={i === 0 && sector === "Todos" && !limit ? "lg:col-span-1" : ""}><ProjectCard p={p} /></li>
        ))}
      </ul>
    </div>
  );
}
