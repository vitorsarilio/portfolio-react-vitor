import { CountUp } from '../components/CountUp';
import { contarNumeros } from '../lib/numeros';

export const StatsSection = ({ dados }) => (
  <section className="numeros" aria-label="Em números">
    <div className="wrap">
      {contarNumeros(dados).map((n) => (
        <div key={n.rotulo} className="numero revela">
          <strong><CountUp valor={n.valor} />{n.sufixo && <em>{n.sufixo}</em>}</strong>
          <span>{n.rotulo}</span>
        </div>
      ))}
    </div>
  </section>
);
