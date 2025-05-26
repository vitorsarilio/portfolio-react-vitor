import React, { useState } from 'react';
import { Briefcase, User, Code, Mail, Linkedin, Github, ExternalLink, ChevronDown, ChevronUp, Award, LayoutDashboard, Phone } from 'lucide-react'; // Adicionado Phone

// Dados do Portfolio (AGORA COM OS SEUS DADOS)
const portfolioData = {
  user: {
    name: "Vitor Hugo Sarilio",
    title: "Data Analyst | BI | SQL | Python | Power BI Specialist | BigQuery | Data Automation | Apache Airflow",
    bio: `Sou um profissional orientado a dados com experiência em Business Intelligence, Análise de Dados e automação de ETL. Minha especialidade inclui SQL para consulta de dados, Python para processamento de dados e Power BI para visualização. Atualmente, trabalho na construção de pipelines de dados escaláveis com Apache Airflow e na análise de grandes conjuntos de dados no Google BigQuery.

Minhas Habilidades & Ferramentas:
Análise de Dados: SQL, Python (Pandas, NumPy)
BI & Visualização: Power BI, Desenvolvimento de Dashboards
Engenharia de Dados: Pipelines ETL, Apache Airflow, BigQuery

Idiomas: Português (Nativo), Inglês (Profissional Completo), Espanhol (Elementar).`,
    email: "vitorsarilio@hotmail.com",
    phone: "11987191928", // Telefone adicionado
    linkedin: "https://www.linkedin.com/in/vitorsarilio",
    github: "https://github.com/vitorsarilio", // GitHub adicionado
    avatar: "https://placehold.co/150x150/7E3AF2/FFFFFF?text=VS" // Sugiro substituir pela URL da sua foto
  },
  projects: [ // Projetos Profissionais / Acadêmicos
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
      description: "Criação e manutenção de mais de 15 dashboards em Power BI para equipas operacionais e executivas, rastreando KPIs alinhados aos OKRs da organização. Automação de relatórios mensais de KPIs.",
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
        title: "Senior Data Analyst Consultant",
        company: "SAUTER",
        period: "Fevereiro 2025 - Presente",
        description: "Refatoração de dashboards: Atualização de dashboards legados do Power BI com UX/UI aprimorados, permitindo uma tomada de decisão mais rápida para as partes interessadas.\nPipeline de Monitoramento do Microsoft Admin Center: Desenvolvimento de Pipeline de Ponta a Ponta: Projetou e implantou um pipeline de monitoramento automatizado ingerindo dados da API Microsoft Graph para rastrear. Ingestão de Dados: Python (Requests, Pandas). Orquestração: Apache Airflow DAGs. Visualização: Power BI com DAX personalizado."
      },
      {
        id: 2,
        title: "Senior Data Analyst",
        company: "SINAPTICS - Data Journey",
        period: "Junho 2023 - Janeiro 2025 (1 ano e 8 meses)",
        description: "Desenvolvimento de dashboards em Power BI, traduzindo requisitos de negócios complexos em visualizações acionáveis para equipes operacionais. Migração de Dados para a Nuvem: Migração de bancos de dados Oracle para Google BigQuery, otimizando o desempenho de consultas. Stack Técnico: Power BI, BigQuery, Oracle PL/SQL, JIRA."
      },
      {
        id: 3,
        title: "Data Engineer (Mid-Level)",
        company: "Uello",
        period: "Fevereiro 2024 - Julho 2024 (6 meses)",
        description: "Engenharia de Pipeline de Dados na Nuvem: Projetou, implantou e manteve pipelines Airflow de nível de produção no GCP. Desenvolveu e manteve dashboards do Google Data Studio (Looker). Stack Tecnológico: Apache Airflow (Python), Google Cloud, Looker, SQL."
      },
      {
        id: 4,
        title: "Data Analyst (Mid-Level)",
        company: "Tmov",
        period: "Dezembro 2021 - Março 2023 (1 ano e 4 meses)",
        description: "Desenvolvimento de Dashboards Executivos: Projetou e manteve mais de 15 dashboards Power BI para equipes operacionais, rastreando KPIs vinculados aos OKRs organizacionais. Estratégia de KPIs e Alinhamento de Negócios: Colaborou com chefes de departamento para definir e padronizar KPIs, garantindo a consistência das métricas nas operações. Automação de relatórios mensais de KPIs, eliminando horas de trabalho manual através de fluxos de dados Power BI e medidas DAX. Stack Tecnológico: Power BI (DAX, Modelagem de Dados), SQL (Joins Avançados, CTEs), Excel (Power Query)."
      },
      {
        id: 5,
        title: "Analista Operacional e de Performance (Múltiplos Níveis)",
        company: "Grupo JCA",
        period: "Março 2017 - Novembro 2021 (4 anos e 9 meses)",
        description: "Reporte Operacional Orientado a Dados: Desenvolveu mais de 20 dashboards interativos em Power BI para gerenciamento de frota e telemetria. Automação de Processos e Eficiência: Automatizou tarefas repetitivas usando Python (Selenium, Pandas), incluindo web scraping, geração de relatórios e alertas por e-mail (economizando mais de 25 horas/mês). Construiu e otimizou consultas SQL (SQL Server, MySQL, OracleDB). Criação de dashboards de telemetria com integração de dados GPS ao vivo. Análise Estratégica de Desempenho: Desenvolveu dashboards Power BI de nível executivo. Projetou e manteve fluxos de trabalho Pentaho Data Integration (PDI). Desenvolvimento de KPIs e Melhoria de Processos: Projetou mais de 15 novos KPIs de desempenho de frota. Melhoria de Processos de Multas de Trânsito e Programa de Recompensa de Motoristas. Ferramentas: Power BI, SQL, Excel (Fórmulas Avançadas, VBA), Python (Selenium, Pandas), Pentaho Data Integration."
      },
       {
        id: 6,
        title: "Software Development Intern",
        company: "Faculdade de Tecnologia de São Paulo - FATEC-SP",
        period: "Fevereiro 2015 - Junho 2016 (1 ano e 5 meses)",
        description: "Desenvolvimento Backend e Frontend. Stack Tecnológico: C#, .NET, HTML, CSS."
      },
      {
        id: 7,
        title: "IT Technical Assistant",
        company: "Jaco's Serviços de Informática LTDA",
        period: "Julho 2012 - Setembro 2013 (1 ano e 3 meses)",
        description: "Forneceu suporte técnico ao usuário final. Vendeu e configurou componentes de PC (RAM, HDDs, GPUs)."
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
            date: "Não especificado" // Adicione a data se souber
        }
    ]
  }
};

