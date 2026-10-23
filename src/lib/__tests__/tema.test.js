import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useTema } from '../tema';

// fake system preference that can change while the page is open
let sistemaClaro = false;
const ouvintes = new Set();
const mudarSistema = (claro) => act(() => {
  sistemaClaro = claro;
  ouvintes.forEach((f) => f());
});

describe('useTema', () => {
  beforeEach(() => {
    sistemaClaro = false;
    ouvintes.clear();
    localStorage.clear();
    vi.stubGlobal('matchMedia', vi.fn(() => ({
      get matches() { return sistemaClaro; },
      addEventListener: (_, f) => ouvintes.add(f),
      removeEventListener: (_, f) => ouvintes.delete(f),
    })));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    delete document.documentElement.dataset.tema;
  });

  it('follows the system and changes along with it', () => {
    const { result } = renderHook(() => useTema());
    expect(result.current).toMatchObject({ preferencia: 'sistema', tema: 'escuro' });
    expect(document.documentElement.dataset.tema).toBe('escuro');

    mudarSistema(true);
    expect(result.current.tema).toBe('claro');
    expect(document.documentElement.dataset.tema).toBe('claro');
  });

  it('cycles system → light → dark → system and remembers the choice', () => {
    const { result } = renderHook(() => useTema());

    act(() => result.current.proximo());
    expect(result.current).toMatchObject({ preferencia: 'claro', tema: 'claro' });
    expect(localStorage.getItem('tema')).toBe('claro');

    // a chosen theme ignores the system
    mudarSistema(false);
    expect(result.current.tema).toBe('claro');

    act(() => result.current.proximo());
    expect(result.current).toMatchObject({ preferencia: 'escuro', tema: 'escuro' });

    act(() => result.current.proximo());
    expect(result.current.preferencia).toBe('sistema');
    expect(localStorage.getItem('tema')).toBeNull();
  });

  it('starts from the saved choice', () => {
    localStorage.setItem('tema', 'claro');
    const { result } = renderHook(() => useTema());
    expect(result.current).toMatchObject({ preferencia: 'claro', tema: 'claro' });
  });
});
