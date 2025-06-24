import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

import { ExpandingContactLink } from '../components/ExpandingContactLink';
import { SkillLogo } from '../components/SkillLogo';

const logoModules = import.meta.glob('../assets/logos/*.*', { eager: true });

const skills = Object.entries(logoModules)
  .map(([path, module]) => {
    const fileNameWithPrefix = path.split('/').pop(); 
    
    const match = fileNameWithPrefix.match(/^(\d+)-(.+)\./);
    
    if (!match) return null; 

    const order = parseInt(match[1], 10); 
    const nameRaw = match[2]; 

    const label = nameRaw
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
    
    return {
      order,
      name: label,
      image: module.default,
    };
  })
  .filter(Boolean) 
  .sort((a, b) => a.order - b.order); 


const formatPhoneNumberForWhatsApp = (phone) => { if (!phone) return ""; return ('' + phone).replace(/\D/g, ''); };
const displayPhoneNumber = (phone) => { if (!phone) return ""; const cleaned = ('' + phone).replace(/\D/g, ''); const match = cleaned.match(/^(\d{2})(\d{2})(\d{1})(\d{4})(\d{4})$/); if (match) { return `+${match[1]} (${match[2]}) ${match[3]} ${match[4]}-${match[5]}`; } return phone; };
const shimmerEffectStyle = `
  .avatar-shimmer-container { position: relative; overflow: hidden; }
  .avatar-shimmer-container::after { content: ''; position: absolute; top: 0; left: -150%; width: 50%; height: 100%; background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100% ); transform: skewX(-25deg); animation: shimmer-animation 3.5s infinite linear; z-index: 1; }
  .avatar-shimmer-container img { display: block; width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 0; }
  @keyframes shimmer-animation { 0% { left: -150%; } 100% { left: 150%; } }
`;


export const AboutSection = ({ user, trackEvent }) => {
  return (
    <>
      <style>{shimmerEffectStyle}</style>
      <section id="about" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-grow items-center justify-center min-h-screen">
        <div className="text-center w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10">
          <div className="avatar-shimmer-container w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-6 shadow-lg border-4 border-purple-300 dark:border-purple-600">
            <img src={user.avatar} alt={`[Avatar de ${user.name}]`} onError={(e) => e.target.src='https://placehold.co/150x150/7E3AF2/FFFFFF?text=VS'} />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900 dark:text-gray-100">{user.name}</h1>
          <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400 mb-6">{user.title}</p>
          
          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left md:text-center">{user.bio_intro}</p>

          <div className="mt-10 mb-8">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Habilidades & Ferramentas</h3>
            <div className="flex flex-wrap items-start justify-center gap-x-4 gap-y-6 md:gap-x-8">
              {skills.map(skill => (
                <SkillLogo 
                  key={skill.name} 
                  imageUrl={skill.image}
                  altText={`Logo de ${skill.name}`}
                  label={skill.name}
                />
              ))}
            </div>
          </div>
          
          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left md:text-center">{user.bio_languages}</p>

          <div className="mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
            {user.phone && (<ExpandingContactLink href={`https://wa.me/${formatPhoneNumberForWhatsApp(user.phone)}`} eventCategory="Contato" eventAction="Clique WhatsApp" eventLabel="Seção Sobre Mim" icon={MessageCircle} textToShow={displayPhoneNumber(user.phone)} trackEvent={trackEvent} />)}
            <ExpandingContactLink href={`mailto:${user.email}`} eventCategory="Contato" eventAction="Clique Email" eventLabel="Seção Sobre Mim" icon={Mail} textToShow={user.email} trackEvent={trackEvent} />
            <ExpandingContactLink href={user.linkedin} eventCategory="Navegação Externa" eventAction="Clique LinkedIn" eventLabel="Seção Sobre Mim" icon={Linkedin} textToShow="LinkedIn" trackEvent={trackEvent} />
            {user.github && user.github !== "#" && (<ExpandingContactLink href={user.github} eventCategory="Navegação Externa" eventAction="Clique GitHub" eventLabel="Seção Sobre Mim" icon={Github} textToShow="GitHub" trackEvent={trackEvent} />)}
          </div>
        </div>
      </section>
    </>
  );
};