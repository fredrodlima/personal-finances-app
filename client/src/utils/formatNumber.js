const currencyFormatter = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const percentageFormatter = Intl.NumberFormat('pt-BR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const twoDigitFormatter = Intl.NumberFormat('pt-BR', {
  minimumIntegerDigits: 2,
});

const formatCurrency = (value) => {
  return currencyFormatter.format(value);
};

const formatPercentage = (value) => {
  return percentageFormatter.format(value);
};

const formatTwoDigits = (value) => {
  return twoDigitFormatter.format(value);
};

export { formatCurrency, formatPercentage, formatTwoDigits };
