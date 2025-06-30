import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCardSkeleton } from '../MovieCardSkeleton';

describe('MovieCardSkeleton', () => {
  it('should render the skeleton structure with animation', () => {
    const { container } = render(<MovieCardSkeleton />);

    const mainDiv = container.querySelector('.animate-pulse');
    expect(mainDiv).toBeInTheDocument();

    // Check for the presence of the two main placeholder divs inside the animated container
    const childDivs = mainDiv.querySelectorAll('div');
    expect(childDivs.length).toBeGreaterThan(1);
    // The first child should be the image placeholder
    expect(childDivs[0]).toHaveClass('w-full', 'bg-gray-300');
  });
});
