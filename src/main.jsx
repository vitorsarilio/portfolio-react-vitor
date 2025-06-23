import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import { MovieAppLayout } from './pages/MovieAppLayout.jsx';
import MoviesPage from './pages/MoviesPage.jsx';
import WatchlistPage from './pages/WatchlistPage.jsx';
import RatedMoviesPage from './pages/RatedMoviesPage.jsx'; 
import FavoritesPage from './pages/FavoritesPage.jsx';

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
        element: <MovieAppLayout />,
        children: [
          { path: 'filmes', element: <MoviesPage /> },
          { path: 'watchlist', element: <WatchlistPage /> },
          { path: 'avaliacoes', element: <RatedMoviesPage /> },
          { path: 'favoritos', element: <FavoritesPage /> },
        ]
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);