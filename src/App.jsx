import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { portfolioData } from './data/portfolioData';
import { Footer } from './components/Footer';
import Chatbot from './components/Chatbot'; // Importe o componente Chatbot
import { MessageSquare } from 'lucide-react'; // Importe o ícone para o botão do chatbot

import { User, Code, Briefcase, LayoutDashboard, Sun, Moon, Film, TrendingUp, ListVideo, Star, Heart, Menu, X, Tv } from 'lucide-react';

const GA_MEASUREMENT_ID = 'G-Z1643DT14D';
const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isPortfolioPage = location.pathname === '/';
  const mediaBasePaths = ['/filmes', '/series', '/filme', '/serie'];
  const isMediaSectionActive = mediaBasePaths.some(path => location.pathname.startsWith(path));

  const currentMediaType = location.pathname.startsWith('/filmes') || location.pathname.startsWith('/filme/') ? 'movie' : (location.pathname.startsWith('/series') || location.pathname.startsWith('/serie/') ? 'tv' : null);

  const portfolioSections = [
    { label: "Sobre Mim", section: "#about", icon: <User size={18} /> },
    { label: "Projetos", section: "#projects", icon: <Code size={18} /> },
    { label: "Projetos Pessoais", section: "#personal-projects", icon: <LayoutDashboard size={18} /> },
    { label: "Currículo", section: "#resume", icon: <Briefcase size={18} /> },
  ];

  const mediaSubSections = [];
  if (currentMediaType === 'movie') {
    mediaSubSections.push(
      { label: "Populares", path: "/filmes", icon: <TrendingUp size={18} /> },
      { label: "Minha Watchlist", path: "/filmes/watchlist", icon: <ListVideo size={18} /> },
      { label: "Minhas Avaliações", path: "/filmes/avaliacoes", icon: <Star size={18} /> },
      { label: "Favoritos", path: "/filmes/favoritos", icon: <Heart size={18} /> }
    );
  } else if (currentMediaType === 'tv') {
    mediaSubSections.push(
      { label: "Populares", path: "/series", icon: <TrendingUp size={18} /> },
      { label: "Minha Watchlist", path: "/series/watchlist", icon: <ListVideo size={18} /> },
      { label: "Minhas Avaliações", path: "/series/avaliacoes", icon: <Star size={18} /> },
      { label: "Favoritos", path: "/series/favoritos", icon: <Heart size={18} /> }
    );
  }

  const baseLinkStyle = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300";
  const activeLinkStyle = "text-purple-600 dark:text-purple-400 font-bold";
  const inactiveLinkStyle = "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400";
  const activeSubLinkStyle = "bg-purple-600/10 dark:bg-white/10 text-purple-600 dark:text-purple-300";
  const inactiveSubLinkStyle = "text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-purple-600 dark:hover:text-purple-400";

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-black/5 dark:border-white/5">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        <div className="hidden md:flex items-center">
           <ul className="flex items-center gap-x-1">
              <li><NavLink to="/" className={({ isActive }) => `${baseLinkStyle} ${isActive && !isMediaSectionActive ? activeLinkStyle : inactiveLinkStyle}`}><LayoutDashboard size={18}/> <span>Portfólio</span></NavLink></li>
              
              {/* Botões Filmes/Séries */}
              <li className="flex space-x-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg ml-4">
                <NavLink 
                  to="/filmes"
                  className={({ isActive }) => `${baseLinkStyle} ${isActive && location.pathname.startsWith('/filmes') ? 'bg-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'} cursor-pointer`}
                >
                  <Film size={18}/> <span>Filmes</span>
                </NavLink>
                <NavLink 
                  to="/series"
                  className={({ isActive }) => `${baseLinkStyle} ${isActive && location.pathname.startsWith('/series') ? 'bg-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'} cursor-pointer`}
                >
                  <Tv size={18}/> <span>Séries</span>
                </NavLink>
              </li>
           </ul>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>
            <ul className="flex items-center gap-x-1">
              {isPortfolioPage && portfolioSections.map(item => (
                  <li key={item.section}><a href={item.section} className={`${baseLinkStyle} ${inactiveSubLinkStyle}`}>{item.icon}<span>{item.label}</span></a></li>
              ))}
              {isMediaSectionActive && mediaSubSections.map(item => (
                  <li key={item.path}><NavLink to={item.path} className={({isActive}) => `${baseLinkStyle} ${isActive ? activeSubLinkStyle : inactiveSubLinkStyle}`}>{item.icon}<span>{item.label}</span></NavLink></li>
              ))}
            </ul>
        </div>

        <div className="md:hidden">
            <NavLink to="/" className="font-bold text-lg text-purple-600 dark:text-purple-400" onClick={handleMobileLinkClick}>
              Vitor Sarilio
            </NavLink>
        </div>

        <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-full text-purple-600 dark:text-yellow-400 hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors duration-300" aria-label="Toggle theme">
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            
            <div className="md:hidden">
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-gray-700 dark:text-gray-200" aria-label="Abrir menu">
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-md pb-4 animate-fade-in-up">
            <ul className="flex flex-col items-center gap-2">
                <li><NavLink to="/" onClick={handleMobileLinkClick} className={({ isActive }) => `${baseLinkStyle} ${isActive && !isMediaSectionActive ? activeLinkStyle : inactiveLinkStyle}`}><LayoutDashboard size={18}/> <span>Portfólio</span></NavLink></li>
                
                {/* Botões Filmes/Séries para Mobile */}
                <li className="flex space-x-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-lg mt-2">
                  <NavLink 
                    to="/filmes"
                    onClick={handleMobileLinkClick}
                    className={({ isActive }) => `${baseLinkStyle} ${isActive && location.pathname.startsWith('/filmes') ? 'bg-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'} cursor-pointer`}
                  >
                    <Film size={18}/> <span>Filmes</span>
                  </NavLink>
                  <NavLink 
                    to="/series"
                    onClick={handleMobileLinkClick}
                    className={({ isActive }) => `${baseLinkStyle} ${isActive && location.pathname.startsWith('/series') ? 'bg-purple-600 text-white' : 'text-gray-700 dark:text-gray-300'} cursor-pointer`}
                  >
                    <Tv size={18}/> <span>Séries</span>
                  </NavLink>
                </li>

                <hr className="w-1/2 my-2 border-gray-200 dark:border-gray-700"/>

                {isPortfolioPage && portfolioSections.map(item => (
                    <li key={item.section}><a href={item.section} onClick={handleMobileLinkClick} className={`${baseLinkStyle} ${inactiveSubLinkStyle}`}>{item.icon}<span>{item.label}</span></a></li>
                ))}
                {isMediaSectionActive && mediaSubSections.map(item => (
                     <li key={item.path}><NavLink to={item.path} onClick={handleMobileLinkClick} className={({isActive}) => `${baseLinkStyle} ${isActive ? activeSubLinkStyle : inactiveSubLinkStyle}`}>{item.icon}<span>{item.label}</span></NavLink></li>
                ))}
            </ul>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme : 'light';
  });

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  const [personalRatingsMap, setPersonalRatingsMap] = useState(new Map());

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  useEffect(() => {
    const fetchPersonalRatings = async () => {
      if (!READ_ACCESS_TOKEN || !ACCOUNT_ID) return;

      const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}` } };
      const newRatingsMap = new Map();

      try {
        let page = 1;
        let totalPages = 1;
        while (page <= totalPages) {
          const moviesResponse = await fetch(`https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies?language=pt-BR&page=${page}&sort_by=created_at.desc`, options);
          const moviesData = await moviesResponse.json();
          moviesData.results.forEach(movie => newRatingsMap.set(movie.id, movie.rating));
          totalPages = moviesData.total_pages;
          page++;
        }

        page = 1;
        totalPages = 1;
        while (page <= totalPages) {
          const tvResponse = await fetch(`https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/tv?language=pt-BR&page=${page}&sort_by=created_at.desc`, options);
          const tvData = await tvResponse.json();
          tvData.results.forEach(tv => newRatingsMap.set(tv.id, tv.rating));
          totalPages = tvData.total_pages;
          page++;
        }

        setPersonalRatingsMap(newRatingsMap);
      } catch (error) {
        console.error("Erro ao buscar avaliações pessoais:", error);
      }
    };

    fetchPersonalRatings();
  }, [READ_ACCESS_TOKEN, ACCOUNT_ID]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 min-h-screen font-sans transition-colors duration-300`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-24 md:pt-32 container mx-auto px-4">
        <Outlet context={{ trackEvent: (category, action, label) => ReactGA.event({ category, action, label }), personalRatingsMap }} />
      </main>
      <Footer {...portfolioData.user} />

      {/* Chatbot flutuante */}
      <div className="fixed bottom-4 right-4 z-50">
        {isChatbotOpen && (
          <div className="mb-2">
            <Chatbot />
          </div>
        )}
        <button
          onClick={toggleChatbot}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label={isChatbotOpen ? "Fechar Chatbot" : "Abrir Chatbot"}
        >
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default App;