import { useState, useMemo, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetchAllPages } from '../hooks/useFetchAllPages';
import { useMediaFilters } from '../hooks/useMediaFilters';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export default function WatchlistPage({ mediaType }) {
  const { personalRatingsMap } = useOutletContext();

  const [apiSortBy, setApiSortBy] = useState('created_at.asc');
  
  const watchlistUrl = useMemo(() => 
    `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/${mediaType === 'movie' ? 'movies' : 'tv'}?sort_by=${apiSortBy}`
  , [mediaType, apiSortBy]);

  const { data: allMedia, loading, error } = useFetchAllPages(watchlistUrl);

  const [searchTerm, setSearchTerm] = useState('');
  const [clientSortBy, setClientSortBy] = useState('none');

  const media = useMediaFilters(allMedia, mediaType, searchTerm, clientSortBy);

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
      setClientSortBy('none');
    } else {
      setClientSortBy(selectedSort);
      setApiSortBy('created_at.asc');
    }
  }, []);

  const pageTitle = `Minha Watchlist de ${mediaType === 'movie' ? 'Filmes' : 'Séries'}`;
  const emptyMessage = `Nenhum(a) ${mediaType === 'movie' ? 'filme' : 'série'} encontrado(a) com os filtros atuais.`;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
      </div>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={apiSortBy.startsWith('created_at') ? apiSortBy : clientSortBy}
        onSortChange={handleSortChange}
        sortOptions={memoizedSortOptions}
      />
      <MovieGridPage
        mediaType={mediaType}
        emptyMessage={emptyMessage}
        personalRatingsMap={personalRatingsMap}
        movies={media}
        loading={loading}
        error={error}
        hasMore={false}
      />
    </div>
  );
}

