"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { NAV } from "@/lib/data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setExpanded(null); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    return base === "/" ? pathname === "/" : pathname.startsWith(base.replace(/\/$/, ""));
  };

  return (
    <>
    <header className={`sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-lg transition-shadow ${scrolled ? "shadow-card" : ""}`}>
      <div className="container-x flex h-20 items-center gap-6">
        <Link href="/" aria-label="Celinka Survey — página inicial" className="shrink-0">
          <img src="/logo-celinka.png" alt="Celinka Survey Consultoria" width={298} height={70} className="h-10 w-auto sm:h-11" />
        </Link>

        <nav aria-label="Principal" className="mx-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative flex items-center gap-1.5 px-3.5 py-7 text-[0.95rem] font-medium transition-colors hover:text-brand ${isActive(item.href) ? "text-brand" : "text-ink"}`}
                >
                  {item.label}
                  {item.children && <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />}
                  <span aria-hidden="true" className={`absolute inset-x-3.5 bottom-0 h-[3px] origin-left bg-accent transition-transform ${isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </Link>
                {item.children && (
                  <ul className="invisible absolute left-0 top-full w-[22rem] translate-y-2 rounded-b-2xl border border-t-4 border-line border-t-accent bg-white p-2 opacity-0 shadow-lift transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface focus-visible:bg-surface">
                          <span className="block text-[0.95rem] font-semibold text-ink">{c.label}</span>
                          {c.description && <span className="mt-0.5 block text-sm leading-snug text-muted">{c.description}</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <Link href="/contacto/" className="btn btn-accent hidden !min-h-11 !px-5 sm:inline-flex">
            Fale Connosco
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line text-ink hover:bg-surface lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </div>

    </header>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-white lg:hidden">
          <nav aria-label="Principal (móvel)" className="container-x py-4">
            <ul>
              {NAV.map((item) => (
                <li key={item.label} className="border-b border-line">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-ink"
                        aria-expanded={expanded === item.label}
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                      >
                        {item.label}
                        <ChevronDown aria-hidden="true" className={`h-5 w-5 transition-transform ${expanded === item.label ? "rotate-180" : ""}`} />
                      </button>
                      {expanded === item.label && (
                        <ul className="pb-3 pl-3">
                          <li><Link href={item.href} className="block py-2.5 text-brand">Ver tudo — {item.label}</Link></li>
                          {item.children.map((c) => (
                            <li key={c.href}><Link href={c.href} className="block py-2.5 text-body">{c.label}</Link></li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link href={item.href} className="block py-4 text-lg font-semibold text-ink">{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <Link href="/contacto/" className="btn btn-accent mt-6 w-full">
              Fale Connosco <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}
