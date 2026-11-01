import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { rotas } from '../../rotas';
import ErrorPage from '../ErrorPage';

const abrir = (endereco, lista = rotas) => render(<RouterProvider router={createMemoryRouter(lista, { initialEntries: [endereco] })} />);

describe('page not found and unexpected errors', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('consentimento-analytics', 'recusado');
    window.scrollTo = () => {};
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: false, addEventListener: () => {}, removeEventListener: () => {} })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('shows the site page for an address that does not exist, with the menu and a way back', () => {
    localStorage.setItem('idioma', 'pt-BR');
    abrir('/projeto-que-nao-existe');

    expect(screen.getByRole('heading', { level: 1, name: 'Esta página não existe' })).toBeInTheDocument();
    expect(screen.getByText('GET /projeto-que-nao-existe')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Voltar ao início' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
    expect(screen.queryByText(/Unexpected Application Error/)).not.toBeInTheDocument();
  });

  it('speaks English under /en', () => {
    abrir('/en/old-link');
    expect(screen.getByRole('heading', { level: 1, name: "This page doesn't exist" })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to the start' })).toBeInTheDocument();
  });

  it('replaces the developer screen with a friendly page when rendering breaks', () => {
    localStorage.setItem('idioma', 'pt-BR');
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const Quebra = () => { throw new Error('falhou'); };
    abrir('/', [{ path: '/', element: <Quebra />, errorElement: <ErrorPage /> }]);

    expect(screen.getByRole('heading', { level: 1, name: 'Algo deu errado' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Recarregar a página' })).toBeInTheDocument();
    expect(screen.queryByText(/Unexpected Application Error/)).not.toBeInTheDocument();
  });
});
