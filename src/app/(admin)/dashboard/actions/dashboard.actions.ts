'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth/isAuthenticated';
import { handleResponse } from '@/utils/handleResponse';
import { Role } from '@/generated/prisma';
import { DashboardData, ClientDashboardData, AccountantDashboardData } from '../types/dashboard.types';

export const getDashboardData = async () => {
  const { user } = await isAuthenticated();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  try {
    if (user.role === Role.CLIENT) {
      return handleResponse({ data: await getClientDashboard(user.id, year, month) });
    }

    return handleResponse({ data: await getAccountantDashboard(user.id, year, month) });
  } catch {
    return handleResponse<DashboardData>({ data: null, error: 'Nem sikerült betölteni a dashboard adatokat' });
  }
};

async function getClientDashboard(userId: string, year: number, month: number): Promise<ClientDashboardData> {
  const currentRecord = await prisma.taxRecord.findUnique({
    where: { userId_year_month: { userId, year, month } },
    include: {
      taxItems: {
        include: { taxType: true },
        orderBy: { taxType: { order: 'asc' } },
      },
    },
  });

  const recentRecords = await prisma.taxRecord.findMany({
    where: { userId },
    include: { taxItems: true },
    orderBy: [{ year: 'desc' }, { month: 'desc' }],
    take: 6,
  });

  return {
    role: Role.CLIENT,
    currentMonth: currentRecord
      ? {
          year: currentRecord.year,
          month: currentRecord.month,
          taxItems: currentRecord.taxItems.map((item) => ({
            taxTypeCode: item.taxType.code,
            taxTypeName: item.taxType.name,
            amount: item.amount,
            status: item.status,
            dueDate: item.dueDate,
          })),
          totalDue: currentRecord.taxItems.reduce((sum, i) => sum + i.amount, 0),
          totalPaid: currentRecord.taxItems
            .filter((i) => i.status === 'PAID')
            .reduce((sum, i) => sum + i.amount, 0),
        }
      : null,
    recentMonths: recentRecords.map((r) => ({
      year: r.year,
      month: r.month,
      totalDue: r.taxItems.reduce((sum, i) => sum + i.amount, 0),
      paidCount: r.taxItems.filter((i) => i.status === 'PAID').length,
      totalItems: r.taxItems.length,
    })),
  };
}

async function getAccountantDashboard(accountantId: string, year: number, month: number): Promise<AccountantDashboardData> {
  const clients = await prisma.user.findMany({
    where: { accountantId, role: Role.CLIENT },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      taxRecords: {
        where: { year, month },
        include: {
          taxItems: {
            include: { taxType: true },
            orderBy: { taxType: { order: 'asc' } },
          },
        },
        take: 1,
      },
    },
    orderBy: { lastName: 'asc' },
  });

  const clientSummaries = clients.map((c) => {
    const record = c.taxRecords[0];
    return {
      id: c.id,
      firstName: c.firstName,
      lastName: c.lastName,
      email: c.email,
      hasCurrentMonthRecord: !!record,
      taxItems: record
        ? record.taxItems.map((item) => ({
            taxTypeCode: item.taxType.code,
            taxTypeName: item.taxType.name,
            amount: item.amount,
            status: item.status,
            dueDate: item.dueDate,
          }))
        : [],
    };
  });

  const allItems = clientSummaries.flatMap((c) => c.taxItems);

  return {
    role: Role.ACCOUNTANT,
    clientCount: clients.length,
    currentMonth: { year, month },
    clients: clientSummaries,
    statusOverview: {
      totalItems: allItems.length,
      paidCount: allItems.filter((i) => i.status === 'PAID').length,
      pendingCount: allItems.filter((i) => i.status === 'PENDING').length,
      unpaidCount: allItems.filter((i) => i.status === 'NOT_PAID').length,
    },
  };
}
