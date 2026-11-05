import type { Metadata } from "next";
import Image from "next/image";
import { PARTNERS, PROJECTS } from "@/lib/data";
import { CtaBand, PageHero, SectionHeading } from "@/components/Section";

export const metadata: Metadata = { title: "Projectos", description: "Ecos das nossas acções: agricultura, formação, cultura de paz, conservação e acesso à água." };

export default function Projetos() {
  return (
    <>
      <PageHero crumb="Projectos" eyebrow="O percurso" title="Ecos das nossas acções" lead="Duas décadas de trabalho junto das comunidades, em parceria com organizações nacionais e internacionais. Um portefólio de obra realizada que sustenta a credibilidade da nova fase da Fundação." />
      <section className="py-20">
        <div className="container-x">
          <ol className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, i) => (
              <li key={p.title} className="card flex gap-5">
                <span className="font-display text-4xl font-extrabold text-orange">0{i + 1}</span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-blue-ink">{p.tag} · {p.place}</p>
                  <h2 className="mt-1 text-xl font-extrabold">{p.title}</h2>
                  <p className="mt-2">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="Parceiros" title="Com quem trabalhamos" />
          <ul className="flex flex-wrap items-center justify-center gap-6">
            {PARTNERS.map((p) => (
              <li key={p.name} className="flex h-28 w-64 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-line">
                <Image src={p.logo} alt={p.name} width={p.w} height={p.h} className="max-h-24 w-auto object-contain" />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
