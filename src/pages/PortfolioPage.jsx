import { useOutletContext } from 'react-router-dom';

// Seções
import { AboutSection } from '../sections/AboutSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { PersonalProjectsSection } from '../sections/PersonalProjectsSection';
import { ResumeSection } from '../sections/ResumeSection';

// Dados
import { portfolioData } from '../data/portfolioData';

export default function PortfolioPage() {
  const { user, projects, resume } = portfolioData;
  const { trackEvent } = useOutletContext();
  return (
    <>
      <AboutSection user={user} trackEvent={trackEvent} />
      <ProjectsSection projects={projects} trackEvent={trackEvent} />
      <PersonalProjectsSection />
      <ResumeSection resume={resume} trackEvent={trackEvent} />
    </>
  );
}