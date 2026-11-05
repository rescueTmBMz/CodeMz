import type { Metadata } from "next";
import Image from "next/image";
import { MANAGEMENT, PILLARS, PRINCIPLES } from "@/lib/data";
import { CtaBand, PageHero, SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Plano Estratégico 2026–2035", description: "Os três pilares, o modelo de gestão e os princípios orientadores do Plano Estratégico 2026–2035 da Fundação Joaquim Chissano." };

export default function Plano() {
  return (
    <>
      <PageHero crumb="Plano Estratégico" eyebrow="2026 – 2035" title="Compromisso em acção" lead="A Fundação dá continuidade ao seu percurso, com um impulso institucional renovado que reforça a sua capacidade de acção face aos desafios actuais da sociedade moçambicana." />
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Os pilares" title="Os pilares na resposta aos desafios do nosso tempo" lead="A acção estratégica 2026–2035 organiza-se em torno dos três pilares da Fundação." />
          <div className="grid gap-6 lg:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.key} className="card">
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-3 font-semibold text-ink">{p.summary}</p>
                <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-orange">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Modelo de gestão" title="Acção estratégica" lead="Cinco pilares de gestão interligados, movidos por um processo contínuo de melhoria institucional." />
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {MANAGEMENT.map((m, i) => (
              <li key={m.title} className="card !p-6"><span className="font-display text-2xl font-extrabold text-orange-ink">0{i + 1}</span><h3 className="mt-2 font-bold">{m.title}</h3><p className="mt-2 text-sm">{m.text}</p></li>
            ))}
          </ol>
        </div>
      </section>
      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Estratégia" title="Princípios orientadores" />
          <div className="grid gap-6 md:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <article key={p.title} className="card border-t-4 border-t-blue"><h3 className="text-lg font-extrabold">{p.title}</h3><p className="mt-3">{p.text}</p></article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <Image src="/photos/lancamento.jpg" alt="Lançamento do Plano Estratégico 2026–2035" width={285} height={180} className="w-full rounded-3xl shadow-card" />
          <div>
            <span className="eyebrow">Cerimónia de lançamento</span>
            <h2 className="mt-4 text-3xl font-extrabold">30 de Julho de 2026</h2>
            <p className="mt-4 text-lg">O Plano Estratégico 2026–2035 foi lançado no Centro de Conferências da Tmcel, em Maputo, em formato híbrido.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
