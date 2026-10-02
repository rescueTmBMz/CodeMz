"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { mailto } from "@/lib/data";

/** Sem serviço de newsletter configurado, abre o email do visitante com o pedido de subscrição. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Introduza um email válido.");
      return;
    }
    setError("");
    window.location.href = mailto("Subscrição de actualizações e pesquisas", `Pedido de subscrição para: ${email.trim()}`);
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Subscrever actualizações">
      <label htmlFor="newsletter-email" className="text-sm font-semibold text-white">Receba as nossas actualizações e pesquisas</label>
      <div className="mt-3 flex gap-2">
        <input
          id="newsletter-email" type="email" autoComplete="email" placeholder="o.seu@email.com" value={email}
          onChange={(e) => setEmail(e.target.value)} aria-invalid={!!error} aria-describedby={error ? "newsletter-error" : undefined}
          className="min-h-12 min-w-0 flex-1 rounded-lg border border-white/25 bg-white/10 px-4 text-white placeholder:text-white/60 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/30"
        />
        <button type="submit" className="btn btn-accent !px-4" aria-label="Subscrever"><ArrowRight aria-hidden="true" className="h-5 w-5" /></button>
      </div>
      {error && <p id="newsletter-error" role="alert" className="mt-2 text-sm text-red-300">{error}</p>}
    </form>
  );
}
