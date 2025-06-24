import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { MovieCard } from '../components/MovieCard';
import { MovieCardSkeleton } from '../components/MovieCardSkeleton';


const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&region=BR&page=1';
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export default function MoviesPage() {

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { personalRatingsMap } = useOutletContext();

  useEffect(() => {
    const fetchTop20Movies = async () => {
      setLoading(true);
      setError(null);
      const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};

      try {
        if (!READ_ACCESS_TOKEN) throw new Error("Token de Acesso não configurado.");
        
        const response = await fetch(POPULAR_MOVIES_URL, options);
        if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
        
        const data = await response.json();

        setMovies(data.results);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTop20Movies();
  }, []); 

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-bold text-left mb-12 text-gray-900 dark:text-gray-100">Top 20 Filmes Populares</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {Array.from({ length: 20 }).map((_, index) => <MovieCardSkeleton key={index} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 animate-fade-in-up">
      <h1 className="text-4xl font-bold text-left mb-12 text-gray-900 dark:text-gray-100">Top 20 Filmes Populares</h1>

      {error && <div className="text-center p-10 text-xl text-red-500">{`Erro: ${error}`}</div>}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard 
              movie={movie} 
              personalRating={personalRatingsMap?.get(movie.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}