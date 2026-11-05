import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/data";

const desc = "A Fundação Joaquim Chissano trabalha pela paz, pelo desenvolvimento sócio-económico e pela identidade cultural em Moçambique e em África. Plano Estratégico 2026–2035.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Fundação Joaquim Chissano | Paz, Desenvolvimento Sustentável e Cultura", template: "%s | Fundação Joaquim Chissano" },
  description: desc,
  authors: [{ name: SITE.name }],
  icons: { icon: "/logo-fjc.png", apple: "/logo-fjc.png" },
  openGraph: {
    type: "website", locale: "pt_MZ", siteName: SITE.name, url: SITE.url,
    title: "Fundação Joaquim Chissano — Plano Estratégico 2026–2035",
    description: "Congregar sinergias para um mundo de paz.",
    images: [{ url: "/photos/lancamento.jpg", width: 285, height: 180, alt: "Lançamento do Plano Estratégico 2026–2035" }],
  },
};
export const viewport: Viewport = { themeColor: "#10283d", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-orange focus:px-4 focus:py-3 focus:font-semibold focus:text-navy-950">Saltar para o conteúdo</a>
        <Header />
        <main id="conteudo" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
