import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
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

  return (
    <nav className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md p-4 fixed top-0 left-0 right-0 z-50 shadow-lg border-b border-black/5 dark:border-white/5">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex flex-wrap justify-center items-center gap-x-1 sm:gap-x-2">
          <li>
            <Link to="/" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-semibold">
              <LayoutDashboard size={18}/> <span>Portfólio</span>
            </Link>
          </li>
          {/*<li>
            <Link to="/filmes" className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-semibold">
              <Film size={18}/> <span>App de Filmes</span>
            </Link>
          </li>*/}
          {isPortfolioPage && <div className="h-6 w-px bg-gray-300 dark:bg-gray-700 hidden md:block mx-2"></div>}
          {isPortfolioPage && portfolioSections.map(item => (
            <li key={item.section} className="hidden md:flex">
              <a href={item.section} className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300 px-3 py-2 rounded-md text-sm font-medium">
                {item.icon}
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-purple-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default function App() {
  const { user } = portfolioData;
  const location = useLocation();

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, []);
  
  useEffect(() => {
    if (GA_MEASUREMENT_ID && !ReactGA.isInitialized) ReactGA.initialize(GA_MEASUREMENT_ID);
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search, title: document.title });
  }, [location]);

  const trackEvent = useCallback((category, action, label) => {
    if (ReactGA.isInitialized) ReactGA.event({ category, action, label });
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <div className="fixed inset-0 -z-10 bg-white dark:bg-gray-950">
        <DataMatrixBackground />
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main className="pt-[76px] flex-grow flex flex-col z-10">
        <Outlet context={{ trackEvent }} />
      </main>
      <Footer user={user} />
    </div>
  );
}