'use client';

import { Button, Card, CardContent, CardHeader, CardTitle, Icon } from '@/components';
import { TaxTypeWithBankDetails } from '../types/bank-details.types';
import { useBankDetails } from '../use-bank-details';

export const BankDetailCard = ({ taxType }: { taxType: TaxTypeWithBankDetails }) => {
  const { setEditingTaxTypeId } = useBankDetails();
  const bank = taxType.bankDetails;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">{taxType.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setEditingTaxTypeId(taxType.id)}
        >
          <Icon icon="pencil" size="xs" />
          Szerkesztés
        </Button>
      </CardHeader>
      <CardContent>
        {bank ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Számlaszám:</span>
              <span className="font-mono font-medium">{bank.accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Számlanév:</span>
              <span className="font-medium">{bank.accountName}</span>
            </div>
            {bank.bankName && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank:</span>
                <span>{bank.bankName}</span>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Nincs megadva bankadatok. Kattintson a szerkesztésre.</p>
        )}
      </CardContent>
    </Card>
  );
};
