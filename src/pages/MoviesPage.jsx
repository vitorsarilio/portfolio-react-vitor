import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMovieFetching } from '../hooks/useMovieFetching';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

const POPULAR_MOVIES_BASE_URL = 'https://api.themoviedb.org/3/discover/movie';

export default function MoviesPage() {
  const { personalRatingsMap } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = POPULAR_MOVIES_BASE_URL;

  const { movies, loading, hasMore, error, lastMovieElementRef } = useMovieFetching(
    apiUrl,
    searchTerm,
    'popularity.desc', // Default sort for popular movies
    true // limitToFirstPage = true
  );

  const handleDebouncedSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-left mb-6 text-gray-900 dark:text-gray-100">Filmes Populares</h1>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={null} // No sorting for this page
        onSortChange={null} // No sorting for this page
        sortOptions={[]} // No sorting for this page
      />
      <MovieGridPage
        emptyMessage="Nenhum filme encontrado com os filtros atuais."
        personalRatingsMap={personalRatingsMap}
        movies={movies}
        loading={loading}
        hasMore={false} // Always false for this page
        error={error}
        lastMovieElementRef={null} // No infinite scroll
      />
    </div>
  );
}