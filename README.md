# Celinka Survey — website

Site institucional da Celinka Survey Consulting & Services Lda. (Maputo, Moçambique), redesenhado num layout inspirado em sites de organizações de avaliação de impacto, como o [3ie](https://www.3ieimpact.org/).

As cores do distintivo foram mantidas:

| Cor | Hex |
| --- | --- |
| Azul | `#14559C` |
| Verde | `#1E9E58` |
| Marinho | `#0C2237` |

## Estrutura

```
index.html              página única (rotas por hash: #/what, #/where, #/who, #/library, #/careers, #/contact)
mozambique-map.html     mapa de cobertura (Leaflet), carregado num iframe em "Onde Trabalhamos"
assets/css/style.css    estilos e tokens de cor
assets/js/content.js    todo o conteúdo bilingue (PT / EN), parceiros, províncias e ferramentas
assets/js/main.js       renderização, navegação, carrossel, separadores, filtros e pesquisa
assets/img/             logótipo e logótipos dos parceiros
```

As fotografias são carregadas de `https://celinkasurvey.com/img/`.

## Editar conteúdo

Os textos estão todos em `assets/js/content.js`, nos objectos `PT` e `EN`.

## Pré-visualizar localmente

```
python3 -m http.server 8000
# abrir http://localhost:8000
```
