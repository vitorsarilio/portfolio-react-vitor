// Animations are off when the visitor asked the system for less motion or turned them off
// in the menu. index.html decides this before the first paint and marks <html>.
export const CLASSE_SEM_ANIMACAO = 'sem-animacao';
export const CHAVE_ANIMACOES = 'animacoes';

export const animacoesDesligadas = () =>
  typeof document !== 'undefined' && document.documentElement.classList.contains(CLASSE_SEM_ANIMACAO);

export function salvarPreferencia(ligadas) {
  try {
    localStorage.setItem(CHAVE_ANIMACOES, ligadas ? 'ligadas' : 'desligadas');
  } catch {
    // private mode or blocked storage: the choice just won't be remembered
  }
}
