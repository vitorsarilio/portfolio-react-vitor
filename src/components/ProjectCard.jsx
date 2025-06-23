import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';

export const ProjectCard = ({ project, trackEvent }) => {
  const isInternalLink = project.liveUrl && project.liveUrl.startsWith('/');

  const LiveLink = isInternalLink ? Link : 'a';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={project.imageUrl} alt={`[Imagem de ${project.title}]`} className="w-full h-48 object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/DDD/333?text=Imagem+Indisponivel'} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-purple-700 dark:text-purple-400">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Tecnologias:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 text-xs rounded-full">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && project.liveUrl !== "#" && (
            <LiveLink 
              to={isInternalLink ? project.liveUrl : undefined}
              href={!isInternalLink ? project.liveUrl : undefined}
              target={!isInternalLink ? "_blank" : undefined}
              rel={!isInternalLink ? "noopener noreferrer" : undefined}
              onClick={() => trackEvent('Projeto', 'Clique Ver Projeto', project.title)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center text-sm"
            >
              Ver Projeto <ExternalLink size={16} className="ml-1" />
            </LiveLink>
          )}
          {project.repoUrl && project.repoUrl !== "#" && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('Projeto', 'Clique Repositório', project.title)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center text-sm">
              Repositório <Github size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};