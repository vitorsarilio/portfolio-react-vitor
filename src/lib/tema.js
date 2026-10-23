import { useCallback, useEffect, useState } from 'react';

// Theme: follows the system (and changes with it) until the visitor picks one in the menu.
// The button cycles sistema → claro → escuro → sistema. index.html applies it before the first paint.
export const CHAVE_TEMA = 'tema';
export const PREFERENCIAS = ['sistema', 'claro', 'escuro'];
const COR_DA_BARRA = { claro: '#F7F7F6', escuro: '#0A0B0B' };

const consultaClaro = () => window.matchMedia?.('(prefers-color-scheme: light)');

export const temaDoSistema = () => (consultaClaro()?.matches ? 'claro' : 'escuro');

export function lerPreferencia() {
  try {
    const salvo = localStorage.getItem(CHAVE_TEMA);
    return salvo === 'claro' || salvo === 'escuro' ? salvo : 'sistema';
  } catch {
    return 'sistema';
  }
}

function salvarPreferencia(preferencia) {
  try {
    if (preferencia === 'sistema') localStorage.removeItem(CHAVE_TEMA);
    else localStorage.setItem(CHAVE_TEMA, preferencia);
  } catch {
    // storage blocked: the choice lasts until the page is closed
  }
}

export function aplicarTema(tema) {
  document.documentElement.dataset.tema = tema;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', COR_DA_BARRA[tema]);
}

export function useTema() {
  const [preferencia, setPreferencia] = useState(lerPreferencia);
  const [tema, setTema] = useState(() => (preferencia === 'sistema' ? temaDoSistema() : preferencia));

  useEffect(() => {
    if (preferencia !== 'sistema') {
      setTema(preferencia);
      return undefined;
    }
    const consulta = consultaClaro();
    const acompanhar = () => setTema(temaDoSistema());
    acompanhar();
    consulta?.addEventListener?.('change', acompanhar);
    return () => consulta?.removeEventListener?.('change', acompanhar);
  }, [preferencia]);

  useEffect(() => { aplicarTema(tema); }, [tema]);

  const proximo = useCallback(() => {
    setPreferencia((atual) => {
      const seguinte = PREFERENCIAS[(PREFERENCIAS.indexOf(atual) + 1) % PREFERENCIAS.length];
      salvarPreferencia(seguinte);
      return seguinte;
    });
  }, []);

  return { preferencia, tema, proximo };
}
