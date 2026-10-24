import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { portfolioData } from '../../data/portfolioData';
import { logoPorArquivo } from '../../lib/logos';
import { StatsSection } from '../StatsSection';
import { contarNumeros } from '../../lib/numeros';
import { CareerSection } from '../CareerSection';
import { StackSection } from '../StackSection';
import { HeroSection } from '../HeroSection';

const { resume, user } = portfolioData;

describe('portfolio data', () => {
  it('has a logo file for every company, skill, course and certificate that names one', () => {
    const arquivos = [
      ...resume.companies.map((c) => c.logo),
      ...resume.skillGroups.flatMap((g) => g.items).map((i) => i.logo),
      ...resume.education.map((e) => e.logo),
      ...resume.certifications.map((c) => c.logo),
    ].filter(Boolean);
    const faltando = arquivos.filter((a) => !logoPorArquivo[a]);
    expect(faltando).toEqual([]);
  });

  it('includes the automation tools', () => {
    const nomes = resume.skillGroups.flatMap((g) => g.items).map((i) => i.name);
    expect(nomes).toEqual(expect.arrayContaining(['n8n', 'Lovable', 'monday.com']));
  });
});

describe('StatsSection', () => {
  it('counts the companies from the same list the career strip shows', () => {
    const numeros = contarNumeros(portfolioData);
    expect(numeros[1]).toMatchObject({ chave: 'empresas', valor: resume.companies.length });
  });

  it('shows the final numbers when animations are off', () => {
    document.documentElement.classList.add('sem-animacao');
    render(<StatsSection dados={portfolioData} />);
    expect(screen.getByText(String(resume.companies.length))).toBeInTheDocument();
    document.documentElement.classList.remove('sem-animacao');
  });
});

describe('CareerSection', () => {
  it('lists each company once for screen readers, with its logo', () => {
    render(<CareerSection companies={resume.companies} />);
    const lista = screen.getByRole('list', { name: 'Empresas para as quais já prestei serviço' });
    expect(within(lista).getAllByRole('img')).toHaveLength(resume.companies.length);
    expect(within(lista).getAllByRole('img', { name: 'Leega' })).toHaveLength(1);
  });
});

describe('StackSection', () => {
  it('shows every skill once for screen readers across both rows', () => {
    const { container } = render(<StackSection skillGroups={resume.skillGroups} />);
    const total = resume.skillGroups.reduce((soma, g) => soma + g.items.length, 0);
    expect(container.querySelectorAll('.trilho > li:not([aria-hidden])')).toHaveLength(total);
  });
});

describe('HeroSection', () => {
  it('links the main buttons to WhatsApp and to the projects', () => {
    render(<HeroSection user={user} trackEvent={() => {}} />);
    expect(screen.getByRole('link', { name: 'Falar no WhatsApp' }).getAttribute('href')).toMatch(/^https:\/\/wa\.me\/5511987191928\?text=/);
    expect(screen.getByRole('link', { name: 'Ver projetos' })).toHaveAttribute('href', '#projetos');
    expect(screen.getByRole('heading', { level: 1, name: 'Transformo dados brutos em decisões que rodam sozinhas.' })).toBeInTheDocument();
  });
});
