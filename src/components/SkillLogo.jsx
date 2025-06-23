export const SkillLogo = ({ imageUrl, altText, label }) => {
  return (
    <div className="flex flex-col items-center justify-start gap-2 text-center w-24">
      <div className="h-20 w-20 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt={altText} 
          className="max-h-full max-w-full object-contain transition-transform duration-300 ease-in-out hover:scale-110" 
        />
      </div>
      <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </div>
  );
};