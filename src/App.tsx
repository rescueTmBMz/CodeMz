import { useEffect, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Play,
  Pause,
  RefreshCw,
  X,
} from 'lucide-react'
import { gallery, impacts, management, news, partners, pillars } from './content'
import type { Partner } from './content'
import { trpc } from '@/providers/trpc'
import './App.css'

const navigation = [
  { label: 'A Fundação', href: '#fundacao', id: 'fundacao' },
  { label: 'Áreas de actuação', href: '#pilares', id: 'pilares' },
  { label: 'Impacto', href: '#impacto', id: 'impacto' },
  { label: 'Estratégia', href: '#estrategia', id: 'estrategia' },
  { label: 'Notícias', href: '#noticias', id: 'noticias' },
  { label: 'Parceiros', href: '#parceiros', id: 'parceiros' },
]

const socialLinks = [
  { name: 'Facebook', network: 'facebook', href: 'https://www.facebook.com/profile.php?id=61551227054424&sk=about' },
  { name: 'LinkedIn', network: 'linkedin', href: 'https://www.linkedin.com/in/funda%C3%A7%C3%A3o-joaquim-chissano-29066a408/' },
] as const

function SocialIcon({ network, size = 20 }: { network: 'facebook' | 'linkedin'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      {network === 'facebook' ? (
        <path d="M13.7 21v-8.2h2.76l.41-3.2H13.7V7.56c0-.93.26-1.56 1.59-1.56h1.7V3.14c-.3-.04-1.3-.14-2.47-.14-2.45 0-4.12 1.49-4.12 4.23V9.6H7.64v3.2h2.76V21h3.3Z" />
      ) : (
        <path d="M5.35 7.85A1.85 1.85 0 1 0 5.35 4.15a1.85 1.85 0 0 0 0 3.7ZM3.75 21h3.2V9H3.75v12Zm5.3 0h3.2v-6.65c0-1.57.3-3.1 2.25-3.1 1.93 0 1.95 1.8 1.95 3.2V21h3.2v-7.35c0-3.61-.78-6.39-4.99-6.39-2.02 0-3.38 1.11-3.94 2.16h-.06V9h-3.2c.04 1.08 0 12 0 12h3.2Z" />
      )}
    </svg>
  )
}

function PartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <div className={`partner-logo ${partner.dark ? 'partner-logo-dark' : ''}`}>
        <img src={partner.logo} alt="" width="240" height="100" loading="lazy" />
      </div>
      <div><h3>{partner.name}</h3><p>{partner.area}</p></div>
      {partner.href && <span className="partner-link">Website oficial <ExternalLink size={15} aria-hidden="true" /></span>}
    </>
  )
  return partner.href ? (
    <a className="partner" href={partner.href} target="_blank" rel="noreferrer" aria-label={`${partner.name} — visitar website oficial`}>{content}</a>
  ) : (
    <article className="partner partner-static">{content}</article>
  )
}

type DisplayNews = {
  id: string
  date: string
  isoDate?: string
  category: string
  title: string
  text: string
  image: string | null
  alt: string
  href: string
  label: string
}

const editorialDates = ['2026-07-30', '2026-10-12', '2026-10-11', '2026-10-15']
const editorialNews: DisplayNews[] = news.map((item, index) => ({
  id: `editorial-${index}`,
  date: item.date,
  isoDate: editorialDates[index],
  category: item.category,
  title: item.title,
  text: item.text,
  image: item.image,
  alt: item.alt,
  href: item.href,
  label: item.label,
}))

function formatSocialDate(value: string) {
  return new Intl.DateTimeFormat('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' })
    .format(new Date(value))
    .replaceAll('.', '')
}

const values = [
  { title: 'Solidariedade e dignidade', text: 'Trabalhamos para que cada pessoa possa viver com dignidade e contribuir para o bem comum.' },
  { title: 'Igualdade e oportunidade', text: 'Promovemos a igualdade de género, os direitos humanos e o acesso justo a oportunidades.' },
  { title: 'Diálogo e reconciliação', text: 'Fazemos da tolerância e do entendimento a base para prevenir conflitos e construir a paz.' },
  { title: 'Parceria e transparência', text: 'Unimos instituições e comunidades através de relações sólidas, responsáveis e transparentes.' },
]

