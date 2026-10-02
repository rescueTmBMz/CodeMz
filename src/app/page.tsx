import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/Hero";
import { StatsBar } from "@/components/StatsBar";
import { ChallengeAccordion } from "@/components/ChallengeAccordion";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { InsightCard } from "@/components/Insights";
import { PartnerWall } from "@/components/Partners";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { Icon } from "@/components/Icons";
import { FieldGallery } from "@/components/FieldGallery";
import { SectionHeading } from "@/components/Section";
import { INSIGHTS, SERVICES } from "@/lib/data";

const LATEST = ["recrutamento-qsm-2026", "met-hfc", "hist-fluvial"].map((id) => INSIGHTS.find((i) => i.id === id)!);
const STORIES = INSIGHTS.filter((i) => i.category === "Histórias de campo");

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />

      <section className="bg-surface py-20 sm:py-24" aria-labelledby="h-desafios">
        <div className="container-x">
          <SectionHeading
            eyebrow="O que fazemos"
            title={<span id="h-desafios">Evidências para cada etapa do ciclo de decisão</span>}
            lead="Começamos pela pergunta do cliente. Escolha um desafio para ver como o abordamos."
          />
          <ChallengeAccordion />

          <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <Link href={`/servicos/#${s.id}`} className="card group flex h-full gap-5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-tint text-brand transition-colors group-hover:bg-brand group-hover:text-white"><Icon name={s.icon} className="h-6 w-6" /></span>
                  <span>
                    <span className="block font-display text-lg font-bold leading-snug text-ink">{s.title}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">{s.short}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="h-trabalhos">
        <div className="container-x">
          <SectionHeading
            eyebrow="Nossos trabalhos"
            title={<span id="h-trabalhos">Experiência que gera impacto real</span>}
            lead="Um histórico sólido na execução de projectos complexos, entregando dados precisos que orientam políticas públicas e intervenções humanitárias."
            action={<Link href="/projetos/" className="link-arrow">Ver todos os projectos <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
          />
          <ProjectBrowser limit={6} />
        </div>
      </section>

      <section className="on-dark bg-navy-900 py-20 text-white sm:py-24" aria-labelledby="h-humano">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="Rigor e escuta"
            title={<span id="h-humano">Por trás de cada base de dados, há uma história real</span>}
            lead="O nosso rigor metodológico anda a par da escuta das comunidades: inquiridores que falam as línguas locais e chegam onde é preciso, para que cada voz seja registada com respeito."
          />
          <ul className="grid gap-6 md:grid-cols-3">
            {STORIES.map((s) => (
              <li key={s.id} className="flex flex-col rounded-2xl border border-white/15 bg-white/5 p-7">
                <p className="text-xs font-bold uppercase tracking-wider text-accent-light">{s.meta}</p>
                <h3 className="mt-4 text-xl font-bold !text-white">{s.title}</h3>
                <p className="mt-3 flex-1 leading-relaxed text-white/75">{s.body}</p>
                {s.href && <Link href={s.href} className="mt-5 inline-flex items-center gap-2 font-semibold text-accent-light hover:text-white">Ler o estudo <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
              </li>
            ))}
          </ul>
          <div className="mt-12"><Testimonials count={2} dark /></div>
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="h-campo">
        <div className="container-x">
          <SectionHeading
            eyebrow="Trabalho de campo"
            title={<span id="h-campo">O terreno, documentado</span>}
            lead="A nossa equipa chega onde é necessário — de canoa, a pé ou de moto — para garantir que cada voz seja registada com rigor e respeito."
          />
          <FieldGallery />
        </div>
      </section>

      <section className="py-20 sm:py-24" aria-labelledby="h-insights">
        <div className="container-x">
          <SectionHeading
            eyebrow="Recursos & Insights"
            title={<span id="h-insights">Últimas da Celinka Survey</span>}
            action={<Link href="/recursos/" className="link-arrow">Ver todos os recursos <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>}
          />
          <ul className="grid gap-6 md:grid-cols-3">{LATEST.map((i) => <li key={i.id}><InsightCard i={i} /></li>)}</ul>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24" aria-labelledby="h-parceiros">
        <div className="container-x">
          <SectionHeading center eyebrow="Parceiros" title={<span id="h-parceiros">Confiados por líderes globais e nacionais</span>}
            lead="Organizações internacionais, agências das Nações Unidas e instituições do Governo de Moçambique confiam nos nossos dados." />
          <PartnerWall />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
