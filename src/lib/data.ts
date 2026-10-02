/**
 * Conteúdo do site. Os números, projectos, notícias, vagas e contactos vêm do
 * site em produção (celinkasurvey.com). Edite aqui para actualizar o site.
 */

export const SITE = {
  name: "Celinka Survey Consulting & Services Lda.",
  short: "Celinka Survey",
  url: "https://www.celinkasurvey.com",
  email: "info@celinkasurvey.com",
  emailSecondary: "n.cossa@celinkasurvey.com",
  phones: [
    { label: "+258 847 904 373", href: "tel:+258847904373" },
    { label: "+258 873 904 373", href: "tel:+258873904373" },
  ],
  address: ["Avenida Julius Nyerere N.º 562, 1º Andar", "Polana Cimento, Cidade de Maputo", "República de Moçambique"],
  linkedin: "https://www.linkedin.com/company/celinka-survey-consultoria-servi%C3%A7os/",
  founded: 2021,
};

export type NavChild = { label: string; href: string; description?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

export const SERVICES = [
  {
    id: "monitoria-avaliacao",
    icon: "chart",
    title: "Monitoria e Avaliação (M&A)",
    short: "Indicadores, linhas de base, avaliações intermédias e finais, e estudos de impacto.",
    long: "Criamos evidências sólidas para a tomada de decisão estratégica. Desenvolvemos indicadores, frameworks de acompanhamento, avaliações de linha de base e estudos de impacto que sustentam as melhores decisões programáticas.",
    tags: ["RCTs", "DQA", "Indicadores", "Linha de Base", "Avaliação de Impacto"],
  },
  {
    id: "inqueritos",
    icon: "phone",
    title: "Inquéritos e Recolha de Dados (CAPI)",
    short: "Recolha digital em larga escala nas 11 províncias, com mais de 600 inquiridores certificados.",
    long: "Cobertura em todas as 11 províncias com mais de 600 inquiridores certificados e multilíngues. Utilizamos plataformas digitais avançadas de recolha assistida por computador para garantir dados precisos em tempo real.",
    tags: ["CAPI", "SurveyCTO", "ODK", "KoboToolbox", "CSPro"],
  },
  {
    id: "tpm",
    icon: "shield",
    title: "Monitoria de Terceira Parte (TPM)",
    short: "Verificação independente no terreno da implementação e da qualidade dos dados reportados.",
    long: "Verificação independente, no terreno, da implementação de programas e da qualidade dos dados reportados. Aplicamos os mesmos mecanismos de controlo que usamos nos nossos inquéritos — georreferenciação, fotografias de verificação, auditoria de áudio e validações em tempo real — para dar aos financiadores confiança na informação.",
    tags: ["Verificação independente", "GPS", "Auditoria de áudio", "Relatórios de conformidade"],
  },
  {
    id: "desenvolvimento-institucional",
    icon: "building",
    title: "Desenvolvimento Institucional",
    short: "Reforço de capacidades em M&A, gestão de dados e sistemas de informação.",
    long: "Apoiamos instituições públicas e organizações da sociedade civil a reforçar as suas capacidades em monitoria e avaliação e gestão de dados: formação de equipas, desenho de quadros de indicadores e adopção de ferramentas digitais.",
    tags: ["Formação", "Quadros de indicadores", "Gestão de dados", "Ferramentas digitais"],
  },
  {
    id: "saude",
    icon: "heart",
    title: "Pesquisa em Saúde e Estudos Socioeconómicos",
    short: "Inquéritos demográficos, saúde pública, malária, imunização e inclusão financeira.",
    long: "Especialistas em inquéritos demográficos, saúde pública, malária, imunização e inclusão financeira. Aplicamos metodologias avançadas como LQAS, estudos longitudinais e análise estatística de alta performance.",
    tags: ["LQAS", "Malária", "Longitudinal", "Saúde Pública"],
  },
  {
    id: "sistemas",
    icon: "database",
    title: "Sistemas de Informação e Análise",
    short: "Análise estatística, GIS, bases de dados online e dashboards em tempo real.",
    long: "Modernizamos a gestão de dados institucionais com soluções customizadas: análise estatística avançada, sistemas de informação geográfica, bases de dados online e dashboards de visualização em tempo real.",
    tags: ["STATA", "SPSS", "QGIS", "Nvivo", "Epi Info", "DHIS2"],
  },
] as const;

export const NAV: NavItem[] = [
  {
    label: "Sobre Nós",
    href: "/sobre/",
    children: [
      { label: "Quem Somos", href: "/sobre/", description: "Missão, visão e valores" },
      { label: "Tecnologia e Qualidade", href: "/sobre/#tecnologia", description: "Como garantimos cada dado" },
      { label: "Parceiros", href: "/sobre/#parceiros", description: "Quem confia em nós" },
      { label: "Carreiras", href: "/carreiras/", description: "Junte-se à equipa" },
    ],
  },
  {
    label: "O Que Fazemos",
    href: "/servicos/",
    children: SERVICES.map((s) => ({ label: s.title, href: `/servicos/#${s.id}`, description: s.short })),
  },
  { label: "Nossos Trabalhos", href: "/projetos/" },
  { label: "Recursos & Insights", href: "/recursos/" },
  { label: "Contacto", href: "/contacto/" },
];

export const CHALLENGES = [
  {
    id: "dados",
    question: "Como recolher dados fiáveis em contextos desafiadores?",
    answer:
      "Cobrimos as 11 províncias com mais de 600 inquiridores certificados, que falam as línguas das comunidades e chegam a zonas de difícil acesso — de canoa, a pé ou de moto. Cada entrevista é verificada antes de entrar na base de dados.",
    points: [
      "Georreferenciação por GPS e fotografias de verificação",
      "Auditoria de áudio e High Frequency Checks no mesmo dia de campo",
      "Monitoria 24/7 na nuvem com alertas automáticos",
    ],
    cta: { label: "Inquéritos e recolha de dados", href: "/servicos/#inqueritos" },
  },
  {
    id: "impacto",
    question: "Qual é o impacto real das nossas intervenções sociais?",
    answer:
      "Desenhamos e executamos avaliações de linha de base, intermédias e finais, e estudos de impacto, combinando métodos quantitativos e qualitativos para separar o que funciona do que apenas parece funcionar.",
    points: [
      "Ensaios controlados aleatorizados (RCTs) e estudos longitudinais",
      "Metodologia LQAS para saúde pública",
      "Análise estatística avançada e relatórios científicos com recomendações accionáveis",
    ],
    cta: { label: "Monitoria e Avaliação", href: "/servicos/#monitoria-avaliacao" },
  },
  {
    id: "sistemas",
    question: "Como desenhar sistemas de M&A eficazes?",
    answer:
      "Ajudamos a definir indicadores que importam, a validar a qualidade dos dados (DQA) e a transformar a informação em dashboards em tempo real que equipas de programa e decisores realmente usam.",
    points: [
      "Quadros de indicadores e frameworks de acompanhamento",
      "Auditoria da qualidade dos dados (DQA)",
      "GIS, bases de dados online e dashboards de visualização",
    ],
    cta: { label: "Desenvolvimento Institucional", href: "/servicos/#desenvolvimento-institucional" },
  },
] as const;

export const STATS = [
  { value: 12, suffix: "", label: "Projectos estratégicos", note: "2023–2025" },
  { value: 11, suffix: "", label: "Províncias cobertas", note: "em simultâneo" },
  { value: 40000, suffix: "+", label: "Entrevistas realizadas", note: "em todo o país" },
  { value: new Date().getFullYear() - 2021, suffix: "", label: "Anos de actividade", note: "desde 2021" },
];

export const SECTORS = ["Saúde Pública", "Governação", "Inclusão Financeira", "Desenvolvimento Comunitário"] as const;
export type Sector = (typeof SECTORS)[number];

export type PartnerKey = "harvard" | "pnud" | "unicef" | "giz" | "chai" | "fsdmoc" | "misau" | "maefp" | "adpp" | "pncm" | "fjc";

export const PARTNERS: Record<PartnerKey, { name: string; logo?: string; type: "intl" | "nat" }> = {
  harvard: { name: "Universidade de Harvard", logo: "/partners/harvard.png", type: "intl" },
  pnud: { name: "PNUD", logo: "/partners/pnud.jpg", type: "intl" },
  unicef: { name: "UNICEF", logo: "/partners/unicef.png", type: "intl" },
  giz: { name: "GIZ", logo: "/partners/giz.png", type: "intl" },
  chai: { name: "CHAI", logo: "/partners/chai.png", type: "intl" },
  fsdmoc: { name: "FSDMoç", logo: "/partners/fsdmoc.jpg", type: "intl" },
  misau: { name: "MISAU", logo: "/partners/misau.png", type: "nat" },
  maefp: { name: "MAEFP", logo: "/partners/maefp.png", type: "nat" },
  adpp: { name: "ADPP Moçambique", logo: "/partners/adpp.png", type: "nat" },
  pncm: { name: "PNCM", logo: "/partners/pncm.jpg", type: "nat" },
  fjc: { name: "Fundação Joaquim Chissano", type: "nat" },
};

export type Project = {
  slug: string;
  year: number;
  sector: Sector;
  title: string;
  summary: string;
  client: string;
  partners: PartnerKey[];
  location: string;
  facts: { value: string; label: string }[];
  service: (typeof SERVICES)[number]["id"];
};

export const PROJECTS: Project[] = [
  {
    slug: "finscope-msme-2025",
    year: 2025,
    sector: "Inclusão Financeira",
    title: "Inquérito FinScope MSME",
    summary:
      "4.121 entrevistas a nível nacional para avaliar o acesso a serviços financeiros por micro, pequenas e médias empresas em Moçambique.",
    client: "FSDMoç",
    partners: ["fsdmoc"],
    location: "Nacional",
    facts: [
      { value: "4.121", label: "entrevistas" },
      { value: "Nacional", label: "cobertura" },
    ],
    service: "inqueritos",
  },
  {
    slug: "avaliacao-qsm-niassa",
    year: 2025,
    sector: "Saúde Pública",
    title: "Avaliação QSM Niassa",
    summary:
      "Digitalização da Campanha de Quimioprevenção Sazonal da Malária com 22.028 entrevistas registadas em Niassa — a maior operação de recolha de dados sobre a campanha na província.",
    client: "Universidade de Harvard / ADPP",
    partners: ["harvard", "adpp"],
    location: "Niassa",
    facts: [
      { value: "22.028", label: "entrevistas" },
      { value: "Niassa", label: "província" },
    ],
    service: "saude",
  },
  {
    slug: "cobertura-redes-tratadas",
    year: 2024,
    sector: "Saúde Pública",
    title: "Cobertura de Redes Tratadas",
    summary:
      "Inquérito sobre a Campanha de Cobertura Universal de redes mosquiteiras em Zambézia e Sofala, abrangendo mais de 3.100 agregados familiares. A equipa atravessou rios de canoa para completar 100% da amostra prevista.",
    client: "MISAU / PNCM",
    partners: ["misau", "pncm"],
    location: "Zambézia e Sofala",
    facts: [
      { value: "+3.100", label: "agregados familiares" },
      { value: "100%", label: "da amostra prevista" },
    ],
    service: "saude",
  },
  {
    slug: "ferramentas-digitais-dhis2",
    year: 2024,
    sector: "Saúde Pública",
    title: "Performance de Ferramentas Digitais",
    summary:
      "Estudo qualitativo sobre o desempenho de ferramentas digitais (DHIS2 e Salama) na distribuição de redes em Gaza e Inhambane. Financiado pela CHAI.",
    client: "MISAU / PNCM (CHAI)",
    partners: ["misau", "pncm", "chai"],
    location: "Gaza e Inhambane",
    facts: [
      { value: "DHIS2", label: "e Salama" },
      { value: "Qualitativo", label: "abordagem" },
    ],
    service: "sistemas",
  },
  {
    slug: "indice-satisfacao-cidadao",
    year: 2023,
    sector: "Governação",
    title: "Índice de Satisfação do Cidadão",
    summary:
      "7.000 agregados familiares em todo o país para medir a satisfação com os serviços públicos e a percepção da corrupção, fornecendo ao MAEFP evidências críticas para a reforma dos serviços públicos.",
    client: "MAEFP / PNUD",
    partners: ["maefp", "pnud"],
    location: "11 províncias",
    facts: [
      { value: "7.000", label: "agregados familiares" },
      { value: "11", label: "províncias" },
    ],
    service: "inqueritos",
  },
  {
    slug: "avaliacao-final-coeso-ii",
    year: 2023,
    sector: "Desenvolvimento Comunitário",
    title: "Avaliação Final COESO II",
    summary:
      "Estudo de impacto focado em desenvolvimento comunitário e resiliência social em comunidades moçambicanas.",
    client: "Fundação Joaquim Chissano",
    partners: ["fjc"],
    location: "Moçambique",
    facts: [
      { value: "Avaliação final", label: "tipo de estudo" },
      { value: "Impacto", label: "foco" },
    ],
    service: "monitoria-avaliacao",
  },
];

export type Insight = {
  id: string;
  category: "Notícias" | "Metodologia" | "Histórias de campo";
  date?: string;
  title: string;
  body: string;
  href?: string;
  meta?: string;
};

export const INSIGHTS: Insight[] = [
  {
    id: "recrutamento-qsm-2026",
    category: "Notícias",
    date: "Julho 2026",
    title: "Celinka Survey recruta 560 inquiridores para o Inquérito de Fim de Ronda da QSM",
    body: "Recrutamento em Tete, Niassa e Cabo Delgado para a equipa do Inquérito de Avaliação de Fim da Ronda da Quimioprevenção Sazonal da Malária. A Celinka Survey não cobra qualquer valor em nenhuma fase do processo.",
    href: "/carreiras/",
  },
  {
    id: "exemplars-malaria",
    category: "Notícias",
    date: "2025",
    title: "Celinka Survey integra o estudo Exemplars in Malaria Subnational Tailoring",
    body: "Participação no consórcio internacional de investigação sobre adequação subnacional das intervenções contra a malária, com a Harvard T.H. Chan School of Public Health e a AHADI, ao lado de parceiros do Burquina Faso, Laos, Nigéria e Tanzânia.",
  },
  {
    id: "qsm-niassa",
    category: "Notícias",
    date: "Março 2025",
    title: "Celinka conclui maior levantamento de malária em Niassa com 22.028 entrevistas",
    body: "Em parceria com a Universidade de Harvard e ADPP, concluímos a maior operação de recolha de dados sobre a Campanha QSM no Niassa.",
    href: "/projetos/avaliacao-qsm-niassa/",
  },
  {
    id: "finscope",
    category: "Notícias",
    date: "Fevereiro 2025",
    title: "FinScope MSME 2025: dados sobre inclusão financeira entregues ao FSDMoç",
    body: "O inquérito FinScope MSME, com 4.121 entrevistas a nível nacional, revela o panorama de acesso a serviços financeiros pelas PME moçambicanas.",
    href: "/projetos/finscope-msme-2025/",
  },
  {
    id: "capacitacao",
    category: "Notícias",
    date: "Outubro 2024",
    title: "Celinka capacita nova vaga de inquiridores para os projectos de 2025",
    body: "Concluída com sucesso a formação de novos inquiridores certificados, reforçando a capacidade operacional nacional.",
  },
  {
    id: "met-gps",
    category: "Metodologia",
    title: "Georreferenciação e fotografias: como verificamos cada entrevista",
    body: "Cada entrevista leva coordenadas GPS para confirmar a localização exacta e detectar anomalias geográficas, e fotografias automáticas do agregado familiar que confirmam a sua autenticidade.",
    href: "/servicos/#inqueritos",
    meta: "Nota metodológica",
  },
  {
    id: "met-hfc",
    category: "Metodologia",
    title: "High Frequency Checks: detectar problemas no mesmo dia de campo",
    body: "Validações automáticas em tempo real identificam inconsistências e valores atípicos (outliers) no próprio dia, quando ainda é possível voltar ao terreno e corrigir.",
    href: "/servicos/#inqueritos",
    meta: "Nota metodológica",
  },
  {
    id: "met-audio",
    category: "Metodologia",
    title: "Auditoria de áudio: ouvir para garantir a qualidade",
    body: "Gravações aleatórias de entrevistas são revistas pelos supervisores para garantir a qualidade do processo de recolha e a fidelidade às perguntas do questionário.",
    href: "/servicos/#tpm",
    meta: "Nota metodológica",
  },
  {
    id: "hist-fluvial",
    category: "Histórias de campo",
    title: "Chegar onde outros não chegam",
    body: "Em 2024, a nossa equipa atravessou rios em canoas para atingir comunidades ribeirinhas isoladas na Zambézia, completando 100% da amostra prevista, incluindo zonas sem estradas.",
    href: "/projetos/cobertura-redes-tratadas/",
    meta: "Zambézia, Sofala",
  },
  {
    id: "hist-vozes",
    category: "Histórias de campo",
    title: "Vozes das comunidades rurais",
    body: "Os nossos inquiridores, fluentes nas línguas locais, conduziram grupos focais em comunidades rurais do interior, captando perspectivas que dados quantitativos nunca poderiam revelar.",
    meta: "Niassa, Nampula · 97% de taxa de resposta",
  },
  {
    id: "hist-politicas",
    category: "Histórias de campo",
    title: "Dados que orientam políticas nacionais",
    body: "O Índice de Satisfação do Cidadão (2023), com 7.000 agregados familiares, forneceu ao MAEFP evidências críticas para a reforma dos serviços públicos moçambicanos.",
    href: "/projetos/indice-satisfacao-cidadao/",
    meta: "11 províncias · PNUD",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "A Celinka Survey demonstrou uma capacidade operacional excepcional na implementação do inquérito de cobertura de redes mosquiteiras. A qualidade dos dados e a taxa de resposta de 97% superaram todas as expectativas, sendo determinantes para as nossas decisões programáticas.",
    who: "Gestora de Programa",
    org: "MISAU / Programa Nacional de Controlo da Malária",
  },
  {
    quote:
      "A implementação do inquérito de satisfação do cidadão com 7.000 agregados familiares em todo o país foi executada com rigor metodológico e eficiência logística notáveis. A Celinka Survey é um parceiro de confiança para avaliações de grande envergadura.",
    who: "Técnico de Cooperação",
    org: "PNUD Moçambique",
  },
  {
    quote:
      "O que distingue a Celinka Survey é a capacidade de chegar a comunidades de difícil acesso com equipas treinadas, mantendo os mais altos padrões de qualidade. A georreferenciação e auditoria de áudio garantem confiança total nos resultados.",
    who: "Research Partner",
    org: "Universidade de Harvard — ADPP Moçambique",
  },
  {
    quote:
      "A experiência com o inquérito FinScope MSME demonstrou uma equipa altamente profissional, com capacidade de mobilização rápida em múltiplas províncias simultaneamente. Recomendamos fortemente a Celinka Survey.",
    who: "Directora de Programas",
    org: "FSDMoç — Financial Sector Deepening",
  },
];

export const QUALITY = [
  { icon: "pin", title: "Georreferenciação por GPS", text: "Coordenadas GPS em cada entrevista para verificar a localização exacta e detectar anomalias geográficas." },
  { icon: "camera", title: "Fotos de verificação", text: "Fotografias automáticas do agregado familiar confirmam a autenticidade de cada entrevista realizada." },
  { icon: "mic", title: "Auditoria de áudio", text: "Gravações aleatórias revistas pelos supervisores para garantir a qualidade do processo de recolha." },
  { icon: "activity", title: "High Frequency Checks", text: "Validações automáticas em tempo real identificam inconsistências e outliers no mesmo dia de campo." },
  { icon: "cloud", title: "Monitoria 24/7", text: "Integridade de dados na nuvem com disponibilidade constante e sistemas de alerta automáticos." },
  { icon: "lifebuoy", title: "Helpdesk especializado", text: "Suporte técnico contínuo do inquiridor em campo ao coordenador nacional, em todas as fases." },
] as const;

export const VALUES = [
  { title: "Rigor metodológico", text: "Os mais altos padrões científicos em cada estudo." },
  { title: "Inovação CAPI", text: "Tecnologia de última geração no campo." },
  { title: "Transparência total", text: "Auditoria interna e externa em todos os projectos." },
  { title: "Inclusão local", text: "Equipas multilíngues, nas línguas das comunidades." },
];

export const MVV = [
  { k: "Missão", d: "Fornecer evidências rigorosas orientadas a dados que melhorem a eficácia das intervenções sociais em todo o território nacional." },
  { k: "Visão", d: "Ser a consultora de referência em Moçambique, reconhecida pela integridade dos dados e pela inovação tecnológica." },
  { k: "Valores", d: "Rigor metodológico, transparência total, inovação tecnológica e inclusão das línguas e realidades locais." },
];

export const JOBS = [
  { title: "Supervisor(a) de Campo", meta: "Zambézia · Projecto de curta duração", tags: ["Supervisão", "Campo", "Zambézia"], subject: "Candidatura: Supervisor de Campo" },
  { title: "Inquiridor(a) de Campo — CAPI", meta: "Nampula, Niassa, Cabo Delgado · Por projecto", tags: ["Campo", "CAPI", "Norte"], subject: "Candidatura: Inquiridor de Campo" },
  { title: "Analista de Dados Sénior", meta: "Maputo · Full-time ou Consultoria", tags: ["Estatística", "GIS", "Sénior"], subject: "Candidatura: Analista de Dados" },
  { title: "Candidatura Espontânea", meta: "Todas as províncias · Várias áreas", tags: ["Geral", "Aberta"], subject: "Candidatura Espontânea" },
];

export const PROVINCES = ["Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", "Sofala", "Manica", "Tete", "Zambézia", "Nampula", "Niassa", "Cabo Delgado"];

export function mailto(subject: string, body = "") {
  const q = [`subject=${encodeURIComponent(subject)}`];
  if (body) q.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}?${q.join("&")}`;
}

/** Fotografias de campo da equipa (public/photos). */
export const PHOTOS = {
  chemba: { src: "/photos/campo-chemba.jpg", width: 960, height: 1276, alt: "Inquiridora da Celinka Survey sorri junto à placa do distrito de Chemba", caption: "À entrada do distrito de Chemba" },
  chambeluca: { src: "/photos/campo-chambeluca.jpg", width: 720, height: 1280, alt: "Inquiridora regista a localização com o telemóvel numa aldeia de Chambeluca, Tete", caption: "Registo de localização em Chambeluca, Tete" },
  natemba: { src: "/photos/campo-natemba.jpg", width: 472, height: 960, alt: "Inquiridora de boné e mochila junto à placa de madeira que indica Natemba", caption: "A caminho de Natemba" },
  rio: { src: "/photos/equipa-rio.jpg", width: 1280, height: 960, alt: "Duas inquiridoras com cartão de identificação sentadas junto ao rio, rodeadas de mangal", caption: "Inquiridoras numa pausa junto ao rio" },
} as const;
