const logoModules = import.meta.glob('../assets/logos/*.*', { eager: true, import: 'default' });
const logoByFile = Object.fromEntries(
  Object.entries(logoModules).map(([path, url]) => [path.split('/').pop(), url])
);

// Skills grouped by area, as compact chips; a small logo is shown when the item has one.
export const SkillGroups = ({ groups }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {groups.map(group => (
      <div key={group.name} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-gray-50 dark:bg-gray-800">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-3">{group.name}</h4>
        <ul className="flex flex-wrap gap-2">
          {group.items.map(item => {
            const logo = item.logo && logoByFile[item.logo];
            return (
              <li key={item.name} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100">
                {logo && (
                  <span className="flex bg-white rounded-sm p-0.5">
                    {/* Decorative: the skill name is right next to it */}
                    <img src={logo} alt="" width={16} height={16} loading="lazy" decoding="async" className="w-4 h-4 object-contain" />
                  </span>
                )}
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    ))}
  </div>
);
