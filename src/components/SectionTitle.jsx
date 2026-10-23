// Section heading with a giant italic word behind it (decorative, hidden from screen readers).
export const SectionTitle = ({ fundo, children, id }) => (
  <div className="titulo revela">
    <span className="fundo glitch" aria-hidden="true">{fundo}</span>
    <h2 id={id}>{children}</h2>
  </div>
);
