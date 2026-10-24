import { SectionTitle } from '../components/SectionTitle';
import { useIdioma } from '../i18n/idioma';

export const ProjectsSection = ({ projects }) => {
  const { t, local } = useIdioma();
  return (
    <>
      <div className="rasgo" aria-hidden="true" />
      <section className="vermelha" id="projetos" aria-labelledby="projetos-titulo">
        <div className="wrap">
          <SectionTitle fundo={t.projetos.fundo} id="projetos-titulo">{t.projetos.titulo}</SectionTitle>
          <ul className="linhas">
            {projects.map((projeto) => {
              const p = local(projeto);
              return (
                <li key={p.id} className="linha-projeto revela">
                  <h3>{p.shortTitle ?? p.title}</h3>
                  <div>
                    <p>{p.summary ?? p.description}</p>
                    <small>{(p.highlights ?? p.technologies).join(' · ')}</small>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
};
