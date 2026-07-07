import { useEffect, useRef, useState } from 'react';
import {
  Award,
  CheckCircle,
  Menu,
  MessageSquare,
  MapPin,
  Shield,
  Star,
  X,
} from 'lucide-react';
import logo from '/Imagen1.png';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa6';

const whatsappNumber = '595000000000';
const facebookUrl = 'https://www.facebook.com/p/Palmares-Sal%C3%B3n-de-eventos-100069641632947/';
const mapsUrl = 'https://www.google.com/maps/place/Palmares+-+Salón+de+eventos/@-25.3342363,-57.5742762,16z';
const heroImage = 'https://images.unsplash.com/photo-1519167758481-83f29c2eab2a?auto=format&fit=crop&w=1800&q=80';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Corporativo', 'Otro'];

const eventShowcase = [
  {
    title: 'Casamientos',
    description: 'Mesa principal elegante, flores y una puesta pensada para una noche inolvidable.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Colaciones',
    description: 'Ingreso ordenado, fotos lindas y un ambiente que celebra el logro con presencia.',
    image: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c2f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'XV años',
    description: 'Pista protagonista, luces aéreas y una celebración que se siente grande desde el inicio.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Corporativos',
    description: 'Montaje funcional y elegante para encuentros de empresas, lanzamientos y reconocimientos.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
  },
];

const galleryCards = [
  {
    title: 'Pista de baile',
    description: 'La energía del evento, con luces y amplitud para que la pista se vea imponente.',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1400&q=80',
    span: 'lg:col-span-7',
  },
  {
    title: 'Mesa principal',
    description: 'Una composición refinada para bodas y XV que centra todas las miradas.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
    span: 'lg:col-span-5',
  },
  {
    title: 'Zona de recepción',
    description: 'El primer contacto con el salón: limpio, claro y con una presencia muy cuidada.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f29c2eab2a?auto=format&fit=crop&w=1400&q=80',
    span: 'lg:col-span-4',
  },
  {
    title: 'Vista general',
    description: 'La infraestructura completa para dimensionar el espacio y la circulación.',
    image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1400&q=80',
    span: 'lg:col-span-8',
  },
];

const benefitPanels = [
  {
    title: 'Climatización total',
    description: 'Confort parejo durante todo el evento para que todos disfruten de verdad.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Ubicación estratégica',
    description: 'Llegada cómoda en Fernando de la Mora, con accesos simples para tus invitados.',
    image: 'https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Iluminación de impacto',
    description: 'Un ambiente cálido que viste el salón y hace que la pista se destaque.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Atención personalizada',
    description: 'Acompañamiento claro para resolver cada detalle con tranquilidad.',
    image: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c2f?auto=format&fit=crop&w=1400&q=80',
  },
];

const differentiators = [
  {
    title: 'Confort durante todo el evento',
    description: 'Un ambiente pensado para que todos se sientan bien de principio a fin.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Pista protagonista',
    description: 'La energía del evento se concentra en una pista que se ve imponente.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Mesa y ambientación',
    description: 'Montajes elegantes que levantan la presentación de cualquier celebración.',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Ingreso con presencia',
    description: 'La primera impresión del salón marca el tono de toda la noche.',
    image: 'https://images.unsplash.com/photo-1464219222984-216ebffaaf85?auto=format&fit=crop&w=1400&q=80',
  },
];

const testimonialCards = [
  {
    name: 'Carolina M.',
    event: 'Boda',
    date: '12 abril 2026',
    quote: 'La ambientación quedó hermosa y la noche se sintió elegante de principio a fin.',
  },
  {
    name: 'Mónica R.',
    event: 'XV años',
    date: '21 febrero 2026',
    quote: 'La pista y las luces hicieron que todo se vea impresionante en fotos y video.',
  },
  {
    name: 'Roberto y Vane',
    event: 'Boda',
    date: '7 febrero 2026',
    quote: 'Nos acompañaron con mucha atención y el evento salió más lindo de lo que imaginamos.',
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
    icon: MapPin,
    description: 'Abrir en Google Maps.',
  },
];

