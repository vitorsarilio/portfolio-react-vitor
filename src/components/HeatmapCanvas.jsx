import { useEffect, useRef } from 'react';
import { animacoesDesligadas } from '../lib/motion';

const TAMANHO = 22;
const ESPACO = 4;

// Background grid whose cells light up in red, like a contributions chart.
export const HeatmapCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext?.('2d');
    if (!ctx) return undefined;
    const parado = animacoesDesligadas();
    let colunas = 0;
    let celulas = [];
    let quadro = 0;

    const montar = () => {
      const escala = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * escala;
      canvas.height = canvas.offsetHeight * escala;
      ctx.setTransform(escala, 0, 0, escala, 0, 0);
      colunas = Math.ceil(canvas.offsetWidth / (TAMANHO + ESPACO));
      const linhas = Math.ceil(canvas.offsetHeight / (TAMANHO + ESPACO));
      celulas = Array.from({ length: colunas * linhas }, () => ({ v: Math.random() < 0.2 ? Math.random() * 0.8 : 0, alvo: 0 }));
    };

    // Colors come from the theme tokens, so the grid follows light/dark without a reload
    let cores = { vazia: '', vermelho: '', calor: 0 };
    const lerCores = () => {
      const estilo = getComputedStyle(document.documentElement);
      cores = {
        vazia: estilo.getPropertyValue('--celula').trim() || 'rgba(255,255,255,0.035)',
        vermelho: estilo.getPropertyValue('--vermelho-rgb').trim() || '196, 50, 58',
        calor: parseFloat(estilo.getPropertyValue('--calor')) || 0.7,
      };
    };

    const desenhar = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      celulas.forEach((c, i) => {
        if (Math.random() < 0.004) c.alvo = Math.random() ** 2;
        c.v += (c.alvo - c.v) * 0.04;
        if (Math.abs(c.alvo - c.v) < 0.01) c.alvo = 0;
        ctx.fillStyle = c.v > 0.02 ? `rgba(${cores.vermelho}, ${(c.v * cores.calor).toFixed(3)})` : cores.vazia;
        ctx.fillRect((i % colunas) * (TAMANHO + ESPACO), Math.floor(i / colunas) * (TAMANHO + ESPACO), TAMANHO, TAMANHO);
      });
      if (!parado) quadro = requestAnimationFrame(desenhar);
    };

    const aoRedimensionar = () => { montar(); if (parado) desenhar(); };
    const trocouTema = new MutationObserver(() => { lerCores(); if (parado) desenhar(); });
    trocouTema.observe(document.documentElement, { attributes: true, attributeFilter: ['data-tema'] });
    lerCores();
    montar();
    desenhar();
    window.addEventListener('resize', aoRedimensionar);
    return () => {
      cancelAnimationFrame(quadro);
      trocouTema.disconnect();
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, []);

  return <canvas ref={ref} className="mapa-calor" aria-hidden="true" />;
};
