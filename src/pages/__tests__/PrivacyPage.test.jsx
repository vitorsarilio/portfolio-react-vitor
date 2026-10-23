import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PrivacyPage from '../PrivacyPage';
import { portfolioData } from '../../data/portfolioData';

describe('PrivacyPage', () => {
  it('explains each kind of data and how to contact the controller', () => {
    window.scrollTo = () => {};
    render(<MemoryRouter><PrivacyPage /></MemoryRouter>);
    expect(screen.getByRole('heading', { level: 1, name: 'Política de privacidade' })).toBeInTheDocument();
    for (const secao of ['Google Analytics (só com o seu consentimento)', 'C137, a assistente virtual', 'Hospedagem e segurança', 'Seus direitos']) {
      expect(screen.getByRole('heading', { level: 2, name: secao })).toBeInTheDocument();
    }
    expect(screen.getAllByRole('link', { name: portfolioData.user.email })[0]).toHaveAttribute('href', `mailto:${portfolioData.user.email}`);
    expect(screen.getByRole('button', { name: 'Mudar preferências de cookies' })).toBeInTheDocument();
  });
});
