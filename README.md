# Celinka Survey — site institucional

Aplicação **Next.js 16 (App Router)** + **Tailwind CSS 4** + **Lucide React**, exportada como site estático.
Design institucional inspirado no 3ie, com as cores do distintivo: marinho `#0C2237`, azul `#14559C`, verde `#1E9E58`.

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero, números animados, desafios interactivos (ciclo de decisão), serviços, projectos filtráveis, histórias de campo, insights, parceiros |
| `/sobre/` | Missão, visão e valores · tecnologia e qualidade · parceiros · testemunhos |
| `/servicos/` | Os 6 serviços, controlo de qualidade e ferramentas |
| `/projetos/` e `/projetos/[slug]/` | Portfólio filtrável por sector e estudos de caso |
| `/recursos/` | Notícias, notas metodológicas e histórias de campo (filtrável) |
| `/carreiras/` · `/contacto/` | Vagas (candidatura por email) · formulário e contactos |

## Desenvolvimento

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # gera a pasta out/ (site estático)
npm run lint       # verificação de tipos
```

## Publicar

`npm run build` cria a pasta **`out/`**. Copie o seu conteúdo para o alojamento (cPanel, Netlify, Vercel, GitHub Pages na raiz de um domínio…).
O site está preparado para ser servido na raiz do domínio (`/`).

## Editar conteúdo

Todo o texto, números, projectos, notícias, vagas e contactos estão em **`src/lib/data.ts`**.

- Novo projecto: acrescente um objecto a `PROJECTS` (a página de estudo de caso é gerada automaticamente).
- Novo artigo ou notícia: acrescente a `INSIGHTS`.
- Contactos: objecto `SITE`.

## Notas

- **Formulários** (contacto e newsletter) validam no browser e abrem o programa de email do visitante. Para envio directo, ligue um serviço (EmailJS, Formspree…) no `onSubmit` de `src/components/ContactForm.tsx` e `NewsletterForm.tsx`.
- **Fotografias:** as 4 fotografias de campo estão em `public/photos/` (optimizadas) e declaradas em `PHOTOS`, em `src/lib/data.ts`. Para trocar ou acrescentar, edite essa lista; `public/og.jpg` é a imagem de partilha nas redes sociais.
- **Acessibilidade:** verificado com axe-core (WCAG 2.1 A/AA) — sem violações. Contraste do verde tratado com variantes `accent` (fundos/botões, texto escuro) e `accent-ink` (texto sobre fundo claro).
- `legacy-static/` guarda a versão anterior (HTML/CSS/JS simples) para referência.
