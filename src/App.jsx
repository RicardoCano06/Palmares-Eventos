import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaStar } from 'react-icons/fa6';
import logo from '/Imagen1.png';

const whatsappNumber = '000000000000'; // cambiar al número real antes de lanzar
const instagramUrl = 'https://www.instagram.com/palmarespyeventos/';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Cumpleaños', 'Evento de Día con Piscina', 'Otro'];

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const socialProof = [
  { value: '4.7 ★', label: 'Calificación en Google' },
  { value: '161+', label: 'Reseñas de clientes' },
  { value: 'Desde 2021', label: 'Trayectoria' },
  { value: '80+', label: 'Eventos realizados' },
];

const testimonials = [
  {
    name: 'María & Carlos',
    event: 'Boda · 80 invitados',
    text: 'El salón superó todas nuestras expectativas. El generador propio nos salvó cuando cortaron la luz, y el quincho fue lo más aplaudido de la noche. Todos preguntaban dónde encontrábamos este lugar.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1583939003579-730e3918ea45?w=120&q=80',
  },
  {
    name: 'Laura Martínez',
    event: 'Colación · 60 invitados',
    text: 'Todo impecable. Los invitados quedaron re contentos con el espacio y la pileta iluminada. El colegio nos pidió el contacto para futuros eventos. Súper recomendado.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
  },
  {
    name: 'Pedro & Ana',
    event: 'Cumpleaños de 15 · 100 invitados',
    text: 'Buscábamos un lugar con parrilla y pileta para los 15 de nuestra hija. Palmares fue perfecto. La atención de principio a fin, el quincho y el ambiente al aire libre hicieron una noche inolvidable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
  },
];

const differentiators = [
  {
    badge: 'Exclusivo',
    title: 'Energía Asegurada',
    description:
      'Se corta la luz y la fiesta sigue. El generador propio aguanta sonido, luces y todo lo necesario para que no pare ni un segundo.',
    icon: '⚡',
  },
  {
    badge: 'Hasta 120',
    title: 'Capacidad Ideal',
    description:
      'Hasta 120 invitados cómodos. Ideal para bodas, XV años, cumpleaños, colaciones y eventos de empresa. El espacio justo para que todos estén bien.',
    icon: '🪑',
  },
  {
    badge: 'Mixto',
    title: 'Complejo Interior y Exterior',
    description:
      'Salón cerrado más quincho con parrilla y pileta iluminada. La gente puede bailar, comer asado o charlar al aire libre. Todo en un mismo lugar.',
    icon: '🌿',
  },
  {
    badge: 'Zona Sur',
    title: 'Ubicación Estratégica',
    description:
      'Yataity Cora esq. Fortín Toledo, Fernando de la Mora. Llegás rápido desde Asunción, San Lorenzo y Luque. Acceso directo.',
    icon: '🏠',
  },
];

const galleryCards = [
  {
    title: 'Entrada del Salón',
    subtitle: 'La puerta de entrada a un evento inolvidable. Fachada principal de Palmares.',
    span: 'col-span-full md:col-span-7 md:row-span-2 min-h-[24rem] md:min-h-[38rem]',
    image: '/galeria/fachadasalon.png',
  },
  {
    title: 'Área de Piscina Nocturna',
    subtitle: 'La pileta iluminada le da otro ambiente a la noche. Ideal para fotos y relajarse.',
    span: 'col-span-full md:col-span-5 min-h-[16rem] md:min-h-[18rem]',
    image: '/galeria/piscinanocturna.jpg',
  },
  {
    title: 'El Quincho y la Parrilla',
    subtitle: 'El quincho con parrilla es el corazón de la recepción. Asado, música y buena compañía.',
    span: 'col-span-full md:col-span-5 min-h-[16rem] md:min-h-[18rem]',
    image: '/galeria/quinchoparrilla.png',
  },
  {
    title: 'Montaje de Mesas',
    subtitle: 'Amplio espacio para montar tu evento a tu gusto. Mesas, pista y decoración.',
    span: 'col-span-full md:col-span-7 min-h-[18rem] md:min-h-[26rem]',
    image: '/galeria/montajemesa.png',
  },
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

    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.dataset.visible = 'true';
          observer.unobserve(element);
        }
      },
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

