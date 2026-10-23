import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../Footer';
import { portfolioData } from '../../data/portfolioData';

describe('Footer', () => {
  const { user } = portfolioData;

  it('shows the name and the current year', () => {
    render(<Footer {...user} />);
    expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()} ${user.name}`))).toBeInTheDocument();
  });

  it('links to every contact channel', () => {
    render(<Footer {...user} />);
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', `https://wa.me/${user.phone}?text=${encodeURIComponent(user.whatsappMessage)}`);
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute('href', user.linkedin);
    expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute('href', user.github);
    expect(screen.getByRole('link', { name: 'E-mail' })).toHaveAttribute('href', `mailto:${user.email}`);
  });
});
