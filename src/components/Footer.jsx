import { Link } from 'react-router-dom';
import { linkWhatsApp } from '../lib/contato';
import { EVENTOS, abrirPreferenciasDeCookies, registrar } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

const noRodape = (evento) => () => registrar(evento, { local: 'rodape' });

export const Footer = (user) => {
  const { t } = useIdioma();
  const r = t.rodape;
  return (
    <footer className="rodape" id="contato">
      <div className="wrap">
        <p>© {new Date().getFullYear()} {user.name} · {r.assinatura}</p>
        <ul aria-label={r.contato}>
          <li><a href={linkWhatsApp(user, t.topo.mensagemWhatsapp)} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueWhatsapp)}>WhatsApp</a></li>
          <li><a href={user.linkedin} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueLinkedin)}>LinkedIn</a></li>
          <li><a href={user.github} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueGithub)}>GitHub</a></li>
          <li><a href={`mailto:${user.email}`} onClick={noRodape(EVENTOS.cliqueEmail)}>E-mail</a></li>
          <li><Link to="/privacidade">{r.privacidade}</Link></li>
          <li><button type="button" className="link-botao" onClick={abrirPreferenciasDeCookies}>{r.cookies}</button></li>
        </ul>
      </div>
    </footer>
  );
};