// Componente de Navegação
const Navbar = ({ setActiveSection }) => {
  const navItems = [
    { label: "Sobre Mim", section: "about", icon: <User size={18} /> },
    { label: "Projetos", section: "projects", icon: <Code size={18} /> },
    { label: "Projetos Pessoais", section: "personalProjects", icon: <LayoutDashboard size={18} /> },
    { label: "Currículo", section: "resume", icon: <Briefcase size={18} /> },
    { label: "Contato", section: "contact", icon: <Mail size={18} /> }
  ];

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-4 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <ul className="container mx-auto flex flex-wrap justify-center gap-x-2 sm:gap-x-4 md:gap-x-6">
        {navItems.map(item => (
          <li key={item.section}>
            <button
              onClick={() => setActiveSection(item.section)}
              className="flex items-center space-x-2 text-purple-300 hover:text-white transition-colors duration-300 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm font-medium"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

// Componente Cartão de Projeto
const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <img src={project.imageUrl} alt={`[Imagem de ${project.title}]`} className="w-full h-48 object-cover" onError={(e) => e.target.src='https://placehold.co/600x400/DDD/333?text=Imagem+Indisponivel'} />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold mb-2 text-purple-700">{project.title}</h3>
        <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-grow">{project.description}</p>
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">Tecnologias:</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span key={tech} className="bg-purple-100 text-purple-700 px-2 py-1 text-xs rounded-full">{tech}</span>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-200">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center text-sm">
              Ver Projeto <ExternalLink size={16} className="ml-1" />
            </a>
          )}
          {project.repoUrl && project.repoUrl !== "#" && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm">
              Repositório <Github size={16} className="ml-1" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

// Componente Item de Currículo (para Experiência e Educação)
const ResumeItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h4 className="text-xl font-semibold text-purple-700">{item.title || item.degree}</h4>
          <p className="text-md text-purple-500">{item.company || item.institution}</p>
          <p className="text-sm text-gray-500">{item.period}</p>
        </div>
        {isOpen ? <ChevronUp size={20} className="text-purple-600 flex-shrink-0" /> : <ChevronDown size={20} className="text-purple-600 flex-shrink-0" />}
      </button>
      {isOpen && item.description && (
        <p className="text-gray-700 mt-3 pt-3 border-t border-gray-200 text-sm leading-relaxed whitespace-pre-line">{item.description}</p>
      )}
    </div>
  );
};

// Componente para exibir Certificações
const CertificationItem = ({ cert }) => {
    return (
        <div className="mb-4 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 hover:shadow-md transition-shadow">
            <div className="flex items-center">
                <Award size={24} className="text-purple-600 mr-3 flex-shrink-0" />
                <div>
                    <h4 className="text-lg font-semibold text-purple-700">{cert.name}</h4>
                    <p className="text-sm text-purple-500">{cert.issuer}</p>
                    {cert.date && cert.date !== "Não especificado" && <p className="text-xs text-gray-500">Data: {cert.date}</p>}
                </div>
            </div>
        </div>
    );
};


// Componente Principal da Aplicação
function App() {
  const [activeSection, setActiveSection] = useState('about');
  const { user, projects, resume } = portfolioData;

  const powerBiIframeSrc = "https://app.powerbi.com/view?r=eyJrIjoiODk1MTU1MzYtMjhmNi00ZDc3LTg4M2YtYjZjZDFmMWQ2NWVmIiwidCI6ImZhNDY2OTVmLWYwMWQtNDVkMC1hOTA1LWY0NzFjMjlmNGI5OSJ9&pageName=6c91c334232d5c05e26b";

  const formatPhoneNumber = (phone) => {
    if (!phone) return "";
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
    }
    return phone;
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return (
          <section id="about" className="min-h-[calc(100vh-80px)] flex items-center justify-center py-16 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            <div className="text-center max-w-3xl bg-white p-8 sm:p-12 rounded-xl shadow-2xl">
              <img src={user.avatar} alt={`[Avatar de ${user.name}]`} className="w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-6 shadow-lg border-4 border-purple-300" onError={(e) => e.target.src='https://placehold.co/150x150/7E3AF2/FFFFFF?text=VS'} />
              <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-purple-800">{user.name}</h1>
              <p className="text-xl sm:text-2xl text-purple-600 mb-6">{user.title}</p>
              <p className="text-md sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">{user.bio}</p>
              {user.phone && (
                <a href={`tel:${user.phone}`} className="text-md sm:text-lg text-purple-600 hover:underline inline-flex items-center my-4">
                  <Phone size={18} className="mr-2"/> {formatPhoneNumber(user.phone)}
                </a>
              )}
              <div className="mt-4 flex justify-center space-x-6">
                <a href={`mailto:${user.email}`} className="text-purple-600 hover:text-purple-800 transition-colors duration-300 p-2 rounded-full hover:bg-purple-100">
                  <Mail size={28} />
                </a>
                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors duration-300 p-2 rounded-full hover:bg-purple-100">
                  <Linkedin size={28} />
                </a>
                {user.github && user.github !== "#" && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors duration-300 p-2 rounded-full hover:bg-purple-100">
                    <Github size={28} />
                  </a>
                )}
              </div>
            </div>
          </section>
        );
      case 'projects':
        return (
          <section id="projects" className="py-20 px-4 bg-purple-50 min-h-screen">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-16 text-purple-800">Meus Projetos Profissionais</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {projects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
               {projects.length === 0 && <p className="text-center text-gray-600">Nenhum projeto profissional para exibir no momento.</p>}
            </div>
          </section>
        );
      case 'personalProjects':
        return (
          <section id="personalProjects" className="py-20 px-4 bg-gray-100 min-h-screen">
            <div className="container mx-auto">
              <h2 className="text-4xl font-bold text-center mb-10 text-purple-800">Projetos Pessoais</h2>
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl">
                <h3 className="text-2xl font-semibold mb-6 text-purple-700 text-center">Dashboard Interativo: Análise de Filmes</h3>
                <div className="aspect-w-16 aspect-h-9 lg:h-[calc(100vh-280px)] h-[60vh]">
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
                <p className="text-sm text-gray-600 mt-6 text-center">
                  Este é um dashboard interativo desenvolvido no Power BI para análise de dados de filmes.
                  Explore diferentes visualizações e insights sobre o mundo cinematográfico.
                </p>
              </div>
            </div>
          </section>
        );
      case 'resume':
        return (
          <section id="resume" className="py-20 px-4 bg-gray-50 min-h-screen">
            <div className="container mx-auto max-w-4xl">
              <h2 className="text-4xl font-bold text-center mb-16 text-purple-800">Currículo Profissional</h2>
              
              <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 border-b-2 border-purple-200 pb-2">Experiência Profissional</h3>
                {resume.experience.map(exp => (
                  <ResumeItem key={exp.id} item={exp} />
                ))}
              </div>

              <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 border-b-2 border-purple-200 pb-2">Formação Acadêmica</h3>
                {resume.education.map(edu => (
                  <ResumeItem key={edu.id} item={edu} />
                ))}
              </div>

              {resume.certifications && resume.certifications.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-3xl font-semibold mb-8 text-purple-700 border-b-2 border-purple-200 pb-2">Certificações</h3>
                  {resume.certifications.map(cert => (
                    <CertificationItem key={cert.id} cert={cert} />
                  ))}
                </div>
              )}

              <div>
                <h3 className="text-3xl font-semibold mb-8 text-purple-700 border-b-2 border-purple-200 pb-2">Habilidades</h3>
                <div className="flex flex-wrap gap-3">
                  {resume.skills.map(skill => (
                    <span key={skill} className="bg-purple-600 text-white px-4 py-2 text-sm rounded-full shadow-md hover:bg-purple-700 transition-colors cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      case 'contact':
        return (
          <section id="contact" className="py-20 px-4 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen flex items-center justify-center">
            <div className="text-center max-w-xl w-full">
              <h2 className="text-4xl font-bold mb-8 text-purple-800">Entre em Contato</h2>
              <p className="text-lg text-gray-700 mb-6">
                Estou sempre aberto a novas oportunidades e colaborações. Sinta-se à vontade para me contatar!
              </p>
              <div className="bg-white p-8 sm:p-10 rounded-lg shadow-xl">
                <p className="text-xl text-purple-700 font-semibold mb-1">{user.name}</p>
                <a href={`mailto:${user.email}`} className="text-lg text-purple-600 hover:underline inline-flex items-center mb-2">
                  <Mail size={20} className="mr-2"/> {user.email}
                </a>
                {user.phone && (
                  <a href={`tel:${user.phone}`} className="text-lg text-purple-600 hover:underline inline-flex items-center">
                    <Phone size={20} className="mr-2"/> {formatPhoneNumber(user.phone)}
                  </a>
                )}
                <div className="mt-8 flex justify-center space-x-6">
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors duration-300 p-2 rounded-full hover:bg-purple-100">
                    <Linkedin size={32} />
                  </a>
                  {user.github && user.github !== "#" && (
                     <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 transition-colors duration-300 p-2 rounded-full hover:bg-purple-100">
                       <Github size={32} />
                     </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      default:
        return <p className="text-center py-10">Seção não encontrada.</p>;
    }
  };

  return (
    <div className="font-sans bg-gray-100 text-gray-800 selection:bg-purple-500 selection:text-white">
      <Navbar setActiveSection={setActiveSection} />
      <main className="pt-[74px] sm:pt-[70px]">
        {renderSection()}
      </main>
      <footer className="bg-gray-900 text-purple-300 text-center p-6">
        <p>&copy; {new Date().getFullYear()} {user.name}. Todos os direitos reservados.</p>
        <p className="text-xs mt-1">Desenvolvido com React & Tailwind CSS.</p>
      </footer>
    </div>
  );
}

export default App;
