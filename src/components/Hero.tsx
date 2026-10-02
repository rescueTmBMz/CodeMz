import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";

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
        <g fill="url(#hbar)">
          <rect x="860" y="470" width="86" height="290" rx="6" />
          <rect x="976" y="360" width="86" height="400" rx="6" />
          <rect x="1092" y="250" width="86" height="510" rx="6" />
          <rect x="1208" y="150" width="86" height="610" rx="6" />
        </g>
        <path d="M820 560 L960 440 L1070 500 L1260 250" fill="none" stroke="#1e9e58" strokeOpacity="0.9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M1225 240 L1262 248 L1250 285" fill="none" stroke="#1e9e58" strokeOpacity="0.9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:py-28">
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

        <aside aria-label="Destaques" className="glass drift rounded-3xl p-7 shadow-lift sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent-light">Em resumo</p>
          <ul className="mt-5 space-y-6">
            {[["97%", "taxa média de resposta"], ["+600", "inquiridores certificados"], ["11", "províncias cobertas em simultâneo"]].map(([n, l]) => (
              <li key={l} className="flex items-baseline gap-4">
                <span className="font-display text-4xl font-extrabold text-white">{n}</span>
                <span className="text-white/80">{l}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-white/20 pt-5 text-sm leading-relaxed text-white/75">
            Cada entrevista é monitorizada, verificada e validada antes de entrar na base de dados final.
          </p>
        </aside>
      </div>
    </section>
  );
}
