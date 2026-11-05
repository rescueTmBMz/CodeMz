import type { ReactNode } from "react";
import Link from "next/link";

export function SectionHeading({ eyebrow, title, lead, light = false, center = false }:
  { eyebrow?: string; title: ReactNode; lead?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`mb-12 max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`mt-4 text-3xl font-extrabold leading-tight sm:text-4xl ${light ? "!text-white" : ""}`}>{title}</h2>
      {lead && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, crumb }: { eyebrow: string; title: string; lead?: string; crumb: string }) {
  return (
    <section className="on-dark bg-navy-900 py-16 text-white sm:py-24">
      <div className="container-x">
        <nav aria-label="Navegação" className="mb-6 text-sm text-white/60">
          <Link href="/" className="hover:text-white">Início</Link> <span aria-hidden="true">/</span> <span className="text-white/90">{crumb}</span>
        </nav>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-3xl text-4xl font-extrabold !text-white sm:text-5xl">{title}</h1>
        {lead && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/75">{lead}</p>}
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section className="on-dark bg-navy-900 py-16 text-center text-white">
      <div className="container-x">
        <p className="font-display text-2xl font-extrabold sm:text-3xl">“Congregar sinergias para um mundo de paz.”</p>
        <p className="mx-auto mt-3 max-w-xl text-white/75">Para desafios colectivos, soluções partilhadas: parcerias transformadoras ao serviço de Moçambique, de África e da paz duradoura.</p>
        <Link href="/contacto/" className="btn btn-primary mt-8">Junte-se a nós</Link>
      </div>
    </section>
  );
}
