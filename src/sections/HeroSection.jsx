import { HeatmapCanvas } from '../components/HeatmapCanvas';
import { TypedTitle } from '../components/TypedTitle';
import { DataFlow } from '../components/DataFlow';
import { C137Vaga } from '../components/C137';
import { anosDesde, linkWhatsApp } from '../lib/contato';
import { EVENTOS, registrar } from '../lib/analytics';

const TITULO = [['Transformo ', false], ['dados brutos', true], [' em decisões que ', false], ['rodam sozinhas', true], ['.', false]];

export const HeroSection = ({ user }) => {
  const anos = anosDesde(user.dataSince);
  const registrarNoTopo = (evento) => () => registrar(evento, { local: 'topo' });

  return (
    <header className="hero" id="inicio">
      <HeatmapCanvas />
      <div className="wrap">
        <div>
          <p className="quem">
            <img src={user.avatar} alt="" width={30} height={30} />
            <i aria-hidden="true" />
            Vitor Sarilio · dados, engenharia e automações
          </p>
          <TypedTitle partes={TITULO} />
          <p className="sub">
            Análise e engenharia de dados, e automações que tiram o trabalho manual do caminho: pipelines no Airflow e no BigQuery,
            modelagem com SQL e dbt, dashboards em Power BI e fluxos no n8n. Há {anos} anos levando dados da operação até quem decide.
          </p>
          <div className="acoes">
            <a className="btn btn-vermelho" href={linkWhatsApp(user)} target="_blank" rel="noopener noreferrer" onClick={registrarNoTopo(EVENTOS.cliqueWhatsapp)}>
              Falar no WhatsApp
            </a>
            <a className="btn btn-contorno" href="#projetos" onClick={registrarNoTopo(EVENTOS.cliqueVerProjetos)}>Ver projetos</a>
            {user.resumeUrl && (
              <a className="btn btn-contorno" href={user.resumeUrl} download onClick={registrarNoTopo(EVENTOS.downloadCv)}>Baixar CV</a>
            )}
          </div>
        </div>
        <div className="lado">
          <DataFlow />
          <C137Vaga />
        </div>
      </div>
    </header>
  );
};
