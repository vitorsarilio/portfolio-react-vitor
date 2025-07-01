import { useCallback, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useMediaFetching } from '../hooks/useMediaFetching';
import { MovieGridPage } from '../components/MovieGridPage';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

export default function FavoritesPage({ mediaType }) {
  const { personalRatingsMap } = useOutletContext();

  const favoritesUrl = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/${mediaType === 'movie' ? 'movies' : 'tv'}?sort_by=created_at.asc`;
  
  const { media, loading, hasMore, error, lastMovieElementRef } = useMediaFetching(mediaType, favoritesUrl);

  const pageTitle = `Meus ${mediaType === 'movie' ? 'Filmes' : 'Séries'} Favoritos`;
  const emptyMessage = `Você ainda não favoritou nenhum(a) ${mediaType === 'movie' ? 'filme' : 'série'}.`;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{pageTitle}</h1>
        </div>
        <MovieGridPage
            mediaType={mediaType}
            movies={media}
            loading={loading}
            hasMore={hasMore}
            error={error}
            lastMovieElementRef={lastMovieElementRef}
            emptyMessage={emptyMessage}
            personalRatingsMap={personalRatingsMap}
        />
    </div>
  );
}
