import { User, Code, Briefcase, LayoutDashboard, Sun, Moon } from 'lucide-react'; //

export const Navbar = ({ setActiveSection, theme, toggleTheme, trackEvent }) => { //
  const navItems = [ //
    { label: "Sobre Mim", section: "about", icon: <User size={18} /> }, //
    { label: "Projetos", section: "projects", icon: <Code size={18} /> }, //
    { label: "Projetos Pessoais", section: "personalProjects", icon: <LayoutDashboard size={18} /> }, //
    { label: "Currículo", section: "resume", icon: <Briefcase size={18} /> }, //
  ];

  const handleNavClick = (section) => { //
    trackEvent('Navegação', 'Clique Menu', section); //
    setActiveSection(section); //
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md p-4 fixed top-0 left-0 right-0 z-50 shadow-lg"> {/* */}
      <div className="container mx-auto flex justify-between items-center"> {/* */}
        <ul className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 md:gap-x-4"> {/* */}
          {navItems.map(item => ( //
            <li key={item.section}>
              <button
                onClick={() => handleNavClick(item.section)} //
                className="flex items-center space-x-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-white transition-colors duration-300 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => { //
            trackEvent('Interação Tema', 'Alternar Tema', theme === 'light' ? 'Para Escuro' : 'Para Claro'); //
            toggleTheme(); //
          }}
          className="p-2 rounded-full text-purple-600 dark:text-yellow-400 hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />} {/* */}
        </button>
      </div>
    </nav>
  );
};