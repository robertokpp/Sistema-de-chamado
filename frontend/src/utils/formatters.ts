export const formatsCurrency = (value:any) => {
  if (!value) return 'R$ 0,00';

  // Remove tudo que não for dígito numérico
  let  amount = value.toString().replace(/\D/g, '');

  // Transforma em centavos e formata com duas casas decimais
  amount = (amount / 100).toFixed(2) + '';

  // Substitui o ponto decimal por vírgula e adiciona os pontos de milhar
  amount = amount.replace('.', ',');
  amount = amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

  return `R$ ${amount}`;
};
