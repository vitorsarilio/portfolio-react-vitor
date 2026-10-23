import { SectionTitle } from '../components/SectionTitle';
import { anosDesde } from '../lib/contato';

export const AboutSection = ({ user }) => (
  <section className="sobre" id="sobre" aria-labelledby="sobre-titulo">
    <div className="wrap">
      <figure className="revela">
        <div className="moldura">
          <img src={user.avatar} alt={`Foto de ${user.name}`} width={768} height={1161} loading="lazy" decoding="async" />
        </div>
        <figcaption className="legenda-foto">{user.location}</figcaption>
      </figure>
      <div className="sobre-texto revela">
        <SectionTitle fundo="SOBRE" id="sobre-titulo">Quem está por trás dos dados</SectionTitle>
        <p>
          Sou analista de dados há <strong>{anosDesde(user.dataSince)} anos</strong>, com passagem por logística, transporte, tecnologia e consultoria.
          Meu trabalho começa na <strong>coleta e modelagem</strong> (SQL, Python, Airflow, BigQuery) e termina no{' '}
          <strong>dashboard que a equipe usa para decidir</strong> (Power BI). No meio do caminho, <strong>automatizo</strong> o que é repetitivo:
          integrações, alertas e fluxos com n8n, Python e monday.com.
        </p>
        <p>
          Já atuei em consultoria, logística, transporte e tecnologia, construindo pipelines escaláveis e reformulando dashboards
          para que as pessoas encontrem a resposta mais rápido.
        </p>
        <ul className="idiomas" aria-label="Idiomas">
          {user.languages.map((l) => <li key={l.name}>{l.name}<em>{l.level}</em></li>)}
        </ul>
      </div>
    </div>
  </section>
);
