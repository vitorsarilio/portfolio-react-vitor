import { MovieCard } from './MovieCard';
import { MovieCardSkeleton } from './MovieCardSkeleton';

export const MovieGridPage = ({
  pageTitle,
  movies,
  loading,
  hasMore,
  error,
  lastMovieElementRef,
  emptyMessage,
  personalRatingsMap
}) => {

  if (loading && movies.length === 0 && !error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold text-left mb-12 text-gray-900 dark:text-gray-100">{pageTitle}</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 18 }).map((_, index) => <MovieCardSkeleton key={index} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-left mb-6 text-gray-900 dark:text-gray-100">{pageTitle}</h1>

      {error && <div className="text-center p-10 text-xl text-red-500">{`Erro: ${error}`}</div>}
      
      {movies.length === 0 && !loading && (
        <div className="text-center p-10 text-lg text-gray-500">{emptyMessage}</div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie, index) => (
          <div key={movie.id} ref={index === movies.length - 1 ? lastMovieElementRef : null}>
            <MovieCard 
              movie={movie} 
              personalRating={personalRatingsMap?.get(movie.id)}
            />
          </div>
        ))}
      </div>
      
      {loading && movies.length > 0 && <div className="text-center p-10 text-xl dark:text-gray-300">Carregando mais...</div>}
      {!hasMore && !loading && movies.length > 0 && <div className="text-center p-10 text-lg text-gray-500">Você chegou ao fim da lista!</div>}
    </div>
  );
};