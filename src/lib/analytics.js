import ReactGA from 'react-ga4';

/*
  Google Analytics só é carregado depois que a pessoa permite (LGPD: consentimento).
  Sem resposta ou com "Recusar", nenhum script do Google é baixado e nenhum cookie é criado.
  A escolha fica no localStorage e pode ser trocada a qualquer momento pelo rodapé.

  Nomes de evento: português, snake_case, sem acento (regra do GA4: letras, números e _,
  até 40 caracteres). Nenhum evento envia o texto digitado na C137.
*/
export const GA_MEASUREMENT_ID = 'G-Z1643DT14D';
const CHAVE_CONSENTIMENTO = 'consentimento-analytics';

export const EVENTOS = {
  cliqueWhatsapp: 'clique_whatsapp',       // local: topo | rodape
  cliqueLinkedin: 'clique_linkedin',       // local: rodape
  cliqueGithub: 'clique_github',           // local: rodape
  cliqueEmail: 'clique_email',             // local: rodape
  downloadCv: 'download_cv',               // local: topo
  cliqueVerProjetos: 'clique_ver_projetos', // local: topo
  cliqueMenu: 'clique_menu',               // secao: Projetos | Stack | Experiência | Contato
  abrirProjetoPessoal: 'abrir_projeto_pessoal', // projeto: nome do projeto
  abrirCertificado: 'abrir_certificado',   // certificado: nome do certificado
  c137AbrirChat: 'c137_abrir_chat',        // local: canto
  c137EnviarPergunta: 'c137_enviar_pergunta', // local: topo | canto; origem: sugestao | digitada
  c137RespostaErro: 'c137_resposta_erro',  // motivo: demora | falha
  trocarTema: 'trocar_tema',               // tema: sistema | claro | escuro
  trocarAnimacoes: 'trocar_animacoes',     // animacoes: ligadas | desligadas
};

let iniciado = false;

export function lerConsentimento() {
  try {
    const valor = localStorage.getItem(CHAVE_CONSENTIMENTO);
    return valor === 'aceito' || valor === 'recusado' ? valor : null;
  } catch {
    return null;
  }
}

function salvarConsentimento(valor) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, valor);
  } catch {
    // storage blocked: the choice lasts until the page is closed
  }
}

// gtag.js precisa receber o objeto `arguments`, não um array
function gtag() {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(arguments);
}

function iniciar() {
  if (iniciado) return;
  window[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  // só medição: nada de anúncios, sinais do Google ou personalização
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  ReactGA.initialize(GA_MEASUREMENT_ID, {
    gtagOptions: { allow_google_signals: false, allow_ad_personalization_signals: false },
  });
  iniciado = true;
}

function apagarCookiesDoAnalytics() {
  const partes = window.location.hostname.split('.');
  const dominios = ['', ...partes.map((_, i) => `.${partes.slice(i).join('.')}`)];
  document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter((nome) => /^_ga/.test(nome)).forEach((nome) => {
    dominios.forEach((dominio) => {
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dominio ? `; domain=${dominio}` : ''}`;
    });
  });
}

// Chamado uma vez ao abrir o site: retoma o Analytics se a pessoa já tinha permitido
export function iniciarSeConsentido() {
  if (lerConsentimento() === 'aceito') iniciar();
}

export function aceitarAnalytics() {
  salvarConsentimento('aceito');
  if (iniciado) gtag('consent', 'update', { analytics_storage: 'granted' });
  iniciar();
}

export function recusarAnalytics() {
  salvarConsentimento('recusado');
  if (iniciado) {
    gtag('consent', 'update', { analytics_storage: 'denied' });
    window[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  }
  apagarCookiesDoAnalytics();
}

// Envia um evento só se a pessoa permitiu; caso contrário não faz nada
export function registrar(nome, parametros = {}) {
  if (!iniciado || lerConsentimento() !== 'aceito') return;
  ReactGA.event(nome, parametros);
}

// O rodapé reabre o aviso de cookies para a pessoa mudar de ideia
export const EVENTO_ABRIR_PREFERENCIAS = 'abrir-preferencias-cookies';
export const abrirPreferenciasDeCookies = () => window.dispatchEvent(new Event(EVENTO_ABRIR_PREFERENCIAS));
