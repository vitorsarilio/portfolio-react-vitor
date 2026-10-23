// Every file in src/assets/logos, looked up by file name (the `logo` field in portfolioData).
const modulos = import.meta.glob('../assets/logos/*.*', { eager: true, import: 'default' });

export const logoPorArquivo = Object.fromEntries(
  Object.entries(modulos).map(([caminho, url]) => [caminho.split('/').pop(), url])
);

export const logo = (arquivo) => (arquivo ? logoPorArquivo[arquivo] : undefined);
