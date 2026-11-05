import Link from "next/link";
import Image from "next/image";
import { NAV, SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="on-dark bg-navy-950 text-white/75">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="inline-block rounded-xl bg-white p-3"><Image src="/logo-fjc.png" alt="Fundação Joaquim Chissano" width={175} height={140} className="h-16 w-auto" /></div>
          <p className="mt-5 max-w-xs text-sm">{SITE.slogan}</p>
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-orange">{SITE.tagline}</p>
        </div>
        <nav aria-label="Rodapé">
          <h2 className="text-sm font-bold uppercase tracking-widest !text-white">Navegação</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest !text-white">Contacto</h2>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{SITE.address}</p>
            <p><a className="hover:text-white" href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
            <p><a className="hover:text-white" href={SITE.url}>www.fjc.org.mz</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/55">
        © {new Date().getFullYear()} Fundação Joaquim Chissano · Plano Estratégico 2026–2035
      </div>
    </footer>
  );
}
