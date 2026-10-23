import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { EVENTO_ABRIR_PREFERENCIAS, aceitarAnalytics, lerConsentimento, recusarAnalytics } from '../lib/analytics';

// Aviso de cookies (LGPD): aparece até a pessoa decidir; "Permitir" e "Recusar" têm o mesmo peso.
// Pode ser reaberto pelo rodapé ("Preferências de cookies").
export const AvisoCookies = () => {
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
      <h2 id="aviso-cookies-titulo">Cookies e privacidade</h2>
      <p>
        Quero usar o Google Analytics para saber quais partes do portfólio são mais vistas. Ele só é ativado se você permitir.
        Tema e animações ficam salvos apenas no seu navegador.{' '}
        <Link to="/privacidade" onClick={() => setAberto(false)}>Ver a política de privacidade</Link>
      </p>
      {escolha && (
        <p className="aviso-cookies-atual">Escolha atual: {escolha === 'aceito' ? 'análise permitida' : 'análise recusada'}.</p>
      )}
      <div className="aviso-cookies-acoes">
        <button ref={primeiroBotao} type="button" className="btn btn-vermelho" onClick={() => decidir(true)}>Permitir análise</button>
        <button type="button" className="btn btn-contorno" onClick={() => decidir(false)}>Recusar</button>
      </div>
    </section>
  );
};
