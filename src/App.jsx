import { useEffect, useRef, useState } from 'react';
import {
  Award,
  CheckCircle,
  MapPin,
  Menu,
  MessageSquare,
  Shield,
  Snowflake,
  Star,
  X,
} from 'lucide-react';
import logo from '/Imagen1.png';
import { FaFacebookF, FaInstagram, FaWhatsapp, FaLocationDot } from 'react-icons/fa6';

const whatsappNumber = '595000000000';
const facebookUrl = 'https://www.facebook.com/p/Palmares-Sal%C3%B3n-de-eventos-100069641632947/';
const mapsUrl = 'https://www.google.com/maps/place/Palmares+-+Salón+de+eventos/@-25.3342363,-57.5742762,16z';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Corporativo', 'Otro'];

const eventShowcase = [
  {
    title: 'Casamientos',
    description: 'Una estética elegante para ceremonias íntimas o celebraciones amplias con presencia y orden.',
  },
  {
    title: 'Colaciones',
    description: 'Un espacio preparado para festejar logros con un ingreso claro, buena circulación y fotos que se ven bien.',
  },
  {
    title: 'XV años',
    description: 'Ideal para celebraciones con montaje llamativo, pista protagonista y una experiencia memorable.',
  },
  {
    title: 'Corporativos',
    description: 'Formato funcional para encuentros de empresas, presentaciones, lanzamientos o reconocimientos.',
  },
];

const galleryCards = [
  {
    title: 'Ingreso principal',
    description: 'Un acceso limpio y elegante que anticipa una experiencia premium desde el primer paso.',
    tone: 'from-brand-accent/35 via-white to-slate-100',
  },
  {
    title: 'Salón principal',
    description: 'Espacio pensado para lucir decoración, iluminación y mesas con una presencia más sofisticada.',
    tone: 'from-emerald-200 via-white to-slate-50',
  },
  {
    title: 'Detalle de evento',
    description: 'Una composición visual ideal para mostrar ambientación, mesas, torta o pista de baile.',
    tone: 'from-lime-100 via-white to-slate-50',
  },
];

