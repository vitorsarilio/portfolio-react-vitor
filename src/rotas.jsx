import App from './App.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';

// Rotas do site, num arquivo próprio para os testes usarem exatamente as mesmas
export const rotas = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PortfolioPage />,
      },
      {
        path: 'privacidade',
        element: <PrivacyPage />,
      },
      {
        // qualquer endereço que o site não tem
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];
