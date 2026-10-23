import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { animacoesDesligadas } from '../lib/motion';

export const SAUDACAO = 'Olá! Eu sou a C137, a assistente virtual do Vitor. Pode perguntar sobre a carreira, os projetos ou as habilidades dele.';
const SUGESTOES = ['Quais projetos ele já entregou?', 'Ele trabalha com automações?', 'Como falar com ele?'];
const TEMPO_LIMITE_MS = 20_000;
const ID_VAGA = 'vaga-c137';
// Enquanto a vaga do topo ainda aparece abaixo do menu, a C137 fica encaixada nela
const LIMITE_TOPO_PX = 160;
const DURACAO_VOO_MS = 520;

// Lugar reservado no topo da página. Tem altura fixa, então nada pula quando a C137 sai.
export const C137Vaga = () => <div className="vaga-c137" id={ID_VAGA} />;

/*
  A C137 é um único painel. Ele é renderizado num portal cujo nó (a "casca") é movido
  entre a vaga do topo e o <body>; o React nunca desmonta o painel, então mensagens,
  texto digitado e histórico continuam os mesmos em qualquer lugar da página.

  - topo:  encaixada abaixo do fluxo de dados, sempre aberta.
  - canto: ao rolar, voa para o canto e minimiza no botão. Reaberta, fica flutuante
           até a pessoa voltar ao topo, quando volta para a vaga.
*/
export const C137 = ({ onAbertoChange, trackEvent }) => {
  const [mensagens, setMensagens] = useState([{ sender: 'bot', text: SAUDACAO }]);
  const [texto, setTexto] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [lugar, setLugar] = useState('topo');
  const [aberto, setAberto] = useState(false);
  const [casca] = useState(() => document.createElement('div'));

  const painel = useRef(null);
  const botao = useRef(null);
  const lista = useRef(null);
  const campo = useRef(null);
  const origem = useRef(null);
  const lugarAtual = useRef('topo');
  const abertoAtual = useRef(false);
  const foco = useRef(null); // 'campo' ou 'botao': para onde levar o foco depois da troca

  const flutuante = lugar === 'canto';

  useEffect(() => {
    abertoAtual.current = aberto;
    onAbertoChange?.(flutuante && aberto);
  }, [aberto, flutuante, onAbertoChange]);

  // Move a casca para o lugar da vez e faz o painel deslizar de onde estava (FLIP)
  useLayoutEffect(() => {
    const destino = lugar === 'topo' ? document.getElementById(ID_VAGA) : document.body;
    if (destino && casca.parentNode !== destino) destino.appendChild(casca);
    const antes = origem.current;
    origem.current = null;
    const el = painel.current;
    if (!antes || !el?.animate || animacoesDesligadas()) return;
    const depois = el.getBoundingClientRect();
    if (!antes.width || !depois.width) return;
    el.animate([
      { transformOrigin: 'top left', opacity: 1, transform: `translate(${antes.left - depois.left}px, ${antes.top - depois.top}px) scale(${antes.width / depois.width}, ${antes.height / depois.height})` },
      { transformOrigin: 'top left', opacity: 1, transform: 'none' },
    ], { duration: DURACAO_VOO_MS, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }, [lugar, casca]);

  useEffect(() => () => casca.remove(), [casca]);

  // Decide o lugar pela posição da vaga
  useEffect(() => {
    let minimizar = 0;
    let primeira = true;
    const conferir = () => {
      const vaga = document.getElementById(ID_VAGA);
      const noTopo = Boolean(vaga) && vaga.getBoundingClientRect().bottom > LIMITE_TOPO_PX;
      const animar = !primeira;
      primeira = false;
      if (noTopo && lugarAtual.current !== 'topo') {
        const de = abertoAtual.current ? painel.current : botao.current;
        origem.current = animar ? de?.getBoundingClientRect() ?? null : null;
        lugarAtual.current = 'topo';
        clearTimeout(minimizar);
        setAberto(false);
        setLugar('topo');
      } else if (!noTopo && lugarAtual.current !== 'canto') {
        origem.current = animar ? painel.current?.getBoundingClientRect() ?? null : null;
        if (painel.current?.contains(document.activeElement)) document.activeElement.blur();
        lugarAtual.current = 'canto';
        setLugar('canto');
        if (!animar || animacoesDesligadas()) return;
        // aberta só durante o voo; ao chegar no canto, minimiza no botão
        setAberto(true);
        minimizar = setTimeout(() => { if (lugarAtual.current === 'canto') setAberto(false); }, DURACAO_VOO_MS - 40);
      }
    };
    conferir();
    window.addEventListener('scroll', conferir, { passive: true });
    window.addEventListener('resize', conferir);
    return () => {
      clearTimeout(minimizar);
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
    trackEvent?.('C137', 'Abrir chat flutuante');
  };
  const fechar = () => {
    foco.current = 'botao';
    setAberto(false);
  };

  const enviar = async (pergunta) => {
    const limpa = pergunta.trim();
    if (!limpa || carregando) return;
    // Mesmo contrato de antes: o histórico enviado é a conversa antes da nova pergunta
    const historico = mensagens;
    setMensagens((anteriores) => [...anteriores, { sender: 'user', text: limpa }]);
    setTexto('');
    setCarregando(true);
    trackEvent?.('C137', 'Enviar pergunta', lugarAtual.current === 'topo' ? 'topo' : 'flutuante');

    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), TEMPO_LIMITE_MS);
    try {
      const resposta = await fetch('/api/chat', {
        method: 'POST',
        signal: controle.signal,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: limpa, history: historico }),
      });
      if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
      const dados = await resposta.json();
      setMensagens((anteriores) => [...anteriores, { sender: 'bot', text: dados.response }]);
    } catch (erro) {
      const text = erro.name === 'AbortError'
        ? 'A resposta está demorando mais que o normal. Tente novamente em instantes ou fale direto com o Vitor pelo WhatsApp, LinkedIn ou e-mail.'
        : 'Desculpe, houve um erro ao processar sua pergunta. Tente novamente em instantes.';
      setMensagens((anteriores) => [...anteriores, { sender: 'bot', text }]);
    } finally {
      clearTimeout(limite);
      setCarregando(false);
    }
  };

  const classes = `c137 ${flutuante ? 'flutuante' : 'ancorado'}${aberto ? ' aberto' : ''}`;

  return (
    <>
      {flutuante && !aberto && (
        <button ref={botao} type="button" className="c137-botao" aria-controls="c137" aria-expanded="false" onClick={abrir}>
          <span className="pulso" aria-hidden="true" />Pergunte à C137
        </button>
      )}
      {createPortal(
        <section ref={painel} id="c137" className={classes} aria-labelledby="c137-titulo">
          <header className="c137-topo">
            <div>
              <strong id="c137-titulo">C137</strong>
              <small>assistente virtual do Vitor · pergunte o que quiser</small>
            </div>
            {flutuante && (
              <button type="button" className="c137-fechar" aria-label="Minimizar chat" onClick={fechar}>×</button>
            )}
          </header>
          <div ref={lista} className="c137-msgs" role="log" aria-live="polite">
            {mensagens.map((m, i) => (
              <p key={i} className={`msg ${m.sender === 'user' ? 'eu' : 'bot'}`}>{m.text}</p>
            ))}
            {carregando && (
              <p className="msg bot" aria-label="C137 está digitando"><span className="digitando"><i /><i /><i /></span></p>
            )}
          </div>
          {mensagens.length === 1 && !carregando && (
            <div className="sugestoes">
              {SUGESTOES.map((s) => <button key={s} type="button" onClick={() => enviar(s)}>{s}</button>)}
            </div>
          )}
          <form className="c137-form" onSubmit={(e) => { e.preventDefault(); enviar(texto); }}>
            <input
              ref={campo}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              maxLength={500}
              autoComplete="off"
              placeholder="Pergunte sobre o portfólio..."
              aria-label="Sua pergunta para a C137"
            />
            <button type="submit" disabled={carregando || !texto.trim()}>Enviar</button>
          </form>
        </section>,
        casca,
      )}
    </>
  );
};
