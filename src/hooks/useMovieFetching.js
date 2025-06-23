import React, { useState, useEffect, useCallback, useRef } from 'react';

export const useMovieFetching = (apiUrl) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = useCallback(async (pageNum) => {
    const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

    setLoading(true);
    setError(null);
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    
    try {
      if (!READ_ACCESS_TOKEN) {
        throw new Error("Token de Acesso (VITE_TMDB_READ_ACCESS_TOKEN) não foi encontrado no arquivo .env. Verifique o nome e reinicie o servidor.");
      }
      
      const url = `${apiUrl}&language=pt-BR&page=${pageNum}`;
      const response = await fetch(url, options);
      
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Erro 401: Não Autorizado. O Token de Acesso fornecido é inválido ou expirou. Verifique o valor no seu arquivo .env.");
        }
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setMovies(prevMovies => {
        const allMovies = pageNum === 1 ? data.results : [...prevMovies, ...data.results];
        const movieMap = new Map(allMovies.map(movie => [movie.id, movie]));
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