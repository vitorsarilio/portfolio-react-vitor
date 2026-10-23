// Endless strip: the items are rendered twice so the -50% loop has no seam.
// The copy is hidden from screen readers; without animations the copy is hidden too
// and the strip scrolls sideways instead.
export const Marquee = ({ itens, chave, renderizar, className = '', reverso = false, duracao, rotulo }) => (
  <div className="letreiro">
    <ul
      className={`trilho ${className}${reverso ? ' reverso' : ''}`}
      style={duracao ? { animationDuration: `${duracao}s` } : undefined}
      aria-label={rotulo}
    >
      {itens.map((item) => <li key={chave(item)}>{renderizar(item)}</li>)}
      {itens.map((item) => <li key={`copia-${chave(item)}`} aria-hidden="true">{renderizar(item)}</li>)}
    </ul>
  </div>
);
