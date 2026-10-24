// `mensagem` is the pre-filled WhatsApp text in the visitor's language (falls back to the one in the data)
export const linkWhatsApp = ({ phone, whatsappMessage }, mensagem = whatsappMessage) =>
  `https://wa.me/${phone}${mensagem ? `?text=${encodeURIComponent(mensagem)}` : ''}`;

export const anosDesde = (ano, hoje = new Date()) => hoje.getFullYear() - ano;
