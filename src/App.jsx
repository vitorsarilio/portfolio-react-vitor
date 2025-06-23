import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, Link, useLocation, NavLink } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { portfolioData } from './data/portfolioData';
import { Footer } from './components/Footer';
import DataMatrixBackground from './components/DataMatrixBackground';
import { User, Code, Briefcase, LayoutDashboard, Sun, Moon, Film } from 'lucide-react';

const GA_MEASUREMENT_ID = 'G-Z1643DT14D';

const Navbar = ({ theme, toggleTheme }) => {
  const location = useLocation();
  const isPortfolioPage = location.pathname === '/';

  const portfolioSections = [
    { label: "Sobre Mim", section: "#about", icon: <User size={18} /> },
    { label: "Projetos", section: "#projects", icon: <Code size={18} /> },
    { label: "Projetos Pessoais", section: "#personal-projects", icon: <LayoutDashboard size={18} /> },
    { label: "Currículo", section: "#resume", icon: <Briefcase size={18} /> },
  ];
  
  const baseLinkStyle = "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-semibold transition-colors duration-300";
  const activeLinkStyle = "text-purple-600 dark:text-purple-400 font-bold";
  const inactiveLinkStyle = "text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400";

  const isMovieSectionActive = location.pathname.startsWith('/filmes') || location.pathname.startsWith('/watchlist') || location.pathname.startsWith('/avaliacoes');

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-4 fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-black/5 dark:border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2 md:gap-x-4">
          <li>
            <NavLink to="/" className={({ isActive }) => `${baseLinkStyle} ${isActive ? activeLinkStyle : inactiveLinkStyle}`}>
              <LayoutDashboard size={18}/> <span>Portfólio</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/filmes" className={`${baseLinkStyle} ${isMovieSectionActive ? activeLinkStyle : inactiveLinkStyle}`}>
              <Film size={18}/> <span>App de Filmes</span>
            </NavLink>
          </li>
          {isPortfolioPage && <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden md:block"></div>}
          {isPortfolioPage && portfolioSections.map(item => (
            <li key={item.section} className="hidden md:flex">
              <a href={item.section} className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-white/10 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                {item.icon}<span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button onClick={toggleTheme} className="p-2 rounded-full text-purple-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300" aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const { user } = portfolioData;
  const location = useLocation();
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' && localStorage.getItem('theme')) || 'light');
  const [personalRatingsMap, setPersonalRatingsMap] = useState(new Map());

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(prev => (prev === 'light' ? 'dark' : 'light')), []);

  useEffect(() => {
    const ACCOUNT_ID = import.meta.env.VITE_TMDB_ACCOUNT_ID;
    const READ_ACCESS_TOKEN = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
    if (!ACCOUNT_ID || !READ_ACCESS_TOKEN) {
      console.warn("Credenciais da conta TMDB não configuradas para buscar notas.");
      return;
    }
    const RATED_MOVIES_URL = `https://api.themoviedb.org/3/account/${ACCOUNT_ID}/rated/movies`;
    const options = { headers: { accept: 'application/json', Authorization: `Bearer ${READ_ACCESS_TOKEN}`}};
    
    const fetchAllPersonalRatings = async () => {
      let allRatings = new Map();
      let currentPage = 1;
      let totalPages = 1;
      do {
        const response = await fetch(`${RATED_MOVIES_URL}?sort_by=created_at.desc&page=${currentPage}`, options);
        if (response.ok) {
          const data = await response.json();
          data.results.forEach(movie => allRatings.set(movie.id, movie.rating));
          totalPages = data.total_pages;
          currentPage++;
        } else {
          console.error("Falha ao buscar página de notas pessoais:", response.statusText);
          break;
        }
      } while (currentPage <= totalPages);
      setPersonalRatingsMap(allRatings);
    };
    
    fetchAllPersonalRatings();
  }, []);

  useEffect(() => {
    if (GA_MEASUREMENT_ID) {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [location]);

  const trackEvent = useCallback((category, action, label) => {
    if (GA_MEASUREMENT_ID) ReactGA.event({ category, action, label });
  }, []);

  return (
    <div className="bg-white dark:bg-gray-950 flex flex-col min-h-screen font-sans relative isolate">
      <div className="fixed inset-0 -z-10"><DataMatrixBackground /></div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-[76px] flex-grow flex flex-col z-10">
        <Outlet context={{ trackEvent, personalRatingsMap }} />
      </main>
      <Footer user={user} />
    </div>
  );
}