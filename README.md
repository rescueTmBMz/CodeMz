# Fundação Joaquim Chissano — website (fjc.org.mz)

Next.js 16 (App Router) + Tailwind CSS 4, exportado como site estático.

Páginas: Início · Quem somos · Plano Estratégico 2026–2035 · Projectos · Contacto.

## Publicar no cPanel (fjc.org.mz)

1. `npm install && npm run build` → gera a pasta `out/` (ou use o ZIP `fjc-website-cpanel.zip` já preparado).
2. cPanel → **Gestor de Ficheiros** → `public_html/` do domínio fjc.org.mz → **Carregar** o ZIP e **Extrair** (o conteúdo tem de ficar directamente em `public_html/`, incluindo o `.htaccess` — activar "Mostrar ficheiros ocultos").
3. cPanel → **SSL/TLS Status** → executar AutoSSL para fjc.org.mz e www.fjc.org.mz. O `.htaccess` força HTTPS e o domínio sem `www`.
4. Testar o formulário em `/contacto/`: envia por `enviar.php` (PHP `mail()`) para info@fjc.org.mz. Se o alojamento bloquear `mail()`, o formulário abre o programa de email como alternativa.

## Editar conteúdo

Textos, pilares, projectos, parceiros e galeria: `src/lib/data.ts`. Imagens: `public/photos/` e `public/partners/`.

> **Nota sobre as fotografias:** as imagens actuais foram recortadas de uma folha de contactos (baixa resolução, ~285 px). Para melhor qualidade, substitua os ficheiros de `public/photos/` (mesmos nomes) pelos originais (`IMG-20260731-WA0022.jpg` → `lancamento.jpg`, `Joaquim Chissano.jpg` → `presidente.jpg`, etc.), o logotipo `public/logo-fjc.png` por `Logotipo FJC.jpg` convertido/original, e volte a fazer o build.
