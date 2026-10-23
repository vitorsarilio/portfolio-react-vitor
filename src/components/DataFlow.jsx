import { useEffect, useRef, useState } from 'react';
import { animacoesDesligadas } from '../lib/motion';

// Illustration of the work: sources → orchestration → warehouse → delivery,
// with red packets travelling along the links and a log of the current step.
const LARGURA = 99;
const ALTURA = 46;
const COLUNAS = [0, 127, 254, 381];
const ROTULOS = ['fontes', 'orquestração', 'armazém', 'entrega'];

const NOS = {
  graph: { coluna: 0, y: 30, nome: 'API Graph', papel: 'extração' },
  oracle: { coluna: 0, y: 122, nome: 'Oracle', papel: 'extração' },
  planilha: { coluna: 0, y: 214, nome: 'Planilhas', papel: 'extração' },
  airflow: { coluna: 1, y: 70, nome: 'Airflow', papel: 'orquestração' },
  n8n: { coluna: 1, y: 176, nome: 'n8n', papel: 'automação' },
  bq: { coluna: 2, y: 122, nome: 'BigQuery', papel: 'modelagem' },
  pbi: { coluna: 3, y: 70, nome: 'Power BI', papel: 'dashboard' },
  alerta: { coluna: 3, y: 176, nome: 'Alertas', papel: 'aviso automático' },
};

const LIGACOES = [
  ['graph', 'airflow'], ['oracle', 'airflow'], ['planilha', 'n8n'], ['airflow', 'bq'],
  ['n8n', 'bq'], ['n8n', 'alerta'], ['bq', 'pbi'], ['bq', 'alerta'],
];

const ETAPAS = [
  ['graph', 'extraindo dados da API Microsoft Graph'],
  ['oracle', 'lendo as bases operacionais no Oracle'],
  ['airflow', 'DAG diária iniciada no Airflow'],
  ['planilha', 'planilha nova recebida'],
  ['n8n', 'n8n tratou e enviou para o armazém'],
  ['bq', 'modelos SQL atualizados no BigQuery'],
  ['pbi', 'dashboard do Power BI atualizado'],
  ['alerta', 'alerta enviado para a equipe'],
];

const caminho = ([de, para]) => {
  const a = NOS[de];
  const b = NOS[para];
  const x1 = COLUNAS[a.coluna] + LARGURA;
  const y1 = a.y + ALTURA / 2;
  const x2 = COLUNAS[b.coluna];
  const y2 = b.y + ALTURA / 2;
  return `M${x1},${y1} C${x1 + 16},${y1} ${x2 - 16},${y2} ${x2},${y2}`;
};

const hora = () => new Date().toLocaleTimeString('pt-BR');
const registro = (indice) => {
  const [no, texto] = ETAPAS[indice % ETAPAS.length];
  return { id: indice, no, texto, hora: hora() };
};

export const DataFlow = () => {
  const svg = useRef(null);
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
      <div className="terminal-topo"><span>fluxo de dados</span><b>● rodando</b></div>
      <div className="terminal-corpo">
        <svg
          ref={svg}
          className="fluxo-svg"
          viewBox="0 0 480 280"
          role="img"
          aria-label="Fluxo de dados: fontes passam por Airflow e n8n, são modeladas no BigQuery e viram dashboards no Power BI e alertas automáticos"
        >
          {ROTULOS.map((rotulo, i) => <text key={rotulo} className="col" x={COLUNAS[i]} y="12">{rotulo}</text>)}
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
          {Object.entries(NOS).map(([chave, no]) => {
            const x = COLUNAS[no.coluna];
            return (
              <g key={chave} className={`no${ativo === chave ? ' ativo' : ''}`}>
                <rect x={x} y={no.y} width={LARGURA} height={ALTURA} />
                <text className="nome" x={x + 12} y={no.y + 20}>{no.nome}</text>
                <text className="papel" x={x + 12} y={no.y + 36}>{no.papel}</text>
              </g>
            );
          })}
        </svg>
        <ul className="log" aria-hidden="true">
          {log.map((linha) => <li key={linha.id}><b>✓</b> {linha.hora} {linha.texto}</li>)}
        </ul>
      </div>
    </div>
  );
};
