import { ProjectCard } from '../components/ProjectCard';

export const ProjectsSection = ({ projects, trackEvent }) => {
    return (
        <section 
            id="projects" 
            className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20"
        >
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">Meus Projetos Profissionais</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} trackEvent={trackEvent} />
                ))}
              </div>
               {projects.length === 0 && <p className="text-center text-gray-600 dark:text-gray-400">Nenhum projeto profissional para exibir no momento.</p>}
            </div>
        </section>
    );
};