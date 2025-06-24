import { useState, useEffect, useCallback, useRef } from 'react';

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const useMovieFetching = (apiUrl) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    try {
      if (!READ_ACCESS_TOKEN) throw new Error("Token de Acesso não configurado.");
      

      const url = `${apiUrl}&language=pt-BR&page=${pageNum}&include_adult=false`;
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setMovies(prevMovies => {
        const newMovies = pageNum === 1 ? data.results : [...prevMovies, ...data.results];
        const movieMap = new Map(newMovies.map(movie => [movie.id, movie]));
        return Array.from(movieMap.values());
      });
      
      setHasMore(data.page < data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [apiUrl]);

  useEffect(() => {
    if (page === 1) {
      fetchMovies(1);
    }
  }, [fetchMovies]);
  
  useEffect(() => {
    if (page > 1) {
      fetchMovies(page);
    }
  }, [page, fetchMovies]);

  const observer = useRef();
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  return { movies, loading, hasMore, error, lastMovieElementRef };
};