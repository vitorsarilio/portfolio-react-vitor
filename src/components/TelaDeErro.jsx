import { HeatmapCanvas } from './HeatmapCanvas';

// Shared layout for "page not found" and "something went wrong": giant code behind,
// a terminal-style line with what happened, a title, a short text and the way out.
export const TelaDeErro = ({ codigo, linha, status, titulo, texto, children }) => (
  <main id="conteudo" className="pagina-erro">
    <HeatmapCanvas />
    <div className="wrap">
      <span className="erro-codigo glitch" aria-hidden="true">{codigo}</span>
      <p className="erro-terminal">
        <span aria-hidden="true">&gt;</span> <code>{linha}</code> <b>{status}</b>
      </p>
      <h1>{titulo}</h1>
      <p className="erro-texto">{texto}</p>
      <div className="acoes">{children}</div>
    </div>
  </main>
);
