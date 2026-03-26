'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth/isAuthenticated';
import { requireAccountant } from '@/lib/auth/role-guard';
import { handleResponse } from '@/utils/handleResponse';
import { Role, TaxStatus } from '@/generated/prisma';
import { UpdateTaxItemInput, UpdateTaxItemStatusInput, CreateMonthlyRecordInput } from '../schemas/tax-records.schemas';
import { MonthDetailData, TaxRecordListItem } from '../types/tax-records.types';

export const getTaxRecords = async (userId?: string, year?: number) => {
  const { user } = await isAuthenticated();

  const targetUserId = user.role === Role.ACCOUNTANT && userId ? userId : user.id;

  if (user.role === Role.ACCOUNTANT && userId) {
    const client = await prisma.user.findFirst({
      where: { id: userId, accountantId: user.id },
    });
    if (!client) {
      return handleResponse<TaxRecordListItem[]>({ data: null, error: 'Az ügyfél nem található', code: 404 });
    }
  }

  try {
    const records = await prisma.taxRecord.findMany({
      where: {
        userId: targetUserId,
        ...(year ? { year } : {}),
      },
      include: {
        taxItems: {
          include: { taxType: true },
          orderBy: { taxType: { order: 'asc' } },
        },
      },
      orderBy: [{ year: 'desc' }, { month: 'desc' }],
    });

    return handleResponse({ data: records as TaxRecordListItem[] });
  } catch {
    return handleResponse<TaxRecordListItem[]>({ data: null, error: 'Nem sikerült betölteni az adóbevallásokat' });
  }
};

export const getTaxRecordDetail = async (userId: string, year: number, month: number) => {
  const { user } = await isAuthenticated();

  const targetUserId = user.role === Role.ACCOUNTANT ? userId : user.id;

  if (user.role === Role.ACCOUNTANT) {
    const client = await prisma.user.findFirst({
      where: { id: userId, accountantId: user.id },
    });
    if (!client) {
      return handleResponse<MonthDetailData>({ data: null, error: 'Az ügyfél nem található', code: 404 });
    }
  }

  try {
    const record = await prisma.taxRecord.findUnique({
      where: { userId_year_month: { userId: targetUserId, year, month } },
      include: {
        taxItems: {
          include: {
            taxType: { include: { bankDetails: true } },
          },
          orderBy: { taxType: { order: 'asc' } },
        },
      },
    });

    if (!record) {
      return handleResponse<MonthDetailData>({ data: null, error: 'Az adóbevallás nem található', code: 404 });
    }

    const userPaymentDetails = await prisma.userTaxPaymentDetail.findMany({
      where: { userId: targetUserId },
    });

    return handleResponse({ data: { record, userPaymentDetails } as MonthDetailData });
  } catch {
    return handleResponse<MonthDetailData>({ data: null, error: 'Nem sikerült betölteni az adóbevallást' });
  }
};

export const createMonthlyRecord = async (input: CreateMonthlyRecordInput) => {
  const { user } = await requireAccountant();

  const client = await prisma.user.findFirst({
    where: { id: input.userId, accountantId: user.id },
  });

  if (!client) {
    return handleResponse({ data: null, error: 'Az ügyfél nem található', code: 404 });
  }

  try {
    const existing = await prisma.taxRecord.findUnique({
      where: { userId_year_month: { userId: input.userId, year: input.year, month: input.month } },
    });

    if (existing) {
      return handleResponse({ data: null, error: 'Ez a havi bevallás már létezik' });
    }

    const taxTypes = await prisma.taxType.findMany({ orderBy: { order: 'asc' } });

    const defaultDueDate = new Date(input.year, input.month - 1 + 1, 12);

    const record = await prisma.taxRecord.create({
      data: {
        userId: input.userId,
        year: input.year,
        month: input.month,
        taxItems: {
          create: taxTypes.map((tt) => ({
            taxTypeId: tt.id,
            amount: 0,
            status: TaxStatus.NOT_PAID,
            dueDate: defaultDueDate,
          })),
        },
      },
      include: {
        taxItems: {
          include: { taxType: { include: { bankDetails: true } } },
          orderBy: { taxType: { order: 'asc' } },
        },
      },
    });

    return handleResponse({ data: record });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült létrehozni az adóbevallást' });
  }
};

export const updateTaxItem = async (input: UpdateTaxItemInput) => {
  await requireAccountant();

  try {
    const result = await prisma.taxItem.update({
      where: { id: input.taxItemId },
      data: {
        amount: input.amount,
        dueDate: input.dueDate,
        notes: input.notes,
      },
    });

    return handleResponse({ data: result });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült frissíteni az adótételt' });
  }
};

export const updateTaxItemStatus = async (input: UpdateTaxItemStatusInput) => {
  await isAuthenticated();

  try {
    const result = await prisma.taxItem.update({
      where: { id: input.taxItemId },
      data: {
        status: input.status as TaxStatus,
        paidDate: input.status === 'PAID' ? (input.paidDate ?? new Date()) : null,
      },
    });

    return handleResponse({ data: result });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült frissíteni az állapotot' });
  }
};
