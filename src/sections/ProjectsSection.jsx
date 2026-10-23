import { SectionTitle } from '../components/SectionTitle';

export const ProjectsSection = ({ projects }) => (
  <>
    <div className="rasgo" aria-hidden="true" />
    <section className="vermelha" id="projetos" aria-labelledby="projetos-titulo">
      <div className="wrap">
        <SectionTitle fundo="PROJETOS" id="projetos-titulo">Projetos profissionais</SectionTitle>
        <ul className="linhas">
          {projects.map((p) => (
            <li key={p.id} className="linha-projeto revela">
              <h3>{p.shortTitle ?? p.title}</h3>
              <div>
                <p>{p.summary ?? p.description}</p>
                <small>{(p.highlights ?? p.technologies).join(' · ')}</small>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  </>
);
