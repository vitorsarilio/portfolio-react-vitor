// Labeled call-to-action link (WhatsApp, e-mail, LinkedIn, CV...). `icon` is a rendered element.
export const ContactButton = ({ href, label, icon, primary = false, download, onClick }) => {
  const isExternal = /^https?:\/\//.test(href);

  const style = primary
    ? 'bg-purple-600 text-white hover:bg-purple-700'
    : 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-gray-700 dark:text-purple-300 dark:hover:bg-gray-600';

  return (
    <a
      href={href}
      onClick={onClick}
      download={download}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 ${style}`}
    >
      <span aria-hidden="true" className="flex">{icon}</span>
      {label}
    </a>
  );
};
