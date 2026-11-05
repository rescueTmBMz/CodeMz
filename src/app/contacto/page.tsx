import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/Section";

export const metadata: Metadata = { title: "Contacto", description: "Contacte a Fundação Joaquim Chissano em Maputo." };

export default function Contacto() {
  return (
    <>
      <PageHero crumb="Contacto" eyebrow="Junte-se a nós" title="Vamos congregar sinergias" lead="Para desafios colectivos, soluções partilhadas. Escreva-nos para propor uma parceria ou saber mais." />
      <section className="py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <div><h2 className="text-sm font-bold uppercase tracking-widest text-orange-ink">Morada</h2><p className="mt-2 text-lg">{SITE.address}</p></div>
            <div><h2 className="text-sm font-bold uppercase tracking-widest text-orange-ink">Email</h2><p className="mt-2 text-lg"><a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>{SITE.email}</a></p></div>
            <div><h2 className="text-sm font-bold uppercase tracking-widest text-orange-ink">Website</h2><p className="mt-2 text-lg">www.fjc.org.mz</p></div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
