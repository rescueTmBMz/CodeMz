export type Pillar = {
  id: string
  name: string
  title: string
  description: string
  image: string
  alt: string
  points: string[]
}

export const pillars: Pillar[] = [
  {
    id: 'paz',
    name: 'Paz',
    title: 'O diálogo como caminho para uma paz duradoura.',
    description:
      'Contribuímos para a construção da paz a todos os níveis da sociedade, promovendo a reconciliação, a mediação e a convivência pacífica entre pessoas e comunidades.',
    image: '/images/paz.webp',
    alt: 'Joaquim Chissano participa no diálogo Portugal–Moçambique, dedicado à cooperação e ao desenvolvimento',
    points: ['Diálogo e arquitectura da paz', 'Mediação local, institucional e regional', 'Formação de líderes e prevenção de conflitos'],
  },
  {
    id: 'desenvolvimento',
    name: 'Desenvolvimento',
    title: 'Oportunidades que começam nas comunidades.',
    description:
      'Apoiamos o desenvolvimento socioeconómico através da educação, capacitação, saúde, agricultura sustentável e acesso a oportunidades que melhoram a qualidade de vida das populações.',
    image: '/images/desenvolvimento.webp',
    alt: 'Representantes da Fundação e da Universidade Europeia numa sessão de cooperação para a educação',
    points: ['Educação, formação e capacitação', 'Saúde e agricultura de precisão', 'Biodiversidade, economia azul e oportunidades sustentáveis'],
  },
  {
    id: 'cultura',
    name: 'Cultura',
    title: 'A identidade que nos liga e projecta no futuro.',
    description:
      'Valorizamos a ética, a moral e as tradições moçambicanas e africanas, promovendo a cultura, as artes e as línguas nacionais como fundamento da coesão social.',
    image: '/images/cultura.webp',
    alt: 'Celebração cultural entre participantes moçambicanos e chineses, com partilha e convívio',
    points: ['Promoção da cultura e das línguas nacionais', 'Valorização da arte africana', 'Educação para os valores, ética e tradição'],
  },
]

export type Impact = {
  place: string
  title: string
  text: string
  image: string
  alt: string
  illustrative?: boolean
}

export const impacts: Impact[] = [
  { place: 'Chókwè', title: 'Agricultura de Precisão', text: 'Modernização produtiva com centenas de famílias agricultoras capacitadas em agricultura irrigada de precisão.', image: '/images/impacto-agricultura.webp', alt: 'Imagem ilustrativa de agricultores e um técnico a analisar uma cultura irrigada com apoio de um tablet', illustrative: true },
  { place: 'Chibuto', title: 'Formação Profissional', text: 'Centro de formação técnica para a inclusão económica dos jovens e a criação de oportunidades de emprego.', image: '/images/impacto-formacao.webp', alt: 'Imagem ilustrativa de formandos e um instructor num exercício prático de instalação de energia solar', illustrative: true },
  { place: '2010–2015', title: 'Planeta de Amigos', text: 'Promoção de uma cultura de paz, tolerância e unidade nacional entre crianças de todo o país.', image: '/images/impacto-amigos.webp', alt: 'Crianças e adultos em trajes tradicionais durante uma celebração comunitária pela paz e unidade nacional' },
  { place: 'Gorongosa', title: 'Conservação Comunitária', text: 'Parceria para o desenvolvimento sustentável e a conservação comunitária no Parque Nacional da Gorongosa.', image: '/images/impacto-gorongosa.webp', alt: 'Imagem ilustrativa de membros da comunidade e um técnico ambiental a plantar árvores nativas', illustrative: true },
  { place: 'Mangol, Bilene', title: 'Acesso à Água', text: 'Sistema solar de abastecimento de água potável que beneficia 200 famílias da comunidade.', image: '/images/impacto-agua.webp', alt: 'Imagem ilustrativa de um sistema solar de abastecimento de água potável, com reservatório e fontenário comunitário', illustrative: true },
]

export const management = [
  { title: 'Monitoria e Avaliação', text: 'Resultados e evidências para melhoria e adaptação contínuas.' },
  { title: 'Fortalecimento Institucional', text: 'Governação, gestão e inovação para ampliar a capacidade interna.' },
  { title: 'Comunicação e Imagem', text: 'Uma presença clara, credível e próxima das comunidades.' },
  { title: 'Parcerias e Cooperação', text: 'Alianças multissectoriais para soluções partilhadas e maior impacto.' },
  { title: 'Implementação Programática', text: 'Estratégia traduzida em programas com resultados tangíveis.' },
]

