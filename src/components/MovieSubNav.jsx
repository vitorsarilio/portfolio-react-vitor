import React from 'react';
import { NavLink } from 'react-router-dom';
import { TrendingUp, ListVideo, Star, Heart } from 'lucide-react';

export const MovieSubNav = () => {
  const baseLinkStyle = "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors duration-200";
  const inactiveLinkStyle = "text-gray-500 dark:text-gray-400 hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900/50 dark:hover:text-purple-300";
  const activeLinkStyle = "bg-purple-600 text-white shadow-md";

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-md p-2 rounded-lg mb-8 container mx-auto max-w-max">
      <nav className="flex flex-wrap items-center justify-center gap-2">
        <NavLink
          to="/filmes"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}>
          <TrendingUp size={18} />
          <span>Populares</span>
        </NavLink>
        <NavLink
          to="/watchlist"
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}>
          <ListVideo size={18} />
          <span>Minha Watchlist</span>
        </NavLink>
        <NavLink 
          to="/avaliacoes" 
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}>
          <Star size={18} /> 
          <span>Minhas Avaliações</span>
        </NavLink>
        <NavLink 
          to="/favoritos" 
          className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}>
          <Heart size={18} /> 
          <span>Favoritos</span>
        </NavLink>
      </nav>
    </div>
  );
};