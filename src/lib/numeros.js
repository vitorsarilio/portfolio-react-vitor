import { anosDesde } from './contato';

// Every number on the page comes from the portfolio data, so it stays true as the data changes.
export const contarNumeros = ({ user, resume, personalProjects }) => [
  { valor: anosDesde(user.dataSince), sufixo: '+', rotulo: 'anos trabalhando com dados' },
  { valor: resume.companies.length, rotulo: 'empresas para as quais já prestei serviço' },
  { valor: resume.skillGroups.reduce((soma, g) => soma + g.items.length, 0), rotulo: 'habilidades e ferramentas no dia a dia' },
  { valor: personalProjects.filter((p) => p.liveUrl).length, rotulo: 'projetos pessoais no ar' },
];
