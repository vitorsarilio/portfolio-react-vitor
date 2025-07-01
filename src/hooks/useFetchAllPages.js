import { useState, useEffect, useCallback } from 'react';

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

export const useFetchAllPages = (apiUrl) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData([]);

    const options = { 
      headers: { 
        accept: 'application/json', 
        Authorization: `Bearer ${READ_ACCESS_TOKEN}`
      }
    };

    const getUrlWithParams = (url, page) => {
        const separator = url.includes('?') ? '&' : '?';
        let params = `language=pt-BR&page=${page}`;
        if (!url.includes('/account/')) {
            params += '&include_adult=false';
        }
        return `${url}${separator}${params}`;
    }

    try {
      if (!READ_ACCESS_TOKEN) throw new Error("Token de Acesso não configurado.");

      const initialUrl = getUrlWithParams(apiUrl, 1);
      const initialResponse = await fetch(initialUrl, options);
      if (!initialResponse.ok) throw new Error(`Erro na API: ${initialResponse.statusText}`);
      
      const initialData = await initialResponse.json();
      const totalPages = initialData.total_pages;
      let allResults = initialData.results;

      if (totalPages > 1) {
        const pagePromises = [];
        for (let page = 2; page <= totalPages; page++) {
          const pageUrl = getUrlWithParams(apiUrl, page);
          pagePromises.push(fetch(pageUrl, options).then(res => res.json()));
        }
        
        const subsequentPagesData = await Promise.all(pagePromises);
        subsequentPagesData.forEach(pageData => {
          allResults = [...allResults, ...pageData.results];
        });
      }

      const uniqueResults = Array.from(new Map(allResults.map(item => [item.id, item])).values());
      setData(uniqueResults);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return { data, loading, error };
};