import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SkillLogo } from '../SkillLogo';

describe('SkillLogo', () => {
  it('should render the skill name and its logo', () => {
    const props = {
      imageUrl: '/logo.svg',
      altText: 'Python Logo',
      label: 'Python',
    };
    render(<SkillLogo {...props} />);

    const skillLabel = screen.getByText('Python');
    const skillImage = screen.getByRole('img', { name: /python logo/i });

    expect(skillLabel).toBeInTheDocument();
    expect(skillImage).toBeInTheDocument();
    expect(skillImage).toHaveAttribute('src', '/logo.svg');
  });
});
