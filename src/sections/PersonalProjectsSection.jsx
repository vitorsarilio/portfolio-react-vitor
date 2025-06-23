import { portfolioData } from '../data/portfolioData';
import { ProjectCard } from '../components/ProjectCard';

export const PersonalProjectsSection = ({ trackEvent }) => {
  const { personalProjects } = portfolioData;

  return (
    <section id="personal-projects" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">
          Meus Projetos Pessoais
        </h2>
        {personalProjects && personalProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {personalProjects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                trackEvent={trackEvent} 
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Nenhum projeto pessoal para exibir no momento.</p>
        )}      
      </div>
    </section>
  );
};