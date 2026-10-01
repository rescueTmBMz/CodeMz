# Celinka Survey — website

Site institucional da Celinka Survey Consulting & Services Lda. (Maputo, Moçambique). Esta versão aplica um layout inspirado no [3ie](https://www.3ieimpact.org/) à estrutura e ao conteúdo do `index.html` em produção.

As cores do distintivo foram mantidas:

| Cor | Hex |
| --- | --- |
| Azul | `#14559C` |
| Verde | `#1E9E58` |
| Marinho | `#0C2237` |

## Estrutura

```
index.html        página única com secções por âncora (#sobre, #servicos, #campo, #portfolio, #parceiros,
                  #tecnologia, #noticias, #historias, #carreiras, #contacto)
css/style.css     estilos e tokens de cor
js/main.js        tradução PT/EN, carrossel, menu, galeria, filtro de parceiros, testemunhos e formulário
img/              logo-celinka.png e partners/ (logótipos dos parceiros)
```

As fotografias usadas pela página (`img/hero-1.jpg` … `hero-5.jpg`, `sobre-*.jpg`, `svc-*.jpg`, `gallery-1…12.jpg`, `news-1…3.jpg`, `story-1…3.jpg`, `carreiras.jpg`, `logo.png`) são as que já existem na pasta `img/` do servidor. Não estão neste repositório.

## Publicar

Substitua `index.html`, `css/style.css` e `js/main.js` no servidor. Acrescente também `img/logo-celinka.png` e a pasta `img/partners/`.

## Editar

- **Textos em português:** directamente no `index.html`.
- **Traduções em inglês:** no objecto `EN` em `js/main.js`, com a mesma chave `data-i18n` usada no HTML.
- **Vagas:** secção `#carreiras` do `index.html`.
- **Formulário:** preencha `EMAILJS_CONFIG` em `js/main.js` (publicKey, serviceId, templateId) para enviar via EmailJS. Sem essas chaves, o formulário abre o programa de email do visitante com a mensagem preenchida.
