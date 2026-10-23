import { useCallback, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import ReactGA from 'react-ga4';

import { portfolioData } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { C137 } from './components/C137';

const GA_MEASUREMENT_ID = 'G-Z1643DT14D';

const trackEvent = (category, action, label) => ReactGA.event({ category, action, label });

const App = () => {
  // The floating chat sits where the back-to-top button would be, so hide it while open
  const [chatAberto, setChatAberto] = useState(false);
  const aoMudarChat = useCallback((aberto) => setChatAberto(aberto), []);

  useEffect(() => {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  }, []);

  return (
    <>
      <a className="pular" href="#conteudo">Pular para o conteúdo</a>
      <Navbar />
      <Outlet context={{ trackEvent }} />
      <Footer {...portfolioData.user} />
      <BackToTop escondido={chatAberto} />
      <C137 onAbertoChange={aoMudarChat} trackEvent={trackEvent} />
    </>
  );
};

export default App;
