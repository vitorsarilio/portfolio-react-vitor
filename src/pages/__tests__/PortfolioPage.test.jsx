import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PortfolioPage from '../PortfolioPage';

describe('PortfolioPage', () => {
  it('renders every section with or without a #section in the address', () => {
    for (const hash of ['', '#stack']) {
      window.history.replaceState(null, '', `/${hash}`);
      Element.prototype.scrollIntoView = () => {};
      const { unmount } = render(<MemoryRouter><PortfolioPage /></MemoryRouter>);
      for (const titulo of ['Projetos profissionais', 'Projetos pessoais no ar', 'Onde estudei', 'Empresas e clientes', 'Ferramentas do dia a dia']) {
        expect(screen.getByRole('heading', { level: 2, name: titulo })).toBeInTheDocument();
      }
      unmount();
    }
  });
});
