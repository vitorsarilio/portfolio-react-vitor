import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FilterControls } from '../FilterControls';
import { useDebounce } from '../../hooks/useDebounce';

vi.mock('../../hooks/useDebounce', () => ({
  useDebounce: vi.fn(),
}));

describe('FilterControls', () => {
  const mockOnDebouncedSearchChange = vi.fn();
  const mockOnSortChange = vi.fn();
  const sortOptions = [
    { value: 'title.asc', label: 'Título (A-Z)' },
    { value: 'title.desc', label: 'Título (Z-A)' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    useDebounce.mockImplementation((value) => value);
  });

  test('renders search input correctly', () => {
    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
      />
    );
    expect(screen.getByPlaceholderText('Buscar por nome...')).toBeInTheDocument();
  });

  test('updates search term on input change and debounces', async () => {
    useDebounce.mockImplementation((value) => value);

    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
      />
    );

    const searchInput = screen.getByPlaceholderText('Buscar por nome...');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(searchInput.value).toBe('test search');

    await waitFor(() => {
      expect(mockOnDebouncedSearchChange).toHaveBeenCalledWith('test search');
    });
  });

  test('renders sort select when showSortControls is true', () => {
    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
        sortBy="title.asc"
        onSortChange={mockOnSortChange}
        sortOptions={sortOptions}
      />
    );
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('Título (A-Z)')).toBeInTheDocument();
  });

  test('does not render sort select when showSortControls is false', () => {
    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
        sortBy={null}
        onSortChange={mockOnSortChange}
        sortOptions={sortOptions}
      />
    );
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
  });

  test('calls onSortChange when sort select value changes', () => {
    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
        sortBy="title.asc"
        onSortChange={mockOnSortChange}
        sortOptions={sortOptions}
      />
    );

    let sortSelect = screen.getByRole('combobox');
    fireEvent.change(sortSelect, { target: { value: 'title.desc' } });

    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
    expect(mockOnSortChange).toHaveBeenCalledWith(expect.any(Object)); 

    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
        sortBy="title.desc" 
        onSortChange={mockOnSortChange}
        sortOptions={sortOptions}
      />,
      { container: sortSelect.parentElement.parentElement } 
    );

    sortSelect = screen.getByRole('combobox');
    expect(sortSelect.value).toBe('title.desc');
  });

  test('initial search term is displayed correctly', () => {
    render(
      <FilterControls
        initialSearchTerm="initial query"
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
      />
    );
    expect(screen.getByPlaceholderText('Buscar por nome...')).toHaveValue('initial query');
  });

  test('initial sort by value is selected correctly', () => {
    render(
      <FilterControls
        initialSearchTerm=""
        onDebouncedSearchChange={mockOnDebouncedSearchChange}
        sortBy="title.desc"
        onSortChange={mockOnSortChange}
        sortOptions={sortOptions}
      />
    );
    const sortSelect = screen.getByRole('combobox');
    expect(sortSelect).toHaveValue('title.desc');
  });
});
