import { useEffect } from 'react';

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
import { useIdioma } from '../i18n/idioma';

export default function PortfolioPage() {
  useEffect(() => {
    if (!window.location.hash) return;
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }, []);
  const { user, projects, personalProjects, resume } = portfolioData;
  const { t } = useIdioma();
  useRevela();

  return (
    <>
      <title>{t.meta.titulo}</title>
      <meta name="description" content={t.meta.descricao} />
      <HeroSection user={user} />
      <main id="conteudo">
        <StatsSection dados={portfolioData} />
        <AboutSection user={user} />
        <ProjectsSection projects={projects} />
        <PersonalProjectsSection projects={personalProjects} />
        <EducationSection education={resume.education} certifications={resume.certifications} />
        <CareerSection companies={resume.companies} />
        <StackSection skillGroups={resume.skillGroups} />
      </main>
    </>
  );
}
