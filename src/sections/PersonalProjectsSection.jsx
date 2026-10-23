import { SectionTitle } from '../components/SectionTitle';
import { EVENTOS, registrar } from '../lib/analytics';

const dominio = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// Each project shows a capture of the live site that scrolls by itself inside a browser frame.
export const PersonalProjectsSection = ({ projects }) => (
  <section className="pessoais" id="projetos-pessoais" aria-labelledby="pessoais-titulo">
    <div className="wrap">
      <SectionTitle fundo="PESSOAIS" id="pessoais-titulo">Projetos pessoais no ar</SectionTitle>
      <div className="previas">
        {projects.map((p) => (
          <a
            key={p.id}
            className="previa revela"
            href={p.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registrar(EVENTOS.abrirProjetoPessoal, { projeto: p.shortTitle ?? p.title })}
          >
            <div className="janela">
              <div className="janela-topo" aria-hidden="true"><b /><b /><b /><span>{dominio(p.liveUrl)}</span></div>
              <div className="tela"><img src={p.previewUrl} alt={p.previewAlt} width={800} loading="lazy" decoding="async" /></div>
            </div>
            <h3>{p.shortTitle ?? p.title}</h3>
            <p>{p.summary ?? p.description}</p>
            <span className="tec">{(p.highlights ?? p.technologies).join(' · ')}</span>
            <span className="abrir">{p.linkLabel ?? 'Abrir o site'}</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
