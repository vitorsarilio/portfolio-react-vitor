import { anosDesde } from './contato';

// Every number on the page comes from the portfolio data, so it stays true as the data changes.
// `chave` picks the label in the language texts (t.numeros).
export const contarNumeros = ({ user, resume, personalProjects }) => [
  { chave: 'anos', valor: anosDesde(user.dataSince), sufixo: '+' },
  { chave: 'empresas', valor: resume.companies.length },
  { chave: 'habilidades', valor: resume.skillGroups.reduce((soma, g) => soma + g.items.length, 0) },
  { chave: 'projetos', valor: personalProjects.filter((p) => p.liveUrl).length },
];
