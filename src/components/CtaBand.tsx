import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/data";

export function CtaBand({ title = "Precisa de dados fiáveis para decidir melhor?", text = "Fale com a nossa equipa sobre o seu próximo estudo, avaliação ou operação de recolha de dados. Respondemos em até 24 horas úteis." }: { title?: string; text?: string }) {
  return (
    <section className="on-dark relative overflow-hidden bg-brand text-white">
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full border-[56px] border-white/[0.06]" />
      <div className="container-x relative flex flex-wrap items-center justify-between gap-8 py-16">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold !text-white sm:text-4xl">{title}</h2>
          <p className="mt-3 text-lg text-white/85">{text}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/contacto/" className="btn btn-accent">Fale Connosco <ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <a href={`mailto:${SITE.email}`} className="btn btn-outline-light">{SITE.email}</a>
        </div>
      </div>
    </section>
  );
}