const proofItems = [
  { value: '4.7', label: 'Calificación en Google', icon: Star },
  { value: '161+', label: 'Reseñas Verificadas', icon: Award },
  { value: 'Desde 2021', label: 'Creando Momentos', icon: Shield },
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
    <div className="min-h-screen text-slate-900 selection:bg-brand-accent/25 selection:text-slate-900">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(34,227,105,0.12),_transparent_24%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.85),transparent_30%),linear-gradient(to_bottom,_#fbf7f1,_#f6efe5_42%,_#f0e6d8_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-96 bg-[linear-gradient(180deg,rgba(34,227,105,0.08),transparent)] blur-3xl" />
        <div className="absolute inset-x-0 top-20 -z-10 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

        <header className="border-b border-white/70 bg-white/65 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-12">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex h-12 w-12 overflow-hidden rounded-full border border-brand-accent/25 bg-brand-card shadow-[0_0_35px_rgba(34,227,105,0.14)]">
                <img src={logo} alt="Palmares - Salón de Eventos" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Salón de Eventos</p>
                <h1 className="text-sm font-semibold tracking-[0.35em] text-slate-950 sm:text-base">PALMARES</h1>
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
                className="inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-dark shadow-[0_12px_35px_rgba(34,227,105,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(34,227,105,0.28)]"
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
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:px-10 xl:px-12">
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
          <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-10 lg:pb-20 xl:px-12">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
              <Reveal className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-slate-950 text-white shadow-[0_30px_90px_rgba(15,23,42,0.18)] lg:min-h-[720px]">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.28),rgba(10,10,12,0.76))]" />
                <div className="relative flex min-h-[620px] flex-col justify-end p-6 sm:p-10 lg:p-12">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur">
                    <Star className="h-4 w-4 text-brand-gold" />
                    Desde 2021 creando celebraciones inolvidables
                  </div>
                  <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                    Tu evento soñado, con la elegancia que merece
                  </h2>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                    Palmares combina imagen, comodidad y una atención cercana para bodas, XV, colaciones y eventos corporativos que quieren verse memorables desde la primera foto.
                  </p>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <a
                      href="#presupuesto"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-6 py-4 text-sm font-semibold text-brand-dark shadow-[0_18px_45px_rgba(34,227,105,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(212,175,55,0.35)]"
                    >
                      Cotizar por WhatsApp
                      <MessageSquare className="h-4 w-4" />
                    </a>
                    <a
                      href="#espacios"
                      className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                    >
                      Ver espacios
                    </a>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/65">Calificación</p>
                      <p className="mt-1 text-lg font-semibold text-white">4.7 en Google</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/65">Reseñas</p>
                      <p className="mt-1 text-lg font-semibold text-white">161+ opiniones</p>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/65">Ubicación</p>
                      <p className="mt-1 text-lg font-semibold text-white">Fernando de la Mora</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-6">
                <Reveal className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div className="grid grid-cols-2 gap-3 p-4 sm:p-5">
                    <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1519167758481-83f29c2eab2a?auto=format&fit=crop&w=900&q=80" alt="Mesa principal" className="h-full w-full object-cover" />
                    </div>
                    <div className="overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80" alt="Pista de baile" className="h-full w-full object-cover" />
                    </div>
                    <div className="col-span-2 overflow-hidden rounded-[1.5rem] bg-slate-100">
                      <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80" alt="Recepción elegante" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </Reveal>

                <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Palmares</p>
                  <h3 className="mt-3 text-2xl font-semibold text-slate-950">Un salón pensado para eventos que quieren verse de verdad</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">
                    Ambientes cuidados, una pista protagonista y un equipo que acompaña el evento para que todo se vea bien y fluya con tranquilidad.
                  </p>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="espacios" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Espacios e infraestructura</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Una mirada clara al salón, la pista y la recepción</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Mostrá el lugar como se vive en un evento real: con amplitud, luz, circulación cómoda y una puesta visual que hace subir el deseo de reservar.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-12 xl:gap-5">
              {galleryCards.map((card) => (
                <Reveal key={card.title} className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)] ${card.span}`}>
                  <div className="relative h-full min-h-[240px] overflow-hidden sm:min-h-[280px]">
                    <img src={card.image} alt={card.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.7))] transition duration-300 group-hover:bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.45))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Ver detalles del montaje</p>
                      <h4 className="mt-2 text-2xl font-semibold">{card.title}</h4>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-white/85">{card.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Celebraciones</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">El lugar se adapta a cada tipo de festejo</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Casamientos, colaciones, XV y corporativos con ambientaciones que se sienten pensadas para cada momento.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {eventShowcase.map((item) => (
                <Reveal key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-accent/20">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.78))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/85">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Galería viva</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Momentos reales que muestran el salón en acción</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Una selección de escenas reales para que la experiencia se vea antes de reservar.
                </p>
              </div>
              <a href={facebookUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900">
                <FaInstagram className="h-4 w-4" />
                Ver redes
              </a>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-3 xl:gap-5">
              {(instagramStatus === 'ready' ? instagramPosts : galleryCards.slice(0, 3)).map((post, index) => {
                const title = instagramStatus === 'ready' ? `Publicación ${index + 1}` : post.title;
                const description = instagramStatus === 'ready'
                  ? (post.caption ? post.caption.slice(0, 120) : 'Momento reciente del salón.')
                  : post.description;
                const imageUrl = instagramStatus === 'ready'
                  ? (post.mediaType === 'VIDEO' ? post.thumbnailUrl || post.mediaUrl : post.mediaUrl)
                  : post.image;
                const href = instagramStatus === 'ready' ? post.permalink : facebookUrl;

                return (
                  <Reveal key={instagramStatus === 'ready' ? post.id : post.title} className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
                    <a href={href} target="_blank" rel="noreferrer" className="block">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        {imageUrl ? (
                          <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-brand-accent/35 via-white to-slate-100" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
                        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-700 backdrop-blur">
                          {instagramStatus === 'ready' ? 'Nuevo' : 'Galería'}
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
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Por qué elegir Palmares</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Beneficios que se ven y se sienten en el evento</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Cada detalle suma a la experiencia: confort, acceso, iluminación y atención para que todo acompañe la celebración.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {benefitPanels.map((item) => (
                <Reveal key={item.title} className="group overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-brand-accent/20">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110" />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1),rgba(15,23,42,0.82))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.title}</p>
                      <p className="mt-2 text-sm leading-6 text-white/85">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Opiniones destacadas</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Lo que más recuerdan quienes ya celebraron acá</h3>
            </Reveal>

            <div className="mt-10 grid gap-4 lg:grid-cols-3 xl:gap-5">
              {testimonialCards.map((item) => (
                <Reveal key={item.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-accent to-brand-gold text-sm font-bold text-brand-dark">
                      {item.name
                        .split(' ')
                        .map((part) => part[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950">{item.name}</p>
                      <p className="text-sm text-slate-500">{item.event} · {item.date}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-brand-gold">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-600">“{item.quote}”</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="border-y border-white/60 bg-white/50">
            <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-10 xl:px-12">
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

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Redes y ubicación</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Encontrá el salón y contactá al equipo en un solo lugar</h3>
            </Reveal>

            <div className="mt-10 grid gap-6 lg:grid-cols-[0.88fr_1.12fr] xl:gap-8">
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
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent text-brand-dark shadow-[0_10px_30px_rgba(34,227,105,0.18)]">
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

          <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-10 lg:pb-24 xl:px-12">
            <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Contacto rápido</p>
                  <h3 className="mt-3 text-3xl font-semibold text-slate-950">Escribinos y vemos tu fecha disponible</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
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
                    <MapPin className="h-4 w-4" /> Ubicación
                  </a>
                </div>
              </div>
            </Reveal>
          </section>

          <section id="diferenciales" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-12">
            <Reveal className="max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Por qué elegir Palmares</p>
              <h3 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">Detalles que hacen que el evento se vea mejor</h3>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Cada espacio del salón suma para que la celebración tenga presencia, comodidad y una puesta visual que invite a reservar.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {differentiators.map((item) => {
                return (
                  <article
                    key={item.title}
                    className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1 hover:border-brand-accent/20 hover:shadow-[0_24px_70px_rgba(34,227,105,0.08)]"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08),rgba(15,23,42,0.8))]" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/70">{item.title}</p>
                        <p className="mt-2 text-sm leading-6 text-white/85">{item.description}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section id="presupuesto" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-10 lg:pb-24 xl:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start xl:gap-10">
              <Reveal className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.06)] sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-brand-accent/90">Presupuesto automatizado</p>
                <h3 className="mt-3 text-3xl font-semibold text-slate-950">Solicitá tu cotización en menos de un minuto</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  Dejanos tus datos y te respondemos por WhatsApp con una propuesta clara, rápida y pensada para tu tipo de evento.
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
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-accent px-5 py-4 text-sm font-semibold text-brand-dark shadow-[0_18px_45px_rgba(34,227,105,0.25)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(34,227,105,0.32)]"
                >
                  Enviar a WhatsApp
                  <MessageSquare className="h-4 w-4" />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                  Al enviar, te contactamos por WhatsApp con la información de tu evento ya lista para continuar.
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
