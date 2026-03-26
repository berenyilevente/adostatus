'use client';

import { useState } from 'react';
import { createAppContext } from '@/hooks/use-create-app-context';
import { toast } from 'sonner';
import { BankDetailsPageData, TaxTypeWithBankDetails } from './types/bank-details.types';
import { updateBankDetails, updateUserPaymentDetail } from './actions/bank-details.actions';
import { UpdateBankDetailsInput, UpdateUserPaymentDetailInput } from './schemas/bank-details.schemas';

const useHook = ({ data }: { data: BankDetailsPageData }) => {
  const [taxTypes, setTaxTypes] = useState(data.taxTypes);
  const [userPaymentDetails, setUserPaymentDetails] = useState(data.userPaymentDetails);
  const [editingTaxTypeId, setEditingTaxTypeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onUpdateBankDetails = async (input: UpdateBankDetailsInput) => {
    setIsLoading(true);
    try {
      const result = await updateBankDetails(input);
      if (result.status === 'success' && result.data) {
        setTaxTypes((prev) =>
          prev.map((tt) =>
            tt.id === input.taxTypeId ? { ...tt, bankDetails: result.data } : tt,
          ) as TaxTypeWithBankDetails[],
        );
        setEditingTaxTypeId(null);
        toast.success('Bankadatok sikeresen mentve');
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateUserPaymentDetail = async (input: UpdateUserPaymentDetailInput) => {
    setIsLoading(true);
    try {
      const result = await updateUserPaymentDetail(input);
      if (result.status === 'success' && result.data) {
        setUserPaymentDetails((prev) => {
          const existing = prev.findIndex(
            (d) => d.userId === input.userId && d.taxTypeId === input.taxTypeId,
          );
          if (existing >= 0) {
            const updated = [...prev];
            updated[existing] = { ...updated[existing], paymentReference: input.paymentReference };
            return updated;
          }
          return prev;
        });
        toast.success('Közlemény sikeresen mentve');
      } else {
        toast.error(result.error || 'Hiba történt');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    taxTypes,
    userPaymentDetails,
    editingTaxTypeId,
    setEditingTaxTypeId,
    isLoading,
    onUpdateBankDetails,
    onUpdateUserPaymentDetail,
  };
};

const [useBankDetails, BankDetailsProvider] = createAppContext(useHook);
export { useBankDetails, BankDetailsProvider };
