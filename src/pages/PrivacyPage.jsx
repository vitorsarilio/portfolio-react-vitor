import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { abrirPreferenciasDeCookies } from '../lib/analytics';
import { useIdioma } from '../i18n/idioma';

const ATUALIZADA_EM = '23 de outubro de 2026';
const ATUALIZADA_EM_EN = 'October 23, 2026';

const META = {
  'pt-BR': {
    titulo: 'Política de privacidade | Vitor Hugo Sarilio',
    descricao: 'Quais dados este portfólio coleta, para quê, com quem compartilha e como exercer seus direitos pela LGPD.',
  },
  'en-US': {
    titulo: 'Privacy policy | Vitor Hugo Sarilio',
    descricao: 'What data this portfolio collects, why, who it is shared with and how to exercise your rights under the LGPD.',
  },
};

const ConteudoPt = ({ user }) => (
      <div className="wrap">
        <p className="voltar"><Link to="/">← Voltar ao portfólio</Link></p>
        <h1>Política de privacidade</h1>
        <p className="atualizada">Atualizada em {ATUALIZADA_EM}</p>

        <p>
          Este portfólio é mantido por <strong>{user.name}</strong>, responsável pelo tratamento dos dados descritos aqui,
          conforme a Lei Geral de Proteção de Dados (Lei 13.709/2018). Para qualquer pedido, escreva para{' '}
          <a href={`mailto:${user.email}`}>{user.email}</a>.
        </p>

        <h2>Resumo</h2>
        <ul>
          <li>Não há cadastro, login nem venda de dados.</li>
          <li>O Google Analytics só é ativado se você permitir no aviso de cookies.</li>
          <li>O que você escreve para a C137 é usado só para gerar a resposta e não fica salvo no site.</li>
          <li>Você pode mudar sua escolha de cookies a qualquer momento.</li>
        </ul>

        <h2>Google Analytics (só com o seu consentimento)</h2>
        <p>
          Se você clicar em “Permitir análise”, o site carrega o Google Analytics 4 para medir de forma agregada quais páginas e
          botões são mais usados. São coletados: páginas visitadas, cliques em botões do site (por exemplo WhatsApp, projetos e
          a C137), tipo de dispositivo e navegador, idioma, cidade ou região aproximada e a página de origem da visita.
          O texto que você escreve na C137 nunca é enviado ao Analytics.
        </p>
        <p>
          O Google Analytics usa os cookies <code>_ga</code> e <code>_ga_*</code> para diferenciar visitas, com duração de até
          2 anos no seu navegador. Os sinais do Google, a personalização de anúncios e o compartilhamento para publicidade ficam
          desligados. Os relatórios são mantidos pelo Google por 2 meses.
        </p>
        <p>
          Base legal: consentimento (art. 7º, I). Se você recusar ou não responder, nenhum script do Google é baixado e nenhum
          desses cookies é criado. Se você retirar o consentimento depois, o site apaga esses cookies e para de enviar dados.
        </p>
        <p><button type="button" className="btn btn-contorno" onClick={abrirPreferenciasDeCookies}>Mudar preferências de cookies</button></p>

        <h2>C137, a assistente virtual</h2>
        <p>
          As perguntas que você envia e as respostas da conversa são enviadas ao servidor do site e à Anthropic, empresa que
          fornece o modelo de IA, apenas para gerar a resposta. O site não guarda as conversas: elas somem ao fechar ou recarregar
          a página. A Anthropic trata esses dados conforme a{' '}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">política de privacidade dela</a>.
          Não envie dados pessoais ou sensíveis pela C137; para falar com o Vitor, use o WhatsApp ou o e-mail.
        </p>
        <p>Base legal: legítimo interesse em responder às perguntas que você faz por vontade própria (art. 7º, IX).</p>

        <h2>Hospedagem e segurança</h2>
        <p>
          O site é hospedado na Vercel. Para entregar as páginas e proteger o site contra abuso, a Vercel registra dados técnicos
          de cada acesso, como endereço IP, data e hora e navegador, por um período curto. O servidor da C137 também limita o
          número de perguntas por endereço IP, só na memória e por um minuto. Base legal: legítimo interesse em manter o site
          funcionando e seguro (art. 7º, IX).
        </p>

        <h2>O que fica só no seu navegador</h2>
        <p>
          O site guarda no armazenamento local do seu navegador (não são cookies e não são enviados a ninguém): o tema e o idioma
          escolhidos, se as animações estão ligadas e a sua escolha sobre o Google Analytics. Você pode apagar esses dados limpando os dados
          do site no navegador. As fontes do site são servidas pelo próprio site, sem chamar serviços de terceiros.
        </p>

        <h2>Links externos</h2>
        <p>
          Os links para WhatsApp, LinkedIn, GitHub e para os projetos levam a sites de terceiros, que têm suas próprias
          políticas de privacidade.
        </p>

        <h2>Transferência internacional</h2>
        <p>
          Google, Anthropic e Vercel podem tratar dados fora do Brasil, principalmente nos Estados Unidos, com as garantias
          previstas nos contratos desses serviços (art. 33 da LGPD).
        </p>

        <h2>Seus direitos</h2>
        <p>
          Pela LGPD (art. 18), você pode pedir: confirmação de que há tratamento, acesso, correção, anonimização, bloqueio ou
          eliminação de dados, informação sobre compartilhamento e revogação do consentimento. Como o site não identifica
          visitantes, muitos pedidos podem ser atendidos pela própria escolha de cookies. Para os demais, escreva para{' '}
          <a href={`mailto:${user.email}`}>{user.email}</a>; a resposta vem em até 15 dias. Você também pode reclamar à Autoridade
          Nacional de Proteção de Dados (ANPD).
        </p>

        <h2>Mudanças nesta política</h2>
        <p>Quando algo mudar, esta página será atualizada e a data no topo também.</p>
      </div>
);

