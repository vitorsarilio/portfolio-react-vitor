import { useEffect, useState } from 'react';
import { animacoesDesligadas } from '../lib/motion';

// `partes`: [texto, destaque?]. The title types itself once; screen readers get the full text.
export const TypedTitle = ({ partes }) => {
  const total = partes.reduce((soma, [texto]) => soma + texto.length, 0);
  const [mostrados, setMostrados] = useState(() => (animacoesDesligadas() ? total : 0));

  useEffect(() => {
    if (mostrados >= total) return undefined;
    const espera = setTimeout(() => setMostrados((n) => n + 1), 38 + Math.random() * 40);
    return () => clearTimeout(espera);
  }, [mostrados, total]);

  let restante = mostrados;
  const frase = partes.map(([texto]) => texto).join('');

  return (
    <h1 aria-label={frase}>
      <span aria-hidden="true">
        {partes.map(([texto, destaque]) => {
          const visivel = texto.slice(0, Math.max(0, restante));
          restante -= texto.length;
          if (!visivel) return null;
          return destaque ? <span key={texto} className="vermelho">{visivel}</span> : <span key={texto}>{visivel}</span>;
        })}
        <span className="cursor" />
      </span>
    </h1>
  );
};
