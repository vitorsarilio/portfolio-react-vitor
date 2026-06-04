import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '../Footer';
import { portfolioData } from '../../data/portfolioData';

describe('Footer', () => {
  it('should render the footer with user name and current year', () => {
    const { user } = portfolioData;
    const currentYear = new Date().getFullYear();

    render(<Footer {...user} />);

    const footerText = screen.getByText(`© ${currentYear} ${user.name}. Todos os direitos reservados.`);
    expect(footerText).toBeInTheDocument();
  });
});
