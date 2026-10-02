import type { Metadata } from "next";
import { PageHero } from "@/components/Section";
import { InsightBrowser } from "@/components/Insights";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = { title: "Recursos & Insights", description: "Notícias, notas metodológicas e histórias de campo da Celinka Survey." };

export default function Recursos() {
  return (
    <>
      <PageHero
        eyebrow="Recursos & Insights"
        title="Conhecimento que sai do terreno"
        lead="Notícias, notas sobre a nossa metodologia e histórias de campo — o que aprendemos a recolher dados rigorosos junto das comunidades."
        crumbs={[{ label: "Início", href: "/" }, { label: "Recursos & Insights" }]}
      />
      <section className="py-16 sm:py-20"><div className="container-x"><InsightBrowser /></div></section>
      <CtaBand title="Quer receber as nossas pesquisas?" text="Subscreva as actualizações no rodapé desta página ou fale directamente com a nossa equipa." />
    </>
  );
}
