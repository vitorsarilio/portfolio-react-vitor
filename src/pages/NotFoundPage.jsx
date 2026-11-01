import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TelaDeErro } from '../components/TelaDeErro';
import { useIdioma } from '../i18n/idioma';
import { EVENTOS, registrar } from '../lib/analytics';

// Shown for any address the site doesn't have (the server always answers with the app,
// so the router decides). noindex keeps these addresses out of Google.
export default function NotFoundPage() {
  const { t, caminho } = useIdioma();
  const n = t.naoEncontrada;
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    registrar(EVENTOS.paginaNaoEncontrada, { caminho: pathname });
  }, [pathname]);

  return (
    <>
      <title>{n.metaTitulo}</title>
      <meta name="robots" content="noindex" />
      <TelaDeErro codigo="404" linha={`GET ${pathname}`} status={n.status} titulo={n.titulo} texto={n.texto}>
        <Link className="btn btn-vermelho" to={caminho('inicio')}>{n.inicio}</Link>
        <a className="btn btn-contorno" href={`${caminho('inicio')}#projetos`}>{n.projetos}</a>
      </TelaDeErro>
    </>
  );
}
