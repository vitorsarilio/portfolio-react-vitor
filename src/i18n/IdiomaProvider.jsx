import { useCallback, useEffect, useMemo, useState } from 'react';
import { TEXTOS } from './textos';
import { IdiomaContexto, idiomaInicial, salvarIdioma, traduzirItem } from './idioma';
import { EVENTOS, registrar } from '../lib/analytics';

export const IdiomaProvider = ({ children }) => {
  const [idioma, setIdioma] = useState(idiomaInicial);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  const trocarIdioma = useCallback((novo) => {
    if (novo === idioma) return;
    salvarIdioma(novo);
    setIdioma(novo);
    registrar(EVENTOS.trocarIdioma, { idioma: novo });
  }, [idioma]);

  const valor = useMemo(() => ({
    idioma,
    t: TEXTOS[idioma],
    trocarIdioma,
    local: (item) => traduzirItem(item, idioma),
  }), [idioma, trocarIdioma]);

  return <IdiomaContexto.Provider value={valor}>{children}</IdiomaContexto.Provider>;
};
