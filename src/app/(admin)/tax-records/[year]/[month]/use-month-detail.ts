'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { createAppContext } from '@/hooks/use-create-app-context';
import { MonthDetailData, TaxItemWithDetails } from '../../types/tax-records.types';
import { updateTaxItemStatus } from '../../actions/tax-records.actions';
import { UpdateTaxItemStatusInput } from '../../schemas/tax-records.schemas';

const useHook = ({ data }: { data: MonthDetailData }) => {
  const [record, setRecord] = useState(data.record);
  const [userPaymentDetails] = useState(data.userPaymentDetails);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateStatus = async (input: UpdateTaxItemStatusInput) => {
    setIsLoading(true);
    try {
      const result = await updateTaxItemStatus(input);
      if (result.status === 'success' && result.data) {
        setRecord((prev) => ({
          ...prev,
          taxItems: prev.taxItems.map((item) =>
            item.id === input.taxItemId
              ? { ...item, status: result.data!.status, paidDate: result.data!.paidDate }
              : item,
          ) as TaxItemWithDetails[],
        }));
        toast.success('Állapot frissítve');
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { record, userPaymentDetails, isLoading, onUpdateStatus };
};

const [useMonthDetail, MonthDetailProvider] = createAppContext(useHook);
export { useMonthDetail, MonthDetailProvider };