const socialLinks = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/${whatsappNumber}`,
    icon: FaWhatsapp,
    description: 'Cotizá directo con el equipo.',
  },
  {
    label: 'Facebook',
    href: facebookUrl,
    icon: FaFacebookF,
    description: 'Ver publicaciones y novedades.',
  },
  {
    label: 'Ubicación',
    href: mapsUrl,
    icon: FaLocationDot,
    description: 'Abrir en Google Maps.',
  },
];

const proofItems = [
  { value: '4.7', label: 'Calificación en Google', icon: Star },
  { value: '161+', label: 'Reseñas Verificadas', icon: Award },
  { value: 'Desde 2021', label: 'Creando Momentos', icon: Shield },
];

const differentiators = [
  {
    title: 'Zona Estratégica',
    description: 'Fernando de la Mora, Zona Sur, con accesos ágiles para que tus invitados lleguen cómodos y sin desvíos innecesarios.',
    icon: MapPin,
  },
  {
    title: 'Climatización Total',
    description: 'Ambientes frescos y estables para sostener el confort durante toda la celebración, sin depender del clima exterior.',
    icon: Snowflake,
  },
  {
    title: 'Iluminación Escénica',
    description: 'Líneas visuales sobrias y elegantes para vestir el salón con presencia, fondo y una pista de baile memorable.',
    icon: Star,
  },
  {
    title: 'Respaldo Absoluto',
    description: 'Un equipo atento que acompaña cada etapa del evento para que la experiencia se sienta ordenada y confiable.',
    icon: Shield,
  },
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

function Reveal({ as: Component = 'div', children, className = '', ...props }) {
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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [instagramPosts, setInstagramPosts] = useState([]);
  const [instagramStatus, setInstagramStatus] = useState('loading');
  const [form, setForm] = useState({
    name: '',
    eventType: 'Boda',
    guests: '',
    date: '',
  });

  const handleChange = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();
    const guests = form.guests.toString().trim();
    const date = form.date.trim();

    if (!name || !form.eventType || !guests || !date) {
      window.alert('Completá nombre, tipo de evento, cantidad de invitados y fecha tentativa para continuar.');
      return;
    }

    const guestsNumber = Number(guests);

    if (Number.isNaN(guestsNumber) || guestsNumber <= 0) {
      window.alert('La cantidad de invitados debe ser un número mayor a cero.');
      return;
    }

    const message = `Hola Palmares, quiero cotizar mi evento con estos datos:\n\n` +
      `Nombre: ${name}\n` +
      `Tipo de evento: ${form.eventType}\n` +
      `Cantidad de invitados: ${guestsNumber}\n` +
      `Fecha tentativa: ${date}\n\n` +
      `Quedo atento/a para recibir la propuesta.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const controller = new AbortController();

    async function loadInstagram() {
      try {
        const response = await fetch('/api/instagram?limit=3', { signal: controller.signal });
        const data = await response.json();

        if (response.ok && Array.isArray(data.items) && data.items.length > 0) {
          setInstagramPosts(data.items);
          setInstagramStatus('ready');
          return;
        }

        setInstagramStatus('fallback');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setInstagramStatus('fallback');
        }
      }
    }

    loadInstagram();

    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-slate-900 selection:bg-brand-accent/25 selection:text-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(52,235,97,0.14),_transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.85),transparent_30%),linear-gradient(to_bottom,_#f7faf7,_#f1f5ef_45%,_#edf2eb_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[linear-gradient(180deg,rgba(52,235,97,0.1),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 top-20 -z-10 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

        <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex h-12 w-12 overflow-hidden rounded-full border border-brand-accent/25 bg-brand-card shadow-[0_0_35px_rgba(52,235,97,0.14)]">
                <img src={logo} alt="Palmares - Salón de Eventos" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Salón de Eventos</p>
                <h1 className="text-sm font-semibold tracking-[0.35em] text-slate-900 sm:text-base">PALMARES</h1>
              </div>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="#diferenciales" className="text-sm text-slate-600 transition hover:text-slate-950">
                Diferenciales
              </a>
              <a href="#presupuesto" className="text-sm text-slate-600 transition hover:text-slate-950">
                Presupuesto
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-[0_12px_35px_rgba(52,235,97,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(52,235,97,0.28)]"
              >
                Cotizar Ahora
                <MessageSquare className="h-4 w-4" />
              </a>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-3 text-slate-900 transition hover:border-brand-accent/30 hover:bg-slate-50 md:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
              <div className="mx-auto flex max-w-6xl flex-col gap-3">
                <a
                  href="#diferenciales"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition hover:border-brand-accent/20 hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Diferenciales
                </a>
                <a
                  href="#presupuesto"
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition hover:border-brand-accent/20 hover:bg-slate-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Presupuesto
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-accent px-4 py-3 text-sm font-semibold text-brand-dark transition hover:opacity-95"
                >
                  Cotizar Ahora
                  <MessageSquare className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}
        </header>

        <main id="inicio">
          <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pb-16 lg:px-8 lg:pb-20 lg:pt-16">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-accent/20 bg-white px-4 py-2 text-sm text-slate-600 shadow-[0_0_0_1px_rgba(15,23,42,0.03)] backdrop-blur">
                  <CheckCircle className="h-4 w-4 text-brand-accent" />
                  Prestigio, confort y atención desde 2021
                </div>

                <div className="space-y-5">
                  <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                    Hacemos realidad tu evento soñado en Fernando de la Mora
                  </h2>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                    Un salón con presencia, verde visual y una propuesta más humana. Inspirado en la estructura clara de sitios de referencia, pero adaptado a Palmares para que la marca se sienta propia desde el primer scroll.
                  </p>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <a
                    href="#presupuesto"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-sm font-semibold text-brand-dark shadow-[0_18px_45px_rgba(52,235,97,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(52,235,97,0.3)]"
                  >
                    Cotizar por WhatsApp
                    <MessageSquare className="h-4 w-4" />
                  </a>
                  <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-4 text-sm text-slate-600 backdrop-blur">
                    <MapPin className="h-4 w-4 text-brand-accent" />
                    Fernando de la Mora, Zona Sur, Paraguay
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {proofItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-[0_28px_80px_rgba(52,235,97,0.1)]"
                      >
                        <Icon className="h-5 w-5 text-brand-accent" />
                        <p className="mt-4 text-2xl font-semibold text-slate-950">{item.value}</p>
                        <p className="mt-1 text-sm text-slate-500">{item.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-[radial-gradient(circle,_rgba(52,235,97,0.14),_transparent_65%)] blur-2xl" />
                <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl border border-brand-accent/20 bg-white shadow-[0_0_30px_rgba(52,235,97,0.1)]">
                      <img src={logo} alt="Logo Palmares" className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Palmares</p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-950">Salón de Eventos</h3>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-accent/90">Ambiente</p>
                      <p className="mt-3 text-base leading-7 text-slate-600">
                        Diseño sobrio, fondo claro y detalles verdes para una imagen más propia de un salón premium.
                      </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-accent/90">Atención</p>
                      <p className="mt-3 text-base leading-7 text-slate-600">
                        Respuesta directa por WhatsApp para cotizaciones rápidas y una coordinación más simple.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-3xl border border-brand-accent/15 bg-[linear-gradient(180deg,rgba(52,235,97,0.08),rgba(52,235,97,0.03))] p-5">
                    <p className="text-xs uppercase tracking-[0.3em] text-brand-accent/90">Desde 2021</p>
                    <p className="mt-2 text-lg font-medium text-slate-950">Una propuesta elegante y funcional para eventos que necesitan verse bien y organizarse mejor.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Galería</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Una presentación visual más cercana a un salón real</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Para un estilo tipo Vista Verde, conviene mostrar accesos, salón, ambientación y detalles. Si después me pasás fotos reales, las conecto en estas tarjetas y queda mucho más potente.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {galleryCards.map((card) => (
                <Reveal key={card.title} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                  <div className={`aspect-[4/3] bg-gradient-to-br ${card.tone} relative`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(52,235,97,0.16),transparent_30%),radial-gradient(circle_at_70%_75%,rgba(15,23,42,0.08),transparent_22%)]" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full border border-white/60 bg-white/85 px-4 py-2 shadow-sm backdrop-blur">
                      <div className="h-10 w-10 overflow-hidden rounded-full border border-brand-accent/20">
                        <img src={logo} alt="Palmares" className="h-full w-full object-cover" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Palmares</p>
                        <p className="text-sm font-semibold text-slate-900">{card.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm leading-6 text-slate-600">{card.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Tipos de evento</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Cada celebración merece su propio enfoque</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Este bloque ayuda a que el visitante se ubique rápido en la oferta y entienda cómo se adapta Palmares a distintos formatos de evento.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {eventShowcase.map((item) => (
                <Reveal key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-accent/25">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-brand-dark shadow-[0_10px_30px_rgba(52,235,97,0.18)]">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <h4 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Instagram</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Últimas publicaciones del salón</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  El contenido puede actualizarse semanalmente desde la API oficial de Instagram Graph. Si el perfil business está conectado, la galería se llena sola con las 3 publicaciones más recientes.
                </p>
              </div>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                <FaInstagram className="h-4 w-4" />
                Ver redes
              </a>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {(instagramStatus === 'ready' ? instagramPosts : galleryCards).map((post, index) => {
                const title = instagramStatus === 'ready' ? `Publicación ${index + 1}` : post.title;
                const description = instagramStatus === 'ready'
                  ? (post.caption ? post.caption.slice(0, 120) : 'Publicación reciente de Instagram.')
                  : post.description;
                const imageUrl = instagramStatus === 'ready'
                  ? (post.mediaType === 'VIDEO' ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl)
                  : undefined;
                const href = instagramStatus === 'ready' ? post.permalink : facebookUrl;

                return (
                  <Reveal key={instagramStatus === 'ready' ? post.id : post.title} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                    <a href={href} target="_blank" rel="noreferrer" className="block">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        {imageUrl ? (
                          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                        ) : (
                          <div className={`h-full w-full bg-gradient-to-br ${post.tone || 'from-brand-accent/35 via-white to-slate-100'}`} />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 backdrop-blur">
                          {instagramStatus === 'ready' ? 'Instagram' : 'Preview'}
                        </div>
                      </div>
                      <div className="p-5">
                        <h4 className="text-lg font-semibold text-slate-950">{title}</h4>
                        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                      </div>
                    </a>
                  </Reveal>
                );
              })}
            </div>

            {instagramStatus === 'fallback' ? (
              <Reveal className="mt-4 rounded-3xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                La API de Instagram todavía no está conectada. Cuando carguemos `IG_USER_ID` y `IG_ACCESS_TOKEN` en Vercel, esta grilla mostrará las 3 publicaciones más recientes automáticamente.
              </Reveal>
            ) : null}
          </section>

          <section className="border-y border-white/5 bg-white/[0.02]">
            <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
              {proofItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-brand-accent/15 bg-brand-dark text-brand-accent">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-slate-950">
                        {item.value} {item.label === 'Calificación en Google' ? '★' : ''}
                      </p>
                      <p className="text-sm text-slate-500">{item.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Redes y ubicación</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Encontrá el salón y contactá al equipo en un solo lugar</h3>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
                <div className="space-y-4">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-brand-accent/25 hover:bg-white"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-brand-dark shadow-[0_10px_30px_rgba(52,235,97,0.18)]">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{item.label}</p>
                            <p className="text-sm text-slate-600">{item.description}</p>
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-slate-900">Abrir</span>
                      </a>
                    );
                  })}
                </div>
              </Reveal>

              <Reveal className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Ubicación real</p>
                    <h4 className="text-lg font-semibold text-slate-950">Palmares - Salón de eventos</h4>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-brand-accent/30 bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-dark"
                  >
                    Ver mapa
                  </a>
                </div>

                <div className="aspect-[4/3] w-full bg-slate-100">
                  <iframe
                    title="Mapa de Palmares"
                    src="https://www.google.com/maps?q=-25.3342363,-57.5742762&z=16&output=embed"
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </Reveal>
            </div>
          </section>

          <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Contacto rápido</p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-950">Escribinos y vemos tu fecha disponible</h3>
                  <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                    WhatsApp para el cierre rápido, Facebook para ver actividad del salón y ubicación directa para llegar sin vueltas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark">
                    <FaWhatsapp className="h-4 w-4" /> WhatsApp
                  </a>
                  <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                    <FaFacebookF className="h-4 w-4" /> Facebook
                  </a>
                  <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                    <FaLocationDot className="h-4 w-4" /> Ubicación
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="diferenciales" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <Reveal className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Diferenciales</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Todo lo que tu evento necesita para elevar su nivel</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                La estructura sigue la lógica de una landing de referencia: un inicio fuerte, beneficios claros, prueba social y un cierre de conversión. La diferencia está en la identidad propia de Palmares.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {differentiators.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-[0_24px_70px_rgba(52,235,97,0.08)]"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(52,235,97,0.12),transparent_35%)] opacity-0 transition duration-300 group-hover:opacity-100" />
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-brand-accent/15 bg-white/5 text-brand-accent transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_30px_rgba(52,235,97,0.18)]">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h4 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h4>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="presupuesto" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Presupuesto automatizado</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950">Solicitá tu cotización en menos de un minuto</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Completá tus datos y enviá la consulta por WhatsApp. Así te respondemos con una propuesta más precisa, clara y útil para decidir.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    'Respuesta directa al número que uses para coordinar.',
                    'Información clara para acelerar tu evaluación.',
                    'Proceso optimizado para tráfico móvil y cierre rápido.',
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-accent" />
                      <p className="text-sm leading-6 text-slate-600">{text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal
                as="form"
                onSubmit={handleSubmit}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-900">
                      Nombre y apellido
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Ej: María González"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-accent/40 focus:ring-2 focus:ring-brand-accent/15"
                    />
                  </div>

                  <div>
                    <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-slate-900">
                      Tipo de evento
                    </label>
                    <select
                      id="eventType"
                      value={form.eventType}
                      onChange={handleChange('eventType')}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-brand-accent/40 focus:ring-2 focus:ring-brand-accent/15"
                    >
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="guests" className="mb-2 block text-sm font-medium text-slate-900">
                      Cantidad de invitados
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      value={form.guests}
                      onChange={handleChange('guests')}
                      placeholder="Ej: 120"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-accent/40 focus:ring-2 focus:ring-brand-accent/15"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="date" className="mb-2 block text-sm font-medium text-slate-900">
                      Fecha tentativa
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange('date')}
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:border-brand-accent/40 focus:ring-2 focus:ring-brand-accent/15"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-accent px-5 py-4 text-sm font-semibold text-brand-dark shadow-[0_18px_45px_rgba(52,235,97,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(52,235,97,0.32)]"
                >
                  Enviar a WhatsApp
                  <MessageSquare className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Al enviar, se abrirá WhatsApp con tu presupuesto precompletado para agilizar la atención.
                </p>
              </Reveal>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
