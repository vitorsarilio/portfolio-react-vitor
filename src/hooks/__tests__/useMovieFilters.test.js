import { renderHook } from '@testing-library/react';
import { useMovieFilters } from '../useMovieFilters';

describe('useMovieFilters', () => {
  const mockMovies = [
    { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
    { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
    { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
    { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
    { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
  ];

  test('should filter movies by search term (case-insensitive)', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, 'movie', ''));
    expect(result.current).toEqual(mockMovies);
  });

  test('should return all movies if search term is empty', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', ''));
    expect(result.current).toEqual(mockMovies);
  });

  test('should sort movies by title ascending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'title_asc'));
    expect(result.current).toEqual([
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
    ]);
  });

  test('should sort movies by title descending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'title_desc'));
    expect(result.current).toEqual([
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
    ]);
  });

  test('should sort movies by release date ascending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'release_date_asc'));
    expect(result.current).toEqual([
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
    ]);
  });

  test('should sort movies by release date descending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'release_date_desc'));
    expect(result.current).toEqual([
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
    ]);
  });

  test('should sort movies by rating ascending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'rating_asc'));
    expect(result.current).toEqual([
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
    ]);
  });

  test('should sort movies by rating descending', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, '', 'rating_desc'));
    expect(result.current).toEqual([
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
    ]);
  });

  test('should filter and sort movies correctly', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, 'movie', 'rating_desc'));
    expect(result.current).toEqual([
      { id: 4, title: 'The Best Movie', release_date: '2021-05-10', rating: 9.2 },
      { id: 2, title: 'Another Movie', release_date: '2022-11-01', rating: 8.0 },
      { id: 1, title: 'Movie A', release_date: '2023-01-15', rating: 7.5 },
      { id: 5, title: 'a movie', release_date: '2024-02-28', rating: 7.0 },
      { id: 3, title: 'movie b', release_date: '2023-03-20', rating: 6.8 },
    ]);
  });

  test('should return empty array if movies is null or undefined', () => {
    let { result } = renderHook(() => useMovieFilters(null, '', ''));
    expect(result.current).toEqual([]);

    ({ result } = renderHook(() => useMovieFilters(undefined, '', '')));
    expect(result.current).toEqual([]);
  });

  test('should return empty array if movies is empty', () => {
    const { result } = renderHook(() => useMovieFilters([], '', ''));
    expect(result.current).toEqual([]);
  });

  test('should return filtered movies without sorting if sortBy is unknown', () => {
    const { result } = renderHook(() => useMovieFilters(mockMovies, 'movie', 'unknown_sort'));
    expect(result.current).toEqual(mockMovies);
  });
});