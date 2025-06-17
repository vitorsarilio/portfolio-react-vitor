export const Footer = ({ user }) => { //
  return (
    <footer className="bg-gray-900 dark:bg-black text-purple-300 dark:text-purple-500 text-center p-6 border-t border-gray-700 dark:border-gray-800"> {/* */}
      <p>© {new Date().getFullYear()} {user.name}. Todos os direitos reservados.</p> {/* */}
      <p className="text-xs mt-1">Desenvolvido com React + Vite & Tailwind CSS.</p> {/* */}
    </footer>
  );
};