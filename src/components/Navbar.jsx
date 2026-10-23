import { useEffect, useState } from 'react';
import { animacoesDesligadas, salvarPreferencia } from '../lib/motion';

const LINKS = [
  { href: '#projetos', label: 'Projetos' },
  { href: '#stack', label: 'Stack' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#contato', label: 'Contato' },
];

export const Navbar = () => {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [desligadas] = useState(animacoesDesligadas);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 30);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  const alternarAnimacoes = () => {
    salvarPreferencia(desligadas);
    window.location.reload();
  };

  return (
    <nav className={`nav${rolou || menuAberto ? ' rolou' : ''}`} aria-label="Principal">
      <div className="wrap">
        <a href="#inicio" className="marca" aria-label="Vitor Sarilio, voltar ao início">vitor<span>.</span>sarilio</a>
        <button
          type="button"
          className="menu-botao"
          aria-expanded={menuAberto}
          aria-controls="nav-links"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? 'Fechar' : 'Menu'}
        </button>
        <ul id="nav-links" className={`nav-links${menuAberto ? ' aberto' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.href}><a href={link.href} onClick={() => setMenuAberto(false)}>{link.label}</a></li>
          ))}
          <li>
            <button type="button" className="alterna" aria-pressed={!desligadas} onClick={alternarAnimacoes}>
              <i aria-hidden="true" />
              <span>{desligadas ? 'Animações desligadas' : 'Animações ligadas'}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
