import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENTO_ABRIR_PREFERENCIAS, aceitarAnalytics, lerConsentimento, recusarAnalytics } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

// Aviso de cookies (LGPD): aparece até a pessoa decidir; "Permitir" e "Recusar" têm o mesmo peso.
// Pode ser reaberto pelo rodapé ("Preferências de cookies").
export const AvisoCookies = () => {
  const { t, caminho } = useIdioma();
  const c = t.cookies;
  const [aberto, setAberto] = useState(() => lerConsentimento() === null);
  const [escolha, setEscolha] = useState(lerConsentimento);
  const primeiroBotao = useRef(null);
  const reaberto = useRef(false);

  useEffect(() => {
    const reabrir = () => {
      reaberto.current = true;
      setEscolha(lerConsentimento());
      setAberto(true);
    };
    window.addEventListener(EVENTO_ABRIR_PREFERENCIAS, reabrir);
    return () => window.removeEventListener(EVENTO_ABRIR_PREFERENCIAS, reabrir);
  }, []);

  // quem reabriu pelo rodapé vai direto para os botões
  useEffect(() => {
    if (aberto && reaberto.current) primeiroBotao.current?.focus();
  }, [aberto]);

  if (!aberto) return null;

  const decidir = (permitir) => {
    if (permitir) aceitarAnalytics();
    else recusarAnalytics();
    reaberto.current = false;
    setAberto(false);
  };

  return (
    <section className="aviso-cookies" role="region" aria-labelledby="aviso-cookies-titulo">
      <h2 id="aviso-cookies-titulo">{c.titulo}</h2>
      <p>
        {c.texto}{' '}
        <Link to={caminho('privacidade')} onClick={() => setAberto(false)}>{c.politica}</Link>
      </p>
      {escolha && (
        <p className="aviso-cookies-atual">{c.atual(escolha === 'aceito')}</p>
      )}
      <div className="aviso-cookies-acoes">
        <button ref={primeiroBotao} type="button" className="btn btn-vermelho" onClick={() => decidir(true)}>{c.permitir}</button>
        <button type="button" className="btn btn-contorno" onClick={() => decidir(false)}>{c.recusar}</button>
      </div>
    </section>
  );
};
