import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MovieCard } from '../MovieCard';

describe('MovieCard', () => {
  const movie = {
    id: 1,
    title: 'Test Movie',
    poster_path: '/test.jpg',
    vote_average: 8.5,
  };

  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: MemoryRouter });
  };

  it('should render movie card with details and personal rating', () => {
    renderWithRouter(<MovieCard movie={movie} personalRating={9.0} />);

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText(/Nota: 8.5/i)).toBeInTheDocument();
    expect(screen.getByTestId('personal-rating-badge')).toBeInTheDocument();
    expect(screen.getByText(/9.0/i)).toBeInTheDocument();
  });

  it('should not render personal rating if not provided', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    expect(screen.queryByTestId('personal-rating-badge')).not.toBeInTheDocument();
  });

  it('should link to the correct movie detail page', () => {
    renderWithRouter(<MovieCard movie={movie} />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/filme/1');
  });
});
