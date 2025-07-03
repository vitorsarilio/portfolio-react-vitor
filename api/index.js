require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { portfolioData } = require('../src/data/portfolioData');

const app = express();
const port = process.env.PORT || 3001;

// Configurar CORS
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL, // Production URL
      'http://localhost:5173'   // Development URL
    ];

    // Allow any Vercel deployment URL (e.g., preview deployments)
    const vercelPreviewRegex = /^https:\/\/(.*)\.vercel\.app$/;

    if (!origin || allowedOrigins.includes(origin) || vercelPreviewRegex.test(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// --- Carregamento e formatação do contexto do portfólio ---

function getPortfolioContext() {
  try {
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
    context += "Para calcular o tempo total de carreira, some a duração de cada período de experiência. 'Presente' significa até 3 de julho de 2025.\n";

    context += "\nFormação Acadêmica:\n";
    portfolioData.resume.education.forEach(e => {
      context += `- ${e.degree} na ${e.institution} (${e.period})\n`;
    });

    context += "\nHabilidades:\n";
    context += portfolioData.resume.skills.join(', ') + ".\n";

    return context;
  } catch (error) {
    console.error("Erro ao carregar o contexto do portfólio:", error);
    return "";
  }
}

const portfolioContext = getPortfolioContext();

// --- Endpoints da API ---

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required.' });
    }

    // Instrução do sistema como uma string simples.
    const systemInstruction = `
      **ATENÇÃO: VOCÊ É UMA IA RESTRITA E ESPECIALIZADA NO PORTFÓLIO DE VITOR HUGO SARILIO.**
      **SUA ÚNICA FONTE DE INFORMAÇÃO É O "CONTEXTO DO PORTFÓLIO" FORNECIDO.**
      **VOCÊ NÃO TEM CONHECIMENTO GERAL E NÃO DEVE GERAR NENHUMA INFORMAÇÃO EXTERNA.**
      **SUAS RESPOSTAS DEVEM SER SEMPRE CONCISAS, RELEVANTES E EM TEXTO PLANO (SEM MARKDOWN).**

      **Regras de Resposta (PRIORIDADE MÁXIMA):**
      1.  **SEMPRE VERIFIQUE:** Se a pergunta NÃO PODE ser respondida EXCLUSIVAMENTE com o "CONTEXTO DO PORTFÓLIO" (ex: "qual a capital da França?", "me conte uma piada"), responda com a seguinte frase padrão: "Minha função é exclusivamente responder perguntas sobre o portfólio do Vitor. Não tenho informações sobre outros assuntos. Posso ajudar com algo relacionado à carreira dele? 🤔"
      2.  **TEMPO DE CARREIRA:** Se perguntarem sobre o tempo de carreira, calcule a soma dos períodos de experiência listados em "Experiência Profissional Detalhada" no contexto. Considere 'Presente' como a data atual (3 de julho de 2025).
      3.  **INFORMAÇÕES DE CONTATO:** Se perguntarem sobre informações de contato, forneça o email, telefone, LinkedIn e GitHub listados em "Informações de Contato" no contexto.
      4.  **IDENTIDADE DE VITOR:** Se perguntarem "quem é o Vitor?" ou similar, interprete e use as informações da seção "Sobre Vitor Hugo Sarilio" do contexto.
      5.  **FILMES/SÉRIES:** Se perguntarem sobre filmes, séries, TMDB, responda EXATAMENTE com: "Essa funcionalidade ainda está em desenvolvimento, mas em um futuro próximo você poderá interagir sobre essa parte do site também! Por enquanto, posso te ajudar com qualquer dúvida sobre o portfólio profissional do Vitor. 😊"
      6.  **INTERPRETAÇÃO DO CONTEXTO:** Interprete e sintetize as informações do "CONTEXTO DO PORTFÓLIO" para responder às perguntas de forma inteligente e útil, sem inventar dados.
      7.  **RESPOSTAS CONCISAS:** Mantenha as respostas curtas. Use listas (-) APENAS se for essencial para clareza.
      8.  **SEM INFORMAÇÃO ESPECÍFICA:** Se a pergunta é sobre o portfólio, mas a resposta NÃO ESTÁ no contexto, diga educadamente que não possui essa informação.

      --- CONTEXTO DO PORTFÓLIO ---
      ${portfolioContext}
      --- FIM DO CONTEXTO ---
    `;

    // Inicializa o modelo com a instrução do sistema.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-pro",
      systemInstruction: systemInstruction,
    });

    // Prepara o histórico da conversa e a nova mensagem para generateContent.
    let fullContents = [
      { role: 'user', parts: [{ text: `CONTEXTO DO PORTFÓLIO:\n${portfolioContext}\n` }] },
      { role: 'model', parts: [{ text: 'Compreendido. Tenho o contexto do portfólio.' }] },
    ];

    // Garante que o histórico nunca comece com uma mensagem do modelo.
    let chatHistory = history || [];
    if (chatHistory.length > 0 && chatHistory[0].sender === 'bot') {
      chatHistory = chatHistory.slice(1);
    }

    // Adiciona o histórico real da conversa
    fullContents = fullContents.concat(chatHistory.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })));

    // Adiciona a nova mensagem do usuário
    fullContents.push({ role: 'user', parts: [{ text: prompt }] });

    // Envia a conversa completa para generateContent.
    const result = await model.generateContent({ contents: fullContents });
    const response = await result.response;
    const text = response.text();
    
    res.json({ response: text });
  } catch (error) {
    console.error('Erro ao chamar a API do Gemini:', error);
    res.status(500).json({ error: 'Erro ao processar sua requisição.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});