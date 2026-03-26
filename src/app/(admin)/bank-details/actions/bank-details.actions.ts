'use server';

import prisma from '@/lib/prisma/client';
import { requireAccountant } from '@/lib/auth/role-guard';
import { handleResponse } from '@/utils/handleResponse';
import {
  UpdateBankDetailsInput,
  UpdateUserPaymentDetailInput,
} from '../schemas/bank-details.schemas';
import { BankDetailsPageData } from '../types/bank-details.types';

export const getBankDetailsPageData = async () => {
  const { user } = await requireAccountant();

  try {
    const taxTypes = await prisma.taxType.findMany({
      include: { bankDetails: true },
      orderBy: { order: 'asc' },
    });

    const userPaymentDetails = await prisma.userTaxPaymentDetail.findMany({
      where: {
        user: { accountantId: user.id },
      },
      include: {
        user: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });

    const data: BankDetailsPageData = { taxTypes, userPaymentDetails };
    return handleResponse({ data });
  } catch {
    return handleResponse<BankDetailsPageData>({ data: null, error: 'Nem sikerült betölteni az adatokat' });
  }
};

export const updateBankDetails = async (input: UpdateBankDetailsInput) => {
  await requireAccountant();

  try {
    const result = await prisma.bankDetails.upsert({
      where: { taxTypeId: input.taxTypeId },
      update: {
        accountNumber: input.accountNumber,
        accountName: input.accountName,
        bankName: input.bankName,
      },
      create: {
        taxTypeId: input.taxTypeId,
        accountNumber: input.accountNumber,
        accountName: input.accountName,
        bankName: input.bankName,
      },
    });

    return handleResponse({ data: result });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült menteni a bankadatokat' });
  }
};

export const updateUserPaymentDetail = async (input: UpdateUserPaymentDetailInput) => {
  const { user: accountant } = await requireAccountant();

  try {
    const client = await prisma.user.findFirst({
      where: { id: input.userId, accountantId: accountant.id },
    });

    if (!client) {
      return handleResponse({ data: null, error: 'Az ügyfél nem található', code: 404 });
    }

    const result = await prisma.userTaxPaymentDetail.upsert({
      where: {
        userId_taxTypeId: {
          userId: input.userId,
          taxTypeId: input.taxTypeId,
        },
      },
      update: { paymentReference: input.paymentReference },
      create: {
        userId: input.userId,
        taxTypeId: input.taxTypeId,
        paymentReference: input.paymentReference,
      },
    });

    return handleResponse({ data: result });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült menteni a közleményt' });
  }
};
