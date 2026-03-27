'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Icon } from '@/components';
import { TaxItemWithDetails } from '@/app/(admin)/tax-records/types/tax-records.types';
import { TaxStatus, UserTaxPaymentDetail } from '@/generated/prisma';
import { useEditMonth } from '../use-edit-month';
import { format } from 'date-fns';

const STATUS_CONFIG: Record<TaxStatus, { label: string; color: string }> = {
  NOT_PAID: { label: 'Nincs fizetve', color: 'bg-red-100 text-red-800 border-red-200' },
  PENDING: { label: 'Folyamatban', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  PAID: { label: 'Fizetve', color: 'bg-green-100 text-green-800 border-green-200' },
  DISMISSED: { label: 'Elvetett', color: 'bg-gray-100 text-gray-800 border-gray-200' },
};

type EditTaxItemFormProps = {
  item: TaxItemWithDetails;
  paymentDetail: UserTaxPaymentDetail | undefined;
};

export const EditTaxItemForm = ({ item, paymentDetail }: EditTaxItemFormProps) => {
  const { isLoading, onUpdateTaxItem, onUpdateTaxItemStatus } = useEditMonth();
  const [amount, setAmount] = useState(String(item.amount));
  const [dueDate, setDueDate] = useState(format(new Date(item.dueDate), 'yyyy-MM-dd'));
  const [notes, setNotes] = useState(item.notes || '');
  const [isEditing, setIsEditing] = useState(false);

  const bank = item.taxType.bankDetails;
  const statusConfig = STATUS_CONFIG[item.status];

  const handleSave = async () => {
    await onUpdateTaxItem({
      taxItemId: item.id,
      amount: Number(amount),
      dueDate: new Date(dueDate),
      notes: notes || undefined,
    });
    setIsEditing(false);
  };

  const handleStatusChange = async (status: TaxStatus) => {
    await onUpdateTaxItemStatus({
      taxItemId: item.id,
      status,
      paidDate: status === 'PAID' ? new Date() : null,
      previousStatus: item.status,
    });
  };

  const isDismissed = item.status === 'DISMISSED';

  return (
    <Card className={isDismissed ? 'opacity-60' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{item.taxType.name}</CardTitle>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isDismissed ? (
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground italic">Ez a tétel el lett vetve – nem szükséges fizetni.</p>
            <div className="flex gap-1 pt-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateTaxItemStatus({ taxItemId: item.id, status: 'NOT_PAID', previousStatus: 'DISMISSED' })}
                disabled={isLoading}
              >
                Visszaállítás
              </Button>
            </div>
          </div>
        ) : isEditing ? (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Összeg (Ft)</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Határidő</label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Megjegyzés</label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Opcionális megjegyzés"
                className="mt-1"
              />
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleSave} disabled={isLoading}>
                Mentés
              </Button>
              <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                Mégse
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Összeg:</span>
              <span className="font-semibold">{Number(amount).toLocaleString('hu-HU')} Ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Határidő:</span>
              <span>{format(new Date(dueDate), 'yyyy.MM.dd')}</span>
            </div>
            {notes && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Megjegyzés:</span>
                <span>{notes}</span>
              </div>
            )}
            {bank && (
              <div className="mt-3 rounded-md bg-muted p-3 space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Bankadatok</p>
                <p className="font-mono text-xs">{bank.accountNumber}</p>
                <p className="text-xs">{bank.accountName}</p>
                {paymentDetail && (
                  <p className="text-xs">
                    <span className="text-muted-foreground">Közlemény: </span>
                    {paymentDetail.paymentReference}
                  </p>
                )}
              </div>
            )}
            <div className="flex items-center justify-between pt-2">
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                <Icon icon="pencil" size="xs" />
                Szerkesztés
              </Button>
              <div className="flex gap-1">
                {item.status !== 'NOT_PAID' && (
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange('NOT_PAID')} disabled={isLoading}>
                    Nincs fizetve
                  </Button>
                )}
                {item.status !== 'PENDING' && (
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange('PENDING')} disabled={isLoading}>
                    Folyamatban
                  </Button>
                )}
                {item.status !== 'PAID' && (
                  <Button size="sm" variant="outline" onClick={() => handleStatusChange('PAID')} disabled={isLoading}>
                    Fizetve
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleStatusChange('DISMISSED')}
                  disabled={isLoading}
                  className="text-muted-foreground"
                >
                  Elvetés
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
