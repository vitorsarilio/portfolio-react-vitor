import { createElement } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('react-ga4', () => ({ default: { initialize: vi.fn(), event: vi.fn() } }));

// fresh module each test: the "already started" flag lives in the module
const carregar = async () => {
  vi.resetModules();
  const analytics = await import('../../lib/analytics');
  const { AvisoCookies } = await import('../AvisoCookies');
  return { analytics, AvisoCookies };
};

const renderizar = (componente) => render(<MemoryRouter>{createElement(componente)}</MemoryRouter>);

describe('Analytics consent (LGPD)', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
    window.dataLayer = [];
  });

  it('does not load Google Analytics or send events before the visitor decides', async () => {
    const { analytics, AvisoCookies } = await carregar();
    renderizar(AvisoCookies);
    analytics.iniciarSeConsentido();
    analytics.registrar(analytics.EVENTOS.cliqueWhatsapp, { local: 'topo' });

    expect(screen.getByRole('region', { name: 'Cookies e privacidade' })).toBeInTheDocument();
    expect(ReactGA.initialize).not.toHaveBeenCalled();
    expect(ReactGA.event).not.toHaveBeenCalled();
  });

  it('starts Analytics without ads or Google signals when the visitor allows it', async () => {
    const user = userEvent.setup();
    const { analytics, AvisoCookies } = await carregar();
    renderizar(AvisoCookies);
    await user.click(screen.getByRole('button', { name: 'Permitir análise' }));

    expect(localStorage.getItem('consentimento-analytics')).toBe('aceito');
    expect(ReactGA.initialize).toHaveBeenCalledWith('G-Z1643DT14D', {
      gtagOptions: { allow_google_signals: false, allow_ad_personalization_signals: false },
    });
    const consentimento = [...window.dataLayer[0]];
    expect(consentimento).toEqual(['consent', 'default', expect.objectContaining({ analytics_storage: 'granted', ad_storage: 'denied' })]);
    expect(screen.queryByRole('region', { name: 'Cookies e privacidade' })).not.toBeInTheDocument();

    analytics.registrar(analytics.EVENTOS.c137EnviarPergunta, { local: 'topo', origem: 'sugestao' });
    expect(ReactGA.event).toHaveBeenCalledWith('c137_enviar_pergunta', { local: 'topo', origem: 'sugestao' });
  });

  it('keeps Analytics off when the visitor refuses, and remembers it on the next visit', async () => {
    const user = userEvent.setup();
    const { AvisoCookies } = await carregar();
    renderizar(AvisoCookies);
    await user.click(screen.getByRole('button', { name: 'Recusar' }));
    expect(localStorage.getItem('consentimento-analytics')).toBe('recusado');

    const proxima = await carregar();
    renderizar(proxima.AvisoCookies);
    proxima.analytics.iniciarSeConsentido();
    expect(screen.queryByRole('region', { name: 'Cookies e privacidade' })).not.toBeInTheDocument();
    expect(ReactGA.initialize).not.toHaveBeenCalled();
  });

  it('can be reopened from the footer to withdraw consent, which deletes the GA cookies', async () => {
    const user = userEvent.setup();
    localStorage.setItem('consentimento-analytics', 'aceito');
    document.cookie = '_ga=GA1.1.123; path=/';
    const { analytics, AvisoCookies } = await carregar();
    analytics.iniciarSeConsentido();
    renderizar(AvisoCookies);
    expect(screen.queryByRole('region', { name: 'Cookies e privacidade' })).not.toBeInTheDocument();

    act(() => analytics.abrirPreferenciasDeCookies());
    expect(screen.getByText('Escolha atual: análise permitida.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Recusar' }));

    expect(document.cookie).not.toMatch(/_ga=/);
    analytics.registrar(analytics.EVENTOS.cliqueEmail, { local: 'rodape' });
    expect(ReactGA.event).not.toHaveBeenCalled();
  });
});