const events = [
  { day: '30', month: 'JUL', year: '2026', title: 'Lançamento do Plano Estratégico 2026–2035', place: 'Centro de Conferências da Tmcel · Maputo', href: news[0].href },
  { day: '11', month: 'OUT', year: '2026', title: 'FÓLIO — Festival Literário Internacional de Óbidos', place: 'Prémio Literário Fernando Leite Couto · Óbidos', href: news[2].href },
  { day: '15', month: 'OUT', year: '2026', title: 'Encontro de cooperação FJC e ISQ', place: 'Capacitação e desenvolvimento sustentável', href: news[3].href },
]

type FormErrors = Partial<Record<'nome' | 'email' | 'assunto' | 'mensagem', string>>

function keepFocusInside(event: globalThis.KeyboardEvent, container: HTMLElement | null) {
  if (event.key !== 'Tab' || !container) return
  const focusable = Array.from(container.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'))
    .filter((element) => element.offsetParent !== null)
  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  if (!first || !last) return
  if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

type CinematicMediaProps = {
  id: string
  eyebrow: string
  title: string
  text: string
  image?: string
  video?: string
  poster?: string
  alt: string
  nextHref: string
  nextLabel: string
}

function CinematicMedia({ id, eyebrow, title, text, image, video, poster, alt, nextHref, nextLabel }: CinematicMediaProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const userPausedRef = useRef(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const media = section?.querySelector<HTMLElement>('.cinematic-media')
    const player = videoRef.current
    if (!section || !media) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let inView = false
    let frame = 0

    const updateMedia = () => {
      frame = 0
      if (reduceMotion) return
      const rect = section.getBoundingClientRect()
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      const scale = 1.09 - progress * 0.09
      const offset = (0.5 - progress) * 3
      media.style.transform = `scale(${scale}) translate3d(0, ${offset}%, 0)`
    }
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMedia)
    }
    const syncPlayback = () => {
      if (!player) return
      if (inView && !reduceMotion && !userPausedRef.current && document.visibilityState === 'visible') {
        player.play().catch(() => setPlaying(false))
      } else {
        player.pause()
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.2 })
    const onVisibilityChange = () => syncPlayback()

    observer.observe(section)
    updateMedia()
    window.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (frame) window.cancelAnimationFrame(frame)
      player?.pause()
    }
  }, [video])

  function togglePlayback() {
    const player = videoRef.current
    if (!player) return
    if (player.paused) {
      userPausedRef.current = false
      player.play().catch(() => setPlaying(false))
    } else {
      userPausedRef.current = true
      player.pause()
    }
  }

  return (
    <section ref={sectionRef} id={id} className="cinematic" aria-labelledby={`${id}-title`}>
      {video ? (
        <video
          ref={videoRef}
          className="cinematic-media"
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-label={alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <img className="cinematic-media" src={image} alt={alt} width="1600" height="1067" loading="lazy" />
      )}
      <div className="cinematic-shade" aria-hidden="true" />
      <div className="cinematic-content page-shell">
        <p className="cinematic-eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p>{text}</p>
        <a className="cinematic-next" href={nextHref}>{nextLabel}<ArrowDown size={18} aria-hidden="true" /></a>
      </div>
      {video && (
        <button className="cinematic-play" type="button" onClick={togglePlayback} aria-label={playing ? 'Pausar vídeo de fundo' : 'Reproduzir vídeo de fundo'}>
          {playing ? <Pause size={19} aria-hidden="true" /> : <Play size={19} aria-hidden="true" />}
          <span>{playing ? 'Pausar' : 'Reproduzir'}</span>
        </button>
      )}
    </section>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [activePillar, setActivePillar] = useState(0)
  const [activeImpact, setActiveImpact] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [formStatus, setFormStatus] = useState('')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null)
  const lightboxCloseRef = useRef<HTMLButtonElement>(null)
  const galleryTriggerRef = useRef<HTMLButtonElement | null>(null)
  const impactTrackRef = useRef<HTMLDivElement>(null)
  const socialFeed = trpc.social.feed.useQuery(undefined, {
    // Sem backend (alojamento estático) mostra-se o conteúdo editorial, sem pedidos falhados.
    enabled: import.meta.env.VITE_ENABLE_BACKEND === 'true',
    refetchInterval: 15 * 60 * 1000,
    refetchOnWindowFocus: true,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  })

  const pillar = pillars[activePillar]
  const automaticNews: DisplayNews[] = (socialFeed.data?.posts ?? []).map((post) => ({
    id: post.id,
    date: formatSocialDate(post.publishedAt),
    isoDate: post.publishedAt,
    category: post.source === 'facebook' ? 'Facebook' : 'LinkedIn',
    title: post.title,
    text: post.text,
    image: post.imageUrl,
    alt: post.title,
    href: post.url,
    label: 'Ver publicação',
  }))
  const currentNews = automaticNews.length ? automaticNews : editorialNews
  const featuredNews = currentNews[0]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['inicio', ...navigation.map((item) => item.id), 'contacto']
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible[0]) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = document.querySelectorAll<HTMLElement>('.section-heading, .purpose-grid > div, .patron-feature, .legacy, .vision-mission, .values-block, .impact-stats, .strategy-intro, .management-list, .news-layout, .events-block, .video-feature, .gallery-grid, .partner-grid, .contact-intro, .contact-form')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' })
    items.forEach((item) => {
      item.classList.add('reveal-item')
      observer.observe(item)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightboxIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, lightboxIndex])

  useEffect(() => {
    if (menuOpen) firstMobileLinkRef.current?.focus()
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      keepFocusInside(event, document.getElementById('mobile-menu'))
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  useEffect(() => {
    if (lightboxIndex === null) return
    lightboxCloseRef.current?.focus()
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      keepFocusInside(event, document.querySelector('.lightbox'))
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowLeft') changeLightbox(-1)
      if (event.key === 'ArrowRight') changeLightbox(1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightboxIndex])

  function closeMenu() {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  function openLightbox(index: number, trigger: HTMLButtonElement) {
    galleryTriggerRef.current = trigger
    setLightboxIndex(index)
  }

  function closeLightbox() {
    setLightboxIndex(null)
    window.setTimeout(() => galleryTriggerRef.current?.focus(), 0)
  }

  function changeLightbox(direction: number) {
    setLightboxIndex((current) => current === null ? null : (current + direction + gallery.length) % gallery.length)
  }

  function handlePillarKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % pillars.length
    if (event.key === 'ArrowLeft') next = (index - 1 + pillars.length) % pillars.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = pillars.length - 1
    setActivePillar(next)
    const tabs = event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
    tabs?.[next]?.focus()
  }

  function goToImpact(index: number) {
    const track = impactTrackRef.current
    const slide = track?.children[index] as HTMLElement | undefined
    if (!track || !slide) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: reduceMotion ? 'auto' : 'smooth' })
    setActiveImpact(index)
  }

  function updateActiveImpact() {
    const track = impactTrackRef.current
    if (!track) return
    const slides = Array.from(track.children) as HTMLElement[]
    const closest = slides.reduce((best, slide, index) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft)
      return distance < best.distance ? { index, distance } : best
    }, { index: 0, distance: Number.POSITIVE_INFINITY })
    setActiveImpact(closest.index)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const nome = String(data.get('nome') || '').trim()
    const email = String(data.get('email') || '').trim()
    const assunto = String(data.get('assunto') || '').trim()
    const mensagem = String(data.get('mensagem') || '').trim()
    const errors: FormErrors = {}
    if (nome.length < 2) errors.nome = 'Indique o seu nome.'
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = 'Indique um endereço de email válido.'
    if (!assunto) errors.assunto = 'Escolha o assunto da sua mensagem.'
    if (mensagem.length < 12) errors.mensagem = 'Escreva uma mensagem com pelo menos 12 caracteres.'
    setFormErrors(errors)
    if (Object.keys(errors).length) {
      setFormStatus('Reveja os campos assinalados antes de continuar.')
      const first = Object.keys(errors)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }
    const subject = `[Website FJC] ${assunto} — ${nome}`
    const body = `Nome: ${nome}\nEmail: ${email}\nAssunto: ${assunto}\n\n${mensagem}`
    setFormStatus('Mensagem preparada. A abrir o seu programa de email para a poder enviar.')
    window.location.href = `mailto:info@fjc.org.mz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <>
      <a className="skip-link" href="#conteudo">Saltar para o conteúdo</a>

      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a className="brand" href="#inicio" aria-label="Fundação Joaquim Chissano — Início">
            <img src="/logos/fjc-horizontal-cor.svg" alt="Fundação Joaquim Chissano" width="210" height="54" />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {navigation.map((item) => (
              <a key={item.id} href={item.href} className={activeSection === item.id ? 'active' : ''}>{item.label}</a>
            ))}
          </nav>
          <div className="header-social" aria-label="Redes sociais">
            {socialLinks.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name} da Fundação — abre em nova janela`}><SocialIcon network={social.network} size={18} /></a>)}
          </div>
          <a className="header-contact" href="#contacto">Contactar <ArrowUpRight size={17} aria-hidden="true" /></a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="menu-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeMenu() }}>
          <nav id="mobile-menu" className="mobile-menu" aria-label="Navegação móvel">
            {navigation.map((item, index) => (
              <a key={item.id} ref={index === 0 ? firstMobileLinkRef : undefined} href={item.href} onClick={() => setMenuOpen(false)}>
                {item.label}<ArrowRight size={20} aria-hidden="true" />
              </a>
            ))}
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto<ArrowRight size={20} aria-hidden="true" /></a>
            <div className="mobile-social" aria-label="Redes sociais">
              {socialLinks.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name} da Fundação`}><SocialIcon network={social.network} /><span>{social.name}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}
            </div>
          </nav>
        </div>
      )}

      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <img className="hero-image" src="/images/hero.webp" alt="Joaquim Chissano com participantes e representantes institucionais na Universidade Europeia" width="2400" height="1600" fetchPriority="high" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content page-shell">
            <p className="hero-kicker">Fundação Joaquim Chissano</p>
            <h1 id="hero-title">Congregar sinergias<br />para um mundo de paz.</h1>
            <p className="hero-intro">Diálogo, desenvolvimento e cultura para transformar comunidades em Moçambique e na África Austral.</p>
            <div className="hero-actions">
              <a className="button button-light" href="#estrategia">Conhecer o plano <ArrowRight size={18} aria-hidden="true" /></a>
              <a className="text-link text-link-light" href="#fundacao">Descobrir a Fundação <ArrowDown size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <a className="hero-scroll" href="#proposito" aria-label="Continuar para o nosso propósito">
            <span>Continuar</span><ArrowDown size={18} aria-hidden="true" />
          </a>
        </section>

        <section id="proposito" className="purpose section-pad">
          <div className="page-shell purpose-grid">
            <p className="section-label">O nosso propósito</p>
            <div>
              <h2 className="statement">Um legado de paz.<br />Uma estratégia para o futuro.</h2>
              <p className="lead">A Fundação Joaquim Chissano desenvolve e apoia iniciativas que aproximam pessoas, fortalecem comunidades e abrem oportunidades. Trabalhamos com quem está no terreno, porque a transformação duradoura começa com confiança local.</p>
              <a className="text-link" href="#pilares">Explorar as áreas de actuação <ArrowRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <CinematicMedia
          id="dialogo"
          eyebrow="O poder do diálogo"
          title="A paz começa quando escutamos."
          text="Cada conversa pode abrir um caminho. Cada gesto de entendimento pode aproximar uma comunidade."
          video="/video/fjc-dialogo-transicao.mp4"
          poster="/video/fjc-dialogo-poster.webp"
          alt="Intervenção institucional durante um encontro da Fundação Joaquim Chissano"
          nextHref="#fundacao"
          nextLabel="Entrar na Fundação"
        />

        <section id="fundacao" className="foundation section-pad">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div><p className="section-label">A Fundação</p><h2>Servir Moçambique.<br />Contribuir para África.</h2></div>
              <p>Criada a partir do legado e da experiência de Joaquim Chissano na liderança e mediação de conflitos, a FJC é uma instituição moçambicana de utilidade pública dedicada à estabilidade, ao bem-estar social e ao desenvolvimento sustentável.</p>
            </div>

            <div className="patron-feature">
              <figure className="patron-photo">
                <img src="/images/patrono.webp" alt="Joaquim Chissano, patrono da Fundação" width="640" height="427" loading="lazy" />
                <figcaption><strong>Joaquim Chissano</strong><span>Patrono da Fundação</span></figcaption>
              </figure>
              <blockquote className="patron-message">
                <p>“Acreditamos que, através do diálogo, da educação e da valorização da nossa cultura, podemos construir um futuro onde a estabilidade e a prosperidade sejam uma realidade para todas as comunidades.”</p>
                <footer>Joaquim Chissano <span>Mensagem do patrono</span></footer>
              </blockquote>
            </div>

            <div className="legacy" aria-label="Marcos do legado da Fundação">
              <article><time>1992</time><h3>Acordo de Roma</h3><p>Um marco histórico de diálogo e reconciliação que encerrou o conflito armado em Moçambique.</p></article>
              <article><time>2007</time><h3>Prémio Mo Ibrahim</h3><p>Reconhecimento internacional pela liderança democrática e pelo serviço ao desenvolvimento africano.</p></article>
              <article><time>2023</time><h3>Revitalização institucional</h3><p>Um novo impulso para ampliar parcerias, programas e o impacto social da Fundação.</p></article>
            </div>

            <div className="vision-mission">
              <article><p className="section-label">Visão</p><h3>Populações a viver em paz e harmonia, com melhor qualidade de vida e plena integração.</h3><p>Um Moçambique e uma África Austral livres da pobreza e da fome, capazes de usar os seus recursos locais para um desenvolvimento sustentável.</p></article>
              <article><p className="section-label">Missão</p><h3>Construir a paz, elevar a qualidade de vida rural e valorizar a identidade cultural.</h3><p>Desenvolver e apoiar projectos orientados para as comunidades, com participação local e cooperação entre sectores.</p></article>
            </div>

            <div className="values-block">
              <div className="subsection-title"><p className="section-label">Os nossos valores</p><h3>Princípios que orientam cada decisão.</h3></div>
              <div className="values-list">
                {values.map((value) => <article key={value.title}><h4>{value.title}</h4><p>{value.text}</p></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="pilares" className="pillars section-pad">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div><p className="section-label">Áreas de actuação</p><h2>Três pilares.<br />Um propósito comum.</h2></div>
              <p>Programas conectados por investigação aplicada, partilha de conhecimento e participação comunitária.</p>
            </div>
            <div className="pillar-tabs" role="tablist" aria-label="Pilares de actuação">
              {pillars.map((item, index) => (
                <button
                  key={item.id}
                  id={`tab-${item.id}`}
                  type="button"
                  role="tab"
                  aria-selected={activePillar === index}
                  aria-controls={`panel-${item.id}`}
                  tabIndex={activePillar === index ? 0 : -1}
                  className={activePillar === index ? 'active' : ''}
                  onClick={() => setActivePillar(index)}
                  onKeyDown={(event) => handlePillarKeys(event, index)}
                >
                  {item.name}<ArrowUpRight size={22} aria-hidden="true" />
                </button>
              ))}
            </div>
            <div key={pillar.id} id={`panel-${pillar.id}`} className="pillar-panel" role="tabpanel" aria-labelledby={`tab-${pillar.id}`}>
              <div className="pillar-image-wrap"><img src={pillar.image} alt={pillar.alt} width="1200" height="800" loading="lazy" /></div>
              <div className="pillar-copy">
                <p className="pillar-name">{pillar.name}</p>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
                <ul>{pillar.points.map((point) => <li key={point}><Check size={18} aria-hidden="true" />{point}</li>)}</ul>
                <a className="text-link" href="#contacto">Construir uma parceria <ArrowRight size={18} aria-hidden="true" /></a>
              </div>
            </div>
          </div>
        </section>

        <CinematicMedia
          id="identidade"
          eyebrow="Identidade que nos aproxima"
          title="A cultura dá voz ao que somos."
          text="Nas artes, nas línguas e na partilha de conhecimento, encontramos novas formas de construir pertença e esperança."
          image="/images/noticia-folio.webp"
          alt="Sessão de entrega do Prémio Literário Fernando Leite Couto no FÓLIO"
          nextHref="#impacto"
          nextLabel="Ver o impacto"
        />

        <section id="impacto" className="impact section-pad">
          <div className="page-shell">
            <div className="section-heading split-heading">
              <div><p className="section-label">Impacto no terreno</p><h2>Resultados que<br />se sentem na vida.</h2></div>
              <p>Da formação profissional ao acesso à água, cada iniciativa responde a uma necessidade concreta e mobiliza conhecimento, parceiros e comunidades.</p>
            </div>
            <dl className="impact-stats">
              <div><dt>200</dt><dd>famílias com acesso a água potável em Mangol, Bilene</dd></div>
              <div><dt>Centenas</dt><dd>de famílias agricultoras capacitadas no Chókwè</dd></div>
              <div><dt>5</dt><dd>iniciativas de referência em diferentes territórios</dd></div>
              <div><dt>3</dt><dd>pilares integrados numa mesma visão de futuro</dd></div>
            </dl>
          </div>
          <div className="impact-carousel">
            <div className="impact-track" ref={impactTrackRef} onScroll={updateActiveImpact} aria-label="Projectos de impacto">
              {impacts.map((item, index) => (
                <article className="impact-card" key={item.title} aria-label={`${index + 1} de ${impacts.length}`}>
                  <img src={item.image} alt={item.alt} width="960" height="1200" loading="lazy" />
                  <div className="impact-card-shade" aria-hidden="true" />
                  {item.illustrative && <span className="impact-media-note">Imagem ilustrativa</span>}
                  <div className="impact-card-copy"><p>{item.place}</p><h3>{item.title}</h3><span>{item.text}</span></div>
                </article>
              ))}
            </div>
            <div className="carousel-controls page-shell">
              <div className="carousel-dots" aria-label="Escolher projecto">
                {impacts.map((item, index) => <button key={item.title} type="button" className={activeImpact === index ? 'active' : ''} aria-label={`Ver ${item.title}`} aria-current={activeImpact === index ? 'true' : undefined} onClick={() => goToImpact(index)}><span /></button>)}
              </div>
              <div className="carousel-arrows">
                <button type="button" aria-label="Projecto anterior" disabled={activeImpact === 0} onClick={() => goToImpact(Math.max(0, activeImpact - 1))}><ArrowLeft aria-hidden="true" /></button>
                <button type="button" aria-label="Projecto seguinte" disabled={activeImpact === impacts.length - 1} onClick={() => goToImpact(Math.min(impacts.length - 1, activeImpact + 1))}><ArrowRight aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        </section>

        <section id="estrategia" className="strategy section-pad">
          <div className="page-shell strategy-grid">
            <div className="strategy-intro">
              <p className="section-label section-label-light">Plano Estratégico 2026–2035</p>
              <h2>Uma década para transformar visão em resultados.</h2>
              <p>O novo ciclo estratégico fortalece a capacidade institucional, aproxima parceiros e estabelece uma actuação orientada por evidências, transparência e impacto sustentável.</p>
              <a className="download-card" href="/docs/Plano-Estrategico-FJC-2026-2035.pdf" download>
                <FileText size={28} aria-hidden="true" />
                <span><strong>Descarregar o Plano Estratégico</strong><small>Documento integral · PDF · 9 páginas</small></span>
                <Download size={22} aria-hidden="true" />
              </a>
            </div>
            <div className="management-list">
              <p className="management-title">Modelo de gestão</p>
              {management.map((item) => <details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.text}</p></details>)}
            </div>
          </div>
        </section>

        <section id="noticias" className="news section-pad">
          <div className="page-shell">
            <div className="section-heading news-heading"><div><p className="section-label">Actualidade</p><h2>Notícias & eventos</h2></div><p>Acompanhe o trabalho da Fundação, os encontros e as parcerias que fazem a estratégia acontecer.</p></div>
            <div className="news-sync" aria-live="polite">
              <span className={automaticNews.length ? 'is-automatic' : ''}><i aria-hidden="true" />{automaticNews.length ? 'Publicações actualizadas automaticamente das redes oficiais' : 'Notícias e coberturas institucionais'}</span>
              {automaticNews.length > 0 && <button type="button" onClick={() => socialFeed.refetch()} disabled={socialFeed.isFetching}><RefreshCw className={socialFeed.isFetching ? 'is-spinning' : ''} size={16} aria-hidden="true" />{socialFeed.isFetching ? 'A actualizar' : 'Actualizar'}</button>}
            </div>
            <div className="news-layout">
              <a className="featured-news" href={featuredNews.href} target="_blank" rel="noreferrer">
                <div className="featured-news-image"><img className={!featuredNews.image ? 'news-logo-fallback' : ''} src={featuredNews.image ?? '/logos/fjc-simbolo-cor.svg'} alt={featuredNews.image ? featuredNews.alt : ''} width="1200" height="800" loading="lazy" /></div>
                <div className="news-meta"><span>{featuredNews.category}</span><time dateTime={featuredNews.isoDate}>{featuredNews.date}</time></div>
                <h3>{featuredNews.title}</h3><p>{featuredNews.text}</p>
                <span className="text-link">{featuredNews.label}<ArrowUpRight size={18} aria-hidden="true" /><span className="sr-only"> — abre em nova janela</span></span>
              </a>
              <div className="news-list">
                {currentNews.slice(1, 4).map((item) => (
                  <a key={item.id} className="news-row" href={item.href} target="_blank" rel="noreferrer">
                    <img className={!item.image ? 'news-logo-fallback' : ''} src={item.image ?? '/logos/fjc-simbolo-cor.svg'} alt="" width="320" height="220" loading="lazy" />
                    <div><div className="news-meta"><span>{item.category}</span><time dateTime={item.isoDate}>{item.date}</time></div><h3>{item.title}</h3><p>{item.text}</p><span className="row-link">{item.label}<ArrowUpRight size={16} aria-hidden="true" /></span></div>
                  </a>
                ))}
              </div>
            </div>

            <div className="events-block">
              <div className="subsection-title"><p className="section-label">Momentos recentes</p><h3>Encontros que aproximam ideias e pessoas.</h3></div>
              <div className="events-list">
                {events.map((event) => (
                  <a key={event.title} href={event.href} target="_blank" rel="noreferrer" className="event-row">
                    <time><strong>{event.day}</strong><span>{event.month} · {event.year}</span></time>
                    <div><h4>{event.title}</h4><p>{event.place}</p></div>
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="galeria" className="media section-pad">
          <div className="page-shell">
            <div className="section-heading split-heading"><div><p className="section-label section-label-light">A Fundação em imagens</p><h2>Histórias partilhadas.<br />Memórias que ficam.</h2></div><p>Um olhar sobre as pessoas, encontros e celebrações que dão vida à nossa missão.</p></div>
            <div className="video-feature">
              <video controls preload="none" poster="/video/fjc-video-poster.jpg" aria-label="Vídeo institucional da Fundação Joaquim Chissano">
                <source src="/video/fjc-institucional.mp4" type="video/mp4" />
                O seu navegador não suporta vídeo HTML5. <a href="/video/fjc-institucional.mp4" download>Descarregar o vídeo</a>.
              </video>
              <div className="video-caption"><Play size={20} aria-hidden="true" /><div><h3>Uma Fundação feita de encontros</h3><p>Registo de momentos institucionais e comunitários da FJC, reunidos numa apresentação sobre o seu legado e trabalho.</p></div></div>
            </div>
            <div className="gallery-grid">
              {gallery.map((item, index) => (
                <button key={item.image} type="button" className={`gallery-item gallery-item-${index + 1}`} onClick={(event) => openLightbox(index, event.currentTarget)} aria-label={`Ampliar imagem: ${item.alt}`}>
                  <img src={item.image} alt={item.alt} width="900" height="650" loading="lazy" />
                  <span className="gallery-open"><ArrowUpRight aria-hidden="true" /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="parceiros" className="partners section-pad">
          <div className="page-shell">
            <div className="section-heading split-heading"><div><p className="section-label">Parceiros</p><h2>Juntos fazemos<br />mais e melhor.</h2></div><p>A nossa actuação ganha escala através de uma rede de instituições que partilham conhecimento, recursos e compromisso com o desenvolvimento.</p></div>
            <div className="partner-grid">
              {partners.map((partner) => <PartnerCard key={partner.name} partner={partner} />)}
              <a className="partner partner-cta" href="#contacto"><div><span>Nova parceria</span><h3>O próximo projecto pode começar aqui.</h3></div><ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
        </section>

        <section id="contacto" className="contact section-pad">
          <div className="page-shell contact-grid">
            <div className="contact-intro">
              <p className="section-label section-label-light">Contacto</p>
              <h2>Vamos construir algo juntos.</h2>
              <p>Estamos disponíveis para dialogar, formar novas parcerias e partilhar mais informações sobre os nossos projectos.</p>
              <address>
                <a href="https://www.google.com/maps/search/?api=1&query=954+Avenida+do+Zimbabue+Maputo+Mocambique" target="_blank" rel="noreferrer"><MapPin aria-hidden="true" /><span><strong>Maputo, Moçambique</strong>954 Av. do Zimbábwe</span><ArrowUpRight size={18} aria-hidden="true" /></a>
                <a href="mailto:info@fjc.org.mz"><Mail aria-hidden="true" /><span><strong>Email</strong>info@fjc.org.mz</span><ArrowUpRight size={18} aria-hidden="true" /></a>
                <a href="tel:+258844723724"><Phone aria-hidden="true" /><span><strong>Telefone</strong>+258 84 472 3724</span><ArrowUpRight size={18} aria-hidden="true" /></a>
              </address>
            </div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-heading"><h3>Envie-nos uma mensagem</h3><p>Preencha os campos para preparar um email no seu dispositivo.</p></div>
              <div className="form-row">
                <div className="field"><label htmlFor="nome">Nome</label><input id="nome" name="nome" type="text" autoComplete="name" aria-invalid={Boolean(formErrors.nome)} aria-describedby={formErrors.nome ? 'nome-erro' : undefined} onChange={() => setFormErrors((errors) => ({ ...errors, nome: undefined }))} />{formErrors.nome && <span id="nome-erro" className="field-error">{formErrors.nome}</span>}</div>
                <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(formErrors.email)} aria-describedby={formErrors.email ? 'email-erro' : undefined} onChange={() => setFormErrors((errors) => ({ ...errors, email: undefined }))} />{formErrors.email && <span id="email-erro" className="field-error">{formErrors.email}</span>}</div>
              </div>
              <div className="field"><label htmlFor="assunto">Assunto</label><select id="assunto" name="assunto" defaultValue="" aria-invalid={Boolean(formErrors.assunto)} aria-describedby={formErrors.assunto ? 'assunto-erro' : undefined} onChange={() => setFormErrors((errors) => ({ ...errors, assunto: undefined }))}><option value="" disabled>Seleccione uma opção</option><option>Parcerias e cooperação</option><option>Programas e projectos</option><option>Imprensa e comunicação</option><option>Outro assunto</option></select>{formErrors.assunto && <span id="assunto-erro" className="field-error">{formErrors.assunto}</span>}</div>
              <div className="field"><label htmlFor="mensagem">Mensagem</label><textarea id="mensagem" name="mensagem" rows={5} aria-invalid={Boolean(formErrors.mensagem)} aria-describedby={formErrors.mensagem ? 'mensagem-erro' : undefined} onChange={() => setFormErrors((errors) => ({ ...errors, mensagem: undefined }))} />{formErrors.mensagem && <span id="mensagem-erro" className="field-error">{formErrors.mensagem}</span>}</div>
              <button className="button button-primary form-submit" type="submit">Preparar email <ArrowUpRight size={18} aria-hidden="true" /></button>
              <p className="form-note">Nenhum dado é guardado neste website. Ao continuar, abre-se o programa de email do seu dispositivo para rever e enviar a mensagem.</p>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
            </form>
          </div>
        </section>

        <section className="social-connect" aria-labelledby="social-title">
          <div className="page-shell social-connect-grid">
            <div><p className="section-label">Redes oficiais</p><h2 id="social-title">Mais perto.<br />Todos os dias.</h2><p>Siga os canais oficiais da Fundação para acompanhar encontros, parcerias e novas iniciativas.</p></div>
            <div className="social-connect-links">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noreferrer">
                  <SocialIcon network={social.network} size={28} />
                  <span>Seguir no {social.name}</span>
                  <ArrowUpRight size={28} aria-hidden="true" />
                  <span className="sr-only"> — abre em nova janela</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-shell">
          <div className="footer-top">
            <a className="footer-brand" href="#inicio" aria-label="Fundação Joaquim Chissano — voltar ao início"><img src="/logos/fjc-horizontal-branco.svg" alt="Fundação Joaquim Chissano" width="260" height="68" /><small>Congregar sinergias para um mundo de paz.</small></a>
            <a className="back-top" href="#inicio">Voltar ao início <ArrowUp size={18} aria-hidden="true" /></a>
          </div>
          <div className="footer-links">
            <div><p>Explorar</p>{navigation.slice(0, 4).map((item) => <a key={item.id} href={item.href}>{item.label}</a>)}</div>
            <div><p>Actualidade</p><a href="#noticias">Notícias & eventos</a><a href="#galeria">Galeria & vídeo</a><a href="#parceiros">Parceiros</a><a href="#contacto">Contacto</a></div>
            <div><p>Informação</p><a href="/docs/Plano-Estrategico-FJC-2026-2035.pdf" target="_blank" rel="noreferrer">Plano Estratégico 2026–2035</a><a href="mailto:info@fjc.org.mz">info@fjc.org.mz</a><a href="tel:+258844723724">+258 84 472 3724</a></div>
            <div className="footer-social"><p>Ligar</p>{socialLinks.map((social) => <a key={social.name} href={social.href} target="_blank" rel="noreferrer"><SocialIcon network={social.network} size={18} />{social.name}<ArrowUpRight size={16} aria-hidden="true" /></a>)}</div>
          </div>
          <div className="footer-bottom"><p>© {new Date().getFullYear()} Fundação Joaquim Chissano. Todos os direitos reservados.</p><p>Maputo · Moçambique</p></div>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeria de imagens" onMouseDown={(event) => { if (event.target === event.currentTarget) closeLightbox() }}>
          <button ref={lightboxCloseRef} className="lightbox-close" type="button" aria-label="Fechar galeria" onClick={closeLightbox}><X aria-hidden="true" /></button>
          <button className="lightbox-nav lightbox-prev" type="button" aria-label="Imagem anterior" onClick={() => changeLightbox(-1)}><ChevronLeft aria-hidden="true" /></button>
          <figure><img src={gallery[lightboxIndex].image} alt={gallery[lightboxIndex].alt} /><figcaption><span>{gallery[lightboxIndex].caption}</span><small>{lightboxIndex + 1} / {gallery.length}</small></figcaption></figure>
          <button className="lightbox-nav lightbox-next" type="button" aria-label="Imagem seguinte" onClick={() => changeLightbox(1)}><ChevronRight aria-hidden="true" /></button>
        </div>
      )}
    </>
  )
}
