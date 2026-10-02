import type { Metadata } from "next";
import { ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/Section";
import { JOBS, PHOTOS, SITE, mailto } from "@/lib/data";

export const metadata: Metadata = { title: "Carreiras", description: "Junte-se a uma equipa de impacto: vagas de supervisão, inquirição e análise de dados." };

export default function Carreiras() {
  return (
    <>
      <PageHero
        eyebrow="Trabalhe connosco"
        title="Junte-se a uma equipa de impacto"
        lead="Procuramos profissionais comprometidos com a transformação de dados em evidências que melhoram vidas em Moçambique."
        crumbs={[{ label: "Início", href: "/" }, { label: "Carreiras" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-x max-w-4xl">
          <figure className="mb-10 overflow-hidden rounded-3xl">
            <img src={PHOTOS.rio.src} width={PHOTOS.rio.width} height={PHOTOS.rio.height} alt={PHOTOS.rio.alt} className="aspect-[16/9] w-full object-cover object-bottom" />
          </figure>
          <p className="flex gap-4 rounded-xl border-l-4 border-accent bg-accent-tint p-5 text-ink"><Info aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" /><span>A Celinka Survey não cobra qualquer valor em nenhuma fase do processo de recrutamento.</span></p>
          <ul className="mt-10 space-y-4">
            {JOBS.map((j) => (
              <li key={j.title} className="card flex flex-wrap items-center justify-between gap-6 border-l-4 border-l-brand p-7">
                <div>
                  <h2 className="text-xl font-bold">{j.title}</h2>
                  <p className="mt-1 text-muted">{j.meta}</p>
                  <ul className="mt-3 flex flex-wrap gap-2">{j.tags.map((t) => <li key={t} className="rounded-md bg-brand-tint px-3 py-1 text-sm font-medium text-brand-dark">{t}</li>)}</ul>
                </div>
                <a href={mailto(j.subject)} className="btn btn-accent" aria-label={`Candidatar-se: ${j.title}`}>Candidatar-se <ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-muted">Ou envie o seu CV para <a className="font-semibold text-brand underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p>
        </div>
      </section>
    </>
  );
}
