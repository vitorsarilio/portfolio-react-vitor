import { renderHook, waitFor } from '@testing-library/react';
import { useFetchAllPages } from '../useFetchAllPages';

describe('useFetchAllPages', () => {
  const mockApiUrl = 'https://api.example.com/data';
  const mockToken = 'mock_token';

  // Mock the global fetch function
  beforeAll(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.resetModules(); // Reset modules after each test
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('should fetch data from a single page successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 1, name: 'Item 1' }],
        total_pages: 1,
      }),
    });

    const { result } = renderHook(() => useFetchAllPages(mockApiUrl));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([{ id: 1, name: 'Item 1' }]);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${mockApiUrl}&language=pt-BR&page=1&include_adult=false`,
      expect.any(Object)
    );
  });

  test('should fetch data from multiple pages and deduplicate', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }],
          total_pages: 2,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 2, name: 'Item 2' }, { id: 3, name: 'Item 3' }],
          total_pages: 2,
        }),
      });

    const { result } = renderHook(() => useFetchAllPages(mockApiUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' },
    ]);
    expect(result.current.error).toBe(null);
    expect(fetch).toHaveBeenCalledTimes(2); // Initial call + one for the second page
  });

  test('should handle API error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useFetchAllPages(mockApiUrl));

    expect(result.current.loading).toBe(true);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Erro na API: Not Found');
  });

  test('should handle missing access token', async () => {
    vi.stubEnv('VITE_TMDB_READ_ACCESS_TOKEN', ''); // Simulate missing token
    const { useFetchAllPages } = await import('../useFetchAllPages'); // Re-import after stubbing

    const { result } = renderHook(() => useFetchAllPages(mockApiUrl));

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('Token de Acesso não configurado.');
    expect(fetch).not.toHaveBeenCalled();
  });
});