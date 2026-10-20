import { Mail, Linkedin, Github, MessageCircle, FileDown } from 'lucide-react';

import { ContactButton } from '../components/ContactButton';

const formatPhoneNumberForWhatsApp = (phone) => { if (!phone) return ""; return ('' + phone).replace(/\D/g, ''); };
const shimmerEffectStyle = `
  .avatar-shimmer-container { position: relative; overflow: hidden; }
  .avatar-shimmer-container::after { content: ''; position: absolute; top: 0; left: -150%; width: 50%; height: 100%; background: linear-gradient( to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100% ); transform: skewX(-25deg); animation: shimmer-animation 3.5s infinite linear; z-index: 1; }
  .avatar-shimmer-container img { display: block; width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 0; }
  @keyframes shimmer-animation { 0% { left: -150%; } 100% { left: 150%; } }
`;

const isSet = (value) => value && value !== '#';

export const AboutSection = ({ user, trackEvent }) => {
  const track = (category, action) => () => trackEvent(category, action, 'Topo');

  return (
    <>
      <style>{shimmerEffectStyle}</style>
      <section id="about" className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 flex flex-grow items-center justify-center min-h-[80vh]">
        <div className="text-center w-full max-w-4xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 sm:p-12 rounded-2xl shadow-2xl border border-black/5 dark:border-white/10">
          <div className="avatar-shimmer-container w-32 h-32 sm:w-36 sm:h-36 rounded-full mx-auto mb-6 shadow-lg border-4 border-purple-300 dark:border-purple-600">
            <img
              src={user.avatar}
              alt={`Foto de ${user.name}`}
              width={144}
              height={144}
              fetchPriority="high"
              onError={(e) => e.target.src='https://placehold.co/150x150/7E3AF2/FFFFFF?text=VS'}
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-gray-900 dark:text-gray-100">{user.name}</h1>
          <p className="text-xl sm:text-2xl text-purple-600 dark:text-purple-400 mb-6">{user.title}</p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {isSet(user.phone) && (
              <ContactButton primary href={`https://wa.me/${formatPhoneNumberForWhatsApp(user.phone)}`} label="WhatsApp" icon={<MessageCircle size={18} />} onClick={track('Contato', 'Clique WhatsApp')} />
            )}
            <ContactButton href={`mailto:${user.email}`} label="E-mail" icon={<Mail size={18} />} onClick={track('Contato', 'Clique Email')} />
            <ContactButton href={user.linkedin} label="LinkedIn" icon={<Linkedin size={18} />} onClick={track('Navegação Externa', 'Clique LinkedIn')} />
            {isSet(user.github) && (
              <ContactButton href={user.github} label="GitHub" icon={<Github size={18} />} onClick={track('Navegação Externa', 'Clique GitHub')} />
            )}
            {/* Shown once `resumeUrl` (e.g. "/curriculo.pdf") is added to portfolioData.user */}
            {isSet(user.resumeUrl) && (
              <ContactButton href={user.resumeUrl} download label="Baixar CV" icon={<FileDown size={18} />} onClick={track('Contato', 'Download CV')} />
            )}
          </div>

          <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left md:text-center">{user.bio_intro}</p>
          <p className="mt-4 text-md sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed text-left md:text-center">{user.bio_language}</p>
        </div>
      </section>
    </>
  );
};
