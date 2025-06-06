import { useState, useEffect } from 'react';
import { Briefcase, User, Code, Mail, Linkedin, Github, ExternalLink, ChevronDown, ChevronUp, Award, LayoutDashboard, Phone, Building, School, Users, Sun, Moon, Eye, EyeOff, MessageCircle } from 'lucide-react';
import ReactGA from 'react-ga4'; 

const GA_MEASUREMENT_ID = 'G-Z1643DT14D'; 

// Dados do Portfolio
const portfolioData = {
  user: {
    name: "Vitor Hugo Sarilio",
    title: "Data Analyst | BI | SQL | Python | Power BI Specialist | BigQuery | Data Automation | Apache Airflow",
    bio: `Sou um profissional orientado a dados com experiência em Business Intelligence, análise de dados, automação e ETL. Minha especialidade inclui SQL para consulta de dados, Python para processamento de dados e Power BI para visualização. Atualmente, trabalho na construção de pipelines de dados escaláveis com Apache Airflow e na análise de grandes conjuntos de dados no Google BigQuery.

Minhas Habilidades & Ferramentas:
Análise de Dados: SQL, Python
BI & Visualização: Power BI, Looker, Streamlit
Engenharia de Dados: Pipelines (ETL, ELT), Apache Airflow, BigQuery, GCS, Docker, APIs

Idiomas: Português (Nativo), Inglês (B2 Upper Intermediate), Espanhol (Básico).`,
    email: "vitorsarilio@hotmail.com",
    phone: "5511987191928", 
    linkedin: "https://www.linkedin.com/in/vitorsarilio",
    github: "https://github.com/vitorsarilio",
    avatar: "/vitor.jpg"
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

// Componente de Navegação
const Navbar = ({ setActiveSection, theme, toggleTheme, trackEvent }) => {
  const navItems = [ 
    { label: "Sobre Mim", section: "about", icon: <User size={18} /> },
    { label: "Projetos", section: "projects", icon: <Code size={18} /> },
    { label: "Projetos Pessoais", section: "personalProjects", icon: <LayoutDashboard size={18} /> },
    { label: "Currículo", section: "resume", icon: <Briefcase size={18} /> },
  ];

  const handleNavClick = (section) => {
    trackEvent('Navegação', 'Clique Menu', section);
    setActiveSection(section);
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 bg-opacity-80 dark:bg-opacity-80 backdrop-blur-md p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex flex-wrap justify-center gap-x-1 sm:gap-x-2 md:gap-x-4">
          {navItems.map(item => (
            <li key={item.section}>
              <button
                onClick={() => handleNavClick(item.section)}
                className="flex items-center space-x-2 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-white transition-colors duration-300 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            trackEvent('Interação Tema', 'Alternar Tema', theme === 'light' ? 'Para Escuro' : 'Para Claro');
            toggleTheme();
          }}
          className="p-2 rounded-full text-purple-600 dark:text-yellow-400 hover:bg-purple-200 dark:hover:bg-gray-700 transition-colors duration-300"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </nav>
  );
};

// Componente Cartão de Projeto
const ProjectCard = ({ project, trackEvent }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={project.imageUrl} alt={`[Imagem de ${project.title}]`} className="w-full h-48 object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/DDD/333?text=Imagem+Indisponivel'} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-purple-700 dark:text-purple-400">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wider">Tecnologias:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 text-xs rounded-full">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('Projeto', 'Clique Ver Projeto', project.title)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-medium inline-flex items-center text-sm">
              Ver Projeto <ExternalLink size={16} className="ml-1" />
            </a>
          )}
          {project.repoUrl && project.repoUrl !== "#" && (
            <a 
              href={project.repoUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={() => trackEvent('Projeto', 'Clique Repositório', project.title)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 inline-flex items-center text-sm">
              Repositório <Github size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Item de Currículo
const ResumeItem = ({ item, trackEvent }) => { 
  const [isOpen, setIsOpen] = useState(false);
  const isExperience = !!item.company;

  const handleToggleOpen = () => {
    const newIsOpenState = !isOpen;
    setIsOpen(newIsOpenState);
    if (newIsOpenState) { 
      trackEvent(
        'Interação Currículo', 
        `Abrir Detalhe ${isExperience ? 'Experiência' : 'Educação'}`,
        item.title || item.degree
      );
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
      <button
        className="flex justify-between items-start w-full text-left"
        onClick={handleToggleOpen} 
      >
        <div className="flex items-start space-x-4 flex-grow">
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt={`[Logo de ${item.company || item.institution}]`}
              className="w-16 h-16 object-contain rounded-md mt-1 flex-shrink-0 bg-white p-1"
              onError={(e) => { 
                e.target.onerror = null;
                e.target.src = `https://placehold.co/64x64/E5E7EB/9CA3AF?text=${isExperience ? 'Empresa' : 'Escola'}`;
              }}
            />
          ) : (
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-md mt-1">
              {isExperience ? <Building size={24} className="text-gray-500 dark:text-gray-400" /> : <School size={24} className="text-gray-500 dark:text-gray-400" />}
            </div>
          )}
          <div className="flex-grow">
            <h4 className="text-xl font-semibold text-purple-700 dark:text-purple-400">{item.title || item.degree}</h4>
            <p className="text-md text-purple-500 dark:text-purple-300">{item.company || item.institution}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{item.period}</p>
          </div>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2 mt-1" /> : <ChevronDown size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0 ml-2 mt-1" />}
      </button>
      
      {isOpen && (
        <div className="pl-0 md:pl-[80px] mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {item.description && (
            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-4">{item.description}</p>
          )}
          {isExperience && item.partners && item.partners.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                <Users size={16} className="mr-2 text-purple-600 dark:text-purple-400" />
                Principais Clientes / Empresas Atendidas:
              </h5>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {item.partners.map((partner, index) => (
                  partner.logoUrl ? (
                    <div key={index} className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm hover:shadow-lg transition-shadow">
                      <img 
                        src={partner.logoUrl} 
                        alt={`[Logo de ${partner.name}]`}
                        title={partner.name}
                        className="h-10 md:h-12 object-contain"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                            const textNode = document.createTextNode(partner.name);
                            e.target.parentNode.appendChild(textNode);
                            e.target.parentNode.classList.add('text-xs', 'text-gray-500', 'dark:text-gray-400', 'flex', 'items-center', 'justify-center', 'h-10', 'md:h-12');
                        }}
                      />
                    </div>
                  ) : null
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente para exibir Certificações
const CertificationItem = ({ cert, trackEvent }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleToggleOrOpenPdf = () => {
    if (cert.pdfUrl) {
      const newIsOpenState = !isPdfOpen;
      setIsPdfOpen(newIsOpenState);
      if (newIsOpenState) {
        trackEvent(
          'Interação Certificado',
          'Abrir PDF Certificado',
          cert.name
        );
      }
    }
  };

  return (
    <div className="mb-4">
      <div 
        className={`p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow flex justify-between items-center ${cert.pdfUrl ? 'cursor-pointer' : ''}`}
        onClick={handleToggleOrOpenPdf}
      >
        <div className="flex items-center">
          <Award size={24} className="text-purple-600 dark:text-purple-400 mr-3 flex-shrink-0" />
          <div>
            <h4 className="text-lg font-semibold text-purple-700 dark:text-purple-400">{cert.name}</h4>
            <p className="text-sm text-purple-500 dark:text-purple-300">{cert.issuer}</p>
            {cert.date && cert.date !== "Não especificado" && <p className="text-xs text-gray-500 dark:text-gray-400">Data: {cert.date}</p>}
          </div>
        </div>
        {cert.pdfUrl && (
          isPdfOpen ? <EyeOff size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0" /> : <Eye size={20} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
        )}
      </div>
      {isPdfOpen && cert.pdfUrl && (
        <div className="mt-2 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow-lg">
          <iframe 
            src={cert.pdfUrl} 
            width="100%" 
            height="700px"
            title={`Certificado: ${cert.name}`}
            className="border-none"
          >
            <p>O seu navegador não suporta PDFs embutidos. Por favor, 
              <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> clique aqui para descarregar o PDF</a>.
            </p>
          </iframe>
        </div>
      )}
    </div>
  );
};

// Componente para o link de contato com expansão horizontal
const ExpandingContactLink = ({ href, eventCategory, eventAction, eventLabel, icon: Icon, textToShow, trackEvent }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackEvent(eventCategory, eventAction, eventLabel)}
    className="group relative flex items-center p-2 rounded-full text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all duration-300"
    aria-label={eventLabel}
  >
    <Icon size={28} className="flex-shrink-0 transition-transform duration-500 group-hover:scale-110" /> 
    <span 
      style={{transition: 'max-width 0.5s ease-in-out, opacity 0.5s 0.1s ease-in-out, margin-left 0.5s ease-in-out, padding 0.5s ease-in-out'}} 
      className="ml-0 max-w-0 overflow-hidden whitespace-nowrap group-hover:ml-2 group-hover:max-w-xs group-hover:px-3 group-hover:py-1 text-sm font-semibold text-purple-700 dark:text-purple-300 opacity-0 group-hover:opacity-100 pointer-events-none"
    >
      {textToShow}
    </span>
  </a>
);


// Componente Principal da Aplicação
function App() {
  const [activeSection, setActiveSection] = useState('about');
  const { user, projects, resume } = portfolioData;
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
    return 'light';
  });

  // Função auxiliar para enviar eventos GA4
  const trackEvent = (category, action, label) => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-SEU_ID_DE_METRICA_AQUI' && ReactGA.isInitialized) {
      ReactGA.event({ category, action, label });
      // console.log(`GA Event: Category='${category}', Action='${action}', Label='${label}'`);
    }
  };

  // Inicializa o Google Analytics
  useEffect(() => {
    if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-SEU_ID_DE_METRICA_AQUI') {
      ReactGA.initialize(GA_MEASUREMENT_ID);
      // console.log("Google Analytics Inicializado com ID:", GA_MEASUREMENT_ID); 
      
      const initialPagePath = `/${activeSection}`;
      let initialPageTitle = portfolioData.user.name + " Portfólio";
      if (activeSection !== 'about') {
          const sectionLabel = activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1').trim();
          initialPageTitle = `${sectionLabel} | ${portfolioData.user.name}`;
      }
      ReactGA.send({ hitType: "pageview", page: initialPagePath, title: initialPageTitle });
      // console.log(`GA Pageview Inicial: ${initialPagePath} (Título: ${initialPageTitle})`);
    } else {
      // console.warn("ID de Métrica do Google Analytics não configurado ou é placeholder. Acompanhamento desativado."); 
    }
  }, []); 

  // Envia pageviews quando a seção ativa muda
  const [initialLoadDone, setInitialLoadDone] = useState(false);
  useEffect(() => {
    if (initialLoadDone) {
        if (GA_MEASUREMENT_ID && GA_MEASUREMENT_ID !== 'G-SEU_ID_DE_METRICA_AQUI' && ReactGA.isInitialized) {
            const pagePath = `/${activeSection}`;
            let pageTitle = portfolioData.user.name + " Portfólio";
            if (activeSection !== 'about') {
                const sectionLabel = activeSection.charAt(0).toUpperCase() + activeSection.slice(1).replace(/([A-Z])/g, ' $1').trim();
                pageTitle = `${sectionLabel} | ${portfolioData.user.name}`;
            }
            ReactGA.send({ hitType: "pageview", page: pagePath, title: pageTitle });
            // console.log(`GA Pageview (mudança de seção): ${pagePath} (Título: ${pageTitle})`);
        }
    } else {
        setInitialLoadDone(true);
    }
  }, [activeSection, portfolioData.user.name, initialLoadDone]);

  // Lógica do Tema
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const powerBiIframeSrc = "https://app.powerbi.com/view?r=eyJrIjoiODk1MTU1MzYtMjhmNi00ZDc3LTg4M2YtYjZjZDFmMWQ2NWVmIiwidCI6ImZhNDY2OTVmLWYwMWQtNDVkMC1hOTA1LWY0NzFjMjlmNGI5OSJ9&pageName=6c91c334232d5c05e26b";

  const formatPhoneNumberForWhatsApp = (phone) => {
    if (!phone) return "";
    return ('' + phone).replace(/\D/g, ''); 
  };
  
  const displayPhoneNumber = (phone) => { 
    if (!phone) return "";
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/); 
    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]}-${match[5]}`;
    }
    return phone; 
  };


  const sectionBasePaddingX = "px-4 sm:px-6 lg:px-8";
  const sectionContentPaddingY = "py-12 sm:py-16"; 
  const sectionFullHeightPaddingY = "py-10 sm:py-12"; 

  // CSS para o efeito de brilho (shimmer)
  const shimmerEffectStyle = `
    .avatar-shimmer-container {
      position: relative;
      overflow: hidden; /* Crucial para conter o brilho */
      /* As classes de tamanho e forma (rounded-full, etc.) já estão no div */
    }

    .avatar-shimmer-container::after {
      content: '';
      position: absolute;
      top: 0;
      left: -150%; /* Começa mais à esquerda para um movimento completo */
      width: 50%; /* Largura do brilho */
      height: 100%;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.4) 50%, /* Aumentei um pouco a opacidade do brilho */
        rgba(255, 255, 255, 0) 100%
      );
      transform: skewX(-25deg); /* Ângulo do brilho */
      animation: shimmer-animation 3.5s infinite linear; /* Duração e tipo de animação */
      z-index: 1; /* Para garantir que o brilho fique sobre a imagem */
    }

    .avatar-shimmer-container img {
      display: block; /* Remove espaço extra abaixo da imagem */
      width: 100%;
      height: 100%;
      object-fit: cover; /* Garante que a imagem cubra o círculo */
      position: relative; /* Para que o z-index do ::after funcione corretamente em alguns navegadores */
      z-index: 0;
    }

    @keyframes shimmer-animation {
      0% {
        left: -150%;
      }
      100% {
        left: 150%; /* Move completamente através da imagem */
      }
    }
  `;

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <section id="about" className={`${sectionBasePaddingX} ${sectionFullHeightPaddingY} flex flex-grow items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900`}>
            <div className="text-center max-w-3xl bg-white dark:bg-gray-800 p-8 sm:p-12 rounded-xl shadow-2xl">
              {/* Container para o efeito de brilho */}
              <div className="avatar-shimmer-container w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-6 shadow-lg border-4 border-purple-300 dark:border-purple-600">
                <img 
                  src={user.avatar} 
                  alt={`[Avatar de ${user.name}]`} 
                  onError={(e) => e.target.src='https://placehold.co/150x150/7E3AF2/FFFFFF?text=VS'} 
                />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-purple-800 dark:text-purple-300">{user.name}</h1>
              <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400 mb-6">{user.title}</p>
              <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{user.bio}</p>
              
              <div className="mt-8 flex justify-center items-center space-x-1 sm:space-x-2"> 
                {user.phone && (
                   <ExpandingContactLink
                    href={`https://wa.me/${formatPhoneNumberForWhatsApp(user.phone)}`}
                    eventCategory="Contato"
                    eventAction="Clique WhatsApp"
                    eventLabel="Seção Sobre Mim"
                    icon={MessageCircle}
                    textToShow={displayPhoneNumber(user.phone)}
                    trackEvent={trackEvent}
                  />
                )}
                <ExpandingContactLink
                  href={`mailto:${user.email}`}
                  eventCategory="Contato"
                  eventAction="Clique Email"
                  eventLabel="Seção Sobre Mim"
                  icon={Mail}
                  textToShow={user.email}
                  trackEvent={trackEvent}
                />
                <ExpandingContactLink
                  href={user.linkedin}
                  eventCategory="Navegação Externa"
                  eventAction="Clique LinkedIn"
                  eventLabel="Seção Sobre Mim"
                  icon={Linkedin}
                  textToShow="LinkedIn"
                  trackEvent={trackEvent}
                />
                {user.github && user.github !== "#" && (
                  <ExpandingContactLink
                    href={user.github}
                    eventCategory="Navegação Externa"
                    eventAction="Clique GitHub"
                    eventLabel="Seção Sobre Mim"
                    icon={Github}
                    textToShow="GitHub"
                    trackEvent={trackEvent}
                  />
                )}
              </div>
            </div>
          </section>
        );
      case 'projects':
        return (
          <section id="projects" className={`${sectionBasePaddingX} ${sectionContentPaddingY} bg-purple-50 dark:bg-gray-900`}>
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-purple-800 dark:text-purple-300">Meus Projetos Profissionais</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} trackEvent={trackEvent} />
                ))}
              </div>
               {projects.length === 0 && <p className="text-center text-gray-600 dark:text-gray-400">Nenhum projeto profissional para exibir no momento.</p>}
            </div>
          </section>
        );
      case 'personalProjects':
        return (
          <section id="personalProjects" className={`${sectionBasePaddingX} ${sectionFullHeightPaddingY} flex flex-grow items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900 dark:via-indigo-900 dark:to-blue-900`}>
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 dark:text-white">Projetos Pessoais</h2>
              <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-2xl max-w-4xl mx-auto">
                <h3 className="text-2xl font-semibold mb-6 text-purple-700 dark:text-purple-400 text-center">Dashboard Interativo: Análise de Filmes</h3>
                <div className="aspect-w-16 aspect-h-9 h-[60vh] sm:h-[70vh] lg:h-[calc(100vh-400px)] max-h-[650px] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden mx-auto" style={{maxWidth: '1200px'}}>
                  <iframe
                    title="Vitor Sarilio Movies DB"
                    width="100%"
                    height="100%"
                    src={powerBiIframeSrc}
                    frameBorder="0"
                    allowFullScreen={true}
                    className="rounded-lg shadow-md"
                  ></iframe>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-6 text-center">
                  Este é um dashboard interativo desenvolvido no Power BI para análise de dados de filmes.
                  Explore diferentes visualizações e insights sobre o mundo cinematográfico.
                </p>
              </div>
            </div>
          </section>
        );
      case 'resume':
        return (
          <section id="resume" className={`${sectionBasePaddingX} ${sectionContentPaddingY} bg-gray-50 dark:bg-gray-900`}>
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-16 text-purple-800 dark:text-purple-300">Currículo Profissional</h2>
              <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 dark:text-purple-400 border-b-2 border-purple-200 dark:border-purple-700 pb-2">Experiência Profissional</h3>
                {resume.experience.map(exp => (
                  <ResumeItem key={exp.id} item={exp} trackEvent={trackEvent} />
                ))}
              </div>
              <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 dark:text-purple-400 border-b-2 border-purple-200 dark:border-purple-700 pb-2">Formação Acadêmica</h3>
                {resume.education.map(edu => (
                  <ResumeItem key={edu.id} item={edu} trackEvent={trackEvent} />
                ))}
              </div>
              {resume.certifications && resume.certifications.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-3xl font-semibold mb-8 text-purple-700 dark:text-purple-400 border-b-2 border-purple-200 dark:border-purple-700 pb-2">Certificações</h3>
                  {resume.certifications.map(cert => (
                    <CertificationItem key={cert.id} cert={cert} trackEvent={trackEvent} />
                  ))}
                </div>
              )}
              <div>
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 dark:text-purple-400 border-b-2 border-purple-200 dark:border-purple-700 pb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                  {resume.skills.map(skill => (
                    <span key={skill} className="bg-purple-600 dark:bg-purple-700 text-white dark:text-purple-100 px-4 py-2 text-sm rounded-full shadow-md hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      default:
        if (activeSection === 'contact') { 
            setActiveSection('about'); 
            return null; 
        }
        return <p className="text-center py-10 dark:text-gray-300">Seção não encontrada.</p>;
    }
  };

  return (
    <>
      <style>{shimmerEffectStyle}</style> {/* CSS para o efeito de brilho */}
      <div className="flex flex-col min-h-screen font-sans bg-gray-100 dark:bg-black text-gray-800 dark:text-gray-200 selection:bg-purple-500 selection:text-white">
        <Navbar setActiveSection={setActiveSection} theme={theme} toggleTheme={toggleTheme} trackEvent={trackEvent} />
        <main className="pt-[74px] sm:pt-[70px] flex-grow flex flex-col">
          {renderSection()}
        </main>
        <footer className="bg-gray-900 dark:bg-black text-purple-300 dark:text-purple-500 text-center p-6 border-t border-gray-700 dark:border-gray-800">
          <p>© {new Date().getFullYear()} {user.name}. Todos os direitos reservados.</p>
          <p className="text-xs mt-1">Desenvolvido com React + Vite & Tailwind CSS.</p>
        </footer>
      </div>
    </>
  );
}

export default App;
