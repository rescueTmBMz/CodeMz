"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SERVICES, mailto } from "@/lib/data";

type Errors = Partial<Record<"nome" | "email" | "mensagem", string>>;

/**
 * Formulário sem servidor: valida e abre o programa de email do visitante com a mensagem preenchida.
 * Para envio directo (EmailJS, Formspree, etc.), substitua o conteúdo de `onSubmit`.
 */
export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const d = new FormData(form.current!);
    const v = (k: string) => String(d.get(k) ?? "").trim();
    const next: Errors = {};
    if (!v("nome")) next.nome = "Indique o seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) next.email = "Indique um email válido.";
    if (!v("mensagem")) next.mensagem = "Escreva a sua mensagem.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.current!.querySelector<HTMLElement>(`[name="${Object.keys(next)[0]}"]`)?.focus();
      return;
    }
    const body = [`Nome: ${v("nome")}`, `Organização: ${v("organizacao")}`, `Email: ${v("email")}`, `Serviço: ${v("servico")}`, "", v("mensagem")].join("\n");
    window.location.href = mailto("Pedido de contacto — site Celinka Survey", body);
    setSent(true);
  }

  const Err = ({ id, msg }: { id: string; msg?: string }) => msg ? <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">{msg}</p> : null;

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="card p-7 shadow-card sm:p-10">
      <h2 className="text-2xl font-extrabold">Envie-nos uma mensagem</h2>
      <p className="mt-2 text-muted">Ao enviar, o seu programa de email abrirá com a mensagem preenchida.</p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nome" className="mb-2 block text-sm font-semibold text-ink">Nome completo *</label>
          <input id="nome" name="nome" autoComplete="name" required className="field" aria-invalid={!!errors.nome} aria-describedby={errors.nome ? "err-nome" : undefined} />
          <Err id="err-nome" msg={errors.nome} />
        </div>
        <div>
          <label htmlFor="organizacao" className="mb-2 block text-sm font-semibold text-ink">Organização</label>
          <input id="organizacao" name="organizacao" autoComplete="organization" className="field" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">Email *</label>
          <input id="email" name="email" type="email" autoComplete="email" required className="field" aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
          <Err id="err-email" msg={errors.email} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="servico" className="mb-2 block text-sm font-semibold text-ink">Tipo de serviço</label>
          <select id="servico" name="servico" className="field" defaultValue="">
            <option value="">Seleccione um serviço…</option>
            {SERVICES.map((s) => <option key={s.id}>{s.title}</option>)}
            <option>Candidatura — Trabalhe Connosco</option>
            <option>Outro / Informações gerais</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="mensagem" className="mb-2 block text-sm font-semibold text-ink">Mensagem *</label>
          <textarea id="mensagem" name="mensagem" rows={6} required className="field resize-y" placeholder="Descreva o seu projecto, objectivos e prazo estimado…" aria-invalid={!!errors.mensagem} aria-describedby={errors.mensagem ? "err-mensagem" : undefined} />
          <Err id="err-mensagem" msg={errors.mensagem} />
        </div>
      </div>
      <button type="submit" className="btn btn-accent mt-8">Enviar mensagem <ArrowRight aria-hidden="true" className="h-4 w-4" /></button>
      <p role="status" aria-live="polite" className="mt-4 text-sm font-medium text-accent-ink">{sent ? "A abrir o seu programa de email…" : ""}</p>
    </form>
  );
}
