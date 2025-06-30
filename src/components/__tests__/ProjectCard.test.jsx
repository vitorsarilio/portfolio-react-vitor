import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from '../ProjectCard';

describe('ProjectCard', () => {
  const project = {
    title: 'Test Project',
    description: 'A simple test project description.',
    technologies: ['React', 'Vite', 'TailwindCSS'],
    imageUrl: 'https://placehold.co/600x400',
    liveUrl: 'http://live.com',
    repoUrl: 'http://repo.com',
  };

  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: MemoryRouter });
  }

  it('should render project details correctly', () => {
    renderWithRouter(<ProjectCard project={project} trackEvent={vi.fn()} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A simple test project description.')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', project.imageUrl);
    
    // Check for technology tags
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /Ver Projeto/i })).toHaveAttribute('href', project.liveUrl);
    expect(screen.getByRole('link', { name: /Repositório/i })).toHaveAttribute('href', project.repoUrl);
  });

  it('should not render live link if not provided or is #', () => {
    const projectWithoutLive = { ...project, liveUrl: '#' };
    renderWithRouter(<ProjectCard project={projectWithoutLive} trackEvent={vi.fn()} />);
    expect(screen.queryByRole('link', { name: /Ver Projeto/i })).not.toBeInTheDocument();
  });

  it('should not render repo link if not provided or is #', () => {
    const projectWithoutRepo = { ...project, repoUrl: '#' };
    renderWithRouter(<ProjectCard project={projectWithoutRepo} trackEvent={vi.fn()} />);
    expect(screen.queryByRole('link', { name: /Repositório/i })).not.toBeInTheDocument();
  });
});
