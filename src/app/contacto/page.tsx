import type { Metadata } from "next";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { LinkedInIcon } from "@/components/Icons";
import { SITE } from "@/lib/data";

export const metadata: Metadata = { title: "Contacto", description: "Fale com a equipa da Celinka Survey em Maputo. Respondemos em até 24 horas úteis." };

export default function Contacto() {
  const rows = [
    { Icon: MapPin, label: "Sede", body: <address className="not-italic">{SITE.address.map((l) => <span key={l} className="block">{l}</span>)}</address> },
    { Icon: Phone, label: "Telefone", body: SITE.phones.map((p) => <a key={p.href} href={p.href} className="block hover:text-brand">{p.label}</a>) },
    { Icon: Mail, label: "Email", body: [SITE.email, SITE.emailSecondary].map((e) => <a key={e} href={`mailto:${e}`} className="block hover:text-brand">{e}</a>) },
    { Icon: Globe, label: "Website", body: <a href={SITE.url} className="hover:text-brand">www.celinkasurvey.com</a> },
    { Icon: LinkedInIcon, label: "LinkedIn", body: <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-brand">Celinka Survey Consultoria & Serviços</a> },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="Pronto para colaborar connosco?"
        lead="A nossa equipa responde em até 24 horas úteis. Sede em Maputo, com capacidade de actuação imediata em todo o território nacional."
        crumbs={[{ label: "Início", href: "/" }, { label: "Contacto" }]}
      />
      <section className="py-16 sm:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ul>
            {rows.map(({ Icon, label, body }) => (
              <li key={label} className="flex gap-5 border-b border-line py-6 first:border-t">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                <div><p className="text-xs font-bold uppercase tracking-wider text-muted">{label}</p><div className="mt-1 text-lg leading-snug text-ink">{body}</div></div>
              </li>
            ))}
          </ul>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
