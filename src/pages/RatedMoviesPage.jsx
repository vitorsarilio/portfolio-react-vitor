import { useState, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetchAllPages } from '../hooks/useFetchAllPages';
import { useMovieFilters } from '../hooks/useMovieFilters';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const RATED_MOVIES_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies?sort_by=created_at.desc`;

export default function RatedMoviesPage() {
  const { data: allMovies, loading, error } = useFetchAllPages(RATED_MOVIES_URL);
  const { personalRatingsMap } = useOutletContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc'); // Default sort

  const movies = useMovieFilters(allMovies, searchTerm, sortBy);

  const memoizedSortOptions = useMemo(() => [
    { value: 'rating_desc', label: 'Nota (maior para menor)' },
    { value: 'rating_asc', label: 'Nota (menor para maior)' },
    { value: 'title_asc', label: 'Título (A-Z)' },
    { value: 'title_desc', label: 'Título (Z-A)' },
  ], []);

  const handleDebouncedSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSortChange = useCallback((e) => {
    setSortBy(e.target.value);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-left mb-6 text-gray-900 dark:text-gray-100">Minhas Avaliações</h1>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={sortBy}
        onSortChange={handleSortChange}
        sortOptions={memoizedSortOptions}
      />
      <MovieGridPage
        emptyMessage="Nenhum filme encontrado com os filtros atuais."
        personalRatingsMap={personalRatingsMap}
        movies={movies}
        loading={loading}
        error={error}
        hasMore={false}
      />
    </div>
  );
}