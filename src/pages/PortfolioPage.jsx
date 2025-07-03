import { useOutletContext } from 'react-router-dom';

import { AboutSection } from '../sections/AboutSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { PersonalProjectsSection } from '../sections/PersonalProjectsSection';
import { ResumeSection } from '../sections/ResumeSection';

import { portfolioData } from '../data/portfolioData';

export default function PortfolioPage() {
  const { user, projects, resume } = portfolioData;
  const { trackEvent } = useOutletContext();
  return (
    <>
      <title>Vitor Hugo Sarilio | Portfólio de Analista de Dados</title>
      <meta name="description" content="Analista de dados especialista em Business Intelligence (BI), SQL, Python, Power BI e automação de pipelines com Apache Airflow." />
      <meta property="og:title" content="Vitor Hugo Sarilio | Portfólio de Analista de Dados" />
      <meta property="og:description" content="Projetos e experiência em análise e engenharia de dados. Conheça meu trabalho." />
      <meta property="og:url" content="https://www.vitorsarilio.com/"/>
      <meta property="og:image" content="https://www.vitorsarilio.com/thumbnail.svg" />
      <meta property="twitter:card" content="summary_large_image" />
      <AboutSection user={user} trackEvent={trackEvent} />
      <ProjectsSection projects={projects} trackEvent={trackEvent} />
      <PersonalProjectsSection trackEvent={trackEvent}/>
      <ResumeSection resume={resume} trackEvent={trackEvent} />
    </>
  );
}