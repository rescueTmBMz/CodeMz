import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/Section";
import { Icon } from "@/components/Icons";
import { PartnerWall } from "@/components/Partners";
import { Testimonials } from "@/components/Testimonials";
import { CtaBand } from "@/components/CtaBand";
import { MVV, QUALITY, VALUES } from "@/lib/data";

export const metadata: Metadata = { title: "Sobre Nós", description: "Uma empresa moçambicana de referência em dados e pesquisa, fundada em Maputo em 2021." };

export default function Sobre() {
  return (
    <>
      <PageHero
        eyebrow="Sobre nós"
        title="Uma equipa que combina experiência internacional e conhecimento local"
        lead="A Celinka Survey Consulting & Services Lda. é uma empresa moçambicana fundada em 2021 em Maputo. Reunimos estatísticos, epidemiologistas, analistas e uma rede de mais de 600 inquiridores certificados em todo o país."
        crumbs={[{ label: "Início", href: "/" }, { label: "Sobre Nós" }]}
      />

      <section className="py-20 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <span className="eyebrow">Quem somos</span>
            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Transformar dados em evidências que impulsionam decisões</h2>
            <p className="mt-6 text-lg leading-relaxed">Fundada em 2021 em Maputo, a Celinka Survey nasceu com o propósito de transformar dados em evidências que impulsionam decisões estratégicas para o desenvolvimento sustentável.</p>
            <p className="mt-4 text-lg leading-relaxed">Somos especialistas em estudos estatísticos, avaliações de impacto e monitoria de programas de saúde e socioeconómicos. A nossa equipa combina experiência internacional com profundo conhecimento do contexto local e das línguas das comunidades onde actuamos.</p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {VALUES.map((v) => (
              <li key={v.title} className="card flex gap-4 p-6">
                <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-accent-ink" />
                <span><span className="block font-display font-bold text-ink">{v.title}</span><span className="text-sm text-muted">{v.text}</span></span>
              </li>
            ))}
          </ul>
        </div>
        <div className="container-x mt-14 grid gap-6 md:grid-cols-3">
          {MVV.map((m) => (
            <div key={m.k} className="card border-t-4 border-t-accent p-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-accent-ink">{m.k}</h3>
              <p className="mt-4 text-lg leading-relaxed text-ink">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tecnologia" className="on-dark bg-navy-900 py-20 text-white sm:py-24">
        <div className="container-x">
          <SectionHeading light eyebrow="Tecnologia e qualidade" title="Tecnologia que garante cada dado"
            lead="O nosso diferencial é a combinação de alcance operacional massivo com controlo de qualidade tecnológico rigoroso. Cada entrevista é monitorizada, verificada e validada antes de entrar na base de dados final. Não aceitamos dados sem rastreabilidade completa." />
          <ul className="grid gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/15 md:grid-cols-2 lg:grid-cols-3">
            {QUALITY.map((q) => (
              <li key={q.title} className="bg-navy-900 p-8 transition-colors hover:bg-navy-800">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent-light"><Icon name={q.icon} className="h-6 w-6" /></span>
                <h3 className="mt-5 text-lg font-bold !text-white">{q.title}</h3>
                <p className="mt-2 leading-relaxed text-white/70">{q.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="parceiros" className="py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Parceiros" title="Quem confia nos nossos dados" lead="Agências das Nações Unidas, instituições académicas, organizações de desenvolvimento e entidades do Governo de Moçambique." />
          <PartnerWall />
        </div>
      </section>

      <section id="testemunhos" className="bg-surface py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Testemunhos" title="O que dizem os nossos parceiros" lead="Feedback de organizações que confiaram na Celinka Survey para os seus projectos mais críticos." />
          <Testimonials />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