function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  return (
    <div className={align === 'center' ? 'mx-auto text-center' : ''}>
      <p className="text-sm uppercase tracking-[0.32em] text-[#8a7a6a]">{eyebrow}</p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-[#1f1a17] sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-[#5a4e42] max-w-4xl mx-auto">{description}</p>
    </div>
  );
}

function InstagramCard({ item }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group relative aspect-square overflow-hidden rounded-2xl bg-[#f0e8de] block"
    >
      <img
        src={item.thumb}
        alt="Instagram post"
        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition duration-300 group-hover:opacity-100 rounded-2xl">
        <FaInstagram className="h-6 w-6 text-white" />
      </div>
    </a>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({
    name: '',
    eventType: 'Boda',
    guests: '',
    date: '',
    institution: '',
  });
  const [formError, setFormError] = useState('');

  const [galeriaIdx, setGaleriaIdx] = useState(0);
  const galeriaFotos = [
    { src: '/galeria/fachadasalon.png', title: 'Entrada del Salón', desc: 'La puerta de entrada a un evento inolvidable.' },
    { src: '/galeria/piscinanocturna.jpg', title: 'Piscina Nocturna', desc: 'La pileta iluminada le da otro ambiente a la noche.' },
    { src: '/galeria/quinchoparrilla.png', title: 'El Quincho y la Parrilla', desc: 'Asado, música y buena compañía al aire libre.' },
    { src: '/galeria/montajemesa.png', title: 'Montaje de Mesas', desc: 'Amplio espacio para montar tu evento a tu gusto.' },
  ];

  const prevFoto = () => setGaleriaIdx((i) => (i === 0 ? galeriaFotos.length - 1 : i - 1));
  const nextFoto = () => setGaleriaIdx((i) => (i === galeriaFotos.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'ArrowLeft') prevFoto(); if (e.key === 'ArrowRight') nextFoto(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isColacion = form.eventType === 'Colación';

  const currentMonth = months[new Date().getMonth()];

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

    if (formError) {
      setFormError('');
    }
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

    if (isColacion) {
      lines.push(`Institución o colegio: ${institution}`);
    }

    lines.push('', 'Quedo atento/a para recibir disponibilidad y presupuesto.');

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] text-[#1f1a17] selection:bg-[#7CB342]/25 selection:text-[#1f1a17]">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f7f3ee] via-[#f0e8de] to-[#f7f3ee]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle,_rgba(124,179,66,0.06),_transparent_60%)] blur-3xl" />

        {scrolled && <div className="h-20" />}

        <header className={`z-50 transition-all duration-500 ${scrolled ? 'fixed left-1/2 -translate-x-1/2 top-4 w-[calc(100%-3rem)] max-w-6xl rounded-xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.1)]' : 'relative bg-white/80 backdrop-blur-xl'}`}>
          <div className={`mx-auto flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4 lg:px-8'}`}>
            <a href="#inicio" className="flex items-center gap-3">
              <div className={`overflow-hidden rounded-full border border-[#e0d6cc] bg-white transition-all duration-300 ${scrolled ? 'h-10 w-10' : 'h-12 w-12 shadow-[0_0_30px_rgba(124,179,66,0.12)]'}`}>
                <img src={logo} alt="Palmares - Salón de Eventos" className="h-full w-full object-cover" />
              </div>
              <div className={`transition-all duration-300 ${scrolled ? '' : ''}`}>
                <p className={`uppercase tracking-[0.45em] text-[#a69688] transition-all duration-300 ${scrolled ? 'text-[0.55rem]' : 'text-[0.62rem]'}`}>Salón de Eventos</p>
                <h1 className={`font-semibold tracking-[0.35em] text-[#1f1a17] transition-all duration-300 ${scrolled ? 'text-sm' : 'mt-1 text-sm sm:text-base'}`}>PALMARES</h1>
              </div>
            </a>

            <div className="hidden md:flex md:items-center md:gap-4">
              <div className={`items-center gap-2 rounded-full border border-[#8BC34A]/20 bg-[#8BC34A]/8 px-4 py-2 ${scrolled ? 'hidden lg:hidden' : 'hidden lg:flex'}`}>
                <span className="h-2 w-2 rounded-full bg-[#8BC34A] animate-pulse" />
                <span className="text-xs text-[#558B2F]">Consultá disponibilidad para {currentMonth}</span>
              </div>
              <nav className={`flex items-center gap-6 transition-all duration-300 ${scrolled ? 'gap-4' : 'gap-8'}`}>
                <a href="#diferenciales" className="text-sm text-[#5a4e42] transition hover:text-[#1f1a17]">
                  Diferenciales
                </a>
                <a href="#galeria" className="text-sm text-[#5a4e42] transition hover:text-[#1f1a17]">
                  Galería
                </a>
                <a href="#ubicacion" className="text-sm text-[#5a4e42] transition hover:text-[#1f1a17]">
                  Ubicación
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 rounded-full bg-[#7CB342] font-semibold text-white shadow-[0_8px_25px_rgba(124,179,66,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(124,179,66,0.35)] ${scrolled ? 'px-5 py-2.5 text-sm' : 'px-5 py-3 text-sm'}`}
                >
                  Cotizar Ahora
                  <FaWhatsapp className={`${scrolled ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
                </a>
              </nav>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-[#e0d6cc] bg-white/80 p-3 text-[#1f1a17] transition hover:border-[#7CB342]/30 hover:bg-white md:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-[#e0d6cc] bg-white md:hidden">
              <nav className="flex flex-col px-4 sm:px-6">
                <a
                  href="#diferenciales"
                  className="py-4 text-sm text-[#1f1a17] border-b border-[#e0d6cc]/50 transition hover:text-[#7CB342]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Diferenciales
                </a>
                <a
                  href="#galeria"
                  className="py-4 text-sm text-[#1f1a17] border-b border-[#e0d6cc]/50 transition hover:text-[#7CB342]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Galería
                </a>
                <a
                  href="#ubicacion"
                  className="py-4 text-sm text-[#1f1a17] border-b border-[#e0d6cc]/50 transition hover:text-[#7CB342]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Ubicación
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-4 text-sm font-semibold text-[#7CB342] transition hover:text-[#558B2F]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaWhatsapp className="h-4 w-4" />
                  Cotizar por WhatsApp
                </a>
              </nav>
            </div>
          ) : null}
        </header>

        <main id="inicio">
          <section className="mx-auto px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20">
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:gap-8">
              <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-[#e0d6cc] bg-white shadow-[0_20px_80px_rgba(31,26,23,0.06)] xl:min-h-[760px]">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,243,238,0.4),rgba(247,243,238,0.9))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(124,179,66,0.08),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(139,195,74,0.06),transparent_22%)]" />
                </div>

                <div className="relative flex flex-col justify-between p-6 sm:p-10 lg:p-12 lg:min-h-[650px]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e0d6cc] bg-white px-4 py-2 text-sm text-[#5a4e42] shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-[#8BC34A]" />
                      Salón para 120 personas
                    </div>
                    <div className="hidden rounded-full border border-[#8BC34A]/20 bg-[#8BC34A]/8 px-4 py-2 text-xs text-[#558B2F] lg:flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#8BC34A] animate-pulse" />
                      Reservá con anticipación
                    </div>
                  </div>

                  <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-end">
                    <div>
                      <h2 className="font-display text-4xl font-semibold leading-[0.95] text-[#1f1a17] sm:text-5xl lg:text-6xl xl:text-7xl">
                        El lugar perfecto para tu evento en Fernando de la Mora
                      </h2>
                      <p className="mt-5 text-base leading-7 text-[#5a4e42] sm:text-lg max-w-4xl">
                        El mejor lugar para celebrar bodas, cumpleaños, colaciones y eventos empresariales.
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {[
                          { label: 'Generador propio', color: 'bg-[#8BC34A]/10 border-[#8BC34A]/20 text-[#558B2F]' },
                          { label: 'Hasta 120 invitados', color: 'bg-[#e8e0d8] border-[#d0c8bc] text-[#5a4e42]' },
                        ].map((tag) => (
                          <span
                            key={tag.label}
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs ${tag.color}`}
                          >
                            {tag.urgent ? <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" /> : null}
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7CB342] px-6 py-4 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(124,179,66,0.2)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(124,179,66,0.3)]"
                        >
                          Cotizar ahora
                          <FaWhatsapp className="h-4 w-4" />
                        </a>
                        <a
                          href="#galeria"
                          className="inline-flex items-center justify-center rounded-full border border-[#d0c8bc] bg-white px-6 py-4 text-sm font-semibold text-[#1f1a17] transition hover:bg-[#f0e8de]"
                        >
                          Ver fotos del salón
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4">
                      <div className="rounded-2xl bg-gradient-to-br from-[#faf7f3] to-[#f0e8de] p-6 sm:p-7">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">Interior</span>
                          <span className="text-xs font-semibold uppercase tracking-wider text-[#8BC34A]">Elegante</span>
                        </div>
                        <p className="text-sm sm:text-base leading-6 text-[#5a4e42]">Salón amplio para que montes tu evento a tu gusto. Espacio versátil, listo para cualquier celebración.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-gradient-to-br from-[#f0f7f0] to-[#e8f0e8] p-5 sm:p-6">
                          <p className="text-xs font-semibold uppercase tracking-wider text-[#558B2F] mb-2">Exterior</p>
                          <p className="text-sm sm:text-base leading-6 text-[#5a4e42]">Piscina iluminada y ambiente al aire libre.</p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-[#f7f3e8] to-[#f0e8d8] p-5 sm:p-6">
                          <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">Gastronomía</p>
                          <p className="text-sm sm:text-base leading-6 text-[#5a4e42]">Quincho con parrilla para recepciones y asados premium.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>

              <div className="grid gap-6">
                <Reveal className="rounded-[2rem] border border-[#e0d6cc] bg-white p-6 shadow-[0_12px_40px_rgba(31,26,23,0.04)] sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8a7a6a]">Lo que dice la gente</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {(socialProof.slice(0, 3)).map((item) => (
                      <div key={item.label} className="rounded-[1.4rem] border border-[#e0d6cc] bg-[#faf7f3] p-5">
                        <p className="font-display text-3xl font-semibold text-[#1f1a17]">{item.value}</p>
                        <p className="mt-2 text-sm leading-6 text-[#5a4e42]">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal className="grid gap-4 rounded-[2rem] border border-[#e0d6cc] bg-white p-6 shadow-[0_12px_40px_rgba(31,26,23,0.04)] sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8a7a6a]">Ubicación y respaldo</p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-[#1f1a17]">Todo lo que necesitas para que tu evento sea un éxito</h3>
                  <div className="mt-4 grid gap-3 text-sm leading-6 text-[#5a4e42]">
                    {[
                      'Estamos en Yataity Cora esq. Fortín Toledo, Fernando de la Mora. Acceso rápido desde Asunción, San Lorenzo y Luque.',
                      'Salón para hasta 120 invitados. Ideal para bodas, cumpleaños, colaciones y eventos de empresa.',
                      'Quincho con parrilla, pileta iluminada y generador propio. La fiesta no para aunque la ANDE corte.',
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3 rounded-[1.2rem] border border-[#e0d6cc] bg-[#faf7f3] px-4 py-4">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#8BC34A]" />
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <a
                      href={`https://wa.me/${whatsappNumber}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#7CB342]/20 bg-[#7CB342]/8 px-5 py-3 text-sm font-semibold text-[#8a7a6a] transition hover:bg-[#7CB342]/14"
                    >
                      Consultar por WhatsApp
                      <FaWhatsapp className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
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
                <Reveal key={item.title} className="group overflow-hidden rounded-[1.8rem] border border-[#e0d6cc] bg-white shadow-[0_12px_40px_rgba(31,26,23,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#7CB342]/25 hover:shadow-[0_20px_60px_rgba(124,179,66,0.08)]">
                  <div className="relative min-h-[15rem] overflow-hidden p-6">
                    <span className="text-3xl mb-3 block">{item.icon}</span>
                    <div className="flex items-start justify-between gap-3">
                      <span className="inline-flex w-fit rounded-full border border-[#7CB342]/22 bg-[#7CB342]/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.36em] text-[#8a7a6a]">
                        {item.badge}
                      </span>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-display text-xl font-semibold text-[#1f1a17]">{item.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-[#5a4e42]">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-10 text-center">
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7CB342] px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(124,179,66,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(124,179,66,0.3)]"
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
                description="Esto nos escriben después de vivir su evento. Sin filtro, sin editar."
              />
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((t) => (
                <Reveal key={t.name} className="rounded-[1.8rem] border border-[#e0d6cc] bg-white p-6 shadow-[0_12px_40px_rgba(31,26,23,0.04)] transition duration-300 hover:-translate-y-0.5 hover:border-[#7CB342]/20 hover:shadow-[0_20px_60px_rgba(124,179,66,0.06)]">
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <FaStar key={i} className="h-4 w-4 text-[#7CB342]" />
                    ))}
                  </div>

                  <p className="text-sm leading-6 text-[#5a4e42]">"{t.text}"</p>

                  <div className="mt-5 flex items-center gap-3 border-t border-[#e0d6cc] pt-4">
                    <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#e0d6cc]">
                      <img src={t.image} alt={t.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#1f1a17]">{t.name}</p>
                      <p className="text-xs text-[#a69688]">{t.event}</p>
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
                description="Desde el salón principal hasta el quincho con parrilla y la pileta. Todo pensado para que tu celebración sea única."
              />
            </Reveal>

            <div className="mt-10">
              <div className="relative rounded-[2rem] overflow-hidden bg-[#e8e0d8] shadow-[0_20px_80px_rgba(31,26,23,0.08)]">
                <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[85vh]">
                  {galeriaFotos.map((foto, i) => (
                    <img
                      key={foto.src}
                      src={foto.src}
                      alt={foto.title}
                      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${i === galeriaIdx ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ))}

                  <button
                    onClick={prevFoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#1f1a17] shadow-lg transition z-10"
                    aria-label="Anterior"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={nextFoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/90 hover:bg-white text-[#1f1a17] shadow-lg transition z-10"
                    aria-label="Siguiente"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>

                  <div className="absolute top-4 right-4 z-10 rounded-full bg-black/50 px-3 py-1.5 text-xs text-white/90 backdrop-blur-sm">
                    {galeriaIdx + 1} / {galeriaFotos.length}
                  </div>

                  <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-6 sm:p-8">
                    <h4 className="font-display text-xl sm:text-2xl font-semibold text-white drop-shadow-lg">{galeriaFotos[galeriaIdx].title}</h4>
                    <p className="mt-1.5 max-w-lg text-sm text-white/80 drop-shadow">{galeriaFotos[galeriaIdx].desc}</p>
                  </div>
                </div>

                <div className="flex gap-2 px-4 py-4 overflow-x-auto justify-center bg-white">
                  {galeriaFotos.map((foto, i) => (
                    <button
                      key={foto.src}
                      onClick={() => setGaleriaIdx(i)}
                      className={`shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-xl overflow-hidden border-2 transition ${
                        i === galeriaIdx ? 'border-[#7CB342] opacity-100 shadow-md' : 'border-transparent opacity-50 hover:opacity-80'
                      }`}
                    >
                      <img src={foto.src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="instagram" className="mx-auto px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="rounded-[2.5rem] border border-[#e0d6cc] bg-white p-6 sm:p-8 lg:p-10 shadow-[0_12px_40px_rgba(31,26,23,0.04)]">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#8a7a6a]">Seguinos en redes</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#1f1a17">Viví el ambiente en @palmarespyeventos</h3>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d0c8bc] bg-white px-5 py-3 text-sm font-semibold text-[#1f1a17] transition hover:bg-[#f0e8de]"
                >
                  Seguinos en Instagram
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-6">
                {instagramPosts.map((item, index) => (
                  <InstagramCard key={index} item={item} />
                ))}
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
                <Reveal className="rounded-[2rem] border border-[#e0d6cc] bg-white overflow-hidden shadow-[0_12px_40px_rgba(31,26,23,0.04)]">
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

              <Reveal as="form" onSubmit={handleSubmit} className="rounded-[2rem] border border-[#e0d6cc] bg-white p-6 shadow-[0_12px_40px_rgba(31,26,23,0.04)] sm:p-8">
                <p className="text-sm text-[#5a4e42] mb-6 text-center">Completá tus datos y te abrimos WhatsApp con todo listo para enviar.</p>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Ej. Juan Pérez"
                      className="mt-2 w-full rounded-xl border border-[#e0d6cc] bg-[#faf7f3] px-4 py-3.5 text-sm text-[#1f1a17] placeholder-[#a69688] transition focus:border-[#7CB342]/40 focus:outline-none focus:ring-1 focus:ring-[#7CB342]/40"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">
                        Tipo de Evento
                      </label>
                      <select
                        id="eventType"
                        value={form.eventType}
                        onChange={handleChange('eventType')}
                        className="mt-2 w-full rounded-xl border border-[#e0d6cc] bg-[#faf7f3] px-4 py-3.5 text-sm text-[#1f1a17] transition focus:border-[#7CB342]/40 focus:outline-none focus:ring-1 focus:ring-[#7CB342]/40"
                      >
                        {eventTypes.map((type) => (
                          <option key={type} value={type} className="bg-white">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">
                        Invitados (Máx. 120)
                      </label>
                      <input
                        type="number"
                        id="guests"
                        min="1"
                        max="120"
                        value={form.guests}
                        onChange={handleChange('guests')}
                        placeholder="Ej. 80"
                        className="mt-2 w-full rounded-xl border border-[#e0d6cc] bg-[#faf7f3] px-4 py-3.5 text-sm text-[#1f1a17] placeholder-[#a69688] transition focus:border-[#7CB342]/40 focus:outline-none focus:ring-1 focus:ring-[#7CB342]/40"
                      />
                    </div>
                  </div>

                  {isColacion && (
                    <div>
                      <label htmlFor="institution" className="block text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">
                        Institución Educativa / Colegio
                      </label>
                      <input
                        type="text"
                        id="institution"
                        value={form.institution}
                        onChange={handleChange('institution')}
                        placeholder="Ej. Colegio Nacional de la Capital"
                        className="mt-2 w-full rounded-xl border border-[#7CB342]/30 bg-[#faf7f3] px-4 py-3.5 text-sm text-[#1f1a17] placeholder-[#a69688] transition focus:border-[#7CB342]/50 focus:outline-none focus:ring-1 focus:ring-[#7CB342]/50"
                      />
                    </div>
                  )}

                  <div>
                    <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-[#8a7a6a]">
                      Fecha Tentativa
                    </label>
                    <input
                      type="text"
                      id="date"
                      value={form.date}
                      onChange={handleChange('date')}
                      placeholder="Ej. Sábado 15 de Octubre"
                      className="mt-2 w-full rounded-xl border border-[#e0d6cc] bg-[#faf7f3] px-4 py-3.5 text-sm text-[#1f1a17] placeholder-[#a69688] transition focus:border-[#7CB342]/40 focus:outline-none focus:ring-1 focus:ring-[#7CB342]/40"
                    />
                  </div>

                  {formError && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7CB342] py-4 text-sm font-semibold text-white shadow-[0_12px_35px_rgba(124,179,66,0.2)] transition duration-300 hover:opacity-95 active:scale-[0.99]"
                  >
                    Cotizar por WhatsApp
                    <FaWhatsapp className="h-4 w-4" />
                  </button>
                </div>
              </Reveal>
            </div>
          </section>
        </main>

        <footer className="bg-[#1f1a17] text-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    <img src={logo} alt="Palmares" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.3em] text-white">PALMARES</p>
                    <p className="text-[0.6rem] uppercase tracking-[0.4em] text-white/40">Salón de Eventos</p>
                  </div>
                </div>
                <p className="text-sm leading-6 text-white/60">Salón de eventos en Fernando de la Mora. Espacio único con quincho, pileta y generador propio.</p>
                <a
                  href="https://www.google.com/maps/place/Palmares+-+Sal%C3%B3n+de+eventos/@-25.3342363,-57.5742762,17z/data=!4m6!3m5!1s0x945da9ecf732f7d1:0xef1fc13ab4f46e85!8m2!3d-25.3342363!4d-57.5742762!16s%2Fg%2F11nntnpntl"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[#7CB342] hover:text-[#8BC34A] transition mt-3"
                >
                  Yataity Cora esq. Fortín Toledo, Fernando de la Mora
                </a>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80 mb-4">Contacto</h4>
                <div className="space-y-3 text-sm text-white/60">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#7CB342] hover:text-[#8BC34A] transition"
                  >
                    <FaInstagram className="h-4 w-4" />
                    @palmarespyeventos
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100069641632947"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-[#7CB342] hover:text-[#8BC34A] transition"
                  >
                    <FaFacebookF className="h-4 w-4" />
                    Palmares Salón de Eventos
                  </a>
                  <a
                    href="mailto:palmarespyeventos@gmail.com"
                    className="flex items-center gap-2 text-[#7CB342] hover:text-[#8BC34A] transition"
                  >
                    <span className="text-sm">✉</span>
                    palmarespyeventos@gmail.com
                  </a>
                </div>
              </div>

            </div>

              <div className="border-t border-white/10 py-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
                <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Palmares Salón de Eventos. Fernando de la Mora, Paraguay.</p>
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
