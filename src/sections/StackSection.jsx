import { SectionTitle } from '../components/SectionTitle';
import { Marquee } from '../components/Marquee';
import { logo } from '../lib/logos';
import { useIdioma } from '../i18n/idioma';

const Habilidade = ({ item }) => {
  const imagem = logo(item.logo);
  return (
    <div className="hab">
      <span className="icone" aria-hidden="true">{imagem ? <img src={imagem} alt="" loading="lazy" decoding="async" /> : <b>{item.name.slice(0, 2)}</b>}</span>
      <span><strong>{item.name}</strong><small>{item.grupo}</small></span>
    </div>
  );
};

// Two rows moving in opposite directions, never pausing.
export const StackSection = ({ skillGroups }) => {
  const { t, local } = useIdioma();
  const todas = skillGroups.flatMap((g) => g.items.map((item) => ({ ...item, grupo: local(g).name })));
  const metade = Math.ceil(todas.length / 2);
  const fileiras = [todas.slice(0, metade), todas.slice(metade)];

  return (
    <section className="stack" id="stack" aria-labelledby="stack-titulo">
      <div className="wrap">
        <SectionTitle fundo={t.stack.fundo} id="stack-titulo">{t.stack.titulo}</SectionTitle>
      </div>
      {fileiras.map((fileira, i) => (
        <Marquee
          key={i}
          itens={fileira}
          chave={(item) => `${item.grupo}-${item.name}`}
          className="cartoes-hab"
          reverso={i === 1}
          duracao={i === 0 ? 90 : 100}
          rotulo={i === 0 ? t.stack.lista : undefined}
          renderizar={(item) => <Habilidade item={item} />}
        />
      ))}
    </section>
  );
};
