import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animacoesDesligadas } from '../lib/motion';
import { EVENTOS, registrar } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

const TEMPO_LIMITE_MS = 20_000;
const ID_VAGA = 'vaga-c137';

// Lugar reservado no topo da página. Tem altura fixa, então nada pula quando a C137 sai.
export const C137Vaga = () => <div className="vaga-c137" id={ID_VAGA} />;

// Altura do menu fixo (muda no celular): a troca de lugar acontece escondida atrás dele
const alturaDoMenu = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--altura-nav')) || 88;

/*
  A C137 é um único painel. Ele é renderizado num portal cujo nó (a "casca") é movido
  entre a vaga do topo e o <body>; o React nunca desmonta o painel, então mensagens,
  texto digitado e histórico continuam os mesmos em qualquer lugar da página.

  - topo:  encaixada abaixo do fluxo de dados, sempre aberta. Rola junto com a página.
  - canto: quando a vaga some atrás do menu, o painel passa para o canto minimizado e o
           botão aparece. Reaberta, fica flutuante até a pessoa voltar ao topo.
  Nada atravessa a tela: a troca acontece fora da vista, sem atrapalhar quem está rolando.
*/
// Fixed bot messages (greeting, errors) keep only a key, so they follow a language switch.
// What the visitor typed and what the server answered stay exactly as they were.
const textoDa = (m, c) => (m.chave ? c[m.chave] : m.text);

