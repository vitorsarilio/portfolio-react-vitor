import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TEXTOS } from '../textos';
import { idiomaInicial } from '../idioma';
import { IdiomaProvider } from '../IdiomaProvider';
import { Navbar } from '../../components/Navbar';
import { C137, C137Vaga } from '../../components/C137';
import { HeroSection } from '../../sections/HeroSection';
import { portfolioData } from '../../data/portfolioData';

// same shape in both languages: same keys, arrays of the same length, functions where the other has functions
const forma = (valor) => {
  if (typeof valor === 'function') return 'função';
  if (Array.isArray(valor)) return valor.map(forma);
  if (valor && typeof valor === 'object') return Object.fromEntries(Object.keys(valor).sort().map((k) => [k, forma(valor[k])]));
  return typeof valor;
};

describe('language texts', () => {
  it('has every Portuguese text also in English', () => {
    expect(forma(TEXTOS['en-US'])).toEqual(forma(TEXTOS['pt-BR']));
  });

  it('has an English version for every text shown from the portfolio data', () => {
    const { projects, personalProjects, resume, user } = portfolioData;
    const faltando = [
      ...projects.filter((p) => !p.en?.shortTitle || !p.en?.summary).map((p) => p.title),
      ...personalProjects.filter((p) => !p.en?.summary || !p.en?.linkLabel).map((p) => p.title),
      ...resume.education.filter((e) => !e.en?.shortDegree).map((e) => e.degree),
      ...resume.certifications.filter((c) => !c.en?.shortName).map((c) => c.name),
      ...resume.skillGroups.filter((g) => !g.en?.name).map((g) => g.name),
      ...user.languages.filter((l) => !l.en?.name).map((l) => l.name),
    ];
    expect(faltando).toEqual([]);
  });
});

describe('language switch', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.add('sem-animacao');
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })));
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function medir() {
      return { top: 0, left: 0, right: 0, bottom: this.id === 'vaga-c137' ? 600 : 0, width: 0, height: 0, x: 0, y: 0 };
    });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ response: 'He delivered four projects.' }) })));
  });

  afterEach(() => {
    document.documentElement.classList.remove('sem-animacao');
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('starts in Portuguese for a Portuguese browser and in English otherwise', () => {
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('pt-BR');
    expect(idiomaInicial()).toBe('pt-BR');
    vi.spyOn(navigator, 'language', 'get').mockReturnValue('en-GB');
    expect(idiomaInicial()).toBe('en-US');
    localStorage.setItem('idioma', 'pt-BR');
    expect(idiomaInicial()).toBe('pt-BR');
  });

  it('switches the page, the C137 and <html lang>, and remembers the choice', async () => {
    localStorage.setItem('idioma', 'pt-BR');
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <IdiomaProvider>
          <Navbar />
          <HeroSection user={portfolioData.user} />
          <C137Vaga />
          <C137 />
        </IdiomaProvider>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(document.documentElement.lang).toBe('en-US');
    expect(localStorage.getItem('idioma')).toBe('en-US');
    expect(screen.getByRole('link', { name: 'Message me on WhatsApp' }).getAttribute('href')).toContain(encodeURIComponent('Hi Vitor, I saw your portfolio'));
    expect(screen.getByRole('heading', { level: 1, name: 'I turn raw data into decisions that run on their own.' })).toBeInTheDocument();
    expect(screen.getByText(TEXTOS['en-US'].c137.saudacao)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'What projects has he delivered?' }));
    expect(await screen.findByText('He delivered four projects.')).toBeInTheDocument();
    const corpo = JSON.parse(fetch.mock.calls[0][1].body);
    expect(corpo.language).toBe('en-US');
    expect(corpo.history).toEqual([{ sender: 'bot', text: TEXTOS['en-US'].c137.saudacao }]);
  });
});
