'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Icon,
} from '@/components';
import { useBankDetails } from '../use-bank-details';

export const UserPaymentRefTable = () => {
  const { taxTypes, userPaymentDetails, isLoading, onUpdateUserPaymentDetail } = useBankDetails();
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const grouped = userPaymentDetails.reduce(
    (acc, detail) => {
      if (!acc[detail.userId]) {
        acc[detail.userId] = {
          user: detail.user,
          details: {},
        };
      }
      acc[detail.userId].details[detail.taxTypeId] = detail.paymentReference;
      return acc;
    },
    {} as Record<string, { user: typeof userPaymentDetails[0]['user']; details: Record<string, string> }>,
  );

  const users = Object.values(grouped);

  const startEdit = (userId: string, taxTypeId: string, currentValue: string) => {
    setEditingKey(`${userId}-${taxTypeId}`);
    setEditValue(currentValue);
  };

  const saveEdit = async (userId: string, taxTypeId: string) => {
    if (!editValue.trim()) return;
    await onUpdateUserPaymentDetail({ userId, taxTypeId, paymentReference: editValue.trim() });
    setEditingKey(null);
    setEditValue('');
  };

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Közlemények ügyfelenként</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nincsenek még ügyfelek. Adjon hozzá ügyfeleket az Ügyfelek menüpontban.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Közlemények ügyfelenként</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 text-left font-medium">Ügyfél</th>
                {taxTypes.map((tt) => (
                  <th key={tt.id} className="py-2 text-left font-medium">
                    {tt.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ user, details }) => (
                <tr key={user.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">
                    {user.lastName} {user.firstName}
                    <span className="block text-xs text-muted-foreground">{user.email}</span>
                  </td>
                  {taxTypes.map((tt) => {
                    const key = `${user.id}-${tt.id}`;
                    const value = details[tt.id] ?? '';
                    const isEditing = editingKey === key;

                    return (
                      <td key={tt.id} className="py-2">
                        {isEditing ? (
                          <div className="flex items-center gap-1">
                            <Input
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="h-8 text-xs"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveEdit(user.id, tt.id);
                                if (e.key === 'Escape') setEditingKey(null);
                              }}
                              autoFocus
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => saveEdit(user.id, tt.id)}
                              disabled={isLoading}
                            >
                              <Icon icon="check" size="xs" />
                            </Button>
                          </div>
                        ) : (
                          <button
                            className="flex items-center gap-1 text-xs hover:underline"
                            onClick={() => startEdit(user.id, tt.id, value)}
                          >
                            {value || <span className="text-muted-foreground italic">nincs</span>}
                            <Icon icon="pencil" size="xs" className="text-muted-foreground" />
                          </button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
