import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MovieModal } from '../components/MovieModal';
import { useMovieFetching } from '../hooks/useMovieFetching';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/MovieCardSkeleton'; // Importando o Skeleton

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const WATCHLIST_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?sort_by=created_at.asc`;

export default function WatchlistPage() {
  const { movies, loading, hasMore, error, lastMovieElementRef } = useMovieFetching(WATCHLIST_URL);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { personalRatingsMap } = useOutletContext();

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedMovie]);

  const handleOpenModal = (movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  // Lógica de Skeleton Loading para o carregamento inicial
  if (loading && movies.length === 0 && !error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-black text-center mb-10 text-transparent bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse w-1/2 mx-auto">.</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-black text-center mb-10 text-gray-900 dark:text-white">Minha Watchlist</h1>
        {error && <div className="text-center p-10 text-xl text-red-500">{`Erro: ${error}`}</div>}
        {movies.length === 0 && !loading && <div className="text-center p-10 text-lg text-gray-500">Sua watchlist está vazia.</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie, index) => (
            <div key={movie.id} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
              <MovieCard movie={movie} onCardClick={handleOpenModal} personalRating={personalRatingsMap?.get(movie.id)} />
            </div>
          ))}
        </div>
        {loading && movies.length > 0 && <div className="text-center p-10 text-xl dark:text-gray-300">Carregando mais...</div>}
        {!hasMore && !loading && movies.length > 0 && <div className="text-center p-10 text-lg text-gray-500">Você chegou ao fim!</div>}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} personalRating={personalRatingsMap?.get(movie.id)} />}
    </>
  );
}