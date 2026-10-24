import { SectionTitle } from '../components/SectionTitle';
import { EVENTOS, registrar } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

const dominio = (url) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

// Each project shows a capture of the live site that scrolls by itself inside a browser frame.
export const PersonalProjectsSection = ({ projects }) => {
  const { t, local } = useIdioma();
  return (
    <section className="pessoais" id="projetos-pessoais" aria-labelledby="pessoais-titulo">
      <div className="wrap">
        <SectionTitle fundo={t.pessoais.fundo} id="pessoais-titulo">{t.pessoais.titulo}</SectionTitle>
        <div className="previas">
          {projects.map((projeto) => {
            const p = local(projeto);
            return (
              <a
                key={p.id}
                className="previa revela"
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                // o nome do projeto vai sempre em português, para os relatórios não se dividirem por idioma
                onClick={() => registrar(EVENTOS.abrirProjetoPessoal, { projeto: projeto.shortTitle ?? projeto.title })}
              >
                <div className="janela">
                  <div className="janela-topo" aria-hidden="true"><b /><b /><b /><span>{dominio(p.liveUrl)}</span></div>
                  <div className="tela"><img src={p.previewUrl} alt={p.previewAlt} width={800} loading="lazy" decoding="async" /></div>
                </div>
                <h3>{p.shortTitle ?? p.title}</h3>
                <p>{p.summary ?? p.description}</p>
                <span className="tec">{(p.highlights ?? p.technologies).join(' · ')}</span>
                <span className="abrir">{p.linkLabel ?? t.pessoais.abrir}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
