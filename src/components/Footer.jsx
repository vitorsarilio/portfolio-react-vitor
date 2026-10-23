import { Link } from 'react-router-dom';
import { linkWhatsApp } from '../lib/contato';
import { EVENTOS, abrirPreferenciasDeCookies, registrar } from '../lib/analytics';

const noRodape = (evento) => () => registrar(evento, { local: 'rodape' });

export const Footer = (user) => (
  <footer className="rodape" id="contato">
    <div className="wrap">
      <p>© {new Date().getFullYear()} {user.name} · dados, engenharia e automações</p>
      <ul aria-label="Contato">
        <li><a href={linkWhatsApp(user)} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueWhatsapp)}>WhatsApp</a></li>
        <li><a href={user.linkedin} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueLinkedin)}>LinkedIn</a></li>
        <li><a href={user.github} target="_blank" rel="noopener noreferrer" onClick={noRodape(EVENTOS.cliqueGithub)}>GitHub</a></li>
        <li><a href={`mailto:${user.email}`} onClick={noRodape(EVENTOS.cliqueEmail)}>E-mail</a></li>
        <li><Link to="/privacidade">Privacidade</Link></li>
        <li><button type="button" className="link-botao" onClick={abrirPreferenciasDeCookies}>Preferências de cookies</button></li>
      </ul>
    </div>
  </footer>
);
