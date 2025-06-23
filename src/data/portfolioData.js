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
    avatar: "../vitor.jpg"
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
      id: 101, 
      title: "App de Filmes (React & TMDB API)",
      description: "Uma aplicação web interativa construída com React e Vite para explorar filmes. A página consome a API do The Movie Database (TMDB) e apresenta rolagem infinita, busca de notas pessoais e modais de detalhes.",
      technologies: ["React", "Vite", "TailwindCSS", "TMDB API", "React Router"],
      imageUrl: "https://placehold.co/600x400/8B5CF6/FFFFFF?text=App+de+Filmes",
      liveUrl: "/filmes", 
      repoUrl: "https://github.com/vitorsarilio/portfolio-react-vitor" 
    },
    {
      id: 102,
      title: "Dashboard Interativo: Análise de Filmes",
      description: "Um dashboard interativo desenvolvido no Power BI para análise de dados de filmes. Explore diferentes visualizações e insights sobre o mundo cinematográfico.",
      technologies: ["Power BI", "DAX", "Data Analysis", "Airflow", "Python","TMDB API"],
      imageUrl: "https://placehold.co/600x400/A78BFA/FFFFFF?text=Dashboard+Power+BI",
      liveUrl: "https://app.powerbi.com/view?r=eyJrIjoiODk1MTU1MzYtMjhmNi00ZDc3LTg4M2YtYjZjZDFmMWQ2NWVmIiwidCI6ImZhNDY2OTVmLWYwMWQtNDVkMC1hOTA1LWY0NzFjMjlmNGI5OSJ9", 
      repoUrl: "https://github.com/vitorsarilio/airflow_tmdb"
    }
  ],
  resume: {
    experience: [
      {
        id: 1,
        title: "Data Analyst Consultant (Senior)",
        company: "SAUTER",
        logoUrl: "https://media.licdn.com/dms/image/v2/D4D0BAQE_ssI4U2-i7g/company-logo_200_200/company-logo_200_200/0/1698418740178/sauterdigital_logo?e=1753920000&v=beta&t=4i6QWk538swSrw9MvHmR-WvWdlmCwLgU0fNoLww4rUo",
        period: "Fevereiro 2025 - Presente",
        description: "Refatoração de dashboards: Atualização de dashboards legados do Power BI com UX/UI aprimorados, permitindo uma tomada de decisão mais rápida para as partes interessadas.\nPipeline de Monitoramento do Microsoft Admin Center: Desenvolvimento de Pipeline de Ponta a Ponta: Projetou e implantou um pipeline de monitoramento automatizado ingerindo dados da API Microsoft Graph para rastrear. Ingestão de Dados: Python (Requests, Pandas). Orquestração: Apache Airflow DAGs. Visualização: Power BI com DAX personalizado.",
        partners: [{ name: "CIMED", logoUrl: "https://logodownload.org/wp-content/uploads/2020/02/cimed-logo.png" }]
      },
       {
        id: 2,
        title: "Data Engineer (Mid-Level)",
        company: "Uello",
        logoUrl: "https://uello.com.br/wp-content/uploads/2024/07/Logo_Uello_red@3x.png",
        period: "Fevereiro 2024 - Julho 2024 (6 meses)",
        description: "Engenharia de Pipeline de Dados na Nuvem: Projetou, implantou e manteve pipelines Airflow de nível de produção no GCP. Desenvolveu e manteve dashboards do Google Data Studio (Looker). Stack Tecnológico: Apache Airflow (Python), Google Cloud, Looker, SQL.",
        partners: []
      },
      {
        id: 3,
        title: "Data Analyst (Senior)",
        company: "SINAPTICS - Data Journey",
        logoUrl: "https://www.sinaptics.com.br/wp-content/uploads/2022/11/logo-sinaptics.png",
        period: "Junho 2023 - Janeiro 2025 (1 ano e 8 meses)",
        description: "Desenvolvimento de dashboards em Power BI, traduzindo requisitos de negócios complexos em visualizações acionáveis para equipes operacionais. Migração de Dados para a Nuvem: Migração de bancos de dados Oracle para Google BigQuery, otimizando o desempenho de consultas. Stack Técnico: Power BI, BigQuery, Oracle PL/SQL, JIRA.",
        partners: [
          { name: "Autopass", logoUrl: "https://autopass.com.br/wp-content/uploads/2021/06/AUTOPASS.png" } 
        ]
      },
      {
        id: 4,
        title: "Data Analyst (Mid-Level)",
        company: "Tmov",
        logoUrl: "https://cdn.prod.website-files.com/6123ebeb608cc1010f8689c0/61254c42434ae07b74873c23_logo-dark.svg",
        period: "Dezembro 2021 - Março 2023 (1 ano e 4 meses)",
        description: "Desenvolvimento de Dashboards Executivos: Projeto e manutencao dashboards Power BI para equipes operacionais, rastreando KPIs vinculados aos OKRs organizacionais. Estratégia de KPIs e Alinhamento de Negócios: Colaboracao com chefes de departamento para definir e padronizar KPIs, garantindo a consistência das métricas nas operações. Automação de relatórios mensais de KPIs, eliminando horas de trabalho manual através de fluxos de dados Power BI e medidas DAX. Stack Tecnológico: Power BI (DAX, Modelagem de Dados), SQL (Joins Avançados, CTEs), Excel (Power Query).",
        partners: [{ name: "Sotran", logoUrl: "https://static.wixstatic.com/media/4c2984_82356c37ba4a4721994be4e6bd0f7609~mv2.png/v1/fill/w_347,h_113,al_c,lg_1,q_85/4c2984_82356c37ba4a4721994be4e6bd0f7609~mv2.png" } ]
      },
      {
        id: 5,
        title: "Analista Operacional e de Performance (Mid-Level, Associate, Assistent)",
        company: "Grupo JCA",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a3/Logo_Grupo_JCA.jpg",
        period: "Março 2017 - Novembro 2021 (4 anos e 9 meses)",
        description: "Reporte Operacional Orientado a Dados: Desenvolvimento de dashboards interativos em Power BI para gerenciamento de frota e telemetria. Automação de Processos e Eficiência: Automatizacao de tarefas repetitivas usando Python (Selenium, Pandas), incluindo web scraping, geração de relatórios e alertas por e-mail (economizando mais de 25 horas/mês). Construcao e otimizacao de consultas SQL (SQL Server, MySQL, OracleDB). Criação de dashboards de telemetria com integração de dados GPS ao vivo. Análise Estratégica de Desempenho: Desenvolvimento de dashboards Power BI de nível executivo. Projetar e manter fluxos de trabalho Pentaho Data Integration (PDI). Desenvolvimento de KPIs e Melhoria de Processos: Projeto de mais de 15 novos KPIs de desempenho de frota. Melhoria de Processos de Multas de Trânsito e Programa de Recompensa de Motoristas. Ferramentas: Power BI, SQL, Excel (Fórmulas Avançadas, VBA), Python (Selenium, Pandas), Pentaho Data Integration.",
        partners: [
          { name: "Cometa", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Logotipo_Cometa.png" }, 
          { name: "1001", logoUrl: "https://onibusexpresso.wordpress.com/wp-content/uploads/2014/07/logo_1001.jpg" },
          { name: "Catarinense", logoUrl: "https://www.wemobi.me/content/dam/wemobi/logos-empresas-rodoviarias/padr%C3%A3o-colorido/logo_catarinense_350px150px.png.img.png/1747054542104/logo-catarinense-350px150px.png" }, 
          { name: "Expresso do Sul", logoUrl: "https://www.passagemrapida.com.br/imagens/viacao/19/expresso-sul.png" }, 
          { name: "Rápido Ribeirão", logoUrl: "https://rodoviariaonline.com.br/wp-content/uploads/2017/08/p-logo-viacao-rapido-ribeirao-preto.png" } 
        ]
      },
       {
        id: 6,
        title: "Software Development Intern",
        company: "Faculdade de Tecnologia de São Paulo - FATEC-SP",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/84/FATEC-logo1.jpg",
        period: "Fevereiro 2015 - Junho 2016 (1 ano e 5 meses)",
        description: "Desenvolvimento Backend e Frontend. Stack Tecnológico: C#, .NET, HTML, CSS.",
        partners: []
      },
      {
        id: 7,
        title: "IT Technical Assistant",
        company: "Jaco's Serviços de Informática LTDA",
        logoUrl: "https://scontent-gru2-1.xx.fbcdn.net/v/t39.30808-6/299989982_588405299643268_7302766692115436423_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFlv9-fyMUAYS3Ybl79N7427OEXYCOwnqXs4RdgI7Cepa9veii9i70ZNT8NZorqpct4WiiAB9Z3Gw_r3VxhaF7v&_nc_ohc=O4LcL_fimAkQ7kNvwHXDJ_C&_nc_oc=Adl6GZ8pcNsZTNEidNEMSXHM80ni4BClJggMSTMxpYHVrZk5riPZ-g2lp4w3x-wkRKb4niyXo_iP4UCLDf7tJtgB&_nc_zt=23&_nc_ht=scontent-gru2-1.xx&_nc_gid=bv09NM2290LObCzypn8TfA&oh=00_AfJCBA5F_dEGzDMXgOfIgIVeOUqXLoWhudNYu6KLpmIQxw&oe=683A91BC",
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
        logoUrl: "https://i.scdn.co/image/ab6765630000ba8a9543f1ed639f9830d951f154",
        period: "Agosto 2023 - Agosto 2024"
      },
      {
        id: 2,
        degree: "Tecnólogo, Análise e Desenvolvimento de Sistemas",
        institution: "Universidade Paulista",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/UNIP_logo.svg/1200px-UNIP_logo.svg.png",
        period: "2014 - 2016"
      }
    ],
    skills: [
      "SQL", "Python", "Pandas", "NumPy", "Power BI", "DAX", "Data Modeling",
      "Business Intelligence (BI)", "Dashboards", "Relational Databases",
      "ETL Pipelines", "Apache Airflow", "Google BigQuery", "Microsoft Graph API",
      "Oracle PL/SQL", "JIRA", "Google Cloud Platform (GCP)", "Looker (Google Data Studio)",
      "Excel (Power Query, VBA)", "Advanced Joins", "CTEs", "Selenium",
      "SQL Server", "MySQL", "OracleDB", "Pentaho Data Integration (PDI)",
      "T-SQL", "C#", ".NET", "HTML", "CSS", "Data Automation"
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