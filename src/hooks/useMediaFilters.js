import { useMemo } from 'react';

const normalizeString = (str) => {
  return str.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
};

export const useMediaFilters = (media, mediaType, searchTerm, sortBy) => {
  const filteredAndSortedMedia = useMemo(() => {
    if (!media) return [];

    const getTitle = (item) => (mediaType === 'tv' ? item.name : item.title) || ''; 
    const getDate = (item) => mediaType === 'tv' ? item.first_air_date : item.release_date;

    const normalizedSearchTerm = normalizeString(searchTerm);

    const filtered = media.filter(item => 
      normalizeString(getTitle(item)).includes(normalizedSearchTerm)
    );

    const sorted = [...filtered].sort((a, b) => {
      const titleA = getTitle(a);
      const titleB = getTitle(b);
      const dateA = getDate(a);
      const dateB = getDate(b);

      if (sortBy === 'title_asc') {
        return titleA.localeCompare(titleB);
      } else if (sortBy === 'title_desc') {
        return titleB.localeCompare(titleA);
      } else if (sortBy === 'release_date_asc') {
        return new Date(dateA) - new Date(dateB);
      } else if (sortBy === 'release_date_desc') {
        return new Date(dateB) - new Date(dateA);
      } else if (sortBy === 'rating_asc') {
        return a.rating - b.rating;
      } else if (sortBy === 'rating_desc') {
        return b.rating - a.rating;
      }
      return 0; 
    });

    return sorted;
  }, [media, mediaType, searchTerm, sortBy]);

  return filteredAndSortedMedia;
};
