import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { TelaDeErro } from '../components/TelaDeErro';
import { IdiomaProvider } from '../i18n/IdiomaProvider';
import { useIdioma } from '../i18n/idioma';

// Replaces React Router's developer screen ("Unexpected Application Error") when something
// breaks while rendering. It shows outside the normal layout, so it brings its own language provider
// and a plain mark instead of the full menu (which may be what broke).
const Conteudo = () => {
  const erro = useRouteError();
  const { t } = useIdioma();
  const naoEncontrada = isRouteErrorResponse(erro) && erro.status === 404;
  const textos = naoEncontrada ? t.naoEncontrada : t.erro;

  return (
    <>
      <header className="erro-topo">
        <div className="wrap"><a href="/" className="marca">vitor<span>.</span>sarilio</a></div>
      </header>
      <TelaDeErro
        codigo={naoEncontrada ? '404' : '500'}
        linha={`GET ${window.location.pathname}`}
        status={textos.status}
        titulo={textos.titulo}
        texto={textos.texto}
      >
        {naoEncontrada ? (
          <a className="btn btn-vermelho" href="/">{textos.inicio}</a>
        ) : (
          <>
            <button type="button" className="btn btn-vermelho" onClick={() => window.location.reload()}>{textos.recarregar}</button>
            <a className="btn btn-contorno" href="/">{textos.inicio}</a>
          </>
        )}
      </TelaDeErro>
    </>
  );
};

export default function ErrorPage() {
  return (
    <IdiomaProvider>
      <Conteudo />
    </IdiomaProvider>
  );
}
