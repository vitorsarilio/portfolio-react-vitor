import { Outlet, useOutletContext } from 'react-router-dom';
import { MovieSubNav } from '../components/MovieSubNav';

export const MovieAppLayout = () => {
  const context = useOutletContext(); 
  return (
    <div>
      <MovieSubNav />
      <Outlet context={context} />
    </div>
  );
};