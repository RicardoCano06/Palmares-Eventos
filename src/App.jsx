import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaStar } from 'react-icons/fa6';
import logo from '/Imagen1.png';

const whatsappNumber = '000000000000';
const instagramUrl = 'https://www.instagram.com/palmarespyeventos/';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Cumpleaños', 'Evento de Día con Piscina', 'Otro'];

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const socialProof = [
  { value: '4.7 ★', label: 'Google' },
  { value: '161+', label: 'Reseñas' },
  { value: '2021', label: 'Desde' },
  { value: '80+', label: 'Eventos' },
];

const testimonials = [
  {
    name: 'María & Carlos',
    event: 'Boda · 80 invitados',
    text: 'El salón superó todas nuestras expectativas. El generador propio nos salvó cuando cortaron la luz, y el quincho fue lo más aplaudido de la noche.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918ea45?w=120&q=80',
  },
  {
    name: 'Laura Martínez',
    event: 'Colación · 60 invitados',
    text: 'Todo impecable. Los invitados quedaron re contentos con el espacio y la pileta iluminada. El colegio nos pidió el contacto para futuros eventos.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    name: 'Pedro & Ana',
    event: 'Cumpleaños de 15 · 100 invitados',
    text: 'Buscábamos un lugar con parrilla y pileta para los 15 de nuestra hija. Palmares fue perfecto. La atención de principio a fin.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
];

const differentiators = [
  {
    badge: 'Exclusivo',
    title: 'Energía Asegurada',
    description: 'Se corta la luz y la fiesta sigue. El generador propio aguanta sonido, luces y todo lo necesario.',
  },
  {
    badge: 'Hasta 120',
    title: 'Capacidad Ideal',
    description: 'Hasta 120 invitados cómodos. Ideal para bodas, XV años, cumpleaños, colaciones y eventos de empresa.',
  },
  {
    badge: 'Mixto',
    title: 'Complejo Interior y Exterior',
    description: 'Salón cerrado más quincho con parrilla y pileta iluminada. La gente puede bailar, comer asado o charlar al aire libre.',
  },
  {
    badge: 'Zona Sur',
    title: 'Ubicación Estratégica',
    description: 'Yataity Cora esq. Fortín Toledo, Fernando de la Mora. Acceso rápido desde Asunción, San Lorenzo y Luque.',
  },
];

const galeriaFotos = [
  { src: '/galeria/fachadasalon.png', title: 'Entrada del Salón', desc: 'La puerta de entrada a un evento inolvidable.' },
  { src: '/galeria/piscinanocturna.jpg', title: 'Piscina Nocturna', desc: 'La pileta iluminada le da otro ambiente a la noche.' },
  { src: '/galeria/quinchoparrilla.png', title: 'El Quincho y la Parrilla', desc: 'Asado, música y buena compañía al aire libre.' },
  { src: '/galeria/montajemesa.png', title: 'Montaje de Mesas', desc: 'Amplio espacio para montar tu evento a tu gusto.' },
];

const instagramPosts = [
  { thumb: '/miniaturas_ig/post1.webp', link: 'https://www.instagram.com/p/DYVaDqUAVK6/' },
  { thumb: '/miniaturas_ig/post2.webp', link: 'https://www.instagram.com/p/DYInS99DmmE/' },
  { thumb: '/miniaturas_ig/post3.webp', link: 'https://www.instagram.com/p/DCu5ToosHPC/' },
  { thumb: '/miniaturas_ig/post4.webp', link: 'https://www.instagram.com/p/DSI278BAfw5/' },
  { thumb: '/miniaturas_ig/post5.webp', link: 'https://www.instagram.com/p/DDlElk8sahE/' },
  { thumb: '/miniaturas_ig/post6.webp', link: 'https://www.instagram.com/p/DBo_tz_SJlG/' },
];

function useRevealOnScroll() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { element.dataset.visible = 'true'; observer.unobserve(element); } },
      { threshold: 0.18 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return ref;
}

