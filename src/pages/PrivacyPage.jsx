import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { abrirPreferenciasDeCookies } from '../lib/analytics';

const ATUALIZADA_EM = '22 de outubro de 2026';

export default function PrivacyPage() {
  const { user } = portfolioData;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main id="conteudo" className="privacidade">
      <title>Política de privacidade | Vitor Hugo Sarilio</title>
      <meta name="description" content="Quais dados este portfólio coleta, para quê, com quem compartilha e como exercer seus direitos pela LGPD." />
      <meta name="robots" content="noindex" />
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
          O site guarda no armazenamento local do seu navegador (não são cookies e não são enviados a ninguém): o tema escolhido,
          se as animações estão ligadas e a sua escolha sobre o Google Analytics. Você pode apagar esses dados limpando os dados
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
    </main>
  );
}
