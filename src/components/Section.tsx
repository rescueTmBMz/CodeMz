import type { ReactNode } from "react";
import Link from "next/link";

export function SectionHeading({
  eyebrow, title, lead, action, light = false, center = false,
}: {
  eyebrow?: string; title: ReactNode; lead?: string; action?: ReactNode; light?: boolean; center?: boolean;
}) {
  return (
    <div className={`mb-12 flex flex-wrap items-end justify-between gap-6 ${center ? "flex-col items-center text-center" : ""}`}>
      <div className={center ? "mx-auto max-w-3xl" : "max-w-3xl"}>
        {eyebrow && <span className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</span>}
        <h2 className={`mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.6rem] ${light ? "!text-white" : ""}`}>{title}</h2>
        {lead && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({
  eyebrow, title, lead, crumbs, children,
}: {
  eyebrow?: string; title: string; lead?: string; crumbs: { label: string; href?: string }[]; children?: ReactNode;
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-navy-900 text-white">
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="white" strokeWidth="1" /></pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <div aria-hidden="true" className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="container-x relative py-16 sm:py-20">
        <nav aria-label="Caminho de navegação">
          <ol className="mb-8 flex flex-wrap items-center gap-2 text-sm text-white/70">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {c.href ? <Link href={c.href} className="hover:text-accent-light">{c.label}</Link> : <span aria-current="page" className="text-white">{c.label}</span>}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow && <span className="eyebrow eyebrow-light">{eyebrow}</span>}
        <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.1] !text-white sm:text-5xl">{title}</h1>
        {lead && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/80">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
