import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { C137 } from './components/C137';
import { AvisoCookies } from './components/AvisoCookies';
import { iniciarSeConsentido } from './lib/analytics';
import { IdiomaProvider } from './i18n/IdiomaProvider';
import { useIdioma } from './i18n/idioma';

const PularConteudo = () => {
  const { t } = useIdioma();
  return <a className="pular" href="#conteudo">{t.pularConteudo}</a>;
};

const App = () => {
  useEffect(() => {
    iniciarSeConsentido();
  }, []);

  return (
    <IdiomaProvider>
      <PularConteudo />
      <Navbar />
      <Outlet />
      <Footer {...portfolioData.user} />
      <BackToTop />
      <C137 />
      <AvisoCookies />
    </IdiomaProvider>
  );
};

export default App;
