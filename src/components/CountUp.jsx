import { useEffect, useRef, useState } from 'react';
import { animacoesDesligadas } from '../lib/motion';

// Counts from 0 to `valor` the first time the number appears on screen.
export const CountUp = ({ valor, duracao = 1400 }) => {
  const ref = useRef(null);
  const [semContagem] = useState(() => animacoesDesligadas() || typeof IntersectionObserver === 'undefined');
  const [atual, setAtual] = useState(semContagem ? valor : 0);

  useEffect(() => {
    const el = ref.current;
    if (semContagem) return undefined;
    let quadro = 0;
    const observador = new IntersectionObserver(([entrada]) => {
      if (!entrada.isIntersecting) return;
      observador.disconnect();
      const inicio = performance.now();
      const passo = (agora) => {
        const p = Math.min(1, (agora - inicio) / duracao);
        setAtual(Math.round(valor * (1 - (1 - p) ** 3)));
        if (p < 1) quadro = requestAnimationFrame(passo);
      };
      quadro = requestAnimationFrame(passo);
    }, { threshold: 0.3 });
    observador.observe(el);
    return () => { observador.disconnect(); cancelAnimationFrame(quadro); };
  }, [valor, duracao, semContagem]);

  return <span ref={ref}>{(semContagem ? valor : atual).toLocaleString('pt-BR')}</span>;
};
