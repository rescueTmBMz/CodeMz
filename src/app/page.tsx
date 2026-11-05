import Link from "next/link";
import Image from "next/image";
import { GALLERY, LEGACY, PARTNERS, PILLARS, PROJECTS, SITE } from "@/lib/data";
import { CtaBand, SectionHeading } from "@/components/Section";

const tone: Record<string, string> = { blue: "border-t-blue", orange: "border-t-orange", navy: "border-t-navy-800" };

export default function Home() {
  return (
    <>
      <section className="on-dark relative overflow-hidden bg-navy-900 text-white">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <span className="eyebrow">Plano Estratégico 2026–2035</span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-6xl">Congregar sinergias para um mundo de <span className="text-orange">paz</span>.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
              A Fundação Joaquim Chissano dá continuidade ao seu percurso com um impulso institucional renovado, ao serviço de Moçambique e de África: paz, desenvolvimento sustentável e cultura.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/plano-estrategico/" className="btn btn-primary">Conheça o Plano Estratégico</Link>
              <Link href="/sobre/" className="btn btn-ghost">Quem somos</Link>
            </div>
          </div>
          <figure className="relative">
            <Image src="/photos/presidente.jpg" alt="Joaquim Alberto Chissano, Patrono e Presidente da Fundação" width={281} height={186} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/20" priority />
            <figcaption className="mt-3 text-sm text-white/65">Joaquim Alberto Chissano — Patrono e Presidente da FJC, mediador de paz internacional</figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-orange-tint py-5">
        <div className="container-x flex flex-wrap items-center justify-between gap-3 text-sm text-ink">
          <p><strong>Lançamento do Plano Estratégico 2026–2035</strong> · 30 de Julho de 2026 · Centro de Conferências da Tmcel, Maputo</p>
          <Link href="/plano-estrategico/" className="font-bold text-orange-ink underline underline-offset-4">Ver o plano →</Link>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Três pilares" title="Uma acção assente na paz, no desenvolvimento e na cultura" lead="Um espaço de convergência para a Paz, através da promoção do diálogo e da cooperação, ao serviço de Moçambique e de África." />
          <div className="grid gap-6 md:grid-cols-3">
            {PILLARS.map((p) => (
              <article key={p.key} className={`card border-t-4 ${tone[p.color]}`}>
                <h3 className="text-xl font-extrabold">{p.title}</h3>
                <p className="mt-3 leading-relaxed">{p.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="O legado" title="Um legado ao serviço da paz" />
          <ol className="grid gap-6 md:grid-cols-3">
            {LEGACY.map((l) => (
              <li key={l.year} className="card">
                <p className="font-display text-4xl font-extrabold text-orange-ink">{l.year}</p>
                <h3 className="mt-2 text-lg font-bold">{l.title}</h3>
                <p className="mt-2">{l.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading eyebrow="O percurso" title="Ecos das nossas acções" lead="Duas décadas de trabalho junto das comunidades, em parceria com organizações nacionais e internacionais." />
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <li key={p.title} className="card">
                <span className="text-xs font-bold text-orange-ink">0{i + 1} · {p.place}</span>
                <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                <p className="mt-2 text-[0.95rem]">{p.text}</p>
              </li>
            ))}
            <li className="card flex flex-col justify-center bg-navy-900 !border-navy-900 text-white">
              <p className="font-display text-xl font-extrabold text-white">E mais {PROJECTS.length - 3} iniciativas</p>
              <Link href="/projetos/" className="mt-3 font-bold text-orange underline underline-offset-4">Ver todos os projectos →</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Em imagens" title="A Fundação em acção" />
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {GALLERY.map((g) => (
              <li key={g.src}>
                <figure className="overflow-hidden rounded-2xl bg-white shadow-card">
                  <Image src={g.src} alt={g.alt} width={300} height={200} className="aspect-[3/2] w-full object-cover" />
                  <figcaption className="px-4 py-3 text-sm text-muted">{g.cap}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHeading center eyebrow="Parceiros" title="Alianças que ampliam o impacto" />
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
