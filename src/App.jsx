import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { FaWhatsapp, FaInstagram, FaFacebookF, FaStar } from 'react-icons/fa6';
import logo from '/Imagen1.webp';
import { WHATSAPP_BASE_URL, buildWhatsAppUrl } from './config';

const instagramUrl = 'https://www.instagram.com/palmarespyeventos/';
const mapsUrl = 'https://www.google.com/maps?cid=17230703157230988933&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Cumpleaños', 'Evento de Día con Piscina', 'Otro'];

const integerFormatter = new Intl.NumberFormat('es-PY', { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat('es-PY', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const stats = [
  { to: 4.7, from: 0, decimals: 1, label: 'Google', detail: 'Calificación' },
  { to: 161, from: 0, suffix: '+', label: 'Reseñas', detail: 'en Google' },
  { to: 200, from: 0, suffix: '+', label: 'Eventos', detail: 'celebrados' },
  { to: 5, from: 0, suffix: '+', label: 'Años', detail: 'desde 2021' },
];

function CountUp({ from = 0, to, decimals = 0, suffix = '', start, duration = 1600 }) {
  const [value, setValue] = useState(from);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!start) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(to);
      return;
    }

    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (to - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [start, from, to, duration]);

  const formatter = decimals > 0 ? decimalFormatter : integerFormatter;
  const formatted = formatter.format(value);

  return <>{formatted}{suffix}</>;
}

function getTodayInputValue() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

function formatEventDate(value) {
  if (!value) return '';

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return value;

  const formatted = new Intl.DateTimeFormat('es-PY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, day));

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

const testimonials = [
  {
    name: 'Carmen Ferreira',
    event: 'Cliente · 43 reseñas en Google',
    text: 'Muy lindo lugar, limpio, sus sanitarios como corresponde y buena atención del personal. Recomendadísimo. Buena ubicación.',
    rating: 5,
    link: 'https://maps.app.goo.gl/2QkaVC2oQ1xVUADEA',
  },
  {
    name: 'Dream\'s By Ofely Ocampo',
    event: 'Cliente · 17 reseñas en Google',
    text: 'Excelente lugar, los dueños súper atentos y muy cordiales. Especial para cualquier acontecimiento social.',
    rating: 5,
    link: 'https://maps.app.goo.gl/GfsT5d7CseSe1UCT8',
  },
  {
    name: 'Ma. Eugenia Romero',
    event: 'Cliente · 96 reseñas en Google',
    text: 'Bello el salón, muy amables los propietarios, excelente en cuanto a higiene, bien equipado el quincho para realizar cualquier tipo de eventos.',
    rating: 5,
    link: 'https://maps.app.goo.gl/ze6wLGsa7KxkrDVA8',
  },
];

const differentiators = [
  {
    badge: 'Generador propio',
    title: 'Energía Asegurada',
    description: 'Se corta la luz y la fiesta sigue. El generador propio aguanta sonido, luces y todo lo necesario.',
  },
  {
    badge: 'Hasta 120 invitados',
    title: 'Capacidad Ideal',
    description: 'Hasta 120 invitados cómodos. Ideal para bodas, XV años, cumpleaños, colaciones y eventos de empresa.',
  },
  {
    badge: 'Interior + exterior',
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
  { src: '/galeria/piscinanocturna.webp', title: 'Piscina Nocturna', desc: 'La pileta iluminada le da otro ambiente a la noche.', width: 1448, height: 1086 },
  { src: '/galeria/fachadasalon.webp', title: 'Entrada del Salón', desc: 'La puerta de entrada a un evento inolvidable.', width: 1461, height: 1076 },
  { src: '/galeria/quinchoparrilla.webp', title: 'El Quincho y la Parrilla', desc: 'Asado, música y buena compañía.', width: 1372, height: 1147 },
  { src: '/galeria/montajemesa.webp', title: 'Montaje de Mesas', desc: 'Amplio espacio para montar tu evento a tu gusto.', width: 1443, height: 1090 },
];

function getPhotoIndexFromUrl() {
  if (typeof window === 'undefined') return null;

  const value = Number(new URLSearchParams(window.location.search).get('foto'));
  return Number.isInteger(value) && value >= 1 && value <= galeriaFotos.length ? value - 1 : null;
}

const instagramPosts = [
  { thumb: '/miniaturas_ig/post1.webp', link: 'https://www.instagram.com/p/DYVaDqUAVK6/', width: 1440, height: 1080 },
  { thumb: '/miniaturas_ig/post2.webp', link: 'https://www.instagram.com/p/DYInS99DmmE/', width: 1440, height: 1080 },
  { thumb: '/miniaturas_ig/post3.webp', link: 'https://www.instagram.com/p/DCu5ToosHPC/', width: 1440, height: 810 },
  { thumb: '/miniaturas_ig/post4.webp', link: 'https://www.instagram.com/p/DSI278BAfw5/', width: 1440, height: 1440 },
  { thumb: '/miniaturas_ig/post5.webp', link: 'https://www.instagram.com/p/DDlElk8sahE/', width: 1440, height: 810 },
  { thumb: '/miniaturas_ig/post6.webp', link: 'https://www.instagram.com/p/DBo_tz_SJlG/', width: 1440, height: 1440 },
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
      className={`translate-y-6 opacity-0 transition-[transform,opacity] duration-700 ease-out data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-green">
        <span className="h-px w-8 bg-brand-accent" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.02] tracking-[-0.03em] text-brand-text sm:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-brand-muted">{description}</p>
    </div>
  );
}

function InstagramCard({ item, index }) {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ver publicación ${index + 1} de Palmares en Instagram`}
      className="group relative block aspect-square w-[17rem] shrink-0 cursor-grab snap-start overflow-hidden bg-brand-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent active:cursor-grabbing sm:w-[20rem]"
    >
      <img
        src={item.thumb}
        alt={`Publicación ${index + 1} de Palmares en Instagram`}
        width={item.width}
        height={item.height}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        draggable="false"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-brand-dark/55 opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true">
        <FaInstagram className="h-6 w-6 text-white" aria-hidden="true" />
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-white">Ver post</span>
      </div>
    </a>
  );
}

function FieldError({ field, invalidField, message }) {
  if (invalidField !== field || !message) return null;

  return <p id="form-error" role="alert" className="mt-2 text-xs font-medium text-red-200">{message}</p>;
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 50 : false));
  const [form, setForm] = useState({
    name: '',
    eventType: 'Boda',
    guests: '',
    date: '',
    institution: '',
  });
  const [formError, setFormError] = useState('');
  const [invalidField, setInvalidField] = useState('');
  const [lightboxIndex, setLightboxIndex] = useState(getPhotoIndexFromUrl);
  const [instagramDragging, setInstagramDragging] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const menuButtonRef = useRef(null);
  const lightboxRef = useRef(null);
  const lightboxTriggerRef = useRef(null);
  const openedFromPageRef = useRef(false);
  const instagramStripRef = useRef(null);
  const statsRef = useRef(null);
  const instagramDragRef = useRef({ active: false, captured: false, startX: 0, startScrollLeft: 0, moved: false, pointerId: null });

  const isColacion = form.eventType === 'Colación';
  const lightboxOpen = lightboxIndex !== null;
  const hasUnsavedForm = Boolean(
    form.name.trim()
    || form.guests
    || form.date
    || form.institution.trim()
    || form.eventType !== 'Boda',
  );

  const showPrevPhoto = () => setLightboxIndex((current) => (current - 1 + galeriaFotos.length) % galeriaFotos.length);
  const showNextPhoto = () => setLightboxIndex((current) => (current + 1) % galeriaFotos.length);

  const openLightbox = (index) => {
    openedFromPageRef.current = true;

    const url = new URL(window.location.href);
    url.searchParams.set('foto', String(index + 1));
    window.history.pushState({}, '', url);

    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    const trigger = lightboxTriggerRef.current;

    if (openedFromPageRef.current) {
      openedFromPageRef.current = false;
      window.history.back();
    } else {
      setLightboxIndex(null);
    }

    window.setTimeout(() => trigger?.focus(), 0);
  };

  const handleInstagramPointerDown = (event) => {
    if (event.pointerType !== 'mouse') return;

    const strip = instagramStripRef.current;
    if (!strip) return;

    instagramDragRef.current = {
      active: true,
      captured: false,
      startX: event.clientX,
      startScrollLeft: strip.scrollLeft,
      moved: false,
      pointerId: event.pointerId,
    };
    setInstagramDragging(true);
  };

  const handleInstagramPointerMove = (event) => {
    const drag = instagramDragRef.current;
    const strip = instagramStripRef.current;
    if (!strip || !drag.active) return;

    const delta = event.clientX - drag.startX;
    if (Math.abs(delta) < 4) return;

    drag.moved = true;

    if (!drag.captured) {
      try {
        strip.setPointerCapture(drag.pointerId);
        drag.captured = true;
      } catch {
        // Pointer capture can fail for synthetic events; dragging still works inside the strip.
      }
    }

    event.preventDefault();
    strip.scrollLeft = drag.startScrollLeft - delta;
  };

  const endInstagramDrag = () => {
    const drag = instagramDragRef.current;
    const strip = instagramStripRef.current;
    if (!drag.active) return;

    if (drag.captured && strip?.hasPointerCapture?.(drag.pointerId)) {
      strip.releasePointerCapture(drag.pointerId);
    }

    drag.active = false;
    drag.captured = false;
    setInstagramDragging(false);
  };

  const handleInstagramPointerLeave = () => {
    const drag = instagramDragRef.current;
    if (drag.active && !drag.captured) endInstagramDrag();
  };

  const handleInstagramClick = (event) => {
    if (!instagramDragRef.current.moved) return;

    event.preventDefault();
    instagramDragRef.current.moved = false;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const target = document.getElementById(hash.slice(1));
    if (!target) return;

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'instant', block: 'start' });
      setScrolled(window.scrollY > 50);
    }, 0);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const index = getPhotoIndexFromUrl();
      openedFromPageRef.current = index !== null;
      setLightboxIndex(index);
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);

    if (lightboxIndex !== null) {
      url.searchParams.set('foto', String(lightboxIndex + 1));
      window.history.replaceState({}, '', url);
      return;
    }

    if (!openedFromPageRef.current) {
      url.searchParams.delete('foto');
      window.history.replaceState({}, '', url);
    }
  }, [lightboxIndex]);

  useEffect(() => {
    const element = statsRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStatsVisible(true);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasUnsavedForm) return;

    const onBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [hasUnsavedForm]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const onKey = (event) => {
      if (event.key !== 'Escape') return;
      setMobileMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const dialog = lightboxRef.current;
    if (!dialog) return;

    if (!dialog.open) dialog.showModal();
    dialog.querySelector('button[aria-label="Cerrar galería"]')?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
      lightboxTriggerRef.current?.focus();
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeLightbox();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrevPhoto();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNextPhoto();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen]);

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setForm((current) => ({
      ...current,
      [field]: value,
      ...(field === 'eventType' && value !== 'Colación' ? { institution: '' } : {}),
    }));
    setFormError('');
    setInvalidField('');
  };

  const failValidation = (message, fieldId) => {
    setFormError(message);
    setInvalidField(fieldId);
    document.getElementById(fieldId)?.focus();
  };

  const errorProps = (field) => ({
    'aria-invalid': invalidField === field ? true : undefined,
    'aria-describedby': invalidField === field ? 'form-error' : undefined,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const guestsNumber = Number(form.guests);
    const date = form.date.trim();
    const institution = form.institution.trim();

    if (!name) {
      failValidation('Completá tu nombre para continuar.', 'name');
      return;
    }

    if (!form.eventType) {
      failValidation('Elegí el tipo de evento para continuar.', 'eventType');
      return;
    }

    if (!form.guests) {
      failValidation('Indicá la cantidad de invitados para continuar.', 'guests');
      return;
    }

    if (!date) {
      failValidation('Elegí una fecha tentativa para continuar.', 'date');
      return;
    }

    if (!Number.isFinite(guestsNumber) || guestsNumber < 1 || guestsNumber > 120) {
      failValidation('La cantidad de invitados debe estar entre 1 y 120 personas.', 'guests');
      return;
    }

    if (isColacion && !institution) {
      failValidation('Para colación, completá el nombre de la institución o colegio.', 'institution');
      return;
    }

    const lines = [
      'Hola Palmares, quiero cotizar mi evento con estos datos:',
      '',
      `Nombre: ${name}`,
      `Tipo de evento: ${form.eventType}`,
      `Cantidad de invitados: ${guestsNumber}`,
      `Fecha tentativa: ${formatEventDate(date)}`,
    ];

    if (isColacion) lines.push(`Institución o colegio: ${institution}`);

    lines.push('', 'Quedo atento/a para recibir disponibilidad y presupuesto.');

    setFormError('');
    setInvalidField('');
    window.open(buildWhatsAppUrl(lines.join('\n')), '_blank', 'noopener,noreferrer');
  };

  const headerOnDark = mobileMenuOpen || !scrolled;
  const navLinkClass = `${headerOnDark ? 'text-white/70 hover:text-white' : 'text-brand-muted hover:text-brand-text'} relative after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100`;
  const mobileButtonClass = headerOnDark
    ? 'border-white/25 text-white transition-[background-color,border-color] hover:bg-white/10'
    : 'border-brand-text/15 text-brand-text transition-[background-color,border-color] hover:bg-brand-text/5';

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text selection:bg-brand-accent/30 selection:text-brand-dark">
      <div className="relative isolate overflow-hidden">
        <a
          href="#hero-title"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        <header
          className={`safe-top fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
            mobileMenuOpen
              ? 'border-white/10 bg-brand-dark text-brand-bg'
              : scrolled
                ? 'border-brand-text/10 bg-brand-bg/95 text-brand-text backdrop-blur-md'
                : 'border-transparent bg-transparent text-white'
          }`}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#inicio" className="flex items-center gap-3 transition hover:opacity-90">
              <div className="h-10 w-10 overflow-hidden rounded-full border border-white/20 bg-white">
                <img src={logo} alt="" width="170" height="161" loading="eager" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className={`text-[0.55rem] uppercase tracking-[0.35em] ${headerOnDark ? 'text-white/60' : 'text-brand-muted'}`}>Salón de Eventos</p>
                <p translate="no" className={`font-display text-lg font-medium tracking-[0.14em] ${headerOnDark ? 'text-white' : 'text-brand-text'}`}>PALMARES</p>
              </div>
            </a>

            <div className="hidden md:flex md:items-center md:gap-8">
              <nav className="flex items-center gap-8" aria-label="Navegación principal">
                <a href="#diferenciales" className={`text-sm ${navLinkClass}`}>Diferenciales</a>
                <a href="#galeria" className={`text-sm ${navLinkClass}`}>Galería</a>
                <a href="#ubicacion" className={`text-sm ${navLinkClass}`}>Ubicación</a>
                <a
                  href={WHATSAPP_BASE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-accentSoft"
                >
                  Reservá tu fecha
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                </a>
              </nav>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className={`inline-flex items-center justify-center rounded-full border p-3 md:hidden ${mobileButtonClass}`}
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div id="mobile-menu" className="border-t border-white/10 bg-brand-dark md:hidden">
              <nav className="mx-auto flex max-w-7xl flex-col px-4 pb-8 pt-2 sm:px-6" aria-label="Navegación móvil">
                <a href="#diferenciales" className="border-b border-white/10 py-5 font-display text-3xl font-light text-brand-bg transition-colors hover:text-brand-accentSoft" onClick={() => setMobileMenuOpen(false)}>Diferenciales</a>
                <a href="#galeria" className="border-b border-white/10 py-5 font-display text-3xl font-light text-brand-bg transition-colors hover:text-brand-accentSoft" onClick={() => setMobileMenuOpen(false)}>Galería</a>
                <a href="#ubicacion" className="border-b border-white/10 py-5 font-display text-3xl font-light text-brand-bg transition-colors hover:text-brand-accentSoft" onClick={() => setMobileMenuOpen(false)}>Ubicación</a>
                <a href={WHATSAPP_BASE_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-sm font-semibold text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-accentSoft">
                  <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  Reservá tu fecha
                </a>
              </nav>
            </div>
          ) : null}
        </header>

        <main id="inicio">
          <section aria-labelledby="hero-title" className="hero-screen relative isolate flex flex-col justify-end overflow-hidden bg-brand-dark">
            <img
              src="/galeria/fachadasalon.webp"
              alt="Fachada nocturna de Palmares Salón de Eventos"
              width="1461"
              height="1076"
              fetchPriority="high"
              loading="eager"
              className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-black/25" aria-hidden="true" />

            <div className="safe-pb safe-pb-lg mx-auto w-full max-w-7xl px-4 pt-32 sm:px-6 lg:px-8">
              <div className="max-w-3xl lg:ml-auto lg:max-w-2xl lg:pl-6">
                <p className="animate-fade-up flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-accent">
                  <span className="h-px w-10 bg-brand-accent/70" aria-hidden="true" />
                  Fernando de la Mora · Zona Sur
                </p>
                <h1 id="hero-title" tabIndex={-1} className="animate-fade-up-1 mt-6 text-balance font-display text-5xl font-light leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl xl:text-8xl">
                  La noche empieza en <em className="italic text-brand-accent" translate="no">Palmares</em>.
                </h1>
                <p className="animate-fade-up-2 mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                  Salón, quincho y pileta en un solo lugar. Bodas, XV años, colaciones y eventos de empresa con hasta 120 invitados.
                </p>
                <div className="animate-fade-up-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={WHATSAPP_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-7 py-4 text-sm font-semibold text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-accentSoft"
                  >
                    Reservá tu fecha
                    <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#diferenciales"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10"
                  >
                    Conocé el espacio
                    <ArrowDown className="h-4 w-4 transition group-hover:translate-y-0.5" aria-hidden="true" />
                  </a>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-5 text-[0.7rem] uppercase tracking-[0.2em] text-white/60">
                <p>Bodas · XV años · Colaciones · Empresas</p>
                <p className="hidden sm:block">Hasta 120 invitados</p>
                <p>Fernando de la Mora</p>
              </div>
            </div>
          </section>

          <section ref={statsRef} aria-label="Palmares en números" className="border-b border-brand-text/10 bg-brand-bg">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`lg:px-8 ${index > 0 ? 'lg:border-l lg:border-brand-text/10' : ''}`}>
                  <p className="font-display text-4xl font-light leading-none tracking-[-0.03em] text-brand-text tabular-nums sm:text-5xl">
                    <CountUp
                      from={stat.from}
                      to={stat.to}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      start={statsVisible}
                    />
                  </p>
                  <p className="mt-3 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand-green">{stat.label}</p>
                  <p className="mt-1 text-xs text-brand-muted">{stat.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="diferenciales" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-16 pt-16 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <SectionHeading
                    eyebrow="Diferenciales"
                    title="Por qué elegir Palmares para tu evento"
                    description="Seguridad, espacio, ubicación y un ambiente que tus invitados van a recordar."
                  />
                  <a
                    href={WHATSAPP_BASE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex items-center gap-3 text-sm font-semibold text-brand-text"
                  >
                    <span className="border-b border-brand-green/40 pb-1 transition group-hover:border-brand-green">Consultá disponibilidad</span>
                    <FaWhatsapp className="h-4 w-4 text-brand-green transition group-hover:translate-x-0.5" aria-hidden="true" />
                  </a>
                </Reveal>
              </div>

              <div>
                {differentiators.map((item, index) => (
                  <Reveal
                    key={item.title}
                    className="group grid grid-cols-[2rem_1fr] gap-5 border-t border-brand-text/15 py-8 transition-colors last:border-b hover:bg-brand-surface/50 sm:grid-cols-[2.5rem_1fr] sm:gap-6"
                  >
                    <span className="font-display text-sm text-brand-green">0{index + 1}</span>
                    <div>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                        <h3 className="font-display text-3xl font-light tracking-[-0.02em] text-brand-text">{item.title}</h3>
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-muted">{item.badge}</span>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-brand-muted">{item.description}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section id="testimonios" className="scroll-mt-24 border-y border-brand-text/10 bg-brand-surface">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8 lg:py-24">
              <Reveal>
                <SectionHeading
                  eyebrow="Testimonios"
                  title="Lo que dicen los que ya celebraron en Palmares"
                  description="Esto nos escriben después de vivir su evento. Sin filtro."
                />
              </Reveal>

              <div>
                <Reveal className="relative">
                  <div className="relative">
                    <div className="flex items-center gap-1" role="img" aria-label={`${testimonials[0].rating} de 5 estrellas`}>
                      {Array.from({ length: testimonials[0].rating }).map((_, i) => (<FaStar key={i} className="h-4 w-4 text-brand-green" aria-hidden="true" />))}
                    </div>
                    <blockquote className="mt-6 font-display text-3xl font-light leading-[1.12] tracking-[-0.02em] text-brand-text sm:text-4xl">
                      “{testimonials[0].text}”
                    </blockquote>
                    <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="font-semibold text-brand-text">{testimonials[0].name}</span>
                      <span className="text-brand-muted">·</span>
                      <span className="text-brand-muted">{testimonials[0].event}</span>
                      <a href={testimonials[0].link} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs font-semibold text-brand-muted transition hover:text-brand-green" aria-label={`Ver reseña de ${testimonials[0].name} en Google`}>
                        Google ↗
                      </a>
                    </div>
                  </div>
                </Reveal>

                <div className="mt-10 grid gap-8 border-t border-brand-text/15 pt-8 sm:grid-cols-2">
                  {testimonials.slice(1).map((t) => (
                    <Reveal key={t.name}>
                      <div className="flex items-center gap-1" role="img" aria-label={`${t.rating} de 5 estrellas`}>
                        {Array.from({ length: t.rating }).map((_, i) => (<FaStar key={i} className="h-3.5 w-3.5 text-brand-green" aria-hidden="true" />))}
                      </div>
                      <blockquote className="mt-4 text-sm leading-6 text-brand-muted">“{t.text}”</blockquote>
                      <div className="mt-4 flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-brand-text">{t.name}</p>
                          <p className="truncate text-xs text-brand-muted">{t.event}</p>
                        </div>
                        <a href={t.link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-xs font-semibold text-brand-muted transition hover:text-brand-green" aria-label={`Ver reseña de ${t.name} en Google`}>
                          Google ↗
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="galeria" className="scroll-mt-24 pb-16 pt-16 lg:pb-24 lg:pt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Reveal>
                <SectionHeading
                  eyebrow="Galería"
                  title="Conocé cada rincón de Palmares"
                  description="Desde el salón principal hasta el quincho con parrilla y la pileta. Tocá cada foto para ampliarla."
                />
              </Reveal>
            </div>

            <Reveal className="mt-10 grid grid-cols-1 gap-3 px-3 sm:grid-cols-2 lg:grid-cols-12 lg:px-4">
              {galeriaFotos.map((foto, index) => {
                const spans = ['lg:col-span-7', 'lg:col-span-5', 'lg:col-span-5', 'lg:col-span-7'];
                return (
                  <figure key={foto.src} className={`group relative overflow-hidden bg-brand-surface ${spans[index]}`}>
                    <img
                      src={foto.src}
                      alt={foto.title}
                      width={foto.width}
                      height={foto.height}
                      loading="lazy"
                      decoding="async"
                      className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.03] group-focus-within:scale-[1.03] sm:h-96 lg:h-[32rem]"
                    />
                    <button
                      type="button"
                      onClick={(event) => { lightboxTriggerRef.current = event.currentTarget; openLightbox(index); }}
                      className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-accent"
                      aria-label={`Ampliar foto: ${foto.title}`}
                    />
                    <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/35 to-transparent p-5 sm:p-6">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-accentSoft">0{index + 1}</span>
                      <h3 className="mt-1 font-display text-2xl font-light text-white">{foto.title}</h3>
                      <p className="mt-1 hidden max-w-md text-sm text-white/70 sm:block">{foto.desc}</p>
                      <span className="mt-2 inline-flex text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-white/60 opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">Ampliar ↗</span>
                    </figcaption>
                  </figure>
                );
              })}
            </Reveal>
          </section>

          <section id="instagram" className="scroll-mt-24 overflow-hidden border-y border-brand-text/10 bg-brand-surface py-16 lg:py-20">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
              <Reveal>
                <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-green">
                  <span className="h-px w-8 bg-brand-accent" aria-hidden="true" />
                  Redes
                </p>
                <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-light leading-[1.02] tracking-[-0.03em] text-brand-text sm:text-5xl">
                  Viví el ambiente en <span className="italic" translate="no">@palmarespyeventos</span>
                </h2>
              </Reveal>
              <Reveal className="flex items-center gap-5">
                <span className="hidden text-[0.65rem] uppercase tracking-[0.25em] text-brand-muted sm:block">Arrastrá →</span>
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 border-b border-brand-text/30 pb-1 text-sm font-semibold text-brand-text transition hover:border-brand-green hover:text-brand-green">
                  Seguinos en Instagram
                  <FaInstagram className="h-4 w-4" aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            <div
              ref={instagramStripRef}
              className={`no-scrollbar mt-8 flex select-none gap-3 overflow-x-auto scroll-px-4 px-4 pb-4 sm:scroll-px-6 sm:px-6 lg:scroll-px-8 lg:px-8 ${
                instagramDragging ? 'snap-none cursor-grabbing' : 'snap-x snap-mandatory cursor-grab'
              }`}
              role="region"
              aria-label="Publicaciones de Instagram"
              onPointerDown={handleInstagramPointerDown}
              onPointerMove={handleInstagramPointerMove}
              onPointerUp={endInstagramDrag}
              onPointerCancel={endInstagramDrag}
              onPointerLeave={handleInstagramPointerLeave}
              onClick={handleInstagramClick}
              onDragStart={(event) => event.preventDefault()}
            >
              {instagramPosts.map((item, index) => (<InstagramCard key={index} item={item} index={index} />))}
            </div>
          </section>

          <section id="ubicacion" className="scroll-mt-24 bg-brand-green py-16 text-brand-bg lg:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
              <div>
                <Reveal>
                  <p className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-accentSoft">
                    <span className="h-px w-8 bg-brand-accent" aria-hidden="true" />
                    Ubicación
                  </p>
                  <h2 className="mt-4 text-balance font-display text-4xl font-light leading-[1.02] tracking-[-0.03em] text-brand-bg sm:text-5xl">Vení a conocer Palmares</h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-brand-bg/70">Yataity Cora esq. Fortín Toledo, Fernando de la Mora. Acceso rápido desde Asunción, San Lorenzo y Luque.</p>
                </Reveal>

                <Reveal className="mt-8 overflow-hidden border border-white/15 bg-brand-dark/20">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.1636834723734!2d-57.576451!3d-25.3342363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x945da9ecf732f7d1%3A0xef1fc13ab4f46e85!2sPalmares%20-%20Sal%C3%B3n%20de%20eventos!5e0!3m2!1ses!2spy!4v1"
                    className="block h-[320px] w-full border-0 lg:h-[360px]"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Mapa de Palmares Salón de Eventos"
                  />
                </Reveal>

                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-bg">
                  <span className="border-b border-white/30 pb-0.5 transition group-hover:border-brand-accent">Cómo llegar</span>
                  <ArrowUpRight className="h-4 w-4 text-brand-accentSoft transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </div>

              <div>
                <Reveal>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-brand-accentSoft">Cotizá tu evento</p>
                  <h3 className="mt-4 text-balance font-display text-3xl font-light leading-[1.05] tracking-[-0.02em] text-brand-bg sm:text-4xl">Contanos qué tenés en mente</h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-brand-bg/70">Completá tus datos y te abrimos WhatsApp con todo listo para enviar.</p>
                </Reveal>

                <Reveal as="form" onSubmit={handleSubmit} noValidate className="mt-8">
                  <div className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-brand-bg/80">Nombre Completo</label>
                      <input type="text" id="name" name="name" autoComplete="name" value={form.name} onChange={handleChange('name')} placeholder="Ej. Juan Pérez…" className="mt-2 block w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-brand-bg placeholder-white/50 transition focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required {...errorProps('name')} />
                      <FieldError field="name" invalidField={invalidField} message={formError} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="eventType" className="block text-xs font-semibold uppercase tracking-wider text-brand-bg/80">Tipo de Evento</label>
                        <select id="eventType" name="eventType" autoComplete="off" value={form.eventType} onChange={handleChange('eventType')} className="mt-2 block w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-brand-bg transition [color-scheme:dark] focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required {...errorProps('eventType')}>
                          {eventTypes.map((type) => (<option key={type} value={type} className="bg-brand-dark text-brand-bg">{type}</option>))}
                        </select>
                        <FieldError field="eventType" invalidField={invalidField} message={formError} />
                      </div>
                      <div>
                        <label htmlFor="guests" className="block text-xs font-semibold uppercase tracking-wider text-brand-bg/80">Invitados (Máx. 120)</label>
                        <input type="number" id="guests" name="guests" autoComplete="off" inputMode="numeric" step="1" min="1" max="120" value={form.guests} onChange={handleChange('guests')} placeholder="Ej. 80…" className="mt-2 block w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-brand-bg placeholder-white/50 transition focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required {...errorProps('guests')} />
                        <FieldError field="guests" invalidField={invalidField} message={formError} />
                      </div>
                    </div>

                    {isColacion && (
                      <div>
                        <label htmlFor="institution" className="block text-xs font-semibold uppercase tracking-wider text-brand-bg/80">Institución Educativa / Colegio</label>
                        <input type="text" id="institution" name="institution" autoComplete="organization" value={form.institution} onChange={handleChange('institution')} placeholder="Ej. Colegio Nacional de la Capital…" className="mt-2 block w-full rounded-sm border border-white/20 bg-white/5 px-4 py-3.5 text-sm text-brand-bg placeholder-white/50 transition focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required={isColacion} {...errorProps('institution')} />
                        <FieldError field="institution" invalidField={invalidField} message={formError} />
                      </div>
                    )}

                    <div>
                      <label htmlFor="date" className="block text-xs font-semibold uppercase tracking-wider text-brand-bg/80">Fecha Tentativa</label>
                      <input type="date" id="date" name="date" autoComplete="off" min={getTodayInputValue()} value={form.date} onChange={handleChange('date')} className="mt-2 block w-full rounded-sm border border-white/15 bg-white/5 px-4 py-3.5 text-sm text-brand-bg transition [color-scheme:dark] focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40" required {...errorProps('date')} />
                      <FieldError field="date" invalidField={invalidField} message={formError} />
                    </div>

                    <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent py-4 text-sm font-semibold text-brand-dark transition hover:-translate-y-0.5 hover:bg-brand-accentSoft active:scale-[0.99]">
                      Cotizar por WhatsApp
                      <FaWhatsapp className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

        </main>

        <footer className="bg-brand-dark text-brand-bg">
          <div className="safe-pb mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 lg:pt-20">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 overflow-hidden rounded-full border border-white/10">
                    <img src={logo} alt="" width="170" height="161" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p translate="no" className="font-display text-lg font-medium tracking-[0.14em] text-white">PALMARES</p>
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-white/60">Salón de Eventos</p>
                  </div>
                </div>
                <p className="max-w-xs text-sm leading-6 text-white/70">Salón de eventos en Fernando de la Mora. Espacio único con quincho, pileta y generador propio.</p>
                <p className="mt-3 text-sm text-white/70">Yataity Cora esq. Fortín Toledo, Fernando de la Mora</p>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Contacto</h3>
                <div className="space-y-3 text-sm text-white/80">
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" translate="no" className="flex w-fit items-center gap-2 text-white/85 transition hover:text-white"><FaInstagram className="h-4 w-4" aria-hidden="true" /> @palmarespyeventos</a>
                  <a href="https://www.facebook.com/profile.php?id=100069641632947" target="_blank" rel="noopener noreferrer" translate="no" className="flex w-fit items-center gap-2 text-white/85 transition hover:text-white"><FaFacebookF className="h-4 w-4" aria-hidden="true" /> Palmares Salón de Eventos</a>
                  <a href="mailto:palmarespyeventos@gmail.com" translate="no" className="flex w-fit items-center gap-2 text-white/85 transition hover:text-white"><span className="text-sm" aria-hidden="true">✉</span> palmarespyeventos@gmail.com</a>
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Explorá</h3>
                <nav className="flex flex-col gap-3 text-sm text-white/80" aria-label="Navegación del pie">
                  <a href="#diferenciales" className="w-fit transition hover:text-white">Diferenciales</a>
                  <a href="#galeria" className="w-fit transition hover:text-white">Galería</a>
                  <a href="#testimonios" className="w-fit transition hover:text-white">Testimonios</a>
                  <a href="#ubicacion" className="w-fit transition hover:text-white">Ubicación y contacto</a>
                </nav>
              </div>
            </div>

            <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {new Date().getFullYear()} Palmares Salón de Eventos. Fernando de la Mora, Paraguay.</p>
              <p>Salón · Quincho · Pileta</p>
            </div>
          </div>
        </footer>
      </div>

      {lightboxOpen && (
        <dialog
          ref={lightboxRef}
          className="m-auto w-[min(94vw,64rem)] max-w-none overscroll-contain overflow-hidden border border-white/10 bg-brand-dark p-0 text-brand-bg shadow-2xl backdrop:bg-brand-dark/95 backdrop:backdrop-blur-sm"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
          onClose={closeLightbox}
          onClick={(event) => { if (event.target === event.currentTarget) closeLightbox(); }}
        >
          <div className="relative flex max-h-[76vh] items-center justify-center bg-black/30">
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/90 text-brand-dark transition hover:bg-brand-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
              aria-label="Cerrar galería"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <img
              src={galeriaFotos[lightboxIndex].src}
              alt={galeriaFotos[lightboxIndex].title}
              width={galeriaFotos[lightboxIndex].width}
              height={galeriaFotos[lightboxIndex].height}
              className="max-h-[76vh] max-w-full object-contain"
            />
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div aria-live="polite">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-brand-accentSoft">0{lightboxIndex + 1} / 0{galeriaFotos.length}</p>
              <h3 id="lightbox-title" className="mt-1 font-display text-2xl font-light text-brand-bg">{galeriaFotos[lightboxIndex].title}</h3>
              <p id="lightbox-description" className="mt-1 text-sm text-brand-bg/70">{galeriaFotos[lightboxIndex].desc}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button type="button" onClick={showPrevPhoto} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-brand-bg transition hover:border-brand-accent hover:text-brand-accent" aria-label="Foto anterior">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <button type="button" onClick={showNextPhoto} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-brand-bg transition hover:border-brand-accent hover:text-brand-accent" aria-label="Foto siguiente">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </dialog>
      )}

      <a
        href={WHATSAPP_BASE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="safe-bottom fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent text-brand-dark shadow-[0_8px_30px_rgba(201,162,39,0.35)] transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(201,162,39,0.45)]"
        aria-label="Cotizar por WhatsApp"
      >
        <FaWhatsapp className="h-7 w-7" aria-hidden="true" />
      </a>
    </div>
  );
}

export default App;
