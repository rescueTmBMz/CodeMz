import type { Metadata } from "next";
import { PageHero, SectionHeading } from "@/components/Section";
import { ProjectBrowser } from "@/components/ProjectBrowser";
import { CtaBand } from "@/components/CtaBand";
import { PROVINCES } from "@/lib/data";

export const metadata: Metadata = { title: "Nossos Trabalhos", description: "Projectos e estudos de caso da Celinka Survey em saúde pública, governação, inclusão financeira e desenvolvimento comunitário." };

export default function Projetos() {
  return (
    <>
      <PageHero
        eyebrow="Nossos trabalhos"
        title="Projectos e estudos de caso"
        lead="Um histórico sólido na execução de projectos complexos, entregando dados precisos que orientam políticas públicas e intervenções humanitárias."
        crumbs={[{ label: "Início", href: "/" }, { label: "Nossos Trabalhos" }]}
      />
      <section className="py-16 sm:py-20"><div className="container-x"><ProjectBrowser /></div></section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Cobertura" title="Operamos nas 11 províncias de Moçambique" lead="Sede em Maputo, com capacidade de actuação imediata em todo o território nacional e inquiridores locais, fluentes nas línguas das comunidades." />
          <ul className="flex flex-wrap gap-3">{PROVINCES.map((p) => <li key={p} className="rounded-full border border-slate-300 bg-white px-5 py-2.5 font-medium text-ink">{p}</li>)}</ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
