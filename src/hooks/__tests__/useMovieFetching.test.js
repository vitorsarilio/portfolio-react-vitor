import { renderHook, waitFor, act } from '@testing-library/react';
import { useMovieFetching } from '../useMovieFetching';

describe('useMovieFetching', () => {
  const mockBaseApiUrl = 'https://api.themoviedb.org/3/movie/popular';
  const mockToken = 'mock_token';

  let IntersectionObserverMock;
  let IntersectionObserverCallback;
  let observerInstance; // To store the created instance

  beforeAll(() => {
    global.fetch = vi.fn();
  });

  beforeEach(() => {
    vi.stubEnv('VITE_TMDB_READ_ACCESS_TOKEN', mockToken);
    // Mock IntersectionObserver and capture its callback
    IntersectionObserverMock = vi.fn((callback) => {
      IntersectionObserverCallback = callback;
      observerInstance = { // Store the instance
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      };
      return observerInstance;
    });
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.resetModules(); // Reset modules after each test
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('should fetch initial movies successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 1, title: 'Movie 1' }],
        page: 1,
        total_pages: 2,
      }),
    });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl));

    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe(null);

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([{ id: 1, title: 'Movie 1' }]);
    expect(result.current.hasMore).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseApiUrl}?language=pt-BR&page=1&include_adult=false&sort_by=`,
      expect.any(Object)
    );
  });

  test('should fetch movies with search term', async () => {
    const searchTerm = 'test search';
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 2, title: 'Test Movie' }],
        page: 1,
        total_pages: 1,
      }),
    });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl, searchTerm));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([{ id: 2, title: 'Test Movie' }]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.themoviedb.org/3/search/movie?query=test%20search&language=pt-BR&page=1&include_adult=false`,
      expect.any(Object)
    );
  });

  test('should fetch movies with sort by', async () => {
    const sortBy = 'popularity.desc';
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 3, title: 'Popular Movie' }],
        page: 1,
        total_pages: 1,
      }),
    });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl, '', sortBy));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([{ id: 3, title: 'Popular Movie' }]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `${mockBaseApiUrl}?language=pt-BR&page=1&include_adult=false&sort_by=popularity.desc`,
      expect.any(Object)
    );
  });

  test('should load more movies on intersection', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, title: 'Movie 1' }],
          page: 1,
          total_pages: 2,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 4, title: 'Movie 4' }],
          page: 2,
          total_pages: 2,
        }),
      });

    const { useMovieFetching } = await import('../useMovieFetching');
    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.movies).toEqual([{ id: 1, title: 'Movie 1' }]);
    expect(result.current.hasMore).toBe(true);

    // Trigger IntersectionObserver
    act(() => {
      result.current.lastMovieElementRef(document.createElement('div'));
    });

    // Simulate intersection
    act(() => {
      IntersectionObserverCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([{ id: 1, title: 'Movie 1' }, { id: 4, title: 'Movie 4' }]);
    expect(result.current.hasMore).toBe(false);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('should handle API error', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBe('Erro na API: Not Found');
  });

  test('should handle missing access token', async () => {
    vi.stubEnv('VITE_TMDB_READ_ACCESS_TOKEN', '');
    const { useMovieFetching } = await import('../useMovieFetching'); // Re-import after stubbing

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movies).toEqual([]);
      expect(result.current.error).toBe('Token de Acesso não configurado.');
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test('should deduplicate movies', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, title: 'Movie 1' }, { id: 5, title: 'Movie 5' }],
          page: 1,
          total_pages: 2,
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          results: [{ id: 1, title: 'Movie 1 Duplicate' }, { id: 6, title: 'Movie 6' }],
          page: 2,
          total_pages: 2,
        }),
      });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl));

    await waitFor(() => expect(result.current.loading).toBe(false));

    // Trigger IntersectionObserver
    act(() => {
      result.current.lastMovieElementRef(document.createElement('div'));
    });

    // Simulate intersection
    act(() => {
      IntersectionObserverCallback([{ isIntersecting: true }]);
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.movies).toEqual([
      { id: 1, title: 'Movie 1 Duplicate' },
      { id: 5, title: 'Movie 5' },
      { id: 6, title: 'Movie 6' },
    ]);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('should not load more movies when limitToFirstPage is true', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        results: [{ id: 1, title: 'Movie 1' }],
        page: 1,
        total_pages: 2,
      }),
    });

    const { result } = renderHook(() => useMovieFetching(mockBaseApiUrl, '', '', true));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.movies).toEqual([{ id: 1, title: 'Movie 1' }]);
    expect(result.current.hasMore).toBe(false); // Should be false due to limitToFirstPage

    // Trigger lastMovieElementRef to set up the observer
    act(() => {
      result.current.lastMovieElementRef(document.createElement('div'));
    });

    // Expect IntersectionObserver constructor not to have been called
    expect(IntersectionObserverMock).not.toHaveBeenCalled();

    // Ensure no new fetch is triggered
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});