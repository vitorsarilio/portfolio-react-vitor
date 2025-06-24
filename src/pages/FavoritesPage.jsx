import { useOutletContext } from 'react-router-dom';
import { useMovieFetching } from '../hooks/useMovieFetching';
import { MovieGridPage } from '../components/MovieGridPage'; 

const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
const FAVORITES_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/favorite/movies?sort_by=created_at.asc`;

export default function FavoritesPage() {
  const movieData = useMovieFetching(FAVORITES_URL);
  const { personalRatingsMap } = useOutletContext();

  return (
    <MovieGridPage
      pageTitle="Meus Favoritos"
      emptyMessage="Você ainda não favoritou nenhum filme."
      personalRatingsMap={personalRatingsMap}
      {...movieData}
    />
  );
}