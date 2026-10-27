import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TEXTOS } from '../i18n/textos';
import { idiomaDoNavegador, lerIdiomaSalvo, paginaDoCaminho, salvarIdioma, useIdioma } from '../i18n/idioma';

/*
  Em vez de redirecionar pelo idioma do navegador (o Google desaconselha: o robô dele visita como
  um navegador em inglês e nunca veria a versão em português), quem abre a página no outro idioma
  vê uma barra discreta oferecendo a versão dele. Escrita no idioma de quem lê.
  Some de vez quando a pessoa escolhe um idioma, aqui ou no botão PT/EN.
*/
export const SugestaoIdioma = () => {
  const { idioma, trocarIdioma } = useIdioma();
  const { pathname } = useLocation();
  const [fechada, setFechada] = useState(false);
  const doNavegador = idiomaDoNavegador();

  const visivel = !fechada && !lerIdiomaSalvo() && doNavegador !== idioma && Boolean(paginaDoCaminho(pathname));

  // enquanto a faixa aparece, a página desce um pouco para ela não cobrir o conteúdo
  useEffect(() => {
    document.documentElement.classList.toggle('com-sugestao-idioma', visivel);
    return () => document.documentElement.classList.remove('com-sugestao-idioma');
  }, [visivel]);

  if (!visivel) return null;

  const s = TEXTOS[doNavegador].sugestaoIdioma;
  const fechar = () => {
    salvarIdioma(idioma);
    setFechada(true);
  };

  return (
    // data-nosnippet: o Google não usa este texto no resultado da busca
    <aside className="sugestao-idioma" lang={doNavegador} data-nosnippet="">
      <div className="wrap">
        <p>{s.texto}</p>
        <button type="button" className="sugestao-ir" onClick={() => trocarIdioma(doNavegador)}>{s.botao}</button>
        <button type="button" className="sugestao-fechar" aria-label={s.fechar} onClick={fechar}>×</button>
      </div>
    </aside>
  );
};
