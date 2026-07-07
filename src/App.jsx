import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Menu, X } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import logo from '/Imagen1.png';

const whatsappNumber = '595986111287';

const eventTypes = ['Boda', 'Quinceaños', 'Colación', 'Cumpleaños', 'Evento de Día con Piscina', 'Otro'];

const socialProof = [
  { value: '4.7 ★', label: 'Calificación en Google Maps' },
  { value: '161+', label: 'Reseñas Verificadas de Clientes' },
  { value: 'Desde 2021', label: 'Creando Momentos Inolvidables' },
];

const differentiators = [
  {
    badge: 'Exclusivo',
    title: 'Energía Asegurada (Generador Propio)',
    description:
      'Los cortes de la ANDE no detienen la fiesta: el generador propio respalda iluminación, sonido y climatización al 100% para que el evento siga sin sobresaltos.',
    backdrop:
      'radial-gradient(circle at 18% 18%, rgba(212,175,55,0.34), transparent 30%), radial-gradient(circle at 80% 22%, rgba(52,235,97,0.16), transparent 24%), linear-gradient(145deg, #1b1d28 0%, #0d0e13 55%, #060608 100%)',
  },
  {
    badge: 'Hasta 120',
    title: 'Capacidad Ideal',
    description:
      'Espacio climatizado y bien distribuido para hasta 120 invitados, perfecto para bodas íntimas, XV años, cumpleaños, colaciones y encuentros corporativos.',
    backdrop:
      'radial-gradient(circle at 20% 20%, rgba(212,175,55,0.18), transparent 28%), radial-gradient(circle at 84% 16%, rgba(255,255,255,0.08), transparent 22%), linear-gradient(145deg, #161822 0%, #10111a 54%, #08090d 100%)',
  },
  {
    badge: 'Mixto',
    title: 'Complejo Mixto (Exterior e Interior)',
    description:
      'La combinación del salón cerrado con quincho, parrilla y piscina iluminada permite recepciones dinámicas, asados premium y celebraciones de tarde o noche.',
    backdrop:
      'radial-gradient(circle at 18% 22%, rgba(52,235,97,0.16), transparent 28%), radial-gradient(circle at 82% 20%, rgba(212,175,55,0.2), transparent 26%), linear-gradient(145deg, #12201d 0%, #0f1517 52%, #090b0c 100%)',
  },
  {
    badge: 'Zona Sur',
    title: 'Excelente Ubicación',
    description:
      'Acceso rápido y directo en Fernando de la Mora, ideal para invitados que llegan desde Asunción, San Lorenzo o Luque sin desvíos complicados.',
    backdrop:
      'radial-gradient(circle at 24% 22%, rgba(212,175,55,0.22), transparent 28%), radial-gradient(circle at 78% 18%, rgba(52,235,97,0.12), transparent 24%), linear-gradient(145deg, #17171d 0%, #0e1014 56%, #070709 100%)',
  },
];

