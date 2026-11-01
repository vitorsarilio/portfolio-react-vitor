import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TEXTOS } from '../textos';
import { idiomaDoCaminho, paginaDoCaminho } from '../idioma';
import { rotas } from '../../rotas';
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

describe('language from the address', () => {
  it('reads the language and the page from the path', () => {
    expect(idiomaDoCaminho('/')).toBe('pt-BR');
    expect(idiomaDoCaminho('/privacidade')).toBe('pt-BR');
    expect(idiomaDoCaminho('/en')).toBe('en-US');
    expect(idiomaDoCaminho('/en/')).toBe('en-US');
    expect(idiomaDoCaminho('/en/privacy')).toBe('en-US');
    expect(idiomaDoCaminho('/enfeite')).toBe('pt-BR');
    expect(paginaDoCaminho('/en/')).toBe('inicio');
    expect(paginaDoCaminho('/en/privacy')).toBe('privacidade');
    expect(paginaDoCaminho('/nao-existe')).toBeUndefined();
  });
});

describe('language switch', () => {
  let roteador;
  const abrir = (endereco) => {
    roteador = createMemoryRouter(rotas, { initialEntries: [endereco] });
    render(<RouterProvider router={roteador} />);
  };
  const endereco = () => roteador.state.location.pathname;
  const navegadorEm = (lingua) => vi.spyOn(navigator, 'language', 'get').mockReturnValue(lingua);

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('consentimento-analytics', 'recusado');
    document.documentElement.classList.add('sem-animacao');
    window.scrollTo = () => {};
    Element.prototype.scrollIntoView = () => {};
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })));
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function medir() {
      return { top: 0, left: 0, right: 0, bottom: this.id === 'vaga-c137' ? 600 : 0, width: 0, height: 0, x: 0, y: 0 };
    });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ response: 'Ele entregou quatro projetos.' }) })));
  });

  afterEach(() => {
    document.documentElement.classList.remove('sem-animacao');
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('never redirects by browser language: a visitor (or Google) in English still gets "/" in Portuguese', () => {
    navegadorEm('en-US');
    abrir('/');
    expect(endereco()).toBe('/');
    expect(document.documentElement.lang).toBe('pt-BR');
    expect(screen.getByRole('link', { name: 'Falar no WhatsApp' })).toBeInTheDocument();
  });

  it('moves to /en with the button, keeping the C137 conversation, and remembers the choice', async () => {
    navegadorEm('pt-BR');
    const user = userEvent.setup();
    abrir('/');
    await user.click(screen.getByRole('button', { name: 'Quais projetos ele já entregou?' }));
    await screen.findByText('Ele entregou quatro projetos.');

    await user.click(screen.getByRole('button', { name: 'English' }));

    expect(endereco()).toBe('/en');
    expect(document.documentElement.lang).toBe('en-US');
    expect(localStorage.getItem('idioma')).toBe('en-US');
    expect(screen.getByRole('heading', { level: 1, name: 'I turn raw data into decisions that run on their own.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Message me on WhatsApp' }).getAttribute('href')).toContain(encodeURIComponent('Hi Vitor, I saw your portfolio'));
    expect(screen.getByRole('link', { name: 'Privacy' })).toHaveAttribute('href', '/en/privacy');

    // the chat moved into the new top slot with the same conversation
    const painel = screen.getByRole('region', { name: 'C137' });
    expect(document.getElementById('vaga-c137')).toContainElement(painel);
    expect(within(painel).getByText('Ele entregou quatro projetos.')).toBeInTheDocument();
  });

  it('sends a returning visitor straight to the language they chose', () => {
    localStorage.setItem('idioma', 'en-US');
    abrir('/');
    expect(endereco()).toBe('/en');
  });

  it('keeps an unknown address on the 404 even with a saved choice', () => {
    localStorage.setItem('idioma', 'en-US');
    abrir('/link-velho');
    expect(endereco()).toBe('/link-velho');
    expect(screen.getByRole('heading', { level: 1, name: 'Esta página não existe' })).toBeInTheDocument();
  });

  it('offers the other version to a visitor whose browser is in another language', async () => {
    navegadorEm('en-GB');
    const user = userEvent.setup();
    abrir('/');
    const aviso = screen.getByText('This site is also available in English.');
    expect(aviso.closest('aside')).toHaveAttribute('data-nosnippet');

    await user.click(screen.getByRole('button', { name: 'View in English' }));
    expect(endereco()).toBe('/en');
    expect(screen.queryByText('This site is also available in English.')).not.toBeInTheDocument();
  });

  it('hides the offer for good when dismissed', async () => {
    navegadorEm('en-GB');
    const user = userEvent.setup();
    abrir('/');
    await user.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('This site is also available in English.')).not.toBeInTheDocument();
    expect(localStorage.getItem('idioma')).toBe('pt-BR');
    expect(endereco()).toBe('/');
  });

  it('sends the question in English from /en', async () => {
    navegadorEm('en-US');
    const user = userEvent.setup();
    abrir('/en');
    await act(async () => {});
    await user.click(screen.getByRole('button', { name: 'What projects has he delivered?' }));
    await screen.findByText('Ele entregou quatro projetos.');
    const corpo = JSON.parse(fetch.mock.calls[0][1].body);
    expect(corpo.language).toBe('en-US');
    expect(corpo.history).toEqual([{ sender: 'bot', text: TEXTOS['en-US'].c137.saudacao }]);
  });
});
