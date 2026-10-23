import { useEffect, useState } from 'react';
import { animacoesDesligadas, salvarPreferencia } from '../lib/motion';
import { useTema } from '../lib/tema';
import { EVENTOS, registrar } from '../lib/analytics';

const NOME_TEMA = { sistema: 'Tema do sistema', claro: 'Tema claro', escuro: 'Tema escuro' };

const LINKS = [
  { href: '/#projetos', label: 'Projetos' },
  { href: '/#stack', label: 'Stack' },
  { href: '/#experiencia', label: 'Experiência' },
  { href: '#contato', label: 'Contato' },
];

export const Navbar = () => {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [desligadas] = useState(animacoesDesligadas);
  const { preferencia, tema, proximo } = useTema();

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 30);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  const alternarAnimacoes = () => {
    registrar(EVENTOS.trocarAnimacoes, { animacoes: desligadas ? 'ligadas' : 'desligadas' });
    salvarPreferencia(desligadas);
    window.location.reload();
  };

  return (
    <nav className={`nav${rolou || menuAberto ? ' rolou' : ''}`} aria-label="Principal">
      <div className="wrap">
        <a href="/#inicio" className="marca" aria-label="Vitor Sarilio, voltar ao início">vitor<span>.</span>sarilio</a>
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
            <li key={link.href}><a href={link.href} onClick={() => { setMenuAberto(false); registrar(EVENTOS.cliqueMenu, { secao: link.label }); }}>{link.label}</a></li>
          ))}
          <li>
            <button
              type="button"
              className="alterna"
              onClick={proximo}
              title={preferencia === 'sistema' ? `Seguindo o sistema (${tema}). Clique para escolher.` : 'Clique para trocar o tema'}
            >
              <i className="tema-icone" aria-hidden="true" />
              <span>{NOME_TEMA[preferencia]}</span>
            </button>
          </li>
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
