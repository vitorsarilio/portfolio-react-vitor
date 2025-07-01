import { useState, useCallback, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFetchAllPages } from '../hooks/useFetchAllPages';
import { useMediaFilters } from '../hooks/useMediaFilters';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export default function RatedMoviesPage({ mediaType }) {
  const { personalRatingsMap } = useOutletContext();

  const ratedMediaUrl = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/${mediaType === 'movie' ? 'movies' : 'tv'}?sort_by=created_at.desc`;

  const { data: allMedia, loading, error } = useFetchAllPages(ratedMediaUrl);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating_desc');

  const media = useMediaFilters(allMedia, mediaType, searchTerm, sortBy);

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

  const pageTitle = `Minhas Avaliações de ${mediaType === 'movie' ? 'Filmes' : 'Séries'}`;
  const emptyMessage = `Nenhum(a) ${mediaType === 'movie' ? 'filme' : 'série'} encontrado(a) com os filtros atuais.`;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
      </div>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={sortBy}
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

