import type { MetadataRoute } from "next";
import { PROJECTS, SITE } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "sobre/", "servicos/", "projetos/", "recursos/", "carreiras/", "contacto/", ...PROJECTS.map((p) => `projetos/${p.slug}/`)];
  return pages.map((p) => ({ url: `${SITE.url}/${p}` }));
}
