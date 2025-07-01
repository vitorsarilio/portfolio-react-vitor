import { useState, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaFetching } from '../hooks/useMediaFetching';
import { MovieGridPage } from '../components/MovieGridPage';
import { FilterControls } from '../components/FilterControls';

export default function MoviesPage({ mediaType }) {
  const { personalRatingsMap } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = mediaType === 'movie'
    ? 'https://api.themoviedb.org/3/movie/popular'
    : 'https://api.themoviedb.org/3/tv/popular';

  const pageTitle = mediaType === 'movie' ? 'Filmes Populares' : 'Séries Populares';

  const { media, loading, error } = useMediaFetching(
    mediaType,
    apiUrl,
    searchTerm,
    'popularity.desc',
    true 
  );

  const handleDebouncedSearchChange = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
      </div>
      <FilterControls 
        initialSearchTerm={searchTerm}
        onDebouncedSearchChange={handleDebouncedSearchChange}
        sortBy={null}
        onSortChange={null}
        sortOptions={[]}
      />
      <MovieGridPage
        mediaType={mediaType}
        emptyMessage={`Nenhum(a) ${mediaType === 'movie' ? 'filme' : 'série'} encontrado(a) com os filtros atuais.`}
        personalRatingsMap={personalRatingsMap}
        movies={media}
        loading={loading}
        hasMore={false}
        error={error}
        lastMovieElementRef={null}
      />
    </div>
  );
}

