import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Award, Building, School, Users, Eye, EyeOff } from 'lucide-react';

import sauterLogo from '../assets/logos/sauter.webp';
import uelloLogo from '../assets/logos/uello.png';
import sinapticsLogo from '../assets/logos/sinaptics.png';
import tmovLogo from '../assets/logos/tmov.png';
import jcaLogo from '../assets/logos/jca.jpg';
import fatecspLogo from '../assets/logos/fatec-sp.png';
import jacosLogo from '../assets/logos/jacos.jpeg';
import fiapLogo from '../assets/logos/fiap.png';
import unipLogo from '../assets/logos/unip.png';

import cimedLogo from '../assets/logos/cimed.png';
import autopassLogo from '../assets/logos/autopass.png';
import sotranLogo from '../assets/logos/sotran.png';
import cometaLogo from '../assets/logos/cometa.png';
import auto1001Logo from '../assets/logos/1001.png';
import catarinenseLogo from '../assets/logos/catarinense.png';
import expressoDoSulLogo from '../assets/logos/expresso-do-sul.png';
import rapidoRibeiraoLogo from '../assets/logos/rapido-ribeirao.png';

const logoMap = {
  exp1: sauterLogo,
  exp2: uelloLogo,
  exp3: sinapticsLogo,
  exp4: tmovLogo,
  exp5: jcaLogo,
  exp6: fatecspLogo,
  exp7: jacosLogo,
  edu1: fiapLogo,
  edu2: unipLogo,
};

const partnerLogoMap = {
  'CIMED': cimedLogo,
  'Autopass': autopassLogo,
  'Sotran': sotranLogo,
  'Cometa': cometaLogo,
  '1001': auto1001Logo,
  'Catarinense': catarinenseLogo,
  'Expresso do Sul': expressoDoSulLogo,
  'Rápido Ribeirão': rapidoRibeiraoLogo,
};

const PartnerLogo = ({ logoSrc, partnerName }) => {
  if (!logoSrc) {
    return (
      <div className="p-2 bg-white dark:bg-gray-700 border border-gray-200 rounded-md shadow-sm flex items-center justify-center h-10 md:h-12 text-xs text-gray-500 dark:text-gray-400">
        {partnerName}
      </div>
    );
  }
  return (
    <div className="p-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-sm hover:shadow-lg transition-shadow">
      <img src={logoSrc} alt={`[Logo de ${partnerName}]`} title={partnerName} className="h-10 md:h-12 object-contain" />
    </div>
  );
};

const ResumeItem = ({ item, trackEvent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isExperience = !!item.company;

  const handleToggleOpen = () => {
    const newIsOpenState = !isOpen;
    setIsOpen(newIsOpenState);
    if (newIsOpenState) { 
      trackEvent('Interação Currículo', `Abrir Detalhe ${isExperience ? 'Experiência' : 'Educação'}`, item.title || item.degree);
    }
  };

  return (
    <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800 hover:shadow-md transition-shadow">
      <button className="flex justify-between items-start w-full text-left" onClick={handleToggleOpen}>
        <div className="flex items-start space-x-4 flex-grow">
          {item.logo ? (
            <img src={item.logo} alt={`[Logo de ${item.company || item.institution}]`} className="w-16 h-16 object-contain rounded-md mt-1 flex-shrink-0 bg-white p-1" />
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
        {isOpen ? <ChevronUp size={20} className="text-purple-600 dark:text-purple-400" /> : <ChevronDown size={20} className="text-purple-600 dark:text-purple-400" />}
      </button>
      
      {isOpen && (
        <div className="pl-0 md:pl-[80px] mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          {item.description && <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-4">{item.description}</p>}
          {isExperience && item.partners && item.partners.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3 flex items-center">
                <Users size={16} className="mr-2 text-purple-600" /> Principais Clientes / Empresas Atendidas:
              </h5>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {item.partners.map((partner, index) => (
                   <PartnerLogo key={index} logoSrc={partnerLogoMap[partner.name]} partnerName={partner.name} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const CertificationItem = ({ cert, trackEvent }) => {
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const handleToggleOrOpenPdf = () => {
    if (cert.pdfUrl) {
      const newIsOpenState = !isPdfOpen;
      setIsPdfOpen(newIsOpenState);
      if (newIsOpenState) {
        trackEvent('Interação Certificado', 'Abrir PDF Certificado', cert.name);
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
          isPdfOpen ? <EyeOff size={20} className="text-purple-600 dark:text-purple-400" /> : <Eye size={20} className="text-purple-600 dark:text-purple-400" />
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
            <p>O seu navegador não suporta PDFs embutidos. Por favor, <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline"> clique aqui para descarregar o PDF</a>.</p>
          </iframe>
        </div>
      )}
    </div>
  );
};

export const ResumeSection = ({ resume, trackEvent }) => {
  const experiencesWithLogos = resume.experience.map(exp => ({ ...exp, logo: logoMap[`exp${exp.id}`] }));
  const educationWithLogos = resume.education.map(edu => ({ ...edu, logo: logoMap[`edu${edu.id}`] }));

  return (
    <section id="resume" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-gray-100">Currículo Profissional</h2>
        
        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 pb-2 border-b-2 border-gray-300 dark:border-gray-700">Experiência Profissional</h3>
          {experiencesWithLogos.map(exp => (
            <ResumeItem key={exp.id} item={exp} trackEvent={trackEvent} />
          ))}
        </div>

        <div className="mb-12">
          <h3 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 pb-2 border-b-2 border-gray-300 dark:border-gray-700">Formação Acadêmica</h3>
          {educationWithLogos.map(edu => (
            <ResumeItem key={edu.id} item={edu} trackEvent={trackEvent} />
          ))}
        </div>

        {resume.certifications && resume.certifications.length > 0 && (
          <div className="mb-12">
            <h3 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 pb-2 border-b-2 border-gray-300 dark:border-gray-700">Certificações</h3>
            {resume.certifications.map(cert => <CertificationItem key={cert.id} cert={cert} trackEvent={trackEvent} />)}
          </div>
        )}
        
        <div>
          <h3 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-gray-200 pb-2 border-b-2 border-gray-300 dark:border-gray-700">Habilidades</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {resume.skills.map(skill => (
              <span key={skill} className="bg-purple-600 dark:bg-purple-700 text-white px-4 py-2 text-sm rounded-full shadow-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};