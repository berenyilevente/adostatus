'use client';

import {
  updateTaxItem,
  updateTaxItemStatus,
} from '@/app/(admin)/tax-records/actions/tax-records.actions';
import {
  UpdateTaxItemInput,
  UpdateTaxItemStatusInput,
} from '@/app/(admin)/tax-records/schemas/tax-records.schemas';
import {
  MonthDetailData,
  TaxItemWithDetails,
} from '@/app/(admin)/tax-records/types/tax-records.types';
import { createAppContext } from '@/hooks/use-create-app-context';
import { useState } from 'react';
import { toast } from 'sonner';

const useHook = ({ data }: { data: MonthDetailData }) => {
  const [record, setRecord] = useState(data.record);
  const [userPaymentDetails] = useState(data.userPaymentDetails);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateTaxItem = async (input: UpdateTaxItemInput) => {
    setIsLoading(true);
    try {
      const result = await updateTaxItem(input);
      if (result.status === 'success' && result.data) {
        setRecord((prev) => ({
          ...prev,
          taxItems: prev.taxItems.map((item) =>
            item.id === input.taxItemId
              ? {
                  ...item,
                  amount: result.data!.amount,
                  dueDate: result.data!.dueDate,
                  notes: result.data!.notes,
                }
              : item
          ) as TaxItemWithDetails[],
        }));
        toast.success('Adótétel frissítve');
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateTaxItemStatus = async (input: UpdateTaxItemStatusInput) => {
    setIsLoading(true);
    try {
      const result = await updateTaxItemStatus(input);
      if (result.status === 'success' && result.data) {
        setRecord((prev) => ({
          ...prev,
          taxItems: prev.taxItems.map((item) =>
            item.id === input.taxItemId
              ? { ...item, status: result.data!.status, paidDate: result.data!.paidDate }
              : item
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

  return {
    record,
    userPaymentDetails,
    isLoading,
    onUpdateTaxItem,
    onUpdateTaxItemStatus,
  };
};

const [useEditMonth, EditMonthProvider] = createAppContext(useHook);
export { EditMonthProvider, useEditMonth };
