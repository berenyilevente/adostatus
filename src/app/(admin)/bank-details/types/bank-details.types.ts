import { BankDetails, TaxType, UserTaxPaymentDetail, User } from '@/generated/prisma';

export type TaxTypeWithBankDetails = TaxType & {
  bankDetails: BankDetails | null;
};

export type UserPaymentDetail = UserTaxPaymentDetail & {
  user: Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>;
};

export type BankDetailsPageData = {
  taxTypes: TaxTypeWithBankDetails[];
  userPaymentDetails: UserPaymentDetail[];
};
