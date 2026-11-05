"use client";
import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/data";

type State = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [state, setState] = useState<State>("idle");
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    try {
      const r = await fetch("/enviar.php", { method: "POST", body: data });
      const j = await r.json();
      if (!r.ok || !j.ok) throw new Error();
      form.reset();
      setState("ok");
    } catch {
      // Sem servidor PHP (ex.: pré-visualização local): abre o programa de email.
      const body = `${data.get("mensagem")}\n\n— ${data.get("nome")} (${data.get("email")})`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(String(data.get("assunto") || "Contacto através do website"))}&body=${encodeURIComponent(body)}`;
      setState("error");
    }
  }
  const field = "mt-1.5 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-orange";
  return (
    <form onSubmit={onSubmit} className="card space-y-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">Nome
          <input name="nome" required maxLength={100} autoComplete="name" className={field} /></label>
        <label className="text-sm font-semibold text-ink">Email
          <input name="email" type="email" required maxLength={120} autoComplete="email" className={field} /></label>
      </div>
      <label className="block text-sm font-semibold text-ink">Assunto
        <input name="assunto" required maxLength={150} className={field} /></label>
      <label className="block text-sm font-semibold text-ink">Mensagem
        <textarea name="mensagem" required rows={6} maxLength={4000} className={field} /></label>
      <div className="hidden" aria-hidden="true"><label>Não preencher<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <button className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "A enviar…" : "Enviar mensagem"}</button>
      <p role="status" aria-live="polite" className="text-sm">
        {state === "ok" && <span className="font-semibold text-blue-ink">Mensagem enviada. Obrigado, entraremos em contacto.</span>}
        {state === "error" && <span className="text-muted">Não foi possível enviar directamente; abrimos o seu programa de email. Pode também escrever para {SITE.email}.</span>}
      </p>
    </form>
  );
}
