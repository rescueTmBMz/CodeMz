import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PHOTOS } from "@/lib/data";

export function Hero() {
  return (
    <section className="on-dark relative isolate overflow-hidden bg-navy-900 text-white">
      {/* Fundo geométrico: grelha de pesquisa + barras ascendentes (eco do distintivo) */}
      <svg aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1440 760">
        <defs>
          <pattern id="hgrid" width="56" height="56" patternUnits="userSpaceOnUse"><path d="M56 0H0V56" fill="none" stroke="#fff" strokeOpacity="0.06" /></pattern>
          <linearGradient id="hbar" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#14559c" stopOpacity="0" /><stop offset="1" stopColor="#14559c" stopOpacity="0.55" /></linearGradient>
          <radialGradient id="hglow" cx="78%" cy="30%" r="55%"><stop offset="0" stopColor="#1e9e58" stopOpacity="0.28" /><stop offset="1" stopColor="#1e9e58" stopOpacity="0" /></radialGradient>
        </defs>
        <rect width="1440" height="760" fill="url(#hgrid)" />
        <rect width="1440" height="760" fill="url(#hglow)" />
      </svg>

      <div className="container-x grid gap-12 pb-24 pt-16 sm:pb-28 sm:pt-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-28">
        <div className="rise">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-1.5 text-sm font-medium text-accent-light">
            <MapPin aria-hidden="true" className="h-4 w-4" /> Maputo, Moçambique · Desde 2021
          </p>
          <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] !text-white sm:text-5xl lg:text-[3.6rem]">
            Transformando dados rigorosos em <span className="text-accent-light">decisões estratégicas</span> para o desenvolvimento em Moçambique e África
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            Pesquisa estatística, excelência na recolha de dados e avaliação de impacto, com cobertura nacional e escuta atenta às comunidades. Evidências que orientam políticas públicas e programas de desenvolvimento.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/servicos/" className="btn btn-accent">Explorar Nossos Serviços <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
            <Link href="/projetos/" className="btn btn-outline-light">Ver Portfólio de Projectos</Link>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-3xl ring-1 ring-white/20 shadow-lift">
            <img
              src={PHOTOS.chemba.src} width={PHOTOS.chemba.width} height={PHOTOS.chemba.height} alt={PHOTOS.chemba.alt}
              fetchPriority="high" className="aspect-[4/5] w-full object-cover object-top lg:max-h-[34rem]"
            />
          </div>
          <aside aria-label="Destaques" className="glass drift absolute -bottom-6 left-4 right-4 rounded-2xl p-5 shadow-lift sm:left-auto sm:-left-10 sm:right-auto sm:w-72 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-light">Em resumo</p>
            <ul className="mt-3 space-y-2">
              {[["97%", "taxa média de resposta"], ["+600", "inquiridores certificados"], ["11", "províncias cobertas"]].map(([n, l]) => (
                <li key={l} className="flex items-baseline gap-3">
                  <span className="font-display text-2xl font-extrabold text-white">{n}</span>
                  <span className="text-sm text-white/85">{l}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
