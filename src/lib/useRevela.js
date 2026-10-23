import { useEffect } from 'react';
import { animacoesDesligadas } from './motion';

// Fades in every `.revela` element as it enters the screen and starts its counters.
export function useRevela() {
  useEffect(() => {
    const elementos = document.querySelectorAll('.revela:not(.visivel)');
    const mostrar = (el) => {
      el.classList.add('visivel');
      el.dispatchEvent(new CustomEvent('revelado'));
    };
    if (animacoesDesligadas() || typeof IntersectionObserver === 'undefined') {
      elementos.forEach(mostrar);
      return undefined;
    }
    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        mostrar(entrada.target);
        observador.unobserve(entrada.target);
      });
    }, { threshold: 0.2 });
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);
}
