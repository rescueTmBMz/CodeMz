import type { Metadata } from "next";
import Image from "next/image";
import { LEGACY, MISSION, VALUES, VISION } from "@/lib/data";
import { CtaBand, PageHero, SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Quem somos", description: "Visão, missão, valores e legado da Fundação Joaquim Chissano." };

export default function Sobre() {
  return (
    <>
      <PageHero crumb="Quem somos" eyebrow="Identidade" title="Visão, missão e valores" lead="Um espaço de convergência para a paz, ao serviço de Moçambique e de África." />
      <section className="py-20">
        <div className="container-x grid gap-8 md:grid-cols-2">
          <article className="card border-t-4 border-t-blue"><h2 className="text-2xl font-extrabold">Visão</h2><p className="mt-4 text-lg leading-relaxed">{VISION}</p></article>
          <article className="card border-t-4 border-t-orange"><h2 className="text-2xl font-extrabold">Missão</h2><p className="mt-4 text-lg leading-relaxed">{MISSION}</p></article>
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Valores" title="O que nos guia" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <li key={v} className="card"><span className="font-display text-3xl font-extrabold text-orange-ink">0{i + 1}</span><p className="mt-3 font-semibold text-ink">{v}</p></li>
            ))}
          </ul>
        </div>
      </section>
      <section className="py-20">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="O legado" title="Um legado ao serviço da paz" lead="Joaquim Alberto Chissano é o Patrono e Presidente da Fundação e mediador de paz internacional." />
            <ol className="space-y-5 border-l-2 border-orange pl-6">
              {LEGACY.map((l) => (
                <li key={l.year}><p className="font-display text-2xl font-extrabold text-orange-ink">{l.year} · <span className="text-ink">{l.title}</span></p><p>{l.text}</p></li>
              ))}
            </ol>
          </div>
          <Image src="/photos/homenagem.jpg" alt="Joaquim Chissano recebe uma distinção" width={270} height={190} className="w-full rounded-3xl object-cover shadow-card" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
