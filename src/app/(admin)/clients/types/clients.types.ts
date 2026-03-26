import { User, TaxRecord, TaxItem, TaxType } from '@/generated/prisma';

export type ClientListItem = Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'isActive'> & {
  currentMonthRecord: (TaxRecord & {
    taxItems: (TaxItem & { taxType: TaxType })[];
  }) | null;
};

export type ClientDetail = User & {
  taxRecords: (TaxRecord & {
    taxItems: (TaxItem & { taxType: TaxType })[];
  })[];
};
