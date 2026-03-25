//TODO Add support for other currencies
export const formatCurrency = (price: string, currency: string | null) => {
  const currencySymbol =
    currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$';
  return `${currencySymbol}${parseFloat(price || '0').toFixed(2)}`;
};
