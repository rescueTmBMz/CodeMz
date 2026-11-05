"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV } from "@/lib/data";

export function Header() {
  const path = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const active = (h: string) => (h === "/" ? path === "/" : path.startsWith(h));
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Fundação Joaquim Chissano — início" onClick={() => setOpen(false)}>
          <Image src="/logo-fjc.png" alt="" width={175} height={140} className="h-14 w-auto" priority />
        </Link>
        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold hover:bg-surface ${active(n.href) ? "text-orange-ink" : "text-ink"}`}>{n.label}</Link>
          ))}
          <Link href="/contacto/" className="btn btn-primary ml-3 !py-2.5">Junte-se a nós</Link>
        </nav>
        <button className="rounded-lg p-2 lg:hidden" aria-expanded={open} aria-controls="menu-movel" aria-label={open ? "Fechar menu" : "Abrir menu"} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <nav id="menu-movel" aria-label="Móvel" className="border-t border-line bg-white lg:hidden">
          <div className="container-x flex flex-col py-3">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={active(n.href) ? "page" : undefined}
                className="rounded-lg px-3 py-3 font-semibold text-ink hover:bg-surface">{n.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
