import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Celinka Survey | Dados rigorosos para decisões estratégicas", template: "%s | Celinka Survey" },
  description:
    "Consultora moçambicana de pesquisa estatística, monitoria e avaliação (M&A). +40.000 entrevistas, 11 províncias, 97% de taxa de resposta. Maputo, Moçambique.",
  keywords: ["consultoria", "pesquisa estatística", "monitoria e avaliação", "CAPI", "Moçambique", "Maputo", "inquéritos", "saúde pública"],
  authors: [{ name: SITE.name }],
  icons: { icon: "/logo-celinka.png", apple: "/logo-celinka.png" },
  openGraph: {
    type: "website", locale: "pt_MZ", siteName: "Celinka Survey", url: SITE.url,
    title: "Celinka Survey — Dados para o Desenvolvimento Sustentável",
    description: "Pesquisa estatística, monitoria e avaliação de impacto em Moçambique. +40k entrevistas, 11 províncias.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Inquiridoras da Celinka Survey em trabalho de campo" }],
  },
};

export const viewport: Viewport = { themeColor: "#0C2237", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-900">
          Saltar para o conteúdo
        </a>
        <Header />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
