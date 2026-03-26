'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createAppContext } from '@/hooks/use-create-app-context';
import {
  MonthDetailData,
  TaxItemWithDetails,
} from '@/app/(admin)/tax-records/types/tax-records.types';
import {
  updateTaxItem,
  updateTaxItemStatus,
  deleteMonthlyRecord,
} from '@/app/(admin)/tax-records/actions/tax-records.actions';
import {
  UpdateTaxItemInput,
  UpdateTaxItemStatusInput,
} from '@/app/(admin)/tax-records/schemas/tax-records.schemas';

const useHook = ({ data, clientId }: { data: MonthDetailData; clientId: string }) => {
  const [record, setRecord] = useState(data.record);
  const [userPaymentDetails] = useState(data.userPaymentDetails);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
              : item,
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

  const onDeleteRecord = async () => {
    setIsLoading(true);
    try {
      const result = await deleteMonthlyRecord(record.id);
      if (result.status === 'success') {
        toast.success('Adóbevallás törölve');
        router.push(`/clients/${clientId}`);
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
    onDeleteRecord,
  };
};

const [useEditMonth, EditMonthProvider] = createAppContext(useHook);
export { EditMonthProvider, useEditMonth };
