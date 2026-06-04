import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173'
    ];
    const vercelPreviewRegex = /^https:\/\/(.*)\.vercel\.app$/;
    if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
}));
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getPortfolioContext() {
  try {
    const { portfolioData } = await import('../src/data/portfolioData.js');

    let context = `Sobre Vitor Hugo Sarilio:\n${portfolioData.user.bio_intro}\n${portfolioData.user.bio_language}\n`;

    context += "\nProjetos Profissionais:\n";
    portfolioData.projects.forEach(p => {
      context += `- ${p.title}: ${p.description} (Tecnologias: ${p.technologies.join(', ')})\n`;
    });

    context += "\nProjetos Pessoais:\n";
    portfolioData.personalProjects.forEach(p => {
      context += `- ${p.title}: ${p.description} (Tecnologias: ${p.technologies.join(', ')})\n`;
    });

    context += "\nInformações de Contato:\n";
    context += `- Email: ${portfolioData.user.email}\n`;
    context += `- Telefone: ${portfolioData.user.phone}\n`;
    context += `- LinkedIn: ${portfolioData.user.linkedin}\n`;
    context += `- GitHub: ${portfolioData.user.github}\n`;

    context += "\nExperiência Profissional Detalhada (para cálculo de tempo de carreira):\n";
    portfolioData.resume.experience.forEach(e => {
      context += `- ${e.title} na ${e.company}. Período: ${e.period}.\n`;
    });
    context += "Para calcular o tempo total de carreira, some a duração de cada período de experiência. 'Presente' significa até a data atual.\n";

    context += "\nFormação Acadêmica:\n";
    portfolioData.resume.education.forEach(e => {
      context += `- ${e.degree} na ${e.institution} (${e.period})\n`;
    });

    context += "\nHabilidades:\n";
    context += portfolioData.resume.skills.join(', ') + ".\n";

    return context;
  } catch (error) {
    console.error("Erro ao carregar o contexto do portfólio:", error);
    return null;
  }
}

app.post('/api/chat', async (req, res) => {
  try {
    const portfolioContext = await getPortfolioContext();

    if (!portfolioContext) {
      return res.status(500).json({ error: 'Falha interna ao carregar dados do portfólio.' });
    }

    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt é obrigatório.' });
    }

    const systemInstruction = `
      **ATENÇÃO: VOCÊ É UMA IA RESTRITA E ESPECIALIZADA NO PORTFÓLIO DE VITOR HUGO SARILIO.**
      **SUA ÚNICA FONTE DE INFORMAÇÃO É O "CONTEXTO DO PORTFÓLIO" FORNECIDO.**
      **VOCÊ NÃO TEM CONHECIMENTO GERAL E NÃO DEVE GERAR NENHUMA INFORMAÇÃO EXTERNA.**
      **SUAS RESPOSTAS DEVEM SER SEMPRE CONCISAS, RELEVANTES E EM TEXTO PLANO (SEM MARKDOWN).**

      **Regras de Resposta (PRIORIDADE MÁXIMA):**
      1.  **SEMPRE VERIFIQUE:** Se a pergunta NÃO PODE ser respondida EXCLUSIVAMENTE com o "CONTEXTO DO PORTFÓLIO" (ex: "qual a capital da França?", "me conte uma piada"), responda com a seguinte frase padrão: "Minha função é exclusivamente responder perguntas sobre o portfólio do Vitor. Não tenho informações sobre outros assuntos. Posso ajudar com algo relacionado à carreira dele? 🤔"
      2.  **TEMPO DE CARREIRA:** Se perguntarem sobre o tempo de carreira, calcule a soma dos períodos de experiência listados em "Experiência Profissional Detalhada" no contexto. Considere 'Presente' como a data atual.
      3.  **INFORMAÇÕES DE CONTATO:** Se perguntarem sobre informações de contato, forneça o email, telefone, LinkedIn e GitHub listados em "Informações de Contato" no contexto.
      4.  **IDENTIDADE DE VITOR:** Se perguntarem "quem é o Vitor?" ou similar, interprete e use as informações da seção "Sobre Vitor Hugo Sarilio" do contexto.
      5.  **INTERPRETAÇÃO DO CONTEXTO:** Interprete e sintetize as informações do "CONTEXTO DO PORTFÓLIO" para responder às perguntas de forma inteligente e útil, sem inventar dados.
      6.  **RESPOSTAS CONCISAS:** Mantenha as respostas curtas. Use listas (-) APENAS se for essencial para clareza.
      7.  **SEM INFORMAÇÃO ESPECÍFICA:** Se a pergunta é sobre o portfólio, mas a resposta NÃO ESTÁ no contexto, diga educadamente que não possui essa informação.

      --- CONTEXTO DO PORTFÓLIO ---
      ${portfolioContext}
      --- FIM DO CONTEXTO ---
    `;

    let formattedHistory = (history || []).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    // Gemini requires history to start with a 'user' turn
    if (formattedHistory.length > 0 && formattedHistory[0].role === 'model') {
      formattedHistory.shift();
    }

    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: { systemInstruction },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message: prompt });
    res.json({ response: response.text });
  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar sua requisição.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend a rodar em http://localhost:${port}`);
});

export default app;
