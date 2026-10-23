import { linkWhatsApp } from '../lib/contato';

export const Footer = (user) => (
  <footer className="rodape" id="contato">
    <div className="wrap">
      <p>© {new Date().getFullYear()} {user.name} · dados, engenharia e automações</p>
      <ul aria-label="Contato">
        <li><a href={linkWhatsApp(user)} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
        <li><a href={user.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        <li><a href={user.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
        <li><a href={`mailto:${user.email}`}>E-mail</a></li>
      </ul>
    </div>
  </footer>
);
