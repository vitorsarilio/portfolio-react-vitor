import { useOutletContext } from 'react-router-dom';
import { useMovieFetching } from '../hooks/useMovieFetching';
import { MovieGridPage } from '../components/MovieGridPage';

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const RATED_MOVIES_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies?sort_by=created_at.desc`;

export default function RatedMoviesPage() {
  const movieData = useMovieFetching(RATED_MOVIES_URL);
  const { personalRatingsMap } = useOutletContext();

  return (
    <MovieGridPage
      pageTitle="Minhas Avaliações"
      emptyMessage="Você ainda não avaliou nenhum filme."
      personalRatingsMap={personalRatingsMap}
      {...movieData}
    />
  );
}