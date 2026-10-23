export const linkWhatsApp = ({ phone, whatsappMessage }) =>
  `https://wa.me/${phone}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ''}`;

export const anosDesde = (ano, hoje = new Date()) => hoje.getFullYear() - ano;
