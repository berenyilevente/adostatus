import { TaxRecord, TaxItem, TaxType, BankDetails, UserTaxPaymentDetail } from '@/generated/prisma';

export type TaxItemWithDetails = TaxItem & {
  taxType: TaxType & {
    bankDetails: BankDetails | null;
  };
};

export type TaxRecordWithItems = TaxRecord & {
  taxItems: TaxItemWithDetails[];
};

export type MonthDetailData = {
  record: TaxRecordWithItems;
  userPaymentDetails: UserTaxPaymentDetail[];
};

export type TaxRecordListItem = TaxRecord & {
  taxItems: (TaxItem & { taxType: TaxType })[];
};
