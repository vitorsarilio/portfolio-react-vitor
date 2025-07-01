import React, { useState, useEffect } from 'react';
import { Search, ArrowDownUp } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

export const FilterControls = React.memo(({ initialSearchTerm = '', onDebouncedSearchChange, sortBy, onSortChange, sortOptions }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);
  const debouncedLocalSearchTerm = useDebounce(localSearchTerm, 500);

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  useEffect(() => {
    onDebouncedSearchChange(debouncedLocalSearchTerm.trim());
  }, [debouncedLocalSearchTerm, onDebouncedSearchChange]);

  const showSortControls = sortBy !== null && sortBy !== undefined && onSortChange !== null && onSortChange !== undefined && sortOptions !== null && sortOptions !== undefined && sortOptions.length > 0;

  return (
    <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <div className={`grid grid-cols-1 ${showSortControls ? 'md:grid-cols-2' : ''} gap-4`}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text"
            placeholder="Buscar por nome..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
          />
        </div>
        {showSortControls && (
          <div className="relative">
            <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={sortBy}
              onChange={onSortChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none transition"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
});