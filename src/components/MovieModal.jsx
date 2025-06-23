import React, { useState, useEffect } from 'react';
import { X, Star, Tv, ShoppingCart, Film } from 'lucide-react';
import { getRatingColor } from '../utils/colorHelpers'; // Importamos nossa função auxiliar de cores

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

// Componente para o logo de um provedor
const ProviderLogo = ({ provider }) => (
  <div className="flex-shrink-0" title={provider.provider_name}>
    <img
      src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
      alt={provider.provider_name}
      className="w-10 h-10 rounded-lg shadow-md"
    />
  </div>
);

// Componente para renderizar cada seção de provedores
const ProviderSection = ({ title, providersList, icon }) => {
  if (!providersList || providersList.length === 0) {
    return null;
  }
  return (
    <div className="mb-3 last:mb-0">
      <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
        {icon}
        {title}
      </h5>
      <div className="flex flex-wrap gap-2">
        {providersList.map(p => <ProviderLogo key={p.provider_id} provider={p} />)}
      </div>
    </div>
  );
};


export const MovieModal = ({ movie, onClose, personalRating }) => {
  const [providers, setProviders] = useState(null);
  const [loadingProviders, setLoadingProviders] = useState(true);

  useEffect(() => {
    if (!movie) return;

    const fetchWatchProviders = async () => {
      setLoadingProviders(true);
      if (!READ_ACCESS_TOKEN) {
        console.error("Token de Acesso do TMDB não encontrado.");
        setLoadingProviders(false);
        return;
      }
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${READ_ACCESS_TOKEN}`
        }
      };
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`, options);
        if (!response.ok) throw new Error('Não foi possível buscar os provedores.');
        const data = await response.json();
        setProviders(data.results.BR || null);
      } catch (error) {
        console.error("Erro ao buscar provedores:", error);
        setProviders(null);
      } finally {
        setLoadingProviders(false);
      }
    };

    fetchWatchProviders();
  }, [movie.id]);

  if (!movie) return null;

  // Usamos nossa função auxiliar para pegar as classes de cor corretas
  const tmdbRatingColor = getRatingColor(movie.vote_average);
  const personalRatingColor = getRatingColor(personalRating);

  const hasAnyProvider = providers && (providers.flatrate || providers.rent || providers.buy);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>

        <div className="md:flex">
          <div className="md:w-1/3">
            <img 
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/374151/FFFFFF?text=Sem+Imagem'} 
              alt={`Pôster de ${movie.title}`}
              className="w-full h-full object-cover md:rounded-l-lg"
            />
          </div>

          <div className="p-6 md:w-2/3 flex flex-col">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{movie.title}</h2>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-4">
              {/* Aplicamos a classe de cor dinâmica aqui */}
              <span className={`font-bold ${tmdbRatingColor}`}>
                Nota TMDB: {movie.vote_average.toFixed(1)}
              </span>
              
              {/* E aqui também */}
              {personalRating && (
                <div className={`flex items-center gap-1 font-bold animate-pulse ${personalRatingColor}`}>
                  <Star size={16} />
                  <span>Minha Nota: {personalRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow mb-6">{movie.overview || "Sinopse não disponível."}</p>

            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Onde Assistir (Brasil)</h4>
              {loadingProviders ? (
                <p className="text-sm text-gray-500">Buscando...</p>
              ) : (
                hasAnyProvider ? (
                  <a href={providers.link} target="_blank" rel="noopener noreferrer" className="block hover:bg-gray-100 dark:hover:bg-gray-700 p-2 -m-2 rounded-lg transition-colors space-y-3">
                    <ProviderSection title="Streaming" providersList={providers.flatrate} icon={<Tv size={16} />} />
                    <ProviderSection title="Alugar" providersList={providers.rent} icon={<Film size={16} />} />
                    <ProviderSection title="Comprar" providersList={providers.buy} icon={<ShoppingCart size={16} />} />
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block pt-2 border-t border-gray-200 dark:border-gray-700">Clique para ver mais opções no TMDB</span>
                  </a>
                ) : (
                  <p className="text-sm text-gray-500">Não encontramos opções de exibição no Brasil.</p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};