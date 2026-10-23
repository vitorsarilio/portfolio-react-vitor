import { useOutletContext } from 'react-router-dom';

import { HeroSection } from '../sections/HeroSection';
import { StatsSection } from '../sections/StatsSection';
import { AboutSection } from '../sections/AboutSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { PersonalProjectsSection } from '../sections/PersonalProjectsSection';
import { EducationSection } from '../sections/EducationSection';
import { CareerSection } from '../sections/CareerSection';
import { StackSection } from '../sections/StackSection';

import { portfolioData } from '../data/portfolioData';
import { useRevela } from '../lib/useRevela';

export default function PortfolioPage() {
  const { user, projects, personalProjects, resume } = portfolioData;
  const { trackEvent } = useOutletContext();
  useRevela();

  return (
    <>
      <title>Vitor Hugo Sarilio | Dados, engenharia e automações</title>
      <meta name="description" content="Analista de dados: pipelines no Airflow e no BigQuery, modelagem com SQL e dbt, dashboards em Power BI e automações com n8n." />
      <HeroSection user={user} trackEvent={trackEvent} />
      <main id="conteudo">
        <StatsSection dados={portfolioData} />
        <AboutSection user={user} />
        <ProjectsSection projects={projects} />
        <PersonalProjectsSection projects={personalProjects} trackEvent={trackEvent} />
        <EducationSection education={resume.education} certifications={resume.certifications} trackEvent={trackEvent} />
        <CareerSection companies={resume.companies} />
        <StackSection skillGroups={resume.skillGroups} />
      </main>
    </>
  );
}