const galleryCards = [
  {
    title: 'Montaje de Mesas',
    subtitle: 'Elegancia limpia para bodas, colaciones y celebraciones íntimas.',
    span: 'md:col-span-7 md:row-span-2 min-h-[26rem]',
    backdrop:
      'radial-gradient(circle at 22% 20%, rgba(212,175,55,0.34), transparent 22%), radial-gradient(circle at 76% 14%, rgba(255,255,255,0.1), transparent 18%), linear-gradient(145deg, #1d1d27 0%, #101118 55%, #09090c 100%)',
  },
  {
    title: 'Área de Piscina Nocturna',
    subtitle: 'Un rincón que suma fotos, ambiente y distinción después del atardecer.',
    span: 'md:col-span-5 min-h-[13rem]',
    backdrop:
      'radial-gradient(circle at 20% 24%, rgba(52,235,97,0.24), transparent 28%), radial-gradient(circle at 82% 16%, rgba(212,175,55,0.18), transparent 20%), linear-gradient(145deg, #0f1a1f 0%, #0a1116 55%, #06090b 100%)',
  },
  {
    title: 'El Quincho y la Parrilla',
    subtitle: 'Ideal para asados premium, previas y recepciones con mucha presencia.',
    span: 'md:col-span-5 min-h-[13rem]',
    backdrop:
      'radial-gradient(circle at 18% 18%, rgba(212,175,55,0.22), transparent 26%), radial-gradient(circle at 78% 22%, rgba(255,255,255,0.06), transparent 20%), linear-gradient(145deg, #211a14 0%, #11100f 54%, #080807 100%)',
  },
  {
    title: 'Pista de Baile Climatizada',
    subtitle: 'Espacio cómodo para que la noche se mueva sin perder elegancia.',
    span: 'md:col-span-7 min-h-[16rem]',
    backdrop:
      'radial-gradient(circle at 24% 20%, rgba(52,235,97,0.18), transparent 24%), radial-gradient(circle at 80% 22%, rgba(212,175,55,0.18), transparent 24%), linear-gradient(145deg, #14151d 0%, #0c0d12 58%, #060609 100%)',
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

function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      <p className="text-sm uppercase tracking-[0.32em] text-brand-gold/90">{eyebrow}</p>
      <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-white/72">{description}</p>
    </div>
  );
}

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    eventType: 'Boda',
    guests: '',
    date: '',
    institution: '',
  });
  const [formError, setFormError] = useState('');

  const isColacion = form.eventType === 'Colación';

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
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-[#d4af37]/25 selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap');

        :root {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #0a0a0c;
          color: #f6f1e8;
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, .font-display {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.03em;
        }
      `}</style>

      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.16),_transparent_24%),radial-gradient(circle_at_80%_0%,rgba(52,235,97,0.12),_transparent_20%),linear-gradient(to_bottom,_#0a0a0c,_#0c0d12_36%,_#0a0a0c_100%)]" />
        <div className="absolute inset-x-0 top-0 -z-10 h-80 bg-[radial-gradient(circle,_rgba(212,175,55,0.08),_transparent_60%)] blur-3xl" />

        <header className="border-b border-white/8 bg-black/25 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10 xl:px-12">
            <a href="#inicio" className="flex items-center gap-3">
              <div className="flex h-12 w-12 overflow-hidden rounded-full border border-white/10 bg-[#12131a] shadow-[0_0_30px_rgba(212,175,55,0.12)]">
                <img src={logo} alt="Palmares - Salón de Eventos" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-[0.62rem] uppercase tracking-[0.45em] text-white/48">Salón de Eventos</p>
                <h1 className="mt-1 text-sm font-semibold tracking-[0.35em] text-white sm:text-base">PALMARES</h1>
              </div>
            </a>

            <nav className="hidden items-center gap-8 md:flex">
              <a href="#diferenciales" className="text-sm text-white/70 transition hover:text-white">
                Diferenciales
              </a>
              <a href="#galeria" className="text-sm text-white/70 transition hover:text-white">
                Galería
              </a>
              <a href="#presupuesto" className="text-sm text-white/70 transition hover:text-white">
                Presupuesto
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/25 bg-[#d4af37] px-5 py-3 text-sm font-semibold text-[#0a0a0c] shadow-[0_12px_35px_rgba(212,175,55,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_45px_rgba(212,175,55,0.28)]"
              >
                Cotizar Ahora
                <FaWhatsapp className="h-4 w-4" />
              </a>
            </nav>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white transition hover:border-[#d4af37]/30 hover:bg-white/8 md:hidden"
              onClick={() => setMobileMenuOpen((current) => !current)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {mobileMenuOpen ? (
            <div className="border-t border-white/8 bg-[#0a0a0c]/96 px-4 py-4 backdrop-blur-xl md:hidden">
              <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 sm:px-6 lg:px-10 xl:px-12">
                <a
                  href="#diferenciales"
                  className="rounded-2xl border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white transition hover:border-[#d4af37]/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Diferenciales
                </a>
                <a
                  href="#galeria"
                  className="rounded-2xl border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white transition hover:border-[#d4af37]/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Galería
                </a>
                <a
                  href="#presupuesto"
                  className="rounded-2xl border border-white/10 bg-[#12131a] px-4 py-3 text-sm text-white transition hover:border-[#d4af37]/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Presupuesto
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d4af37] px-4 py-3 text-sm font-semibold text-[#0a0a0c] transition hover:opacity-95"
                >
                  Cotizar Ahora
                  <FaWhatsapp className="h-4 w-4" />
                </a>
              </div>
            </div>
          ) : null}
        </header>

        <main id="inicio">
          <section className="mx-auto max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-10 lg:pb-20 xl:px-12">
            <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8">
              <Reveal className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[#12131a] shadow-[0_30px_110px_rgba(0,0,0,0.45)] lg:min-h-[760px]">
                <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,12,0.18),rgba(10,10,12,0.78))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(212,175,55,0.18),transparent_24%),radial-gradient(circle_at_82%_14%,rgba(52,235,97,0.11),transparent_22%)]" />
                </div>

                <div className="relative flex min-h-[650px] flex-col justify-between p-6 sm:p-10 lg:p-12">
                  <div className="flex items-center justify-between gap-4">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/82 backdrop-blur">
                      <span className="h-2 w-2 rounded-full bg-[#d4af37]" />
                      Salón climatizado para 120 personas
                    </div>
                    <div className="hidden rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/55 backdrop-blur lg:block">
                      Fernando de la Mora, Paraguay
                    </div>
                  </div>

                  <div className="grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
                    <div>
                      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[0.95] text-white sm:text-5xl lg:text-6xl xl:text-7xl">
                        El Espacio Perfecto y Seguro para tu Próximo Evento
                      </h2>
                      <p className="mt-5 max-w-2xl text-base leading-7 text-white/76 sm:text-lg">
                        Salón climatizado para 120 personas, quincho con parrilla y piscina en Fernando de la Mora. Diversión garantizada con respaldo de generador propio.
                      </p>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                          href="#presupuesto"
                          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4af37] px-6 py-4 text-sm font-semibold text-[#0a0a0c] shadow-[0_18px_45px_rgba(212,175,55,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_16px_rgba(212,175,55,0.34)]"
                        >
                          Cotizar por WhatsApp
                          <FaWhatsapp className="h-4 w-4" />
                        </a>
                        <a
                          href="#galeria"
                          className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/6 px-6 py-4 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10"
                        >
                          Ver galería
                        </a>
                      </div>
                    </div>

                    <div className="grid gap-4 rounded-[1.9rem] border border-white/10 bg-black/24 p-4 backdrop-blur-xl">
                      <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#13141b]">
                        <div className="aspect-[5/4] bg-[radial-gradient(circle_at_20%_18%,rgba(212,175,55,0.26),transparent_24%),radial-gradient(circle_at_78%_18%,rgba(52,235,97,0.16),transparent_18%),linear-gradient(145deg,#1f212b_0%,#12131a_58%,#09090c_100%)] p-4">
                          <div className="flex h-full flex-col justify-between rounded-[1.25rem] border border-white/8 bg-black/18 p-4">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-white/52">
                              <span>Interior elegante</span>
                              <span>Climatizado</span>
                            </div>
                            <div>
                              <p className="text-sm text-white/72">Mesa principal, pista y montaje nocturno con presencia premium.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#11161a]">
                          <div className="aspect-[4/3] bg-[radial-gradient(circle_at_18%_18%,rgba(52,235,97,0.22),transparent_24%),linear-gradient(145deg,#111d21_0%,#0a1215_58%,#060708_100%)] p-4">
                            <div className="flex h-full items-end rounded-[1.2rem] border border-white/8 bg-black/16 p-3">
                              <p className="text-sm text-white/76">Piscina iluminada y ambiente exterior.</p>
                            </div>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1a1510]">
                          <div className="aspect-[4/3] bg-[radial-gradient(circle_at_82%_16%,rgba(212,175,55,0.28),transparent_20%),linear-gradient(145deg,#241b13_0%,#15110f_56%,#080807_100%)] p-4">
                            <div className="flex h-full items-end rounded-[1.2rem] border border-white/8 bg-black/14 p-3">
                              <p className="text-sm text-white/76">Quincho con parrilla para recepciones y asados premium.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/48">Calificación</p>
                      <p className="mt-1 text-lg font-semibold text-white">4.7 ★ en Google Maps</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/48">Reseñas</p>
                      <p className="mt-1 text-lg font-semibold text-white">161+ verificadas</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 px-4 py-4 backdrop-blur">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/48">Respaldo</p>
                      <p className="mt-1 text-lg font-semibold text-white">Generador propio</p>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-6">
                <Reveal className="rounded-[2rem] border border-white/8 bg-[#12131a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]/90">Prueba social real</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                    {socialProof.map((item) => (
                      <div key={item.label} className="rounded-[1.4rem] border border-white/8 bg-black/18 p-5">
                        <p className="font-display text-3xl font-semibold text-white">{item.value}</p>
                        <p className="mt-2 text-sm leading-6 text-white/68">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal className="grid gap-4 rounded-[2rem] border border-white/8 bg-[#12131a] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.35)] sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]/90">Ubicación y respaldo</p>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-white">Pensado para vender tranquilidad antes de la reserva</h3>
                    </div>
                  </div>
                  <div className="grid gap-3 text-sm leading-6 text-white/72">
                    {[
                      'Fernando de la Mora, Zona Sur, con acceso rápido desde Asunción, San Lorenzo y Luque.',
                      'Salón climatizado para hasta 120 invitados, ideal para eventos íntimos y medianos.',
                      'Quincho, parrilla y piscina iluminada para sumar valor en recepciones de tarde o noche.',
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3 rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-4">
                        <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#d4af37]" />
                        <p>{text}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          <section id="diferenciales" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="Diferenciales reales"
                title="Cuatro razones que hacen que Palmares se venda con claridad"
                description="Sin íconos genéricos ni copy técnico. Solo argumentos de negocio que responden a lo que más pesa al elegir un salón: seguridad, capacidad, versatilidad y ubicación."
              />
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
              {differentiators.map((item) => (
                <Reveal key={item.title} className="group overflow-hidden rounded-[1.8rem] border border-white/8 bg-[#12131a] shadow-[0_20px_60px_rgba(0,0,0,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/25">
                  <div className="relative min-h-[18rem] overflow-hidden p-5" style={{ backgroundImage: item.backdrop }}>
                    <div className="absolute inset-0 bg-black/28 transition duration-300 group-hover:bg-black/18" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <span className="inline-flex w-fit rounded-full border border-[#d4af37]/22 bg-[#d4af37]/12 px-3 py-1 text-[0.65rem] uppercase tracking-[0.36em] text-[#f3d67c]">
                          {item.badge}
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.68rem] uppercase tracking-[0.28em] text-white/46">
                          Palmares
                        </span>
                      </div>

                      <div className="mt-10 rounded-[1.35rem] border border-white/8 bg-black/18 p-4 backdrop-blur-sm">
                        <h4 className="font-display text-2xl font-semibold text-white">{item.title}</h4>
                        <p className="mt-3 text-sm leading-6 text-white/72">{item.description}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="galeria" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10 xl:px-12">
            <Reveal>
              <SectionHeading
                eyebrow="Galería"
                title="Bento grid para mostrar el salón con ritmo visual"
                description="Cada bloque funciona como una escena de venta: montaje, piscina nocturna, quincho y pista climatizada, con overlays sutiles y foco en el texto."
              />
            </Reveal>

            <div className="mt-10 grid grid-flow-dense gap-4 md:grid-cols-12 xl:gap-5">
              {galleryCards.map((card) => (
                <Reveal key={card.title} className={`group relative overflow-hidden rounded-[1.9rem] border border-white/8 bg-[#12131a] shadow-[0_24px_80px_rgba(0,0,0,0.34)] ${card.span}`}>
                  <div className="relative h-full min-h-[16rem] overflow-hidden p-5 sm:p-6" style={{ backgroundImage: card.backdrop }}>
                    <div className="absolute inset-0 bg-black/30 transition duration-300 group-hover:bg-black/20" />
                    <div className="absolute inset-5 rounded-[1.35rem] border border-white/8" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.06),transparent_18%),radial-gradient(circle_at_74%_78%,rgba(212,175,55,0.18),transparent_18%)]" />
                    <div className="relative flex h-full min-h-[14rem] flex-col justify-end">
                      <span className="mb-3 inline-flex w-fit rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[0.67rem] uppercase tracking-[0.36em] text-white/56">
                        Vista destacada
                      </span>
                      <h4 className="font-display text-3xl font-semibold text-white">{card.title}</h4>
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/74">{card.subtitle}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          <section id="presupuesto" className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-10 lg:pb-24 xl:px-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] xl:gap-10">
              <Reveal className="rounded-[2rem] border border-white/8 bg-[#12131a] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-8">
                <p className="text-sm uppercase tracking-[0.3em] text-[#d4af37]/90">Presupuesto interactivo</p>
                <h3 className="mt-3 font-display text-3xl font-semibold text-white">Cotizá rápido y con la información justa para avanzar</h3>
                <p className="mt-4 text-base leading-7 text-white/72">
                  Dejá tus datos y te abrimos WhatsApp con el mensaje listo. Si es colación, se pide el colegio o institución para responder con más precisión.
                </p>

                <div className="mt-8 grid gap-4">
                  {[
                    'Respuesta directa al número que uses para coordinar.',
                    'Validación simple para evitar datos incompletos.',
                    'La consulta sale con el formato correcto y sin pasos intermedios.',
                  ].map((text) => (
                    <div key={text} className="flex items-start gap-3 rounded-[1.2rem] border border-white/8 bg-black/18 px-4 py-4">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d4af37]" />
                      <p className="text-sm leading-6 text-white/72">{text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal as="form" onSubmit={handleSubmit} className="rounded-[2rem] border border-white/8 bg-[#12131a] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.38)] sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-white/88">
                      Nombre y apellido
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Ej: María González"
                      className="w-full rounded-2xl border border-white/10 bg-[#0d0e13] px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d4af37]/40 focus:ring-2 focus:ring-[#d4af37]/14"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="eventType" className="mb-2 block text-sm font-medium text-white/88">
                      Tipo de evento
                    </label>
                    <select
                      id="eventType"
                      value={form.eventType}
                      onChange={handleChange('eventType')}
                      className="w-full rounded-2xl border border-white/10 bg-[#0d0e13] px-4 py-4 text-white outline-none transition focus:border-[#d4af37]/40 focus:ring-2 focus:ring-[#d4af37]/14"
                    >
                      {eventTypes.map((eventType) => (
                        <option key={eventType} value={eventType}>
                          {eventType}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="guests" className="mb-2 block text-sm font-medium text-white/88">
                      Cantidad de invitados
                    </label>
                    <input
                      id="guests"
                      type="number"
                      min="1"
                      max="120"
                      step="1"
                      value={form.guests}
                      onChange={handleChange('guests')}
                      placeholder="Hasta 120"
                      className="w-full rounded-2xl border border-white/10 bg-[#0d0e13] px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d4af37]/40 focus:ring-2 focus:ring-[#d4af37]/14"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="date" className="mb-2 block text-sm font-medium text-white/88">
                      Fecha
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange('date')}
                      className="w-full rounded-2xl border border-white/10 bg-[#0d0e13] px-4 py-4 text-white outline-none transition focus:border-[#d4af37]/40 focus:ring-2 focus:ring-[#d4af37]/14"
                      required
                    />
                  </div>

                  {isColacion ? (
                    <div className="sm:col-span-2">
                      <label htmlFor="institution" className="mb-2 block text-sm font-medium text-white/88">
                        Nombre de la Institución o Colegio
                      </label>
                      <input
                        id="institution"
                        type="text"
                        value={form.institution}
                        onChange={handleChange('institution')}
                        placeholder="Ej: Colegio San Ignacio"
                        className="w-full rounded-2xl border border-white/10 bg-[#0d0e13] px-4 py-4 text-white outline-none transition placeholder:text-white/28 focus:border-[#d4af37]/40 focus:ring-2 focus:ring-[#d4af37]/14"
                        required
                      />
                    </div>
                  ) : null}

                  {formError ? (
                    <div className="sm:col-span-2 rounded-2xl border border-red-500/20 bg-red-500/8 px-4 py-4 text-sm leading-6 text-red-200">
                      {formError}
                    </div>
                  ) : null}

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d4af37] px-6 py-4 text-sm font-semibold text-[#0a0a0c] shadow-[0_18px_45px_rgba(212,175,55,0.18)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_55px_rgba(212,175,55,0.28)]"
                    >
                      Cotizar por WhatsApp
                      <FaWhatsapp className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
