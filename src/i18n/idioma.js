import { createContext, useContext } from 'react';
import { IDIOMAS, TEXTOS } from './textos';

// Language: the saved choice, otherwise the browser's language (Portuguese → pt-BR, anything else → en-US).
// index.html applies it to <html lang> before the first paint.
export const CHAVE_IDIOMA = 'idioma';

export function idiomaInicial() {
  try {
    const salvo = localStorage.getItem(CHAVE_IDIOMA);
    if (IDIOMAS.includes(salvo)) return salvo;
  } catch {
    // storage blocked: fall back to the browser language
  }
  const doNavegador = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return doNavegador.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
}

export function salvarIdioma(idioma) {
  try {
    localStorage.setItem(CHAVE_IDIOMA, idioma);
  } catch {
    // storage blocked: the choice lasts until the page is closed
  }
}

// Portfolio items keep Portuguese at the top level (the C137 server reads it) and English in `en`
export const traduzirItem = (item, idioma) => (idioma === 'en-US' && item?.en ? { ...item, ...item.en } : item);

// Without a provider (tests, isolated components) the site falls back to Portuguese
export const IdiomaContexto = createContext({
  idioma: 'pt-BR',
  t: TEXTOS['pt-BR'],
  trocarIdioma: () => {},
  local: (item) => item,
});

export const useIdioma = () => useContext(IdiomaContexto);
