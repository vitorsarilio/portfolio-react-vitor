import { CountUp } from '../components/CountUp';
import { contarNumeros } from '../lib/numeros';
import { useIdioma } from '../i18n/idioma';

export const StatsSection = ({ dados }) => {
  const { idioma, t } = useIdioma();
  return (
    <section className="numeros" aria-label={t.numeros.rotulo}>
      <div className="wrap">
        {contarNumeros(dados).map((n) => (
          <div key={n.chave} className="numero revela">
            <strong><CountUp valor={n.valor} idioma={idioma} />{n.sufixo && <em>{n.sufixo}</em>}</strong>
            <span>{t.numeros[n.chave]}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
