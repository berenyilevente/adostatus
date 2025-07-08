import { formatCurrency } from '@/utils/formatCurrency';

export interface CurrencyFieldProps {
  price: string | null;
  currency: string | null;
}

export const CurrencyField = ({ price, currency }: CurrencyFieldProps) => {
  if (!price || !currency) {
    return <p className="font-semibold text-gray-900">N/A</p>;
  }

  return (
    <p className="font-semibold text-gray-900">
      {formatCurrency(price, currency)}
    </p>
  );
};
