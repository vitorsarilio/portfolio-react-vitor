import { useEffect, useState } from 'react';
import { animacoesDesligadas, salvarPreferencia } from '../lib/motion';
import { useTema } from '../lib/tema';
import { EVENTOS, registrar } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';
import { IDIOMAS } from '../i18n/textos';

// seções da página inicial; "contato" é o rodapé, que existe em todas as páginas
const LINKS = [
  { secao: '#projetos', chave: 'projetos', noInicio: true },
  { secao: '#stack', chave: 'stack', noInicio: true },
  { secao: '#experiencia', chave: 'experiencia', noInicio: true },
  { secao: '#contato', chave: 'contato', noInicio: false },
];

const SIGLA = { 'pt-BR': 'PT', 'en-US': 'EN' };

export const Navbar = () => {
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [desligadas] = useState(animacoesDesligadas);
  const { preferencia, tema, proximo } = useTema();
  const { idioma, t, trocarIdioma, caminho } = useIdioma();
  const inicio = caminho('inicio');
  const m = t.menu;

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

  const nomeTema = m.tema[preferencia];

  return (
    <nav className={`nav${rolou || menuAberto ? ' rolou' : ''}`} aria-label={m.principal}>
      <div className="wrap">
        <a href={`${inicio}#inicio`} className="marca" aria-label={m.marca}>vitor<span>.</span>sarilio</a>
        <button
          type="button"
          className="menu-botao"
          aria-expanded={menuAberto}
          aria-controls="nav-links"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          {menuAberto ? m.fechar : m.abrir}
        </button>
        <ul id="nav-links" className={`nav-links${menuAberto ? ' aberto' : ''}`}>
          {LINKS.map((link) => (
            <li key={link.chave}>
              <a href={link.noInicio ? `${inicio}${link.secao}` : link.secao} onClick={() => { setMenuAberto(false); registrar(EVENTOS.cliqueMenu, { secao: link.chave }); }}>
                {m.links[link.chave]}
              </a>
            </li>
          ))}
          <li className="nav-preferencias">
            <div className="idioma" role="group" aria-label={m.idioma}>
              {IDIOMAS.map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  lang={opcao}
                  aria-pressed={idioma === opcao}
                  aria-label={m.idiomaNome[opcao]}
                  onClick={() => trocarIdioma(opcao)}
                >
                  {SIGLA[opcao]}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="alterna"
              onClick={proximo}
              aria-label={m.temaRotulo(nomeTema)}
              title={preferencia === 'sistema' ? m.temaSistema(m.tema[tema]) : m.temaRotulo(nomeTema)}
            >
              <i className="tema-icone" aria-hidden="true" />
              <span>{nomeTema}</span>
            </button>
            <button type="button" className="alterna" aria-pressed={!desligadas} onClick={alternarAnimacoes}>
              <i aria-hidden="true" />
              <span>{desligadas ? m.animacoesDesligadas : m.animacoesLigadas}</span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
