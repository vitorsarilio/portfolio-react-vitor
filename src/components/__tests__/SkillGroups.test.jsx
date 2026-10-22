import { render, screen, within } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillGroups } from '../SkillGroups';
import { portfolioData } from '../../data/portfolioData';

describe('SkillGroups', () => {
  const groups = [
    { name: 'BI', items: [{ name: 'Power BI', logo: '03-power-bi.svg' }, { name: 'DAX' }] },
    { name: 'Nuvem', items: [{ name: 'Google BigQuery' }] },
  ];

  it('renders each group with its skills', () => {
    render(<SkillGroups groups={groups} />);
    expect(screen.getByRole('heading', { name: 'BI' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Nuvem' })).toBeInTheDocument();
    expect(screen.getByText('Power BI')).toBeInTheDocument();
    expect(screen.getByText('DAX')).toBeInTheDocument();
  });

  it('shows the logo as a decorative image only when the item has one', () => {
    const { container } = render(<SkillGroups groups={groups} />);
    const images = container.querySelectorAll('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('alt', '');
    expect(images[0]).toHaveAttribute('loading', 'lazy');
  });

  it('resolves every logo referenced in the portfolio data', () => {
    const { container } = render(<SkillGroups groups={portfolioData.resume.skillGroups} />);
    const withLogo = portfolioData.resume.skillGroups.flatMap(g => g.items).filter(i => i.logo);
    expect(container.querySelectorAll('img')).toHaveLength(withLogo.length);
    within(container).getAllByRole('listitem').forEach(li => expect(li.textContent).not.toBe(''));
  });
});