export const news = [
  {
    date: '30 Julho 2026', category: 'Estratégia', title: 'Um novo ciclo para a paz, o desenvolvimento e a cultura',
    text: 'A FJC lançou oficialmente o Plano Estratégico 2026–2035, numa cerimónia realizada no Centro de Conferências da Tmcel, em Maputo.',
    image: '/images/noticia-plano.webp', alt: 'Cerimónia de lançamento do Plano Estratégico 2026–2035',
    href: 'https://www.oeconomico.com/fundacao-joaquim-chissano-lanca-plano-estrategico-2026-2035-e-reafirma-compromisso-com-a-paz-desenvolvimento-e-a-cultura-no-pais/', label: 'Ler cobertura',
  },
  {
    date: '12 Outubro 2026', category: 'Educação', title: 'Cooperação para formar as novas gerações',
    text: 'A Universidade Europeia e a FJC assinaram um protocolo de colaboração voltado para bolsas de estudo e projectos de paz, desenvolvimento e cultura.',
    image: '/images/noticia-educacao.webp', alt: 'Orador na Universidade Europeia durante encontro de cooperação com a Fundação Joaquim Chissano',
    href: 'https://maisalgarve.pt/2026/10/12/universidade-europeia-e-fundacao-joaquim-chissano-parceria-apoiar-formacao-de-estudantes-mocambicanos/', label: 'Ler notícia',
  },
  {
    date: '11 Outubro 2026', category: 'Cultura', title: 'A cultura como linguagem da paz no FÓLIO',
    text: 'Joaquim Chissano presidiu à entrega do Prémio Literário Fernando Leite Couto, que distingue e promove novos autores moçambicanos em língua portuguesa.',
    image: '/images/noticia-folio.webp', alt: 'Sessão de entrega do Prémio Literário Fernando Leite Couto no FÓLIO',
    href: 'https://observador.pt/2026/10/11/joaquim-chissano-visita-folio-e-sublinha-importancia-da-cultura-para-a-paz/', label: 'Ler notícia',
  },
  {
    date: '15 Outubro 2026', category: 'Parcerias', title: 'Capacitação técnica e desenvolvimento sustentável',
    text: 'A cooperação entre o ISQ e a FJC abre caminho a programas de formação, capacitação técnica e iniciativas de desenvolvimento sustentável.',
    image: '/images/noticia-isq.webp', alt: 'Joaquim Chissano conversa com um representante do ISQ durante encontro de cooperação institucional',
    href: 'https://www.human.pt/2026/10/15/isq-e-fundacao-joaquim-chissano-reforcam-capacitacao-e-desenvolvimento-sustentavel/', label: 'Ler notícia',
  },
]

export const gallery = [
  { image: '/images/galeria-1.webp', alt: 'Joaquim Chissano conversa com convidados no lançamento do Plano Estratégico', caption: 'Diálogo entre Joaquim Chissano e convidados no lançamento do Plano Estratégico 2026–2035.' },
  { image: '/images/galeria-2.webp', alt: 'Músico durante uma actuação numa celebração da Fundação', caption: 'Actuação musical durante uma celebração institucional da Fundação Joaquim Chissano.' },
  { image: '/images/galeria-3.webp', alt: 'Jovens e parceiros comunitários num encontro de juventude e voluntariado', caption: 'Dia Internacional da Juventude e Ano Internacional do Voluntariado 2026: jovens e parceiros comunitários reunidos.' },
  { image: '/images/galeria-4.webp', alt: 'Público e oradores durante uma sessão do FÓLIO, em Óbidos', caption: 'FÓLIO, em Óbidos: literatura, cultura e diálogo como caminhos para a paz.' },
  { image: '/images/galeria-5.webp', alt: 'Sessão institucional e académica na Universidade de Coimbra', caption: 'Coimbra: instituições e parceiros reunidos para congregar sinergias para um mundo de paz.' },
  { image: '/images/galeria-6.webp', alt: 'Joaquim Chissano durante uma intervenção num encontro da CPLP', caption: 'CPLP: diálogo e cooperação entre os povos de língua portuguesa.' },
]

export type Partner = {
  name: string
  area: string
  logo: string
  href?: string
  dark?: boolean
}

export const partners: Partner[] = [
  { name: 'Universidade Europeia', area: 'Ensino superior e investigação', logo: '/logos/universidade-europeia.webp', href: 'https://europeia.pt/' },
  { name: 'Universidade de Coimbra', area: 'Educação e cooperação académica', logo: '/logos/universidade-coimbra.webp', href: 'https://www.uc.pt/' },
  { name: 'Câmara Municipal de Coimbra', area: 'Cooperação institucional e cultural', logo: '/logos/camara-coimbra.webp', href: 'https://www.cm-coimbra.pt/' },
  { name: 'ISQ', area: 'Capacitação técnica e desenvolvimento sustentável', logo: '/logos/isq.webp', href: 'https://www.isq-group.com/' },
  { name: 'Câmara de Comércio Portugal–Moçambique', area: 'Cooperação económica e empresarial', logo: '/logos/ccpm.webp' },
  { name: 'Africa University', area: 'Educação, paz e liderança', logo: '/logos/africa-university.webp', href: 'https://www.africau.edu/' },
  { name: 'Parque Nacional da Gorongosa', area: 'Conservação e desenvolvimento sustentável', logo: '/logos/gorongosa.webp', href: 'https://gorongosa.org/' },
  { name: 'Fundação MASC', area: 'Sociedade civil e boa governação', logo: '/logos/masc.webp', href: 'https://masc.org.mz/' },
  { name: 'Fundação Fernando Leite Couto', area: 'Arte, literatura e cultura', logo: '/logos/fflc.svg', href: 'https://www.fflc.org.mz/' },
  { name: 'Peace Parks Foundation', area: 'Biodiversidade e comunidades', logo: '/logos/peaceparks.webp', href: 'https://www.peaceparks.org/', dark: true },
  { name: 'AMID', area: 'Integridade e desenvolvimento', logo: '/logos/amid.webp', href: 'https://associacaoamid.org/' },
  { name: 'Celinka Survey', area: 'Pesquisa, monitoria e avaliação', logo: '/logos/celinka.webp', href: 'https://celinkasurvey.com/' },
  { name: 'Garson', area: 'Produção e serviços', logo: '/logos/garson.webp' },
]
