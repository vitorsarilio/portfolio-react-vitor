import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Mail } from 'lucide-react';
import { ContactButton } from '../ContactButton';

describe('ContactButton', () => {
  it('renders a labeled link and tracks the click', async () => {
    // preventDefault: jsdom can't follow mailto: links
    const onClick = vi.fn(e => e.preventDefault());
    render(<ContactButton href="mailto:test@example.com" label="E-mail" icon={<Mail />} onClick={onClick} />);

    const link = screen.getByRole('link', { name: 'E-mail' });
    expect(link).toHaveAttribute('href', 'mailto:test@example.com');
    expect(link).not.toHaveAttribute('target');

    await userEvent.click(link);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('opens external links in a new tab', () => {
    render(<ContactButton href="https://www.linkedin.com/in/x" label="LinkedIn" icon={<Mail />} />);
    const link = screen.getByRole('link', { name: 'LinkedIn' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
