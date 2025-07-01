import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  test('should debounce value', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'new value', delay: 500 });
    expect(result.current).toBe('initial'); 

    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial'); 

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('new value'); 
  });

  test('should cancel previous debounce on value change', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'first change', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe('initial');

    rerender({ value: 'second change', delay: 500 });
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(result.current).toBe('initial'); 

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current).toBe('second change'); 
  });

  test('should handle delay change', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'new value', delay: 1000 });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('initial'); 

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(result.current).toBe('new value'); 
  });
});