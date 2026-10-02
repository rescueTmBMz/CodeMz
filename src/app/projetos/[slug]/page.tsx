import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/Section";
import { PartnerLogos } from "@/components/Partners";
import { ProjectCard } from "@/components/ProjectBrowser";
import { CtaBand } from "@/components/CtaBand";
import { PROJECTS, SERVICES } from "@/lib/data";

export const dynamicParams = false;
export function generateStaticParams() { return PROJECTS.map((p) => ({ slug: p.slug })); }

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function Projeto({ params }: Props) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const service = SERVICES.find((s) => s.id === p.service)!;
  const related = PROJECTS.filter((x) => x.slug !== p.slug && x.sector === p.sector).concat(PROJECTS.filter((x) => x.slug !== p.slug && x.sector !== p.sector)).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrow={`${p.sector} · ${p.year}`}
        title={p.title}
        crumbs={[{ label: "Início", href: "/" }, { label: "Nossos Trabalhos", href: "/projetos/" }, { label: p.title }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <div>
            <h2 className="text-2xl font-extrabold">Resumo</h2>
            <p className="mt-4 text-xl leading-relaxed text-ink">{p.summary}</p>
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:max-w-lg">
              {p.facts.map((f) => (
                <div key={f.label} className="card flex flex-col p-6">
                  <dt className="order-2 mt-1 text-sm text-muted">{f.label}</dt>
                  <dd className="font-display text-3xl font-extrabold text-brand">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 rounded-2xl bg-surface p-7">
              <h2 className="text-lg font-bold">Como trabalhamos</h2>
              <p className="mt-2 text-muted">Cada estudo apoia-se na nossa área de {service.title}. {service.short}</p>
              <Link href={`/servicos/#${service.id}`} className="link-arrow mt-4">Conhecer o serviço <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            </div>
          </div>
          <aside aria-label="Ficha do projecto" className="card h-fit space-y-6 p-7">
            <div><h2 className="text-xs font-bold uppercase tracking-wider text-muted">Cliente</h2><p className="mt-2 font-semibold text-ink">{p.client}</p></div>
            <div><h2 className="text-xs font-bold uppercase tracking-wider text-muted">Parceiros</h2><div className="mt-3"><PartnerLogos keys={p.partners} /></div></div>
            <div><h2 className="text-xs font-bold uppercase tracking-wider text-muted">Localização</h2><p className="mt-2 flex items-center gap-2 font-semibold text-ink"><MapPin aria-hidden="true" className="h-4 w-4 text-accent-ink" />{p.location}</p></div>
            <div><h2 className="text-xs font-bold uppercase tracking-wider text-muted">Ano</h2><p className="mt-2 font-semibold text-ink">{p.year}</p></div>
            <Link href="/contacto/" className="btn btn-accent w-full">Estudo semelhante? Fale connosco</Link>
          </aside>
        </div>
      </section>
      <section className="bg-surface py-16 sm:py-20">
        <div className="container-x">
          <h2 className="mb-8 text-2xl font-extrabold">Outros projectos</h2>
          <ul className="grid gap-6 md:grid-cols-2">{related.map((r) => <li key={r.slug}><ProjectCard p={r} /></li>)}</ul>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
