'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components';
import { useClientDetail } from '../use-client-detail';

const MONTH_OPTIONS = [
  { value: '1', label: 'Január' },
  { value: '2', label: 'Február' },
  { value: '3', label: 'Március' },
  { value: '4', label: 'Április' },
  { value: '5', label: 'Május' },
  { value: '6', label: 'Június' },
  { value: '7', label: 'Július' },
  { value: '8', label: 'Augusztus' },
  { value: '9', label: 'Szeptember' },
  { value: '10', label: 'Október' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = [currentYear - 1, currentYear, currentYear + 1].map((y) => ({
  value: String(y),
  label: String(y),
}));

export const CreateTaxRecordDialog = () => {
  const { isCreateOpen, setIsCreateOpen, isLoading, onCreateTaxRecord } = useClientDetail();
  const [year, setYear] = useState(String(currentYear));
  const [month, setMonth] = useState(String(new Date().getMonth() + 1));

  const handleSubmit = async () => {
    await onCreateTaxRecord(Number(year), Number(month));
  };

  return (
    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Új adóbevallás létrehozása</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Év</label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {YEAR_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Hónap</label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MONTH_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
            Mégse
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Létrehozás
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
