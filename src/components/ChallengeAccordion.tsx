"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Compass, Database, LineChart, Target } from "lucide-react";
import { CHALLENGES } from "@/lib/data";

const CYCLE = [
  { label: "Desenhar", text: "Indicadores e metodologia", Icon: Compass },
  { label: "Recolher", text: "Dados verificados no terreno", Icon: Database },
  { label: "Analisar", text: "Evidências e impacto", Icon: LineChart },
  { label: "Decidir", text: "Políticas e programas", Icon: Target },
];
const ACTIVE: Record<string, number[]> = { dados: [1], impacto: [2, 3], sistemas: [0, 3] };

export function ChallengeAccordion() {
  const [open, setOpen] = useState<string>(CHALLENGES[0].id);
  const lit = ACTIVE[open] ?? [];

  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
      <div className="space-y-4">
        {CHALLENGES.map((c, i) => {
          const isOpen = open === c.id;
          return (
            <div key={c.id} className={`card overflow-hidden transition-shadow ${isOpen ? "border-brand shadow-card" : ""}`}>
              <h3>
                <button
                  type="button" aria-expanded={isOpen} aria-controls={`panel-${c.id}`} id={`btn-${c.id}`}
                  onClick={() => setOpen(isOpen ? "" : c.id)}
                  className="flex w-full items-center gap-4 p-6 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-tint font-display font-bold text-brand">{i + 1}</span>
                  <span className="flex-1 font-display text-lg font-bold leading-snug text-ink sm:text-xl">{c.question}</span>
                  <ChevronDown aria-hidden="true" className={`h-5 w-5 shrink-0 text-brand transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </h3>
              <div id={`panel-${c.id}`} role="region" aria-labelledby={`btn-${c.id}`} hidden={!isOpen}>
                <div className="px-6 pb-7 sm:pl-[5.5rem]">
                  <p className="leading-relaxed">{c.answer}</p>
                  <ul className="mt-5 space-y-2.5">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-3"><Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-ink" /><span>{p}</span></li>
                    ))}
                  </ul>
                  <Link href={c.cta.href} className="link-arrow mt-6">{c.cta.label} <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <aside aria-label="Ciclo de decisão baseado em evidências" className="on-dark rounded-3xl bg-navy-900 p-7 text-white sm:p-8">
        <p className="eyebrow eyebrow-light">Ciclo de decisão</p>
        <ol className="mt-6 space-y-3">
          {CYCLE.map(({ label, text, Icon }, i) => {
            const on = lit.includes(i);
            return (
              <li key={label} className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${on ? "border-accent bg-accent/15" : "border-white/10 bg-white/5"}`}>
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${on ? "bg-accent text-navy-900" : "bg-white/10 text-white"}`}><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <span><span className="block font-display font-bold">{label}</span><span className="text-sm text-white/70">{text}</span></span>
              </li>
            );
          })}
        </ol>
      </aside>
    </div>
  );
}
