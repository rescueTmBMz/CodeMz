import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { CtaBand } from "@/components/CtaBand";
import { QUALITY, SERVICES } from "@/lib/data";

export const metadata: Metadata = { title: "O Que Fazemos", description: "Monitoria e avaliação, inquéritos CAPI, monitoria de terceira parte, desenvolvimento institucional, pesquisa em saúde e sistemas de informação." };

const TOOLS = ["STATA", "SPSS", "QGIS", "SurveyCTO", "Epi Info", "Nvivo", "ODK", "KoboToolbox", "CSPro", "DHIS2"];

export default function Servicos() {
  return (
    <>
      <PageHero
        eyebrow="O que fazemos"
        title="Serviços especializados em cada etapa do ciclo de pesquisa"
        lead="Da concepção ao relatório final, oferecemos soluções integradas de pesquisa com rigor metodológico e tecnologia de ponta."
        crumbs={[{ label: "Início", href: "/" }, { label: "O Que Fazemos" }]}
      />

      <section className="container-x">
        {SERVICES.map((s, i) => (
          <article key={s.id} id={s.id} className="grid scroll-mt-28 items-center gap-10 border-b border-line py-16 last:border-0 lg:grid-cols-2 lg:gap-20">
            <div className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-navy-900 ${i % 2 ? "lg:order-2" : ""}`} aria-hidden="true">
              <span data-n={String(i + 1).padStart(2, "0")} className="absolute left-6 top-4 font-display text-7xl font-extrabold text-white/10 before:content-[attr(data-n)]" />
              <div className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
              <span className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-white/10 text-accent-light ring-1 ring-white/20 backdrop-blur"><Icon name={s.icon} className="h-14 w-14" strokeWidth={1.5} /></span>
            </div>
            <div>
              <span className="eyebrow">Serviço {String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">{s.title}</h2>
              <p className="mt-5 text-lg leading-relaxed">{s.long}</p>
              <ul className="mt-6 flex flex-wrap gap-2">{s.tags.map((t) => <li key={t} className="rounded-md bg-brand-tint px-3 py-1.5 text-sm font-medium text-brand-dark">{t}</li>)}</ul>
              <Link href="/contacto/" className="link-arrow mt-8">Pedir uma proposta <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Controlo de qualidade" title="Qualidade em cada fase do trabalho" />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {QUALITY.map((q) => (
              <li key={q.title} className="card border-t-4 border-t-brand p-7">
                <Icon name={q.icon} className="h-7 w-7 text-brand" />
                <h3 className="mt-4 text-lg font-bold">{q.title}</h3>
                <p className="mt-2 text-muted">{q.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-14">
            <p className="eyebrow">Ferramentas e plataformas</p>
            <ul className="mt-5 flex flex-wrap gap-3">{TOOLS.map((t) => <li key={t} className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-semibold text-ink">{t}</li>)}</ul>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
