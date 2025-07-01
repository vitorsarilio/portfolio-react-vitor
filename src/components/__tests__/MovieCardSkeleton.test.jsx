import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCardSkeleton } from '../MovieCardSkeleton';

describe('MovieCardSkeleton', () => {
  it('should render the skeleton structure with animation', () => {
    const { container } = render(<MovieCardSkeleton />);

    const mainDiv = container.querySelector('.animate-pulse');
    expect(mainDiv).toBeInTheDocument();
    const childDivs = mainDiv.querySelectorAll('div');
    expect(childDivs.length).toBeGreaterThan(1);
    expect(childDivs[0]).toHaveClass('w-full', 'bg-gray-300');
  });
});
