import { useState, useEffect, useCallback, useRef } from 'react';

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const useMediaFetching = (mediaType, baseApiUrl, searchTerm = '', sortBy = '', limitToFirstPage = false) => {
  const [media, setMedia] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const fetchMedia = useCallback(async (pageNum) => {
    setLoading(true);
    setError(null);
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    try {
      if (!READ_ACCESS_TOKEN) throw new Error("Token de Acesso não configurado.");
      
      let url;
      const isAccountUrl = baseApiUrl.includes('/account/');

      if (searchTerm) {
        url = `https://api.themoviedb.org/3/search/${mediaType}?query=${encodeURIComponent(searchTerm)}&language=pt-BR&page=${pageNum}&include_adult=false`;
      } else {
        const separator = baseApiUrl.includes('?') ? '&' : '?';
        let urlParams = `language=pt-BR&page=${pageNum}`;
        if (!isAccountUrl) {
            urlParams += '&include_adult=false';
        }
        if (sortBy && !(baseApiUrl.includes('/movie/popular') || baseApiUrl.includes('/tv/popular'))) {
          urlParams += `&sort_by=${sortBy}`;
        }
        url = `${baseApiUrl}${separator}${urlParams}`;
      }
      
      const response = await fetch(url, options);
      
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setMedia(prevMedia => {
        const newMedia = pageNum === 1 ? data.results : [...prevMedia, ...data.results];
        const mediaMap = new Map(newMedia.map(item => [item.id, item]));
        return Array.from(mediaMap.values());
      });
      
      setHasMore(data.page < data.total_pages && !limitToFirstPage);
    } catch (err) {
      setError(err.message);
      setMedia([]);
    } finally {
      setLoading(false);
    }
  }, [mediaType, baseApiUrl, searchTerm, sortBy, limitToFirstPage]);

  useEffect(() => {
    setMedia([]);
    setPage(1);
    setHasMore(true);
    fetchMedia(1);
  }, [mediaType, baseApiUrl, searchTerm, sortBy, limitToFirstPage, fetchMedia]);
  
  useEffect(() => {
    if (page > 1 && !limitToFirstPage) {
      fetchMedia(page);
    }
  }, [page, fetchMedia, limitToFirstPage]);

  const observer = useRef();
  const lastMediaElementRef = useCallback(node => {
    if (loading || limitToFirstPage) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, limitToFirstPage]);

  return { media, loading, hasMore, error, lastMediaElementRef };
};
