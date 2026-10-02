import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { SERVICES, SITE } from "@/lib/data";
import { LinkedInIcon } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-white/75">
      <div className="h-1 bg-accent" />
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Link href="/" className="inline-block rounded-lg bg-white px-4 py-3" aria-label="Celinka Survey — página inicial">
            <img src="/logo-celinka.png" alt="Celinka Survey" width={298} height={70} className="h-9 w-auto" loading="lazy" />
          </Link>
          <p className="mt-6 max-w-sm leading-relaxed">
            Dados e soluções para o desenvolvimento sustentável. Pesquisa estatística rigorosa, monitoria e avaliação de impacto em Moçambique desde {SITE.founded}.
          </p>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn da Celinka Survey (abre num novo separador)"
            className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-accent hover:bg-accent hover:text-navy-900">
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Navegação</h2>
          <ul className="mt-5 space-y-3">
            {[["Sobre Nós", "/sobre/"], ["O Que Fazemos", "/servicos/"], ["Nossos Trabalhos", "/projetos/"], ["Recursos & Insights", "/recursos/"], ["Carreiras", "/carreiras/"], ["Contacto", "/contacto/"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="hover:text-accent-light">{l}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Serviços">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Serviços</h2>
          <ul className="mt-5 space-y-3">
            {SERVICES.map((s) => (
              <li key={s.id}><Link href={`/servicos/#${s.id}`} className="hover:text-accent-light">{s.title.replace(/ \(.*\)/, "")}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">Contactos</h2>
          <ul className="mt-5 space-y-3">
            <li className="flex gap-3"><MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-light" /><address className="not-italic">{SITE.address.join(", ")}</address></li>
            <li className="flex gap-3"><Phone aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-light" /><span>{SITE.phones.map((p) => (<a key={p.href} href={p.href} className="block hover:text-accent-light">{p.label}</a>))}</span></li>
            <li className="flex gap-3"><Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent-light" /><a href={`mailto:${SITE.email}`} className="hover:text-accent-light">{SITE.email}</a></li>
          </ul>
          <div className="mt-8"><NewsletterForm /></div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap justify-between gap-3 py-6 text-sm text-white/60">
          <p>© {new Date().getFullYear()} {SITE.name} Todos os direitos reservados.</p>
          <p>Orgulhosamente moçambicano</p>
        </div>
      </div>
    </footer>
  );
}
