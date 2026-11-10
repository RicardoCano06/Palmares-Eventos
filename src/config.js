const rawWhatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER ?? '';

export const WHATSAPP_NUMBER = rawWhatsAppNumber.replace(/\D/g, '');
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export function buildWhatsAppUrl(message) {
  return message ? `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}` : WHATSAPP_BASE_URL;
}

if (import.meta.env.DEV && !WHATSAPP_NUMBER) {
  console.warn(
    '[Palmares] Falta VITE_WHATSAPP_NUMBER. Agregalo en .env para habilitar los enlaces de WhatsApp.',
  );
}
