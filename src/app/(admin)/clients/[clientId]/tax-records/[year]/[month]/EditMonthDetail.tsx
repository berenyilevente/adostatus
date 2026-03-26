'use client';

import { ReactElement, useState } from 'react';
import { useEditMonth } from './use-edit-month';
import { EditTaxItemForm } from './components/EditTaxItemForm';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Icon } from '@/components/ui/icon';

const MONTH_NAMES = [
  '', 'Január', 'Február', 'Március', 'Április', 'Május', 'Június',
  'Július', 'Augusztus', 'Szeptember', 'Október', 'November', 'December',
];

export const EditMonthDetail = (): ReactElement => {
  const { record, userPaymentDetails, isLoading, onDeleteRecord } = useEditMonth();
  const totalAmount = record.taxItems.reduce((sum, item) => sum + item.amount, 0);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {record.year}. {MONTH_NAMES[record.month]} - Összesen:{' '}
          <span className="font-semibold text-foreground">
            {totalAmount.toLocaleString('hu-HU')} Ft
          </span>
        </p>

        <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isLoading}>
              <Icon icon="trash" className="mr-2 h-4 w-4" />
              Bevallás törlése
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Biztosan törölni szeretnéd?</AlertDialogTitle>
              <AlertDialogDescription>
                A(z) {record.year}. {MONTH_NAMES[record.month]} havi adóbevallás és
                minden hozzá tartozó tétel véglegesen törlésre kerül. Ez a művelet nem
                vonható vissza.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Mégse</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteRecord}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Törlés
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {record.taxItems.map((item) => (
          <EditTaxItemForm
            key={item.id}
            item={item}
            paymentDetail={userPaymentDetails.find((d) => d.taxTypeId === item.taxTypeId)}
          />
        ))}
      </div>
    </div>
  );
};
