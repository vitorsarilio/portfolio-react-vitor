import { SectionTitle } from '../components/SectionTitle';
import { logo } from '../lib/logos';

const Cartao = ({ arquivoLogo, nomeLogo, titulo, instituicao, periodo, children }) => (
  <li className="cartao revela">
    <div className="logo"><img src={logo(arquivoLogo)} alt={nomeLogo} loading="lazy" decoding="async" /></div>
    <h3>{titulo}</h3>
    <p>{instituicao}</p>
    <span className="periodo">{periodo}</span>
    {children}
  </li>
);

export const EducationSection = ({ education, certifications, trackEvent }) => (
  <section className="formacao" id="formacao" aria-labelledby="formacao-titulo">
    <div className="wrap">
      <SectionTitle fundo="FORMAÇÃO" id="formacao-titulo">Onde estudei</SectionTitle>
      <ul className="cartoes">
        {education.map((e) => (
          <Cartao key={`edu-${e.id}`} arquivoLogo={e.logo} nomeLogo={e.institution} titulo={e.shortDegree ?? e.degree} instituicao={e.institution} periodo={e.shortPeriod ?? e.period} />
        ))}
        {certifications.map((c) => (
          <Cartao key={`cert-${c.id}`} arquivoLogo={c.logo} nomeLogo={c.issuer} titulo={c.shortName ?? c.name} instituicao={c.shortIssuer ?? c.issuer} periodo={c.score}>
            {c.pdfUrl && (
              <a className="ver" href={c.pdfUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('Interação Certificado', 'Abrir PDF Certificado', c.name)}>
                Ver certificado
              </a>
            )}
          </Cartao>
        ))}
      </ul>
    </div>
  </section>
);
