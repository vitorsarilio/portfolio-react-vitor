import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { C137 } from './components/C137';
import { AvisoCookies } from './components/AvisoCookies';
import { iniciarSeConsentido } from './lib/analytics';

const App = () => {
  useEffect(() => {
    iniciarSeConsentido();
  }, []);

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <Outlet />
      <Footer {...portfolioData.user} />
      <BackToTop />
      <C137 />
      <AvisoCookies />
    </>
  );
};

export default App;
