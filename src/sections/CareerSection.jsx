import { SectionTitle } from '../components/SectionTitle';
import { Marquee } from '../components/Marquee';
import { logo } from '../lib/logos';

export const CareerSection = ({ companies }) => (
  <section className="faixa" id="experiencia" aria-labelledby="carreira-titulo">
    <div className="wrap">
      <SectionTitle fundo="CARREIRA" id="carreira-titulo">Empresas e clientes</SectionTitle>
      <p className="sub-faixa revela">Empresas para as quais já prestei serviço, de 2012 até hoje.</p>
    </div>
    <Marquee
      itens={companies}
      chave={(c) => c.name}
      className="empresas"
      duracao={45}
      rotulo="Empresas para as quais já prestei serviço"
      renderizar={(c) => (
        <div className="empresa" title={c.name}>
          <img src={logo(c.logo)} alt={c.name} loading="lazy" decoding="async" />
        </div>
      )}
    />
  </section>
);
