import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExpandingContactLink } from '../ExpandingContactLink';
import { Mail } from 'lucide-react';

describe('ExpandingContactLink', () => {
  it('should render the link with an icon and the accessible name', () => {
    const props = {
      href: 'mailto:test@example.com',
      icon: Mail,
      textToShow: 'Email',
      eventLabel: 'Send an email',
      trackEvent: vi.fn(),
    };
    render(<ExpandingContactLink {...props} />);
    const link = screen.getByRole('link', { name: /Send an email/i });
    expect(link).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });
});
