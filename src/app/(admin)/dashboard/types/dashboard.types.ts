import { Role, TaxStatus } from '@/generated/prisma';

export type TaxItemSummary = {
  taxTypeCode: string;
  taxTypeName: string;
  amount: number;
  status: TaxStatus;
  dueDate: Date;
};

export type ClientSummary = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  hasCurrentMonthRecord: boolean;
  taxItems: TaxItemSummary[];
};

export type ClientDashboardData = {
  role: typeof Role.CLIENT;
  currentMonth: {
    year: number;
    month: number;
    taxItems: TaxItemSummary[];
    totalDue: number;
    totalPaid: number;
  } | null;
  recentMonths: {
    year: number;
    month: number;
    totalDue: number;
    paidCount: number;
    totalItems: number;
  }[];
};

export type AccountantDashboardData = {
  role: typeof Role.ACCOUNTANT;
  clientCount: number;
  currentMonth: { year: number; month: number };
  clients: ClientSummary[];
  statusOverview: {
    totalItems: number;
    paidCount: number;
    pendingCount: number;
    unpaidCount: number;
    dismissedCount: number;
  };
};

export type DashboardData = ClientDashboardData | AccountantDashboardData;