function Reveal({ as: Component = 'div', className = '', children, ...props }) {
  const ref = useRevealOnScroll();

  return (
    <Component
      ref={ref}
      data-reveal="true"
      className={`translate-y-6 opacity-0 transition-all duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto text-center max-w-4xl">
      <p className="text-sm uppercase tracking-[0.32em] text-brand-muted">{eyebrow}</p>
      <h3 className="mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-brand-text sm:text-4xl">{title}</h3>
      <p className="mt-4 text-base leading-7 text-brand-muted">{description}</p>
    </div>
  );
}

function InstagramCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group relative aspect-square overflow-hidden rounded-xl bg-brand-surface block"
    >
      <img
        src={item.thumb}
        alt="Instagram post"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100 rounded-xl">
        <FaInstagram className="h-6 w-6 text-white" />
      </div>
    </a>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [galeriaIdx, setGaleriaIdx] = useState(0);
  const [form, setForm] = useState({
    name: '',
    eventType: 'Boda',
    guests: '',
    date: '',
    institution: '',
  });
  const [formError, setFormError] = useState('');

  const scrollTo = (id) => (e) => { e?.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  const isColacion = form.eventType === 'Colación';

  const currentMonth = months[new Date().getMonth()];

  const prevFoto = () => setGaleriaIdx((i) => (i === 0 ? galeriaFotos.length - 1 : i - 1));
  const nextFoto = () => setGaleriaIdx((i) => (i === galeriaFotos.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowLeft') prevFoto(); if (e.key === 'ArrowRight') nextFoto(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'eventType' && value !== 'Colación' ? { institution: '' } : {}),
    }));
    if (formError) setFormError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const guestsNumber = Number(form.guests);
    const date = form.date.trim();
    const institution = form.institution.trim();

    if (!name || !form.eventType || !date || !form.guests) {
      setFormError('Completá nombre, tipo de evento, cantidad de invitados y fecha para continuar.');
      return;
    }

    if (!Number.isFinite(guestsNumber) || guestsNumber < 1 || guestsNumber > 120) {
      setFormError('La cantidad de invitados debe estar entre 1 y 120 personas.');
      return;
    }

    if (isColacion && !institution) {
      setFormError('Para colación, completá el nombre de la institución o colegio.');
      return;
    }

    const lines = [
      'Hola Palmares, quiero cotizar mi evento con estos datos:',
      '',
      `Nombre: ${name}`,
      `Tipo de evento: ${form.eventType}`,
      `Cantidad de invitados: ${guestsNumber}`,
      `Fecha tentativa: ${date}`,
    ];

    if (isColacion) lines.push(`Institución o colegio: ${institution}`);

    lines.push('', 'Quedo atento/a para recibir disponibilidad y presupuesto.');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/25 selection:text-brand-text">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-bg via-brand-surface to-brand-bg" />
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle,_rgba(184,148,60,0.06),_transparent_60%)] blur-3xl" />

        {scrolled && <div className="h-20" />}

        <header className={`z-50 transition-all duration-500 ${scrolled ? 'fixed left-1/2 -translate-x-1/2 top-4 w-[calc(100%-3rem)] max-w-6xl rounded-xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)]' : 'relative bg-white/80 backdrop-blur-xl'}`}>
          <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 lg:px-8'}`}>
            <a href="#inicio" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-3">
              <div className={`overflow-hidden rounded-full border border-brand-surface bg-white transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-12 w-12 shadow-[0_0_30px_rgba(184,148,60,0.12)]'}`}>
                <img src={logo} alt="Palmares - Salón de Eventos" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className={`uppercase tracking-[0.45em] text-brand-muted transition-all duration-300 ${scrolled ? 'text-[0.55rem]' : 'text-[0.62rem]'}`}>Salón de Eventos</p>
                <h1 className={`font-semibold tracking-[0.35em] text-brand-text transition-all duration-300 ${scrolled ? 'text-sm' : 'mt-1 text-sm sm:text-base'}`}>PALMARES</h1>
              </div>
            </a>

            <div className="hidden md:flex md:items-center md:gap-6">
              <nav className="flex items-center gap-8">
                <a href="#diferenciales" onClick={scrollTo('diferenciales')} className="text-sm text-brand-muted transition hover:text-brand-text">Diferenciales</a>
                <a href="#galeria" onClick={scrollTo('galeria')} className="text-sm text-brand-muted transition hover:text-brand-text">Galería</a>
                <a href="#ubicacion" onClick={scrollTo('ubicacion')} className="text-sm text-brand-muted transition hover:text-brand-text">Ubicación</a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Cotizar Ahora
                  <FaWhatsapp className="h-4 w-4" />
                </a>
              </nav>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-brand-surface bg-white/80 p-3 text-brand-text transition hover:border-brand-accent/30 hover:bg-white md:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-brand-surface bg-white md:hidden">
              <nav className="flex flex-col px-4 sm:px-6">
                <a href="#diferenciales" className="py-4 text-sm text-brand-text border-b border-brand-surface/50 transition hover:text-brand-accent" onClick={(e) => { setMobileMenuOpen(false); scrollTo('diferenciales')(e); }}>Diferenciales</a>
                <a href="#galeria" className="py-4 text-sm text-brand-text border-b border-brand-surface/50 transition hover:text-brand-accent" onClick={(e) => { setMobileMenuOpen(false); scrollTo('galeria')(e); }}>Galería</a>
                <a href="#ubicacion" className="py-4 text-sm text-brand-text border-b border-brand-surface/50 transition hover:text-brand-accent" onClick={(e) => { setMobileMenuOpen(false); scrollTo('ubicacion')(e); }}>Ubicación</a>
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-brand-accent transition hover:text-brand-accent/80"><FaWhatsapp className="h-4 w-4" /> Cotizar por WhatsApp</a>
              </nav>
            </div>
          ) : null}
        </header>

        <main id="inicio">
          <section className="mx-auto px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
            <div className="mx-auto max-w-6xl">
              <div className="text-center">
                <h2 className="animate-fade-up font-display text-5xl font-extrabold leading-[1.05] text-brand-text sm:text-6xl lg:text-7xl xl:text-8xl">
                  El lugar perfecto para tu evento en Fernando de la Mora
                </h2>
                <p className="animate-fade-up-1 mt-6 text-lg leading-7 text-brand-muted max-w-3xl mx-auto">
                  Bodas, cumpleaños, colaciones y eventos de empresa. Salón con quincho, parrilla, pileta y generador propio.
                </p>

                <div className="animate-fade-up-2 mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noreferrer"
                    className="animate-pulse-glow inline-flex items-center gap-2 rounded-full bg-brand-text px-7 py-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
                  >
                    Cotizar ahora
                    <FaWhatsapp className="h-4 w-4" />
                  </a>
                  <a
                    href="#galeria"
                    onClick={scrollTo('galeria')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted transition hover:text-brand-text"
                  >
                    Ver fotos del salón
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </a>
                </div>

                <div className="animate-fade-up-3 mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-brand-muted">
                  <span><strong className="text-brand-text font-semibold">4.7 ★</strong> Google</span>
                  <span className="w-px h-4 bg-brand-surface" />
                  <span><strong className="text-brand-text font-semibold">161+</strong> Reseñas</span>
                  <span className="w-px h-4 bg-brand-surface" />
                  <span><strong className="text-brand-text font-semibold">80+</strong> Eventos</span>
                  <span className="w-px h-4 bg-brand-surface" />
                  <span><strong className="text-brand-text font-semibold">2021</strong> Trayectoria</span>
                </div>
              </div>

              <div className="animate-fade-up-3 mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="col-span-1 md:col-span-1 md:row-span-2 md:mt-0 -mt-8 md:-mt-12">
                  <div className="relative overflow-hidden rounded-2xl bg-brand-surface aspect-[3/4] shadow-xl">
                    <img src={galeriaFotos[0].src} alt={galeriaFotos[0].title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="relative overflow-hidden rounded-2xl bg-brand-surface aspect-[4/3] shadow-lg">
                    <img src={galeriaFotos[1].src} alt={galeriaFotos[1].title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="col-span-1 md:col-span-1">
                  <div className="relative overflow-hidden rounded-2xl bg-brand-surface aspect-[4/3] shadow-lg">
                    <img src={galeriaFotos[2].src} alt={galeriaFotos[2].title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="relative overflow-hidden rounded-2xl bg-brand-surface aspect-[4/3] md:aspect-[3/4] shadow-xl">
                    <img src={galeriaFotos[3].src} alt={galeriaFotos[3].title} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="diferenciales" className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Diferenciales"
                title="Por qué elegir Palmares para tu evento"
                description="Seguridad, espacio, ubicación y un ambiente que tus invitados van a recordar."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {differentiators.map((item) => (
                <Reveal key={item.title} className="rounded-2xl bg-brand-surface px-6 py-7 transition hover:bg-[#efeae0]">
                  <span className="inline-flex rounded-full bg-brand-accent/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.36em] text-brand-accent font-semibold">{item.badge}</span>
                  <h4 className="mt-4 font-display text-xl font-bold text-brand-text">{item.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-brand-muted">{item.description}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90"
              >
                Consultá disponibilidad para tu evento
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </Reveal>
          </section>

          <section id="testimonios" className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Testimonios"
                title="Lo que dicen los que ya celebraron en Palmares"
                description="Esto nos escriben después de vivir su evento. Sin filtro."
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <Reveal key={t.name} className="rounded-2xl bg-brand-surface p-7 transition hover:bg-[#efeae0]">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (<FaStar key={i} className="h-4 w-4 text-brand-accent" />))}
                  </div>
                  <p className="text-sm leading-6 text-brand-muted">"{t.text}"</p>
                  <div className="mt-5 flex items-center gap-3 pt-4">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-brand-surface">
                      <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">{t.name}</p>
                      <p className="text-xs text-brand-muted">{t.event}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="galeria" className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal>
              <SectionHeading
                eyebrow="Galería"
                title="Conocé cada rincón de Palmares"
                description="Desde el salón principal hasta el quincho con parrilla y la pileta."
              />
            </Reveal>

            <div className="mt-10">
              <div className="relative rounded-2xl overflow-hidden bg-brand-surface shadow-lg">
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[85vh]">
                  {galeriaFotos.map((foto, i) => (
                    <img
                      key={foto.src}
                      src={foto.src}
                      alt={foto.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === galeriaIdx ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}

                  <button onClick={prevFoto} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-brand-text shadow-lg transition z-10" aria-label="Anterior">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={nextFoto} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-brand-text shadow-lg transition z-10" aria-label="Siguiente">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>

                  <div className="absolute top-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">{galeriaIdx + 1} / {galeriaFotos.length}</div>

                  <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 sm:p-8">
                    <h4 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-lg">{galeriaFotos[galeriaIdx].title}</h4>
                    <p className="mt-1.5 max-w-lg text-sm text-white/80 drop-shadow">{galeriaFotos[galeriaIdx].desc}</p>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-4 overflow-x-auto justify-center bg-white">
                  {galeriaFotos.map((foto, i) => (
                    <button
                      key={foto.src}
                      onClick={() => setGaleriaIdx(i)}
                      className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition ${i === galeriaIdx ? 'border-brand-accent opacity-100 shadow-md' : 'border-transparent opacity-50 hover:opacity-80'}`}
                    >
                      <img src={foto.src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="instagram" className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="rounded-2xl bg-white p-6 sm:p-8 lg:p-10 shadow-lg">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-muted">Seguinos en redes</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-brand-text">Viví el ambiente en @palmarespyeventos</h3>
                </div>
                <a href={instagramUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-surface bg-white px-5 py-3 text-sm font-semibold text-brand-text transition hover:bg-brand-surface">
                  Seguinos en Instagram
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
                {instagramPosts.map((item, index) => (<InstagramCard key={index} item={item} />))}
              </div>
            </Reveal>
          </section>

          <section id="ubicacion" className="mx-auto px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <Reveal>
              <SectionHeading
                eyebrow="Ubicación"
                title="Vení a conocer Palmares"
                description="Yataity Cora esq. Fortín Toledo, Fernando de la Mora. Acceso rápido desde Asunción, San Lorenzo y Luque."
              />
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr] xl:gap-8">
              <div className="flex flex-col gap-4">
                <Reveal className="rounded-2xl border border-brand-surface bg-white overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.1636834723734!2d-57.576451!3d-25.3342363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da9ecf732f7d1%3A0xef1fc13ab4f46e85!2sPalmares%20-%20Sal%C3%B3n%20de%20eventos!5e0!3m2!1ses!2spy!4v1"
                    width="100%"
                    height="520"
                    style={{ border: 0, display: 'block' }}
                    allowFullscreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Palmares Salón de Eventos"
                  />
                </Reveal>
              </div>

              <Reveal as="form" onSubmit={handleSubmit} className="rounded-2xl border border-brand-surface bg-white p-6 sm:p-8 shadow-lg">
                <p className="text-sm text-brand-muted mb-6 text-center">Completá tus datos y te abrimos WhatsApp con todo listo para enviar.</p>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">Nombre Completo</label>
                    <input type="text" id="name" value={form.name} onChange={handleChange('name')} placeholder="Ej. Juan Pérez" className="mt-2 w-full rounded-xl border border-brand-surface bg-brand-surface/50 px-4 py-3.5 text-sm text-brand-text placeholder-brand-muted/50 transition focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">Tipo de Evento</label>
                      <select id="eventType" value={form.eventType} onChange={handleChange('eventType')} className="mt-2 w-full rounded-xl border border-brand-surface bg-brand-surface/50 px-4 py-3.5 text-sm text-brand-text transition focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/40">
                        {eventTypes.map((type) => (<option key={type} value={type} className="bg-white">{type}</option>))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">Invitados (Máx. 120)</label>
                      <input type="number" id="guests" min="1" max="120" value={form.guests} onChange={handleChange('guests')} placeholder="Ej. 80" className="mt-2 w-full rounded-xl border border-brand-surface bg-brand-surface/50 px-4 py-3.5 text-sm text-brand-text placeholder-brand-muted/50 transition focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/40" />
                    </div>
                  </div>

                  {isColacion && (
                    <div>
                      <label htmlFor="institution" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">Institución Educativa / Colegio</label>
                      <input type="text" id="institution" value={form.institution} onChange={handleChange('institution')} placeholder="Ej. Colegio Nacional de la Capital" className="mt-2 w-full rounded-xl border border-brand-accent/30 bg-brand-surface/50 px-4 py-3.5 text-sm text-brand-text placeholder-brand-muted/50 transition focus:border-brand-accent/50 focus:outline-none focus:ring-1 focus:ring-brand-accent/50" />
                    </div>
                  )}

                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-brand-muted">Fecha Tentativa</label>
                    <input type="text" id="date" value={form.date} onChange={handleChange('date')} placeholder="Ej. Sábado 15 de Octubre" className="mt-2 w-full rounded-xl border border-brand-surface bg-brand-surface/50 px-4 py-3.5 text-sm text-brand-text placeholder-brand-muted/50 transition focus:border-brand-accent/40 focus:outline-none focus:ring-1 focus:ring-brand-accent/40" />
                  </div>

                  {formError && (<div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">{formError}</div>)}

                  <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-text py-4 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-[0.99]">
                    Cotizar por WhatsApp
                    <FaWhatsapp className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="border-t border-brand-surface bg-brand-bg py-12">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 overflow-hidden rounded-full border border-brand-surface">
                    <img src={logo} alt="Palmares" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-brand-text">PALMARES</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-brand-muted">Salón de Eventos</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-brand-muted">Salón de eventos en Fernando de la Mora. Espacio único con quincho, pileta y generador propio.</p>
                <p className="mt-3 text-sm text-brand-accent">Yataity Cora esq. Fortín Toledo, Fernando de la Mora</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-text mb-4">Contacto</h4>
                <div className="space-y-3 text-sm text-brand-muted">
                  <a href={instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 transition"><FaInstagram className="h-4 w-4" /> @palmarespyeventos</a>
                  <a href="https://www.facebook.com/profile.php?id=100069641632947" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 transition"><FaFacebookF className="h-4 w-4" /> Palmares Salón de Eventos</a>
                  <a href="mailto:palmarespyeventos@gmail.com" className="flex items-center gap-2 text-brand-accent hover:text-brand-accent/80 transition"><span className="text-sm">✉</span> palmarespyeventos@gmail.com</a>
                </div>
              </div>
            </div>

            <div className="border-t border-brand-surface mt-10 pt-6">
              <p className="text-xs text-brand-muted">&copy; {new Date().getFullYear()} Palmares Salón de Eventos. Fernando de la Mora, Paraguay.</p>
            </div>
          </div>
        </footer>
      </div>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.35)] transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] animate-bounce"
        aria-label="Cotizar por WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7" />
      </a>
    </div>
  );
}

export default App;