export const C137 = ({ onAbertoChange }) => {
  const { idioma, t } = useIdioma();
  const c = t.c137;
  const [mensagens, setMensagens] = useState([{ sender: 'bot', chave: 'saudacao' }]);
  const [texto, setTexto] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [lugar, setLugar] = useState('topo');
  const [aberto, setAberto] = useState(false);
  const [casca] = useState(() => document.createElement('div'));

  const painel = useRef(null);
  const botao = useRef(null);
  const lista = useRef(null);
  const campo = useRef(null);
  const lugarAtual = useRef('topo');
  const abertoAtual = useRef(false);
  const voltouAberta = useRef(false);
  const foco = useRef(null); // 'campo' ou 'botao': para onde levar o foco depois da troca

  const flutuante = lugar === 'canto';

  useEffect(() => {
    abertoAtual.current = aberto;
    onAbertoChange?.(flutuante && aberto);
  }, [aberto, flutuante, onAbertoChange]);

  // Move a casca para o lugar da vez
  useLayoutEffect(() => {
    const destino = lugar === 'topo' ? document.getElementById(ID_VAGA) : document.body;
    if (destino && casca.parentNode !== destino) destino.appendChild(casca);
    // Se estava aberta no canto e a pessoa voltou ao topo, aparece na vaga com um leve fade
    if (lugar === 'topo' && voltouAberta.current && !animacoesDesligadas()) {
      painel.current?.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'ease-out' });
    }
    voltouAberta.current = false;
  }, [lugar, casca]);

  useEffect(() => () => casca.remove(), [casca]);

  // Decide o lugar pela posição da vaga
  useEffect(() => {
    const conferir = () => {
      const vaga = document.getElementById(ID_VAGA);
      const noTopo = Boolean(vaga) && vaga.getBoundingClientRect().bottom > alturaDoMenu();
      if (noTopo && lugarAtual.current !== 'topo') {
        lugarAtual.current = 'topo';
        voltouAberta.current = abertoAtual.current;
        setAberto(false);
        setLugar('topo');
      } else if (!noTopo && lugarAtual.current !== 'canto') {
        if (painel.current?.contains(document.activeElement)) document.activeElement.blur();
        lugarAtual.current = 'canto';
        setLugar('canto');
      }
    };
    conferir();
    window.addEventListener('scroll', conferir, { passive: true });
    window.addEventListener('resize', conferir);
    return () => {
      window.removeEventListener('scroll', conferir);
      window.removeEventListener('resize', conferir);
    };
  }, []);

  useEffect(() => {
    if (foco.current === 'campo' && aberto) campo.current?.focus();
    if (foco.current === 'botao' && !aberto) botao.current?.focus();
    foco.current = null;
  }, [aberto]);

  useEffect(() => {
    if (!flutuante || !aberto) return undefined;
    const aoTeclar = (e) => {
      if (e.key !== 'Escape') return;
      foco.current = 'botao';
      setAberto(false);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [flutuante, aberto]);

  useEffect(() => {
    if (lista.current) lista.current.scrollTop = lista.current.scrollHeight;
  }, [mensagens, carregando]);

  const abrir = () => {
    foco.current = 'campo';
    setAberto(true);
    registrar(EVENTOS.c137AbrirChat, { local: 'canto' });
  };
  const fechar = () => {
    foco.current = 'botao';
    setAberto(false);
  };

  const enviar = async (pergunta, origem = 'digitada') => {
    const limpa = pergunta.trim();
    if (!limpa || carregando) return;
    // Mesmo contrato de antes: o histórico enviado é a conversa antes da nova pergunta
    const historico = mensagens.map((m) => ({ sender: m.sender, text: textoDa(m, c) }));
    setMensagens((anteriores) => [...anteriores, { sender: 'user', text: limpa }]);
    setTexto('');
    setCarregando(true);
    // só o local e a origem; o texto da pergunta nunca vai para o Analytics
    registrar(EVENTOS.c137EnviarPergunta, { local: lugarAtual.current, origem });

    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
    try {
      const resposta = await fetch('/api/chat', {
        method: 'POST',
        signal: controle.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: limpa, history: historico, language: idioma }),
      });
      // 429: o servidor limita as perguntas por minuto; vale uma mensagem própria, não um "erro"
      if (resposta.status === 429) {
        setMensagens((anteriores) => [...anteriores, { sender: 'bot', chave: 'erroLimite' }]);
        registrar(EVENTOS.c137RespostaErro, { motivo: 'limite' });
        return;
      }
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      setMensagens((anteriores) => [...anteriores, { sender: 'bot', text: dados.response }]);
    } catch (erro) {
      const chave = erro.name === 'AbortError' ? 'erroDemora' : 'erroFalha';
      setMensagens((anteriores) => [...anteriores, { sender: 'bot', chave }]);
      registrar(EVENTOS.c137RespostaErro, { motivo: erro.name === 'AbortError' ? 'demora' : 'falha' });
    } finally {
      clearTimeout(limite);
      setCarregando(false);
    }
  };

  const classes = `c137 ${flutuante ? 'flutuante' : 'ancorado'}${aberto ? ' aberto' : ''}`;

  const inicio = mensagens.length === 1 && !carregando;

  return (
    <>
      {flutuante && !aberto && (
        <button ref={botao} type="button" className="c137-botao" aria-label={c.abrir} aria-controls="c137" aria-expanded="false" onClick={abrir}>
          <span className="pulso" aria-hidden="true" /><span className="so-desktop">{c.abrirCurto}&nbsp;</span>C137
        </button>
      )}
      {createPortal(
        <section ref={painel} id="c137" className={classes} aria-labelledby="c137-titulo">
          <header className="c137-topo">
            <div>
              <strong id="c137-titulo">C137</strong>
              <small>{c.subtitulo}</small>
            </div>
            {flutuante && (
              <button type="button" className="c137-fechar" aria-label={c.minimizar} onClick={fechar}>×</button>
            )}
          </header>
          <div ref={lista} className="c137-msgs" role="log" aria-live="polite">
            {mensagens.map((m, i) => (
              <p key={i} className={`msg ${m.sender === 'user' ? 'eu' : 'bot'}`}>{textoDa(m, c)}</p>
            ))}
            {carregando && (
              <p className="msg bot" aria-label={c.digitando}><span className="digitando"><i /><i /><i /></span></p>
            )}
          </div>
          {inicio && (
            <div className="sugestoes">
              {c.sugestoes.map((s) => <button key={s} type="button" onClick={() => enviar(s, 'sugestao')}>{s}</button>)}
            </div>
          )}
          <form className="c137-form" onSubmit={(e) => { e.preventDefault(); enviar(texto); }}>
            <input
              ref={campo}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={500}
              autoComplete="off"
              enterKeyHint="send"
              placeholder={c.placeholder}
              aria-label={c.campo}
            />
            <button type="submit" disabled={carregando || !texto.trim()}>{c.enviar}</button>
          </form>
          {inicio && (
            <p className="c137-aviso">
              {c.aviso}{' '}
              <a href="/privacidade">{t.rodape.privacidade}</a>
            </p>
          )}
        </section>,
        casca,
      )}
    </>
  );
};
