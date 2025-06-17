import React from 'react';
import { X, Star } from 'lucide-react';

export const MovieModal = ({ movie, onClose, personalRating }) => {
  if (!movie) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition-colors z-10 cursor-pointer"
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
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
              {/* Nota Pública TMDB */}
              <div className="flex items-center gap-1 font-bold text-purple-600 dark:text-purple-400">
                <span>Nota TMDB: {movie.vote_average.toFixed(1)}</span>
              </div>
              
              {/* Sua Nota Pessoal (Renderizada condicionalmente) */}
              {personalRating && (
                <div className="flex items-center gap-1 font-bold text-amber-500 dark:text-amber-400 animate-pulse">
                  <Star size={16} className="fill-amber-400 text-amber-500" />
                  <span>Minha Nota: {personalRating.toFixed(1)}</span>
                </div>
              )}
            </div>
            
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">Lançamento: {new Date(movie.release_date).toLocaleDateString('pt-BR')}</p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
              {movie.overview || "Sinopse não disponível."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};