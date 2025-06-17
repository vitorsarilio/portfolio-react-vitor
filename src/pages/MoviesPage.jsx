import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MovieModal } from '../components/MovieModal';
import { Star } from 'lucide-react'; // MUDANÇA 1: Importamos o ícone de Estrela

const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular';
const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const RATED_MOVIES_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies`;

// MUDANÇA 2: O componente MovieCard agora aceita e exibe a 'personalRating'
const MovieCard = ({ movie, onCardClick, personalRating }) => (
  <button 
    onClick={() => onCardClick(movie)}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group text-left w-full cursor-pointer flex flex-col"
  >
    <img 
      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/374151/FFFFFF?text=Sem+Imagem'} 
      alt={`Pôster do filme ${movie.title}`}
      className="w-full h-auto object-cover"
    />
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate flex-grow" title={movie.title}>{movie.title}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
          Nota: {movie.vote_average.toFixed(1)}
        </span>
        {/* Renderiza a nota pessoal APENAS se ela existir */}
        {personalRating && (
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 animate-pulse">
            <Star size={14} className="fill-amber-400 text-amber-500" />
            <span>{personalRating.toFixed(1)}</span>
          </div>
        )}
      </div>
    </div>
  </button>
);


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [personalRatingsMap, setPersonalRatingsMap] = useState(new Map());

  // ... (toda a lógica de fetch e outros hooks permanece a mesma)
  const fetchAllPersonalRatings = useCallback(async () => {
    if (!READ_ACCESS_TOKEN || !ACCOUNT_ID) return new Map();
    const options = { method: 'GET', headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    let currentPage = 1, totalPages = 1, allRatedMovies = [];
    try {
      do {
        const response = await fetch(`${RATED_MOVIES_URL}?language=pt-BR&page=${currentPage}&sort_by=created_at.desc`, options);
        if (!response.ok) throw new Error('Falha ao buscar suas notas.');
        const data = await response.json();
        allRatedMovies.push(...data.results);
        totalPages = data.total_pages;
        currentPage++;
      } while (currentPage <= totalPages);
      return new Map(allRatedMovies.map(movie => [movie.id, movie.rating]));
    } catch (err) { console.error("Erro ao buscar notas pessoais:", err); return new Map(); }
  }, []);

  const fetchPopularMovies = useCallback(async (pageNum) => {
    setLoadingMore(true);
    setError(null);
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    try {
      if (!READ_ACCESS_TOKEN) throw new Error("Token de Acesso não configurado.");
      const url = `${POPULAR_MOVIES_URL}?language=pt-BR&region=BR&page=${pageNum}`;
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);
      const data = await response.json();
      setMovies(prev => {
        const all = [...prev, ...data.results];
        return Array.from(new Map(all.map(m => [m.id, m])).values());
      });
      setHasMore(data.page < data.total_pages);
    } catch (err) { setError(err.message); } finally { setLoadingMore(false); }
  }, []);

  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingInitial(true);
      const ratingsMap = await fetchAllPersonalRatings();
      setPersonalRatingsMap(ratingsMap);
      await fetchPopularMovies(1);
      setLoadingInitial(false);
    };
    loadInitialData();
  }, [fetchAllPersonalRatings, fetchPopularMovies]);
  
  useEffect(() => {
    if (page > 1) fetchPopularMovies(page);
  }, [page, fetchPopularMovies]);
  
  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loadingMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) setPage(p => p + 1);
    });
    if (node) observer.current.observe(node);
  }, [loadingMore, hasMore]);

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [selectedMovie]);

  const handleOpenModal = (movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  if (loadingInitial) return <div className="text-center p-10 text-xl dark:text-gray-300">Carregando dados...</div>;

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-4xl font-black text-center mb-10 text-gray-900 dark:text-white">Filmes Populares no Brasil</h1>
        {error && <div className="text-center p-10 text-xl text-red-500">{`Erro: ${error}`}</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {movies.map((movie, index) => {
            // MUDANÇA 3: Passamos a nota pessoal para o componente MovieCard
            const card = (
              <MovieCard 
                movie={movie} 
                onCardClick={handleOpenModal} 
                personalRating={personalRatingsMap.get(movie.id)}
              />
            );
            if (movies.length === index + 1) {
              return <div ref={lastMovieElementRef} key={movie.id}>{card}</div>;
            }
            return <div key={movie.id}>{card}</div>;
          })}
        </div>
        {loadingMore && <div className="text-center p-10 text-xl dark:text-gray-300">Carregando mais...</div>}
        {!hasMore && !loadingMore && <div className="text-center p-10 text-lg text-gray-500">Você chegou ao fim!</div>}
      </div>
      {selectedMovie && <MovieModal movie={selectedMovie} onClose={handleCloseModal} personalRating={personalRatingsMap.get(selectedMovie.id)} />}
    </>
  );
}