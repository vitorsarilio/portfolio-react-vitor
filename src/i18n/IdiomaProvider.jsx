import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TEXTOS } from './textos';
import { IdiomaContexto, PAGINAS, idiomaDoCaminho, lerIdiomaSalvo, paginaDoCaminho, salvarIdioma, traduzirItem } from './idioma';
import { EVENTOS, registrar } from '../lib/analytics';

export const IdiomaProvider = ({ children }) => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const idioma = idiomaDoCaminho(pathname);
  const conferiuEscolha = useRef(false);

  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  // Quem já escolheu um idioma no botão cai direto na versão escolhida, mas só ao chegar
  // numa página conhecida (endereços que não existem continuam mostrando o 404).
  // Robôs de busca não guardam escolha, então sempre veem a página do endereço que pediram.
  useEffect(() => {
    if (conferiuEscolha.current) return;
    conferiuEscolha.current = true;
    const salvo = lerIdiomaSalvo();
    const pagina = paginaDoCaminho(pathname);
    if (salvo && salvo !== idioma && pagina) navigate(PAGINAS[pagina][salvo] + hash, { replace: true });
  }, [pathname, hash, idioma, navigate]);

  const trocarIdioma = useCallback((novo) => {
    salvarIdioma(novo);
    if (novo === idioma) return;
    registrar(EVENTOS.trocarIdioma, { idioma: novo });
    const pagina = paginaDoCaminho(pathname) ?? 'inicio';
    navigate(PAGINAS[pagina][novo] + hash);
  }, [idioma, pathname, hash, navigate]);

  const valor = useMemo(() => ({
    idioma,
    t: TEXTOS[idioma],
    trocarIdioma,
    local: (item) => traduzirItem(item, idioma),
    caminho: (pagina) => PAGINAS[pagina][idioma],
  }), [idioma, trocarIdioma]);

  return <IdiomaContexto.Provider value={valor}>{children}</IdiomaContexto.Provider>;
};
