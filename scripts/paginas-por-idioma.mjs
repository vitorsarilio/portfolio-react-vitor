// Gera dist/en/index.html a partir de dist/index.html, com título, descrição, imagem e
// tags de compartilhamento em inglês. Google, LinkedIn e WhatsApp leem o HTML sem rodar
// JavaScript, então a versão /en precisa de um HTML próprio para aparecer em inglês.
// Roda depois do `vite build` (veja o script "build" no package.json).
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://www.vitorsarilio.com';

const titulo = 'Vitor Sarilio | Data Analyst, BI and Automation';
const descricao = 'Data analyst in São Paulo, Brazil, working with data since 2017: BI, data engineering and automation with Power BI, SQL, Python, Airflow, BigQuery and n8n.';
const social = 'I turn raw data into decisions that run on their own: dashboards, pipelines and automation for your operations.';
const alt = 'Vitor Hugo Sarilio, data analyst: I turn raw data into decisions that run on their own.';

// [como está no HTML em português, como fica no HTML em inglês]
const TROCAS = [
  ['<html lang="pt-BR">', '<html lang="en-US">'],
  ['<title>Vitor Sarilio | Analista de Dados, BI e Automações</title>', `<title>${titulo}</title>`],
  ['<meta name="description" content="Analista de dados em São Paulo, trabalhando com dados desde 2017: BI, engenharia de dados e automações com Power BI, SQL, Python, Airflow, BigQuery e n8n.">',
    `<meta name="description" content="${descricao}">`],
  [`<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${SITE}/en">`],
  ['<meta property="og:locale" content="pt_BR">', '<meta property="og:locale" content="en_US">'],
  ['<meta property="og:locale:alternate" content="en_US">', '<meta property="og:locale:alternate" content="pt_BR">'],
  [`<meta property="og:url" content="${SITE}/">`, `<meta property="og:url" content="${SITE}/en">`],
  ['<meta property="og:title" content="Vitor Sarilio | Analista de Dados, BI e Automações">', `<meta property="og:title" content="${titulo}">`],
  ['<meta property="og:description" content="Transformo dados brutos em decisões que rodam sozinhas: dashboards, pipelines e automações para a sua operação.">',
    `<meta property="og:description" content="${social}">`],
  [`<meta property="og:image" content="${SITE}/og-image.jpg">`, `<meta property="og:image" content="${SITE}/og-image-en.jpg">`],
  ['<meta property="og:image:alt" content="Vitor Hugo Sarilio, analista de dados: transformo dados brutos em decisões que rodam sozinhas.">',
    `<meta property="og:image:alt" content="${alt}">`],
  ['<meta name="twitter:title" content="Vitor Sarilio | Analista de Dados, BI e Automações">', `<meta name="twitter:title" content="${titulo}">`],
  ['<meta name="twitter:description" content="Transformo dados brutos em decisões que rodam sozinhas: dashboards, pipelines e automações para a sua operação.">',
    `<meta name="twitter:description" content="${social}">`],
  [`<meta name="twitter:image" content="${SITE}/og-image.jpg">`, `<meta name="twitter:image" content="${SITE}/og-image-en.jpg">`],
  ['<meta name="twitter:image:alt" content="Vitor Hugo Sarilio, analista de dados: transformo dados brutos em decisões que rodam sozinhas.">',
    `<meta name="twitter:image:alt" content="${alt}">`],
  ['"jobTitle": "Analista de Dados",', '"jobTitle": "Data Analyst",'],
];

const origem = join(raiz, 'dist', 'index.html');
let html = readFileSync(origem, 'utf8');
for (const [pt, en] of TROCAS) {
  const vezes = html.split(pt).length - 1;
  if (vezes !== 1) {
    throw new Error(`paginas-por-idioma: esperava achar 1 vez, achei ${vezes}: ${pt.slice(0, 80)}`);
  }
  html = html.replace(pt, en);
}

const destino = join(raiz, 'dist', 'en', 'index.html');
mkdirSync(dirname(destino), { recursive: true });
writeFileSync(destino, html);
console.log(`paginas-por-idioma: ${TROCAS.length} trocas, gerado dist/en/index.html`);
