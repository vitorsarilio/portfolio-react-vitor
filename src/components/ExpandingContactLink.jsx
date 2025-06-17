// Este componente lida com os links de contato que expandem ao passar o mouse.
export const ExpandingContactLink = ({ href, eventCategory, eventAction, eventLabel, icon: Icon, textToShow, trackEvent }) => ( //
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent(eventCategory, eventAction, eventLabel)} //
    className="group relative flex items-center p-2 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300"
    aria-label={eventLabel}
  >
    <Icon size={28} className="flex-shrink-0 transition-transform duration-500 group-hover:scale-110" /> 
    <span 
      style={{transition: 'max-width 0.5s ease-in-out, opacity 0.5s 0.1s ease-in-out, margin-left 0.5s ease-in-out, padding 0.5s ease-in-out'}} 
      className="ml-0 max-w-0 overflow-hidden whitespace-nowrap group-hover:ml-2 group-hover:max-w-xs group-hover:px-3 group-hover:py-1 text-sm font-semibold text-purple-700 dark:text-purple-300 opacity-0 group-hover:opacity-100 pointer-events-none"
    >
      {textToShow}
    </span>
  </a>
);