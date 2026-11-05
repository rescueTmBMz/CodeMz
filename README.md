# Publicar no cPanel (fjc.org.mz) — versão estática

O design, as animações e os conteúdos não foram alterados. O build estático não precisa de Node, base de dados nem de variáveis de ambiente.

```bash
npm install
npm run package:cpanel     # gera dist/public/ e fjc-website-cpanel.zip
```

1. cPanel → **Gestor de Ficheiros** → `public_html/` (domínio fjc.org.mz) → carregar o ZIP → **Extrair** (o `.htaccess` tem de ficar em `public_html/`; activar "Mostrar ficheiros ocultos").
2. cPanel → **SSL/TLS Status** → executar AutoSSL para fjc.org.mz e www.fjc.org.mz (o `.htaccess` força HTTPS e o domínio sem `www`).
3. Notícias: no modo estático mostra-se o conteúdo editorial (o mesmo que o site apresenta sem credenciais das redes). O feed automático Facebook/LinkedIn exige o backend Node abaixo.

Para activar o backend (alojamento Node.js + MySQL), compilar com `VITE_ENABLE_BACKEND=true npm run build` e seguir as instruções seguintes.

---

# Website institucional — Fundação Joaquim Chissano

Website full-stack em React, TypeScript, Vite, Hono, tRPC e Drizzle ORM. O frontend apresenta os pilares, a estratégia, o impacto, os parceiros, a actualidade e os canais oficiais da Fundação. O backend mantém uma cache das publicações sociais e nunca expõe credenciais ao browser.

## Executar e validar

```bash
npm install
npm run db:push
npm run check
npm run build
npm start
```

O servidor fica disponível em `http://localhost:3000`. O formulário de contacto prepara uma mensagem no programa de email do visitante; não guarda dados pessoais nem simula envio.

## Actualização automática das notícias

A secção de notícias consulta as APIs oficiais no servidor, no máximo uma vez a cada dez minutos. O frontend volta a consultar o feed ao focar a janela e a cada quinze minutos. As publicações ficam em cache na tabela `social_posts`, permitindo manter as últimas notícias disponíveis se uma API falhar temporariamente.

Sem credenciais válidas, o website apresenta apenas o conteúdo editorial já existente. Não utiliza scraping nem publicações fictícias.

### Facebook

Configurar no ambiente do servidor:

- `FACEBOOK_PAGE_ACCESS_TOKEN`: Page Access Token válido, preferencialmente de longa duração, com autorização para ler as publicações da página.
- `FACEBOOK_PAGE_ID`: já identificado como `61551227054424`.
- `FACEBOOK_API_VERSION`: versão suportada pela aplicação Meta; o valor inicial é `v23.0` e deve ser actualizado quando necessário.

### LinkedIn

Configurar no ambiente do servidor:

- `LINKEDIN_ACCESS_TOKEN`: token OAuth com a permissão de leitura aprovada para o autor.
- `LINKEDIN_AUTHOR_URN`: URN do autor, por exemplo `urn:li:person:...` ou `urn:li:organization:...`.
- `LINKEDIN_API_VERSION`: versão mensal suportada pela aplicação LinkedIn; o valor inicial é `202610`.

O perfil fornecido é um perfil de membro (`/in/`). A leitura automática pode exigir um Person URN e a permissão restrita `r_member_social`, sujeita a aprovação do LinkedIn. Para uma página de organização, são necessários o Organization URN, a permissão `r_organization_social` e um papel administrativo adequado.

Nunca prefixar estas variáveis com `VITE_`, colocar tokens no frontend ou commitar segredos. Consulte `.env.example` apenas para os nomes das variáveis; os valores reais devem ser definidos no ambiente seguro de execução.
