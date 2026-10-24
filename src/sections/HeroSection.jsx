import { HeatmapCanvas } from '../components/HeatmapCanvas';
import { TypedTitle } from '../components/TypedTitle';
import { DataFlow } from '../components/DataFlow';
import { C137Vaga } from '../components/C137';
import { anosDesde, linkWhatsApp } from '../lib/contato';
import { EVENTOS, registrar } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

export const HeroSection = ({ user }) => {
  const { idioma, t } = useIdioma();
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
            {t.topo.quem}
          </p>
          {/* key: trocar de idioma digita o título de novo */}
          <TypedTitle key={idioma} partes={t.topo.titulo} />
          <p className="sub">{t.topo.sub(anos)}</p>
          <div className="acoes">
            <a
              className="btn btn-vermelho"
              href={linkWhatsApp(user, t.topo.mensagemWhatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={registrarNoTopo(EVENTOS.cliqueWhatsapp)}
            >
              {t.topo.whatsapp}
            </a>
            <a className="btn btn-contorno" href="#projetos" onClick={registrarNoTopo(EVENTOS.cliqueVerProjetos)}>{t.topo.verProjetos}</a>
            {user.resumeUrl && (
              <a className="btn btn-contorno" href={user.resumeUrl} download onClick={registrarNoTopo(EVENTOS.downloadCv)}>{t.topo.baixarCv}</a>
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
