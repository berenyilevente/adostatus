'use client';

import { ReactElement } from 'react';
import { useBankDetails } from './use-bank-details';
import { BankDetailCard } from './components/BankDetailCard';
import { EditBankDetailDialog } from './components/EditBankDetailDialog';
import { UserPaymentRefTable } from './components/UserPaymentRefTable';

export const BankDetails = (): ReactElement => {
  const { taxTypes } = useBankDetails();

  return (
    <div className="space-y-6 mt-6">
      <div className="grid gap-4 md:grid-cols-2">
        {taxTypes.map((taxType) => (
          <BankDetailCard key={taxType.id} taxType={taxType} />
        ))}
      </div>
      <UserPaymentRefTable />
      <EditBankDetailDialog />
    </div>
  );
};
