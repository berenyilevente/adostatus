'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Form,
} from '@/components';
import { FormInput } from '@/components/form/form-input';
import { updateBankDetailsSchema, UpdateBankDetailsInput } from '../schemas/bank-details.schemas';
import { useBankDetails } from '../use-bank-details';

export const EditBankDetailDialog = () => {
  const { taxTypes, editingTaxTypeId, setEditingTaxTypeId, isLoading, onUpdateBankDetails } =
    useBankDetails();

  const taxType = taxTypes.find((t) => t.id === editingTaxTypeId);
  const isOpen = !!editingTaxTypeId && !!taxType;

  const form = useForm<UpdateBankDetailsInput>({
    resolver: zodResolver(updateBankDetailsSchema),
    values: {
      taxTypeId: taxType?.id ?? '',
      accountNumber: taxType?.bankDetails?.accountNumber ?? '',
      accountName: taxType?.bankDetails?.accountName ?? '',
      bankName: taxType?.bankDetails?.bankName ?? '',
    },
  });

  const onSubmit = async (data: UpdateBankDetailsInput) => {
    await onUpdateBankDetails(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && setEditingTaxTypeId(null)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bankadatok szerkesztése</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-sm text-muted-foreground">{taxType?.name}</p>
            <FormInput
              control={form.control}
              name="accountNumber"
              label="Számlaszám"
              placeholder="XXXXXXXX-XXXXXXXX"
              required
            />
            <FormInput
              control={form.control}
              name="accountName"
              label="Számlanév"
              placeholder="NAV beszedési számla"
              required
            />
            <FormInput
              control={form.control}
              name="bankName"
              label="Bank neve"
              placeholder="Magyar Államkincstár"
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingTaxTypeId(null)}
              >
                Mégse
              </Button>
              <Button type="submit" disabled={isLoading}>
                Mentés
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
