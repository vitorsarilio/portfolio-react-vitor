import { useEffect, useRef, useState } from 'react';
import { animacoesDesligadas } from '../lib/motion';
import { useIdioma } from '../i18n/idioma';

// Illustration of the work: sources → orchestration → warehouse → delivery,
// with red packets travelling along the links and a log of the current step.
// Labels come from the language texts (t.fluxo); positions live here.
const LARGURA = 99;
const ALTURA = 46;
const COLUNAS = [0, 127, 254, 381];

const POSICOES = {
  graph: { coluna: 0, y: 30 },
  oracle: { coluna: 0, y: 122 },
  planilha: { coluna: 0, y: 214 },
  airflow: { coluna: 1, y: 70 },
  n8n: { coluna: 1, y: 176 },
  bq: { coluna: 2, y: 122 },
  pbi: { coluna: 3, y: 70 },
  alerta: { coluna: 3, y: 176 },
};

const LIGACOES = [
  ['graph', 'airflow'], ['oracle', 'airflow'], ['planilha', 'n8n'], ['airflow', 'bq'],
  ['n8n', 'bq'], ['n8n', 'alerta'], ['bq', 'pbi'], ['bq', 'alerta'],
];

const ORDEM = ['graph', 'oracle', 'airflow', 'planilha', 'n8n', 'bq', 'pbi', 'alerta'];

const caminho = ([de, para]) => {
  const a = POSICOES[de];
  const b = POSICOES[para];
  const x1 = COLUNAS[a.coluna] + LARGURA;
  const y1 = a.y + ALTURA / 2;
  const x2 = COLUNAS[b.coluna];
  const y2 = b.y + ALTURA / 2;
  return `M${x1},${y1} C${x1 + 16},${y1} ${x2 - 16},${y2} ${x2},${y2}`;
};

// the log keeps the step and the moment; the text is written in the current language when shown
const registro = (indice) => ({ id: indice, no: ORDEM[indice % ORDEM.length], quando: new Date() });

export const DataFlow = () => {
  const svg = useRef(null);
  const { idioma, t } = useIdioma();
  const f = t.fluxo;
  const parado = animacoesDesligadas();
  const [log, setLog] = useState(() => (parado ? [registro(6), registro(5)] : [registro(0)]));

  useEffect(() => {
    if (parado) {
      svg.current?.pauseAnimations?.();
      return undefined;
    }
    let indice = 1;
    const relogio = setInterval(() => {
      const novo = registro(indice++);
      setLog((anterior) => [novo, ...anterior].slice(0, 2));
    }, 1600);
    return () => clearInterval(relogio);
  }, [parado]);

  const ativo = log[0]?.no;

  return (
    <div className="terminal fluxo">
      <div className="terminal-topo"><span>{f.titulo}</span><b>{f.status}</b></div>
      <div className="terminal-corpo">
        <svg ref={svg} className="fluxo-svg" viewBox="0 0 480 280" role="img" aria-label={f.descricao}>
          {f.colunas.map((rotulo, i) => <text key={i} className="col" x={COLUNAS[i]} y="12">{rotulo}</text>)}
          {LIGACOES.map((ligacao, i) => <path key={ligacao.join('-')} id={`fluxo-lig-${i}`} className="lig" d={caminho(ligacao)} />)}
          {/* Negative begin: every packet is already mid-way when the panel appears.
              With a positive delay it would wait at (0,0), and they piled up as a red glow in the corner. */}
          {!parado && LIGACOES.flatMap((ligacao, i) => [0, 1.3].map((atraso) => (
            <circle key={`${i}-${atraso}`} className="pacote" r="3.2">
              <animateMotion dur="2.6s" begin={`-${(i * 0.37 + atraso).toFixed(2)}s`} repeatCount="indefinite">
                <mpath href={`#fluxo-lig-${i}`} />
              </animateMotion>
            </circle>
          )))}
          {Object.entries(POSICOES).map(([chave, posicao]) => {
            const x = COLUNAS[posicao.coluna];
            const [nome, papel] = f.nos[chave];
            return (
              <g key={chave} className={`no${ativo === chave ? ' ativo' : ''}`}>
                <rect x={x} y={posicao.y} width={LARGURA} height={ALTURA} />
                <text className="nome" x={x + 12} y={posicao.y + 20}>{nome}</text>
                <text className="papel" x={x + 12} y={posicao.y + 36}>{papel}</text>
              </g>
            );
          })}
        </svg>
        <ul className="log" aria-hidden="true">
          {log.map((linha) => (
            <li key={linha.id}><b>✓</b> {linha.quando.toLocaleTimeString(idioma)} {f.etapas[linha.no]}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
