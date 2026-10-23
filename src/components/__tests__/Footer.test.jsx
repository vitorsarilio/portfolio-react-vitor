import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Footer } from '../Footer';
import { portfolioData } from '../../data/portfolioData';

const renderizar = (user) => render(<MemoryRouter><Footer {...user} /></MemoryRouter>);

describe('Footer', () => {
  const { user } = portfolioData;

  it('shows the name and the current year', () => {
    renderizar(user);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ${user.name}`))).toBeInTheDocument();
  });

  it('links to every contact channel', () => {
    renderizar(user);
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', `https://wa.me/${user.phone}?text=${encodeURIComponent(user.whatsappMessage)}`);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', user.linkedin);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', user.github);
    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute('href', `mailto:${user.email}`);
  });

  it('links to the privacy policy and to the cookie preferences', () => {
    renderizar(user);
    expect(screen.getByRole('link', { name: 'Privacidade' })).toHaveAttribute('href', '/privacidade');
    expect(screen.getByRole('button', { name: 'Preferências de cookies' })).toBeInTheDocument();
  });
});
