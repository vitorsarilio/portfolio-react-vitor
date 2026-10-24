import { useEffect, useState } from 'react';
import { animacoesDesligadas } from '../lib/motion';
import { useIdioma } from '../i18n/idioma';

export const BackToTop = () => {
  const [mostrar, setMostrar] = useState(false);
  const { t } = useIdioma();

  useEffect(() => {
    const aoRolar = () => setMostrar(window.scrollY > 600);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  return (
    <button
      type="button"
      className={`topo${mostrar ? ' mostra' : ''}`}
      aria-label={t.voltarAoTopo}
      tabIndex={mostrar ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: animacoesDesligadas() ? 'auto' : 'smooth' })}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
    </button>
  );
};
