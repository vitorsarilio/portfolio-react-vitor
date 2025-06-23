export const getRatingColor = (rating) => {
  const score = parseFloat(rating);

  if (score >= 10) {
    // Dourado para nota 10
    return 'text-amber-400 fill-amber-400';
  }
  if (score > 8) {
    // Verde para notas altas
    return 'text-green-500 fill-green-500';
  }
  if (score >= 6) {
    // Amarelo para notas medianas
    return 'text-yellow-500 fill-yellow-500';
  }
  if (score > 0) {
    // Vermelho para notas baixas
    return 'text-red-500 fill-red-500';
  }
  
  // Cinza para nota 0 ou não disponível
  return 'text-gray-500 fill-gray-500';
};