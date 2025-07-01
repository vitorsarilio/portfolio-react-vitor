import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import RatedMoviesPage from './pages/RatedMoviesPage.jsx';
import FavoritesPage from './pages/FavoritesPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import SerieDetailPage from './pages/SerieDetailPage.jsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <PortfolioPage />,
      },
      {
        path: 'filmes',
        children: [
          { index: true, element: <MoviesPage mediaType="movie" /> },
          { path: 'watchlist', element: <WatchlistPage mediaType="movie" /> },
          { path: 'avaliacoes', element: <RatedMoviesPage mediaType="movie" /> },
          { path: 'favoritos', element: <FavoritesPage mediaType="movie" /> },
        ],
      },
      {
        path: 'series',
        children: [
          { index: true, element: <MoviesPage mediaType="tv" /> },
          { path: 'watchlist', element: <WatchlistPage mediaType="tv" /> },
          { path: 'avaliacoes', element: <RatedMoviesPage mediaType="tv" /> },
          { path: 'favoritos', element: <FavoritesPage mediaType="tv" /> },
        ],
      },
      { path: 'filme/:movieId', element: <MovieDetailPage /> },
      { path: 'serie/:serieId', element: <SerieDetailPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
