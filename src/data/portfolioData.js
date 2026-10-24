export const portfolioData = {
  user: {
    name: "Vitor Hugo Sarilio",
    title: "Data Analyst | BI | SQL | Python | Power BI Specialist | BigQuery | Data Automation | Apache Airflow",
    bio_intro: "Sou um profissional orientado a dados com experiência em Business Intelligence, análise de dados, automação e ETL. Minha especialidade inclui SQL para consulta de dados, Python para processamento de dados e Power BI para visualização. Atualmente, trabalho na construção de pipelines de dados escaláveis com Apache Airflow e na análise de grandes conjuntos de dados no Google BigQuery. Também trabalho com automações: integrações, alertas e fluxos com n8n, Python e monday.com, e aplicações rápidas com Lovable.",
    bio_language: "Idiomas: Português (Nativo), Inglês (B2 Upper Intermediate), Espanhol (Básico).",
    email: "vitorsarilio@hotmail.com",
    phone: "5511987191928",
    linkedin: "https://www.linkedin.com/in/vitorsarilio",
    github: "https://github.com/vitorsarilio",
    avatar: '/vitor.jpg',
    location: "São Paulo, SP",
    en: { location: "São Paulo, Brazil" },
    // Ano em que começou a trabalhar com dados (Grupo JCA); os "anos com dados" saem daqui
    dataSince: 2017,
    whatsappMessage: "Olá Vitor, vi seu portfólio",
    languages: [
      { name: "Português", level: "nativo", en: { name: "Portuguese", level: "native" } },
      { name: "Inglês", level: "B2", en: { name: "English", level: "B2" } },
      { name: "Espanhol", level: "básico", en: { name: "Spanish", level: "basic" } }
    ]
  },
  projects: [
    {
      id: 1,
      title: "Pipeline de Monitoramento do Microsoft Admin Center",
      description: "Desenvolvimento de um pipeline automatizado para monitorar o Microsoft Admin Center, ingerindo dados da API Microsoft Graph para rastreamento. Incluiu ingestão de dados com Python (Requests, Pandas), orquestração com Apache Airflow DAGs e visualização em Power BI com DAX customizado.",
      technologies: ["Python", "Pandas", "Requests", "Apache Airflow", "Power BI", "DAX", "Microsoft Graph API"],
      shortTitle: "Monitoramento do Microsoft Admin Center",
      summary: "Ingestão da API Microsoft Graph com Python, orquestrada em DAGs do Airflow, com indicadores em Power BI.",
      highlights: ["Python", "Airflow", "Power BI", "DAX"],
      en: {
        shortTitle: "Microsoft Admin Center monitoring",
        summary: "Microsoft Graph API ingestion with Python, orchestrated in Airflow DAGs, with metrics in Power BI."
      }
    },
    {
      id: 2,
      title: "Refatoração e Otimização de Dashboards (UX/UI)",
      description: "Atualização de dashboards legados em Power BI com foco na melhoria da experiência do utilizador (UX/UI), permitindo uma tomada de decisão mais rápida para os stakeholders.",
      technologies: ["Power BI", "UX/UI Design", "DAX"],
      shortTitle: "Refatoração de dashboards legados",
      summary: "Revisão de UX e UI de dashboards antigos para que as áreas encontrem a resposta mais rápido e decidam com mais confiança.",
      highlights: ["Power BI", "DAX", "UX/UI"],
      en: {
        shortTitle: "Legacy dashboard redesign",
        summary: "UX and UI review of old dashboards so teams find the answer faster and decide with more confidence."
      }
    },
    {
      id: 3,
      title: "Migração de Dados Cloud e Otimização de Consultas",
      description: "Migração de bases de dados Oracle para Google BigQuery, otimizando a performance de consultas e desenvolvimento de dashboards em Power BI para equipas operacionais.",
      technologies: ["Power BI", "BigQuery", "Oracle PL/SQL", "ETL"],
      shortTitle: "Migração Oracle → BigQuery",
      summary: "Migração das bases operacionais para o Google BigQuery, com consultas otimizadas e novos dashboards para as equipes.",
      highlights: ["BigQuery", "PL/SQL", "ETL", "Power BI"],
      en: {
        shortTitle: "Oracle → BigQuery migration",
        summary: "Moved the operational databases to Google BigQuery, with optimized queries and new dashboards for the teams."
      }
    },
    {
      id: 4,
      title: "Desenvolvimento de Dashboards Executivos e Operacionais",
      description: "Criação e manutenção de dashboards em Power BI para equipes operacionais e executivas, rastreando KPIs alinhados aos OKRs da organização. Automação de relatórios mensais de KPIs.",
      technologies: ["Power BI", "DAX", "Data Modeling", "SQL", "Excel (Power Query)"],
      shortTitle: "Dashboards executivos e operacionais",
      summary: "Dashboards em Power BI que acompanham os KPIs ligados aos OKRs da empresa, com relatórios mensais automatizados.",
      highlights: ["Power BI", "DAX", "SQL", "Power Query"],
      en: {
        shortTitle: "Executive and operational dashboards",
        summary: "Power BI dashboards that track the KPIs tied to the company's OKRs, with automated monthly reports."
      }
    }
  ],
  personalProjects: [
    {
      id: 102,
      title: "Geração Solar Distribuída no Brasil",
      description: "Pipeline de dados de ponta a ponta com dados abertos da ANEEL (4,7 milhões de sistemas solares): ingestão em Python, modelagem em dbt + DuckDB com 131 testes e dashboard no Evidence. Roda sozinho toda semana no GitHub Actions e publica no GitHub Pages, com custo zero.",
      technologies: ["Python", "dbt", "DuckDB", "SQL", "Evidence.dev", "GitHub Actions", "Parquet"],
      shortTitle: "Geração solar no Brasil",
      summary: "Pipeline com os dados abertos da ANEEL que roda sozinho toda semana e publica um dashboard de crescimento, ranking per capita e aceleração por estado.",
      highlights: ["Python", "dbt", "DuckDB", "Evidence", "GitHub Actions"],
      previewUrl: "/projects/site-solar.webp",
      previewAlt: "Dashboard de geração solar distribuída no Brasil",
      linkLabel: "Abrir o dashboard",
      en: {
        shortTitle: "Solar generation in Brazil",
        summary: "A pipeline on ANEEL open data that runs by itself every week and publishes a dashboard of growth, per capita ranking and acceleration by state.",
        previewAlt: "Dashboard of distributed solar generation in Brazil",
        linkLabel: "Open the dashboard"
      },
      liveUrl: "https://vitorsarilio.github.io/geracao-solar-brasil/",
      repoUrl: "https://github.com/vitorsarilio/geracao-solar-brasil"
    },
    {
      id: 101,
      title: "Assistindo.com.br",
      description: "Uma aplicação web de produção construída com React e Vite para explorar, rastrear e gerenciar informações sobre filmes e séries de TV, com scroll infinito, busca avançada e modais dinâmicos de detalhes.",
      technologies: ["React", "Vite", "TailwindCSS", "React Router"],
      shortTitle: "Assistindo.com.br",
      summary: "Aplicação web em produção para explorar, acompanhar e organizar filmes e séries, com scroll infinito, busca avançada e histórico do que você assistiu.",
      highlights: ["React", "Vite", "Tailwind CSS", "React Router"],
      previewUrl: "/projects/site-assistindo.webp",
      previewAlt: "Página inicial do Assistindo.com.br",
      linkLabel: "Abrir o site",
      en: {
        summary: "A web app in production to explore, track and organize movies and TV shows, with infinite scroll, advanced search and a history of what you watched.",
        previewAlt: "Assistindo.com.br home page",
        linkLabel: "Open the site"
      },
      liveUrl: "https://www.assistindo.com.br/",
      repoUrl: null,
      isPrivateRepo: true
    }
  ],
  resume: {
    experience: [
      {
        id: 1,
        title: "Data Analyst Consultant (Senior)",
        company: "SAUTER",
        period: "Fevereiro 2025 - Presente",
        description: "Refatoração de dashboards: Atualização de dashboards legados do Power BI com UX/UI aprimorados, permitindo uma tomada de decisão mais rápida para as partes interessadas.\nPipeline de Monitoramento do Microsoft Admin Center: Desenvolvimento de Pipeline de Ponta a Ponta: Projetou e implantou um pipeline de monitoramento automatizado ingerindo dados da API Microsoft Graph para rastrear. Ingestão de Dados: Python (Requests, Pandas). Orquestração: Apache Airflow DAGs. Visualização: Power BI com DAX personalizado.",
        partners: [{ name: "CIMED" }]
      },
       {
        id: 2,
        title: "Data Engineer (Mid-Level)",
        company: "Uello",
        period: "Fevereiro 2024 - Julho 2024 (6 meses)",
        description: "Engenharia de Pipeline de Dados na Nuvem: Projetou, implantou e manteve pipelines Airflow de nível de produção no GCP. Desenvolveu e manteve dashboards do Google Data Studio (Looker). Stack Tecnológico: Apache Airflow (Python), Google Cloud, Looker, SQL.",
        partners: []
      },
      {
        id: 3,
        title: "Data Analyst (Senior)",
        company: "SINAPTICS - Data Journey",
        period: "Junho 2023 - Janeiro 2025 (1 ano e 8 meses)",
        description: "Desenvolvimento de dashboards em Power BI, traduzindo requisitos de negócios complexos em visualizações acionáveis para equipes operacionais. Migração de Dados para a Nuvem: Migração de bancos de dados Oracle para Google BigQuery, otimizando o desempenho de consultas. Stack Técnico: Power BI, BigQuery, Oracle PL/SQL, JIRA.",
        partners: [{ name: "Autopass" }]
      },
      {
        id: 4,
        title: "Data Analyst (Mid-Level)",
        company: "Tmov",
        period: "Dezembro 2021 - Março 2023 (1 ano e 4 meses)",
        description: "Desenvolvimento de Dashboards Executivos: Projeto e manutencao dashboards Power BI para equipes operacionais, rastreando KPIs vinculados aos OKRs organizacionais. Estratégia de KPIs e Alinhamento de Negócios: Colaboracao com chefes de departamento para definir e padronizar KPIs, garantindo a consistência das métricas nas operações. Automação de relatórios mensais de KPIs, eliminando horas de trabalho manual através de fluxos de dados Power BI e medidas DAX. Stack Tecnológico: Power BI (DAX, Modelagem de Dados), SQL (Joins Avançados, CTEs), Excel (Power Query).",
        partners: [{ name: "Sotran" }]
      },
      {
        id: 5,
        title: "Analista Operacional e de Performance (Mid-Level, Associate, Assistent)",
        company: "Grupo JCA",
        period: "Março 2017 - Novembro 2021 (4 anos e 9 meses)",
        description: "Reporte Operacional Orientado a Dados: Desenvolvimento de dashboards interativos em Power BI para gerenciamento de frota e telemetria. Automação de Processos e Eficiência: Automatizacao de tarefas repetitivas usando Python (Selenium, Pandas), incluindo web scraping, geração de relatórios e alertas por e-mail (economizando mais de 25 horas/mês). Construcao e otimizacao de consultas SQL (SQL Server, MySQL, OracleDB). Criação de dashboards de telemetria com integração de dados GPS ao vivo. Análise Estratégica de Desempenho: Desenvolvimento de dashboards Power BI de nível executivo. Projetar e manter fluxos de trabalho Pentaho Data Integration (PDI). Desenvolvimento de KPIs e Melhoria de Processos: Projeto de mais de 15 novos KPIs de desempenho de frota. Melhoria de Processos de Multas de Trânsito e Programa de Recompensa de Motoristas. Ferramentas: Power BI, SQL, Excel (Fórmulas Avançadas, VBA), Python (Selenium, Pandas), Pentaho Data Integration.",
        partners: [
          { name: "Cometa" },
          { name: "1001" },
          { name: "Catarinense" },
          { name: "Expresso do Sul" },
          { name: "Rápido Ribeirão" }
        ]
      },
       {
        id: 6,
        title: "Software Development Intern",
        company: "Faculdade de Tecnologia de São Paulo - FATEC-SP",
        period: "Fevereiro 2015 - Junho 2016 (1 ano e 5 meses)",
        description: "Desenvolvimento Backend e Frontend. Stack Tecnológico: C#, .NET, HTML, CSS.",
        partners: []
      },
      {
        id: 7,
        title: "IT Technical Assistant",
        company: "Jaco's Serviços de Informática LTDA",
        period: "Julho 2012 - Setembro 2013 (1 ano e 3 meses)",
        description: "Suporte técnico ao usuário final. Venda e configuracao componentes de computadores (RAM, HDDs, GPUs).",
        partners: []
      }
    ],
    education: [
      {
        id: 1,
        degree: "Pós-graduação Lato Sensu, Data Analytics",
        institution: "FIAP",
        period: "Agosto 2023 - Agosto 2024",
        shortDegree: "Pós-graduação em Data Analytics",
        shortPeriod: "ago/2023 – ago/2024",
        logo: "fiap.png",
        en: { shortDegree: "Postgraduate degree in Data Analytics", shortPeriod: "Aug 2023 – Aug 2024" }
      },
      {
        id: 2,
        degree: "Tecnólogo, Análise e Desenvolvimento de Sistemas",
        institution: "Universidade Paulista",
        period: "2014 - 2016",
        shortDegree: "Tecnólogo em Análise e Desenvolvimento de Sistemas",
        shortPeriod: "2014 – 2016",
        logo: "unip.png",
        en: { shortDegree: "Associate degree in Systems Analysis and Development", shortPeriod: "2014 – 2016" }
      }
    ],
    // Single source for skills: rendered on the page and sent to the chatbot.
    // `logo` is a file name in src/assets/logos (optional).
    skillGroups: [
      {
        name: "SQL e modelagem",
        en: { name: "SQL and modeling" },
        items: [
          { name: "SQL", logo: "04-SQL.svg" }, { name: "T-SQL" }, { name: "Oracle PL/SQL" },
          { name: "CTEs" }, { name: "Advanced Joins" }, { name: "Data Modeling" }, { name: "Relational Databases" }
        ]
      },
      {
        name: "BI e visualização",
        en: { name: "BI and visualization" },
        items: [
          { name: "Power BI", logo: "03-power-bi.svg" }, { name: "DAX" }, { name: "Business Intelligence (BI)" },
          { name: "Dashboards" }, { name: "Looker (Google Data Studio)" }, { name: "Excel (Power Query, VBA)" },
          { name: "Streamlit", logo: "19-Streamlit.svg" }
        ]
      },
      {
        name: "Engenharia de dados e nuvem",
        en: { name: "Data engineering and cloud" },
        items: [
          { name: "Apache Airflow", logo: "02-Apache-Airflow.svg" }, { name: "ETL Pipelines" },
          { name: "Pentaho Data Integration (PDI)" }, { name: "Google BigQuery", logo: "10-Google-BigQuery.svg" },
          { name: "Google Cloud Platform (GCP)", logo: "11-Google-Cloud.svg" }, { name: "Docker", logo: "91-Docker.svg" }
        ]
      },
      {
        name: "Python e automação",
        en: { name: "Python and automation" },
        items: [
          { name: "Python", logo: "01-python.svg" }, { name: "Pandas" }, { name: "NumPy" },
          { name: "Selenium", logo: "101-Selenium.svg" }, { name: "Microsoft Graph API" }, { name: "Data Automation" }
        ]
      },
      {
        name: "Automações",
        en: { name: "Automation" },
        items: [
          { name: "n8n", logo: "n8n.png" }, { name: "Lovable", logo: "lovable.png" }, { name: "monday.com", logo: "monday.png" }
        ]
      },
      {
        name: "Bancos de dados",
        en: { name: "Databases" },
        items: [
          { name: "SQL Server" }, { name: "OracleDB" }, { name: "MySQL", logo: "200-mysql.svg" },
          { name: "PostgreSQL", logo: "201-postgresql.svg" }, { name: "SQLite", logo: "202-sqlite.svg" }
        ]
      },
      {
        name: "Desenvolvimento",
        en: { name: "Development" },
        items: [
          { name: "C#", logo: "100-c-sharp.svg" }, { name: ".NET" }, { name: "JavaScript", logo: "32-javascript.svg" },
          { name: "HTML", logo: "30-html.svg" }, { name: "CSS", logo: "31-css.svg" }, { name: "Tailwind", logo: "33-tailwind.svg" },
          { name: "Git", logo: "20-git.svg" }, { name: "GitHub", logo: "21-github.svg" }
        ]
      },
      {
        name: "Ferramentas do dia a dia",
        en: { name: "Everyday tools" },
        items: [
          { name: "Jira", logo: "130-Jira.svg" }, { name: "Slack", logo: "131-Slack.svg" }, { name: "DBeaver", logo: "150-DBeaver.svg" },
          { name: "VS Code", logo: "90-vscode.svg" }, { name: "Visual Studio", logo: "89-Visual Studio.svg" }, { name: "PyCharm", logo: "98-PyCharm.svg" }
        ]
      }
    ],
    // Empresas para as quais já prestou serviço, como empregado ou atendendo o cliente.
    // `logo` é um arquivo em src/assets/logos. O contador da página é o tamanho desta lista.
    companies: [
      { name: "SAUTER", logo: "sauter.webp" },
      { name: "CIMED", logo: "cimed.webp" },
      { name: "Uello", logo: "uello.png" },
      { name: "Sinaptics", logo: "sinaptics.png" },
      { name: "Autopass", logo: "autopass.png" },
      { name: "Tmov", logo: "tmov.png" },
      { name: "Sotran", logo: "sotran.png" },
      { name: "Grupo JCA", logo: "jca.jpg" },
      { name: "Cometa", logo: "cometa.png" },
      { name: "Auto Viação 1001", logo: "1001.png" },
      { name: "Catarinense", logo: "catarinense.png" },
      { name: "Expresso do Sul", logo: "expresso-do-sul.png" },
      { name: "Rápido Ribeirão", logo: "rapido-ribeirao.png" },
      { name: "Leega", logo: "leega.svg" },
      { name: "RD Saúde", logo: "rd.png" },
      { name: "Mercantil", logo: "mercantil.svg" },
      { name: "FATEC-SP", logo: "fatec-sp.png" },
      { name: "Jaco's", logo: "jacos.jpeg" }
    ],
    certifications: [
        {
            id: 1,
            name: "EF SET English Certificate 54/100 (B2 Upper Intermediate)",
            issuer: "EF Standard English Test",
            date: "Não especificado",
            pdfUrl: "/EF_SET_Certificate.pdf",
            shortName: "Inglês B2, intermediário avançado",
            shortIssuer: "EF SET English Certificate",
            score: "nota 54/100",
            logo: "efset.png",
            en: { shortName: "English B2, upper intermediate", score: "score 54/100" }
        }
    ]
  }
};