const ConteudoEn = ({ user }) => (
      <div className="wrap">
        <p className="voltar"><Link to="/">← Back to the portfolio</Link></p>
        <h1>Privacy policy</h1>
        <p className="atualizada">Updated on {ATUALIZADA_EM_EN}</p>

        <p>
          This portfolio is run by <strong>{user.name}</strong>, who is responsible for the data described here under Brazil's
          General Data Protection Law (LGPD, Law 13,709/2018). For any request, write to{' '}
          <a href={`mailto:${user.email}`}>{user.email}</a>.
        </p>

        <h2>Summary</h2>
        <ul>
          <li>There is no sign-up, no login and no selling of data.</li>
          <li>Google Analytics only turns on if you allow it in the cookie notice.</li>
          <li>What you write to C137 is used only to generate the answer and is not stored by the site.</li>
          <li>You can change your cookie choice at any time.</li>
        </ul>

        <h2>Google Analytics (only with your consent)</h2>
        <p>
          If you click “Allow analytics”, the site loads Google Analytics 4 to measure, in aggregate, which pages and buttons are
          used most. It collects: pages visited, clicks on the site's buttons (for example WhatsApp, projects and C137), device
          and browser type, language, approximate city or region and the page you came from. What you type to C137 is never sent
          to Analytics.
        </p>
        <p>
          Google Analytics uses the <code>_ga</code> and <code>_ga_*</code> cookies to tell visits apart, kept in your browser for
          up to 2 years. Google signals, ad personalization and sharing for advertising are turned off. Google keeps the reports
          for 2 months.
        </p>
        <p>
          Legal basis: consent (LGPD art. 7, I). If you decline or don't answer, no Google script is downloaded and none of these
          cookies are created. If you withdraw consent later, the site deletes these cookies and stops sending data.
        </p>
        <p><button type="button" className="btn btn-contorno" onClick={abrirPreferenciasDeCookies}>Change cookie preferences</button></p>

        <h2>C137, the virtual assistant</h2>
        <p>
          The questions you send and the conversation's answers go to the site's server and to Anthropic, the company that
          provides the AI model, only to generate the answer. The site does not keep conversations: they are gone when you close
          or reload the page. Anthropic handles this data under{' '}
          <a href="https://www.anthropic.com/legal/privacy" target="_blank" rel="noopener noreferrer">its privacy policy</a>.
          Don't send personal or sensitive data through C137; to talk to Vitor, use WhatsApp or e-mail.
        </p>
        <p>Legal basis: legitimate interest in answering the questions you choose to ask (LGPD art. 7, IX).</p>

        <h2>Hosting and security</h2>
        <p>
          The site is hosted on Vercel. To deliver the pages and protect the site against abuse, Vercel logs technical data about
          each visit, such as IP address, date and time and browser, for a short period. The C137 server also limits the number of
          questions per IP address, in memory only and for one minute. Legal basis: legitimate interest in keeping the site
          running and secure (LGPD art. 7, IX).
        </p>

        <h2>What stays only in your browser</h2>
        <p>
          The site saves in your browser's local storage (these are not cookies and are not sent to anyone): the theme, the
          language, whether animations are on and your Google Analytics choice. You can erase this data by clearing the site's
          data in your browser. The site's fonts are served by the site itself, without calling third-party services.
        </p>

        <h2>External links</h2>
        <p>
          The links to WhatsApp, LinkedIn, GitHub and the projects lead to third-party sites, which have their own privacy policies.
        </p>

        <h2>International transfer</h2>
        <p>
          Google, Anthropic and Vercel may process data outside Brazil, mainly in the United States, with the safeguards set out in
          these services' contracts (LGPD art. 33).
        </p>

        <h2>Your rights</h2>
        <p>
          Under the LGPD (art. 18), you can ask for: confirmation that data is processed, access, correction, anonymization,
          blocking or deletion of data, information about sharing and withdrawal of consent. Since the site does not identify
          visitors, many requests can be handled by the cookie choice itself. For anything else, write to{' '}
          <a href={`mailto:${user.email}`}>{user.email}</a>; you'll get an answer within 15 days. You can also file a complaint with
          Brazil's National Data Protection Authority (ANPD).
        </p>

        <h2>Changes to this policy</h2>
        <p>When something changes, this page will be updated, along with the date at the top.</p>
      </div>
);

export default function PrivacyPage() {
  const { user } = portfolioData;
  const { idioma } = useIdioma();
  const meta = META[idioma];

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main id="conteudo" className="privacidade">
      <title>{meta.titulo}</title>
      <meta name="description" content={meta.descricao} />
      <meta name="robots" content="noindex" />
      {idioma === 'en-US' ? <ConteudoEn user={user} /> : <ConteudoPt user={user} />}
    </main>
  );
}
