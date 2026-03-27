'use client';

import { Card, CardContent, CardHeader, CardTitle, Button, Icon } from '@/components';
import { TaxItemWithDetails } from '../../../types/tax-records.types';
import { TaxStatus, UserTaxPaymentDetail } from '@/generated/prisma';
import { useMonthDetail } from '../use-month-detail';
import { StatusBadge } from '../../../components/StatusBadge';
import { format } from 'date-fns';

type TaxItemRowProps = {
  item: TaxItemWithDetails;
  paymentDetail: UserTaxPaymentDetail | undefined;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const TaxItemRow = ({ item, paymentDetail }: TaxItemRowProps) => {
  const { isLoading, onUpdateStatus } = useMonthDetail();
  const bank = item.taxType.bankDetails;

  const handleStatusChange = async (status: TaxStatus) => {
    await onUpdateStatus({
      taxItemId: item.id,
      status,
      paidDate: status === 'PAID' ? new Date() : null,
    });
  };

  const isDismissed = item.status === 'DISMISSED';

  return (
    <Card className={isDismissed ? 'opacity-60' : ''}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{item.taxType.name}</CardTitle>
          <StatusBadge status={item.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {isDismissed ? (
          <p className="text-sm text-muted-foreground italic">
            A könyvelő elvetette ezt a tételt – nem szükséges fizetni.
          </p>
        ) : (
          <>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Összeg:</span>
                <span className="font-semibold text-lg">{item.amount.toLocaleString('hu-HU')} Ft</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Határidő:</span>
                <span>{format(new Date(item.dueDate), 'yyyy.MM.dd')}</span>
              </div>
              {item.paidDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fizetés dátuma:</span>
                  <span>{format(new Date(item.paidDate), 'yyyy.MM.dd')}</span>
                </div>
              )}
              {item.notes && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Megjegyzés:</span>
                  <span>{item.notes}</span>
                </div>
              )}
            </div>

            {bank && (
              <div className="rounded-md bg-muted p-3 space-y-2">
                <p className="text-xs font-medium text-muted-foreground">Utalási adatok</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">{bank.accountNumber}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(bank.accountNumber)}
                    className="h-6 px-2"
                  >
                    <Icon icon="copy" size="xs" />
                  </Button>
                </div>
                <p className="text-xs">{bank.accountName}</p>
                {bank.bankName && <p className="text-xs text-muted-foreground">{bank.bankName}</p>}
                {paymentDetail && (
                  <div className="flex items-center justify-between pt-1 border-t">
                    <div>
                      <span className="text-xs text-muted-foreground">Közlemény: </span>
                      <span className="text-xs font-medium">{paymentDetail.paymentReference}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(paymentDetail.paymentReference)}
                      className="h-6 px-2"
                    >
                      <Icon icon="copy" size="xs" />
                    </Button>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-2 pt-1">
              {item.status !== 'PENDING' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange('PENDING')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Folyamatban
                </Button>
              )}
              {item.status !== 'PAID' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange('PAID')}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Fizetve
                </Button>
              )}
              {item.status === 'PAID' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleStatusChange('NOT_PAID')}
                  disabled={isLoading}
                  className="flex-1 text-red-600"
                >
                  Visszavonás
                </Button>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
