import { useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetchAllPages } from '../hooks/useFetchAllPages';
import { useMovieFilters } from '../hooks/useMovieFilters';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export default function WatchlistPage() {
  const [apiSortBy, setApiSortBy] = useState('created_at.asc');
  const WATCHLIST_URL = useMemo(() => 
    `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?sort_by=${apiSortBy}`
  , [apiSortBy]);

  const { data: allMovies, loading, error } = useFetchAllPages(WATCHLIST_URL);
  const { personalRatingsMap } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [clientSortBy, setClientSortBy] = useState('none'); // For client-side sorting (title, release_date)

  const movies = useMovieFilters(allMovies, searchTerm, clientSortBy);

  const memoizedSortOptions = useMemo(() => [
    { value: 'created_at.asc', label: 'Adicionado (mais antigo)' },
    { value: 'created_at.desc', label: 'Adicionado (mais recente)' },
    { value: 'title_asc', label: 'Título (A-Z)' },
    { value: 'title_desc', label: 'Título (Z-A)' },
    { value: 'release_date_desc', label: 'Lançamento (mais recente)' },
    { value: 'release_date_asc', label: 'Lançamento (mais antigo)' },
  ], []);

  const handleDebouncedSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  const handleSortChange = useCallback((e) => {
    const selectedSort = e.target.value;
    if (selectedSort.startsWith('created_at')) {
      setApiSortBy(selectedSort);
      setClientSortBy('none'); // Reset client sort if API handles it
    } else {
      setClientSortBy(selectedSort);
      setApiSortBy('created_at.asc'); // Default API sort if client handles it
    }
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-left mb-6 text-gray-900 dark:text-gray-100">Minha Watchlist</h1>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={apiSortBy.startsWith('created_at') ? apiSortBy : clientSortBy}
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