import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { getRatingColor } from '../utils/colorHelpers';

export const MovieCard = ({ movie: item, personalRating, mediaType = 'movie' }) => {
  const tmdbRatingColor = getRatingColor(item.vote_average);
  const personalRatingColor = getRatingColor(personalRating);

  const title = mediaType === 'tv' ? item.name : item.title;
  const linkPath = mediaType === 'tv' ? `/serie/${item.id}` : `/filme/${item.id}`;

  return (
    <Link 
      to={linkPath}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group text-left w-full cursor-pointer flex flex-col h-full"
    >
      <img 
        src={item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://placehold.co/500x750/374151/FFFFFF?text=Sem+Imagem'} 
        alt={`Pôster de ${title}`}
        className="w-full h-auto object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate flex-grow" title={title}>{title}</h3>
        
        <div className="flex items-center justify-between mt-2 text-sm">
          <span className={`font-bold animate-pulse ${tmdbRatingColor}`}>
            Nota: {item.vote_average.toFixed(1)}
          </span>
          {personalRating && (
            <div data-testid="personal-rating-badge" className={`flex items-center gap-1 font-bold text-xs animate-pulse ${personalRatingColor}`}>
              <Star size={14} className="fill-current" />
              <span>{personalRating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};