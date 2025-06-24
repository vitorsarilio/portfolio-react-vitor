import { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Star, Calendar, Clock, Tv, Film, ShoppingCart, Youtube, X, PlayCircle } from 'lucide-react';
import { getRatingColor } from '../utils/colorHelpers';

const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;

const ProviderLogo = ({ provider }) => (
    <div className="flex-shrink-0" title={provider.provider_name}>
        <img src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`} alt={provider.provider_name} className="w-11 h-11 rounded-lg shadow-md" />
    </div>
);

const ProviderSection = ({ title, providersList, icon }) => {
    if (!providersList || providersList.length === 0) return null;
    return (
        <div className="mb-4 last:mb-0">
            <h5 className="text-md font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">{icon}{title}</h5>
            <div className="flex flex-wrap gap-3">{providersList.map(p => <ProviderLogo key={p.provider_id} provider={p} />)}</div>
        </div>
    );
};

const VideoModal = ({ videoKey, onClose }) => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-up" 
            onClick={onClose}
        >
            <button className="absolute top-4 right-4 text-white hover:text-purple-400 transition-colors" onClick={onClose}>
                <X size={40} />
            </button>
            <div className="relative w-full max-w-4xl aspect-video p-4" onClick={(e) => e.stopPropagation()}>
                <iframe
                    className="w-full h-full rounded-lg shadow-xl"
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
};

export default function MovieDetailPage() {
  const { movieId } = useParams();
  const { personalRatingsMap } = useOutletContext();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingVideoKey, setPlayingVideoKey] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
      try {
        const urls = [
          `https://api.themoviedb.org/3/movie/${movieId}?language=pt-BR`,
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=pt-BR`,
          `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=pt-BR`
        ];
        
        const responses = await Promise.all(urls.map(url => fetch(url, options)));
        const [detailsResponse, creditsResponse, providersResponse, videosResponse] = responses;

        if (!detailsResponse.ok) throw new Error('Falha ao buscar detalhes do filme.');
        
        const detailsData = await detailsResponse.json();
        const creditsData = creditsResponse.ok ? await creditsResponse.json() : { cast: [] };
        const providersData = providersResponse.ok ? await providersResponse.json() : { results: {} };
        const videosData = videosResponse.ok ? await videosResponse.json() : { results: [] };
        
        const youtubeVideos = videosData.results
          .filter(v => v.site === 'YouTube')
          .sort((a, b) => {
            if (a.type === 'Trailer') return -1;
            if (b.type === 'Trailer') return 1;
            if (a.type === 'Teaser') return -1;
            if (b.type === 'Teaser') return 1;
            return 0;
          });

        setMovie({
          ...detailsData,
          cast: creditsData.cast.slice(0, 10),
          providers: providersData.results.BR || null,
          videos: youtubeVideos,
        });

      } catch (err) {
        console.error(err);
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <div className="text-center p-10 text-xl dark:text-gray-300">Carregando detalhes...</div>;
  if (error) return <div className="text-center p-10 text-xl text-red-500">{`Erro: ${error}`}</div>;
  if (!movie) return <div className="text-center p-10 text-xl dark:text-gray-300">Filme não encontrado.</div>;

  const personalRating = personalRatingsMap?.get(movie.id);
  const tmdbRatingColor = getRatingColor(movie.vote_average);
  const personalRatingColor = getRatingColor(personalRating);
  const hasAnyProvider = movie.providers && (movie.providers.flatrate || movie.providers.rent || movie.providers.buy);

  return (
    <>
      <div className="animate-fade-in-up">
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0">
            <img src={movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : ''} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-gray-900 dark:via-gray-900/80 dark:to-transparent"></div>
          </div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 flex-shrink-0">
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://placehold.co/500x750/374151/FFFFFF?text=Sem+Imagem'} alt={`Pôster de ${movie.title}`} className="rounded-lg shadow-2xl w-full" />
              </div>

              <div className="md:w-2/3 text-gray-800 dark:text-gray-200 flex flex-col gap-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-2">{movie.title}</h2>
                  {movie.tagline && <p className="text-lg text-gray-500 dark:text-gray-400 italic mb-6">"{movie.tagline}"</p>}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm mb-6">
                    <span className={`font-bold flex items-center gap-2 animate-pulse ${tmdbRatingColor}`}><Star size={16} />Nota TMDB: {movie.vote_average.toFixed(1)}</span>
                    {personalRating && <span className={`font-bold flex items-center gap-2 animate-pulse ${personalRatingColor}`}><Star size={16} className="fill-current" />Minha Nota: {personalRating.toFixed(1)}</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2"><Calendar size={16} className="text-purple-500" /> <div><strong>Lançamento:</strong><br/>{new Date(movie.release_date).toLocaleDateString('pt-BR')}</div></div>
                    {movie.runtime > 0 && <div className="flex items-center gap-2"><Clock size={16} className="text-purple-500" /><div><strong>Duração:</strong><br/>{movie.runtime} min</div></div>}
                  </div>
                  <h3 className="text-xl font-bold mb-2">Sinopse</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview}</p>
                </div>

                {movie.videos && movie.videos.length > 0 && (
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><Youtube size={22} className="text-red-500"/>Vídeos</h3>
                    <div className="flex flex-col gap-3">
                      {movie.videos.map(video => (
                        <button 
                          key={video.id}
                          onClick={() => setPlayingVideoKey(video.key)}
                          className="flex items-center gap-4 p-2 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-purple-100 dark:hover:bg-gray-700 transition-colors w-full text-left"
                        >
                          <div className="relative flex-shrink-0">
                            <img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} alt={video.name} className="w-32 h-auto rounded-md shadow-md" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <PlayCircle className="text-white/80" size={32} />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <p className="font-semibold text-gray-800 dark:text-gray-200">{video.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{video.type}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Elenco Principal</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {movie.cast.map(actor => (
                  <div key={actor.cast_id} className="text-center"><img src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://placehold.co/185x278/6B7280/FFFFFF?text=?'} alt={actor.name} className="rounded-lg shadow-md mb-2 w-full" /><p className="text-sm font-bold dark:text-white">{actor.name}</p><p className="text-xs text-gray-500 dark:text-gray-400">{actor.character}</p></div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Onde Assistir</h2>
              {hasAnyProvider ? (
                <a href={movie.providers.link} target="_blank" rel="noopener noreferrer" className="block bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg hover:ring-2 hover:ring-purple-500 transition-all cursor-pointer">
                  <div className="space-y-4">
                    <ProviderSection title="Streaming" providersList={movie.providers.flatrate} icon={<Tv size={20} />} />
                    <ProviderSection title="Alugar" providersList={movie.providers.rent} icon={<Film size={20} />} />
                    <ProviderSection title="Comprar" providersList={movie.providers.buy} icon={<ShoppingCart size={20} />} />
                  </div>
                </a>
              ) : (
                <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg"><p className="text-sm text-gray-500">Não encontramos opções de exibição no Brasil.</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {playingVideoKey && <VideoModal videoKey={playingVideoKey} onClose={() => setPlayingVideoKey(null)} />}
    </>
  );
}