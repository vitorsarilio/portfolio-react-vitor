import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { MovieGridPage } from '../MovieGridPage';

// Mock child components to isolate the MovieGridPage component
vi.mock('../MovieCard', () => ({
  MovieCard: ({ movie }) => (
    <div data-testid="movie-card">
      <h3>{movie.title}</h3>
      <span>{movie.vote_average.toFixed(1)}</span>
    </div>
  ),
}));
vi.mock('../MovieCardSkeleton', () => ({
  MovieCardSkeleton: () => <div data-testid="skeleton-card">Loading...</div>,
}));

describe('MovieGridPage', () => {
  const defaultProps = {
    pageTitle: 'Test Page',
    movies: [],
    loading: false,
    hasMore: false,
    error: null,
    emptyMessage: 'No movies found.',
    personalRatingsMap: new Map(),
  };

  const renderWithRouter = (props) => {
    return render(<MovieGridPage {...defaultProps} {...props} />, { wrapper: MemoryRouter });
  };

  it('should render skeletons while loading and no movies are present', () => {
    renderWithRouter({ loading: true });
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.getByText('Test Page')).toBeInTheDocument();
  });

  it('should render an error message on fetch failure', () => {
    renderWithRouter({ error: 'Failed to fetch' });
    expect(screen.getByText(/Erro: Failed to fetch/i)).toBeInTheDocument();
  });

  it('should render movie cards when data is loaded', () => {
    const movies = [
      { id: 1, title: 'Movie 1', vote_average: 8.0 },
      { id: 2, title: 'Movie 2', vote_average: 7.5 },
    ];
    renderWithRouter({ movies });
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(2);
    expect(screen.getByText('Movie 1')).toBeInTheDocument();
    expect(screen.getByText('8.0')).toBeInTheDocument();
  });

  it('should render a message when no movies are found', () => {
    renderWithRouter({ emptyMessage: 'No movies here.' });
    expect(screen.getByText('No movies here.')).toBeInTheDocument();
  });
});
