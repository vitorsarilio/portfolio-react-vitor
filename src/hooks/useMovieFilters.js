import { useMemo } from 'react';

export const useMovieFilters = (movies, searchTerm, sortBy) => {
  const filteredAndSortedMovies = useMemo(() => {
    if (!movies) return [];

    // 1. Filter by search term (case-insensitive)
    const filtered = movies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sort the filtered results
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title_asc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'title_desc') {
        return b.title.localeCompare(a.title);
      } else if (sortBy === 'release_date_asc') {
        return new Date(a.release_date) - new Date(b.release_date);
      } else if (sortBy === 'release_date_desc') {
        return new Date(b.release_date) - new Date(a.release_date);
      } else if (sortBy === 'rating_asc') {
        return a.rating - b.rating;
      } else if (sortBy === 'rating_desc') {
        return b.rating - a.rating;
      }
      return 0; // Default: no change
    });

    return sorted;
  }, [movies, searchTerm, sortBy]);

  return filteredAndSortedMovies;
};