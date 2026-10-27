import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { C137, C137Vaga } from '../C137';
import { TEXTOS } from '../../i18n/textos';

const SAUDACAO = TEXTOS['pt-BR'].c137.saudacao;

// jsdom has no layout: fake where the top-of-page slot is on screen
let fundoDaVaga = 600;
const rolarPara = (fundo) => act(() => {
  fundoDaVaga = fundo;
  window.dispatchEvent(new Event('scroll'));
});

const Pagina = () => (
  <MemoryRouter>
    <C137Vaga />
    <C137 />
  </MemoryRouter>
);

describe('C137', () => {
  beforeEach(() => {
    fundoDaVaga = 600;
    // no fade in tests: changes happen at once
    document.documentElement.classList.add('sem-animacao');
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function medir() {
      const bottom = this.id === 'vaga-c137' ? fundoDaVaga : 0;
      return { top: 0, left: 0, right: 0, bottom, width: 0, height: 0, x: 0, y: 0 };
    });
    vi.stubGlobal('fetch', vi.fn(async () => ({ ok: true, json: async () => ({ response: 'Ele entregou quatro projetos.' }) })));
  });

  afterEach(() => {
    document.documentElement.classList.remove('sem-animacao');
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('starts docked in the top slot, open, with the greeting', () => {
    render(<Pagina />);
    const painel = screen.getByRole('region', { name: 'C137' });
    expect(document.getElementById('vaga-c137')).toContainElement(painel);
    expect(painel).toHaveClass('ancorado');
    expect(screen.getByText(SAUDACAO)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Pergunte à C137/ })).not.toBeInTheDocument();
  });

  it('sends the question with the conversation so far and shows the answer', async () => {
    const user = userEvent.setup();
    render(<Pagina />);
    await user.type(screen.getByLabelText('Sua pergunta para a C137'), 'Quais projetos?');
    await user.click(screen.getByRole('button', { name: 'Enviar' }));

    expect(await screen.findByText('Ele entregou quatro projetos.')).toBeInTheDocument();
    const corpo = JSON.parse(fetch.mock.calls[0][1].body);
    expect(corpo).toEqual({ prompt: 'Quais projetos?', history: [{ sender: 'bot', text: SAUDACAO }], language: 'pt-BR' });
  });

  it('keeps the same conversation when it moves to the corner and back to the top', async () => {
    const user = userEvent.setup();
    render(<Pagina />);
    await user.click(screen.getByRole('button', { name: 'Ele trabalha com automações?' }));
    await screen.findByText('Ele entregou quatro projetos.');
    const painel = screen.getByRole('region', { name: 'C137' });

    // scrolled past the top: flies to the corner, minimized behind the button
    rolarPara(40);
    expect(painel).toHaveClass('flutuante');
    expect(painel).not.toHaveClass('aberto');
    expect(document.getElementById('vaga-c137')).not.toContainElement(painel);

    // reopened: stays floating while scrolling, same messages
    await user.click(screen.getByRole('button', { name: /Pergunte à C137/ }));
    expect(painel).toHaveClass('flutuante', 'aberto');
    rolarPara(-800);
    expect(painel).toHaveClass('aberto');
    expect(within(painel).getByText('Ele trabalha com automações?')).toBeInTheDocument();

    // back at the top: returns to its slot, still the same element and history
    rolarPara(600);
    expect(document.getElementById('vaga-c137')).toContainElement(painel);
    expect(screen.getByRole('region', { name: 'C137' })).toBe(painel);
    expect(within(painel).getByText('Ele entregou quatro projetos.')).toBeInTheDocument();
    expect(within(painel).getAllByText(/./, { selector: '.msg' })).toHaveLength(3);
  });

  it('minimizes with the close button or Escape while floating', async () => {
    const user = userEvent.setup();
    render(<Pagina />);
    rolarPara(40);
    await user.click(screen.getByRole('button', { name: /Pergunte à C137/ }));
    await user.click(screen.getByRole('button', { name: 'Minimizar chat' }));
    expect(screen.getByRole('region', { name: 'C137', hidden: true })).not.toHaveClass('aberto');

    await user.click(screen.getByRole('button', { name: /Pergunte à C137/ }));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.getByRole('button', { name: /Pergunte à C137/ })).toHaveFocus());
  });

  it('explains the question limit instead of showing a generic error', async () => {
    fetch.mockImplementationOnce(async () => ({ ok: false, status: 429 }));
    const user = userEvent.setup();
    render(<Pagina />);
    await user.click(screen.getByRole('button', { name: 'Como falar com ele?' }));
    expect(await screen.findByText('Você fez muitas perguntas seguidas. Espere um minuto e tente de novo.')).toBeInTheDocument();
    expect(screen.queryByText(/houve um erro/)).not.toBeInTheDocument();
  });

  it('shows a clear message when the answer takes too long or fails', async () => {
    fetch.mockImplementationOnce(async () => ({ ok: false, status: 500 }));
    const user = userEvent.setup();
    render(<Pagina />);
    await user.click(screen.getByRole('button', { name: 'Como falar com ele?' }));
    expect(await screen.findByText(/houve um erro ao processar sua pergunta/)).toBeInTheDocument();
  });
});
