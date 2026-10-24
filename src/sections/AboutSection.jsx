import { SectionTitle } from '../components/SectionTitle';
import { anosDesde } from '../lib/contato';
import { useIdioma } from '../i18n/idioma';

export const AboutSection = ({ user }) => {
  const { t, local } = useIdioma();
  const s = t.sobre;
  const pessoa = local(user);

  return (
    <section className="sobre" id="sobre" aria-labelledby="sobre-titulo">
      <div className="wrap">
        <figure className="revela">
          <div className="moldura">
            <img src={user.avatar} alt={s.foto(user.name)} width={768} height={1161} loading="lazy" decoding="async" />
          </div>
          <figcaption className="legenda-foto">{pessoa.location}</figcaption>
        </figure>
        <div className="sobre-texto revela">
          <SectionTitle fundo={s.fundo} id="sobre-titulo">{s.titulo}</SectionTitle>
          <p>
            {s.paragrafo1(anosDesde(user.dataSince)).map(([texto, destaque], i) => (destaque ? <strong key={i}>{texto}</strong> : <span key={i}>{texto}</span>))}
          </p>
          <p>{s.paragrafo2}</p>
          <ul className="idiomas" aria-label={s.idiomas}>
            {user.languages.map((l) => {
              const lingua = local(l);
              return <li key={l.name}>{lingua.name}<em>{lingua.level}</em></li>;
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
