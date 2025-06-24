import { useOutletContext } from 'react-router-dom';
import { useMovieFetching } from '../hooks/useMovieFetching';
import { MovieGridPage } from '../components/MovieGridPage';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const WATCHLIST_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/watchlist/movies?sort_by=created_at.asc`;

export default function WatchlistPage() {
  const movieData = useMovieFetching(WATCHLIST_URL);
  const { personalRatingsMap } = useOutletContext();

  return (
    <MovieGridPage
      pageTitle="Minha Watchlist"
      emptyMessage="Sua watchlist está vazia."
      personalRatingsMap={personalRatingsMap}
      {...movieData}
    />
  );
}