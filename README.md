# Palmares - Salón de Eventos

Landing page comercial para **Palmares Salón de Eventos**, ubicado en Fernando de la Mora, Paraguay.

**Deploy:** [palmares-eventos.ricardocanoc06.workers.dev](https://palmares-eventos.ricardocanoc06.workers.dev/)

## Descripción

Sitio web de una página (SPA) diseñado para promocionar un salón de eventos y facilitar la cotización de reservas a través de WhatsApp.

### Secciones

- **Hero** — Presentación del salón con llamado a la acción y estadísticas (4.7★ Google, 161+ reseñas, 200+ eventos)
- **Diferenciales** — Generador propio, capacidad hasta 120 invitados, complejo interior/exterior, ubicación estratégica
- **Testimonios** — 3 reseñas verificadas de Google con links directos
- **Galería** — Carrusel interactivo con navegación por flechas y teclado (4 fotos del salón)
- **Instagram** — Feed de 6 posts con links a la cuenta @palmarespyeventos
- **Ubicación** — Mapa de Google Maps embebido + formulario de cotización que genera un mensaje pre-cargado para WhatsApp

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 18 |
| Bundler | Vite |
| CSS | Tailwind CSS |
| Iconos | lucide-react, react-icons |
| Deploy | Cloudflare Workers |

## Inicio

```bash
npm install
npm run dev
```

## Build y deploy

```bash
npm run build
npx wrangler deploy
```
