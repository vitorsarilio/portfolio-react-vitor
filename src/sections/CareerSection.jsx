import { SectionTitle } from '../components/SectionTitle';
import { Marquee } from '../components/Marquee';
import { logo } from '../lib/logos';
import { useIdioma } from '../i18n/idioma';

export const CareerSection = ({ companies }) => {
  const { t } = useIdioma();
  return (
    <section className="faixa" id="experiencia" aria-labelledby="carreira-titulo">
      <div className="wrap">
        <SectionTitle fundo={t.carreira.fundo} id="carreira-titulo">{t.carreira.titulo}</SectionTitle>
        <p className="sub-faixa revela">{t.carreira.sub}</p>
      </div>
      <Marquee
        itens={companies}
        chave={(c) => c.name}
        className="empresas"
        duracao={45}
        rotulo={t.carreira.lista}
        renderizar={(c) => (
          <div className="empresa" title={c.name}>
            <img src={logo(c.logo)} alt={c.name} loading="lazy" decoding="async" />
          </div>
        )}
      />
    </section>
  );
};
