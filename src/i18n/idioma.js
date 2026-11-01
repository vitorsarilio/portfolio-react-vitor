import { createContext, useContext } from 'react';
import { IDIOMAS, TEXTOS } from './textos';

/*
  O idioma vem do endereço: "/" e "/privacidade" em português, "/en" e "/en/privacy" em inglês.
  Assim o Google indexa as duas versões separadas (com hreflang) e cada link compartilhado
  abre no idioma em que foi compartilhado. O botão PT/EN leva à página equivalente no outro
  idioma e salva a escolha, para a próxima visita já cair na versão escolhida.
*/
export const CHAVE_IDIOMA = 'idioma';

// Endereço de cada página em cada idioma
export const PAGINAS = {
  inicio: { 'pt-BR': '/', 'en-US': '/en' },
  privacidade: { 'pt-BR': '/privacidade', 'en-US': '/en/privacy' },
};

const semBarraFinal = (caminho) => (caminho.length > 1 && caminho.endsWith('/') ? caminho.slice(0, -1) : caminho);

export const idiomaDoCaminho = (caminho) => {
  const c = semBarraFinal(caminho);
  return c === '/en' || c.startsWith('/en/') ? 'en-US' : 'pt-BR';
};

// Qual página conhecida é este endereço (undefined para endereços que não existem)
export const paginaDoCaminho = (caminho) => {
  const c = semBarraFinal(caminho);
  return Object.keys(PAGINAS).find((pagina) => Object.values(PAGINAS[pagina]).includes(c));
};

export function lerIdiomaSalvo() {
  try {
    const salvo = localStorage.getItem(CHAVE_IDIOMA);
    return IDIOMAS.includes(salvo) ? salvo : null;
  } catch {
    return null;
  }
}

export function salvarIdioma(idioma) {
  try {
    localStorage.setItem(CHAVE_IDIOMA, idioma);
  } catch {
    // storage blocked: the choice lasts until the page is closed
  }
}

// Idioma do navegador reduzido aos dois do site
export const idiomaDoNavegador = () => {
  const lingua = typeof navigator !== 'undefined' ? navigator.language || '' : '';
  return lingua.toLowerCase().startsWith('pt') ? 'pt-BR' : 'en-US';
};

// Portfolio items keep Portuguese at the top level (the C137 server reads it) and English in `en`
export const traduzirItem = (item, idioma) => (idioma === 'en-US' && item?.en ? { ...item, ...item.en } : item);

// Without a provider (tests, isolated components) the site falls back to Portuguese
export const IdiomaContexto = createContext({
  idioma: 'pt-BR',
  t: TEXTOS['pt-BR'],
  trocarIdioma: () => {},
  local: (item) => item,
  caminho: (pagina) => PAGINAS[pagina]['pt-BR'],
});

export const useIdioma = () => useContext(IdiomaContexto);
