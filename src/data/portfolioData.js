export const portfolioData = {
  user: {
    name: "Vitor Hugo Sarilio",
    title: "Data Analyst | BI | SQL | Python | Power BI Specialist | BigQuery | Data Automation | Apache Airflow",
    bio_intro: "Sou um profissional orientado a dados com experiência em Business Intelligence, análise de dados, automação e ETL. Minha especialidade inclui SQL para consulta de dados, Python para processamento de dados e Power BI para visualização. Atualmente, trabalho na construção de pipelines de dados escaláveis com Apache Airflow e na análise de grandes conjuntos de dados no Google BigQuery.",
    bio_language: "Idiomas: Português (Nativo), Inglês (B2 Upper Intermediate), Espanhol (Básico).",
    email: "vitorsarilio@hotmail.com",
    phone: "5511987191928",
    linkedin: "https://www.linkedin.com/in/vitorsarilio",
    github: "https://github.com/vitorsarilio",
    avatar: '/vitor.jpg'
  },
  projects: [
    {
      id: 1,
      title: "Pipeline de Monitoramento do Microsoft Admin Center",
      description: "Desenvolvimento de um pipeline automatizado para monitorar o Microsoft Admin Center, ingerindo dados da API Microsoft Graph para rastreamento. Incluiu ingestão de dados com Python (Requests, Pandas), orquestração com Apache Airflow DAGs e visualização em Power BI com DAX customizado.",
      technologies: ["Python", "Pandas", "Requests", "Apache Airflow", "Power BI", "DAX", "Microsoft Graph API"],
      imageUrl: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Pipeline+Monitoramento",
      liveUrl: "#",
      repoUrl: "#"
    },
    {
      id: 2,
      title: "Refatoração e Otimização de Dashboards (UX/UI)",
      description: "Atualização de dashboards legados em Power BI com foco na melhoria da experiência do utilizador (UX/UI), permitindo uma tomada de decisão mais rápida para os stakeholders.",
      technologies: ["Power BI", "UX/UI Design", "DAX"],
      imageUrl: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Refatoracao+Dashboards",
      liveUrl: "#",
      repoUrl: "#"
    },
    {
      id: 3,
      title: "Migração de Dados Cloud e Otimização de Consultas",
      description: "Migração de bases de dados Oracle para Google BigQuery, otimizando a performance de consultas e desenvolvimento de dashboards em Power BI para equipas operacionais.",
      technologies: ["Power BI", "BigQuery", "Oracle PL/SQL", "ETL"],
      imageUrl: "https://placehold.co/600x400/6D28D9/FFFFFF?text=Migracao+Cloud",
      liveUrl: "#",
      repoUrl: "#"
    },
    {
      id: 4,
      title: "Desenvolvimento de Dashboards Executivos e Operacionais",
      description: "Criação e manutenção de dashboards em Power BI para equipes operacionais e executivas, rastreando KPIs alinhados aos OKRs da organização. Automação de relatórios mensais de KPIs.",
      technologies: ["Power BI", "DAX", "Data Modeling", "SQL", "Excel (Power Query)"],
      imageUrl: "https://placehold.co/600x400/4c1d95/FFFFFF?text=Dashboards+KPIs",
      liveUrl: "#",
      repoUrl: "#"
    }
  ],
  personalProjects: [
    {
      id: 102,
      title: "Geração Solar Distribuída no Brasil",
      description: "Pipeline de dados de ponta a ponta com dados abertos da ANEEL (4,7 milhões de sistemas solares): ingestão em Python, modelagem em dbt + DuckDB com 131 testes e dashboard no Evidence. Roda sozinho toda semana no GitHub Actions e publica no GitHub Pages, com custo zero.",
      technologies: ["Python", "dbt", "DuckDB", "SQL", "Evidence.dev", "GitHub Actions", "Parquet"],
      imageUrl: "/projects/geracao-solar-brasil.webp",
      liveUrl: "https://vitorsarilio.github.io/geracao-solar-brasil/",
      repoUrl: "https://github.com/vitorsarilio/geracao-solar-brasil"
    },
    {
      id: 101,
      title: "Assistindo.com.br",
      description: "Uma aplicação web de produção construída com React e Vite para explorar, rastrear e gerenciar informações sobre filmes e séries de TV, com scroll infinito, busca avançada e modais dinâmicos de detalhes.",
      technologies: ["React", "Vite", "TailwindCSS", "React Router"],
      imageUrl: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=Assistindo.com.br",
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
        period: "Agosto 2023 - Agosto 2024"
      },
      {
        id: 2,
        degree: "Tecnólogo, Análise e Desenvolvimento de Sistemas",
        institution: "Universidade Paulista",
        period: "2014 - 2016"
      }
    ],
    // Single source for skills: rendered on the page and sent to the chatbot.
    // `logo` is a file name in src/assets/logos (optional).
    skillGroups: [
      {
        name: "SQL e modelagem",
        items: [
          { name: "SQL", logo: "04-SQL.svg" }, { name: "T-SQL" }, { name: "Oracle PL/SQL" },
          { name: "CTEs" }, { name: "Advanced Joins" }, { name: "Data Modeling" }, { name: "Relational Databases" }
        ]
      },
      {
        name: "BI e visualização",
        items: [
          { name: "Power BI", logo: "03-power-bi.svg" }, { name: "DAX" }, { name: "Business Intelligence (BI)" },
          { name: "Dashboards" }, { name: "Looker (Google Data Studio)" }, { name: "Excel (Power Query, VBA)" },
          { name: "Streamlit", logo: "19-Streamlit.svg" }
        ]
      },
      {
        name: "Engenharia de dados e nuvem",
        items: [
          { name: "Apache Airflow", logo: "02-Apache-Airflow.svg" }, { name: "ETL Pipelines" },
          { name: "Pentaho Data Integration (PDI)" }, { name: "Google BigQuery", logo: "10-Google-BigQuery.svg" },
          { name: "Google Cloud Platform (GCP)", logo: "11-Google-Cloud.svg" }, { name: "Docker", logo: "91-Docker.svg" }
        ]
      },
      {
        name: "Python e automação",
        items: [
          { name: "Python", logo: "01-python.svg" }, { name: "Pandas" }, { name: "NumPy" },
          { name: "Selenium", logo: "101-Selenium.svg" }, { name: "Microsoft Graph API" }, { name: "Data Automation" }
        ]
      },
      {
        name: "Bancos de dados",
        items: [
          { name: "SQL Server" }, { name: "OracleDB" }, { name: "MySQL", logo: "200-mysql.svg" },
          { name: "PostgreSQL", logo: "201-postgresql.svg" }, { name: "SQLite", logo: "202-sqlite.svg" }
        ]
      },
      {
        name: "Desenvolvimento",
        items: [
          { name: "C#", logo: "100-c-sharp.svg" }, { name: ".NET" }, { name: "JavaScript", logo: "32-javascript.svg" },
          { name: "HTML", logo: "30-html.svg" }, { name: "CSS", logo: "31-css.svg" }, { name: "Tailwind", logo: "33-tailwind.svg" },
          { name: "Git", logo: "20-git.svg" }, { name: "GitHub", logo: "21-github.svg" }
        ]
      },
      {
        name: "Ferramentas do dia a dia",
        items: [
          { name: "Jira", logo: "130-Jira.svg" }, { name: "Slack", logo: "131-Slack.svg" }, { name: "DBeaver", logo: "150-DBeaver.svg" },
          { name: "VS Code", logo: "90-vscode.svg" }, { name: "Visual Studio", logo: "89-Visual Studio.svg" }, { name: "PyCharm", logo: "98-PyCharm.svg" }
        ]
      }
    ],
    certifications: [
        {
            id: 1,
            name: "EF SET English Certificate 54/100 (B2 Upper Intermediate)",
            issuer: "EF Standard English Test",
            date: "Não especificado",
            pdfUrl: "/EF_SET_Certificate.pdf"
        }
    ]
  }
};