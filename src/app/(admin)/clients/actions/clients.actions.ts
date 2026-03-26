'use server';

import prisma from '@/lib/prisma/client';
import { requireAccountant } from '@/lib/auth/role-guard';
import { handleResponse } from '@/utils/handleResponse';
import { Role } from '@/generated/prisma';
import { InviteClientInput } from '../schemas/clients.schemas';
import { ClientDetail, ClientListItem } from '../types/clients.types';

export const getClients = async () => {
  const { user } = await requireAccountant();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;

  try {
    const clients = await prisma.user.findMany({
      where: { accountantId: user.id, role: Role.CLIENT },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        isActive: true,
        taxRecords: {
          where: { year, month },
          include: { taxItems: { include: { taxType: true } } },
          take: 1,
        },
      },
      orderBy: { lastName: 'asc' },
    });

    const data: ClientListItem[] = clients.map((c) => ({
      ...c,
      currentMonthRecord: c.taxRecords[0] ?? null,
    }));

    return handleResponse({ data });
  } catch {
    return handleResponse<ClientListItem[]>({
      data: null,
      error: 'Nem sikerült betölteni az ügyfeleket',
    });
  }
};

export const getClientDetail = async (clientId: string) => {
  const { user } = await requireAccountant();

  try {
    const client = await prisma.user.findFirst({
      where: { id: clientId, accountantId: user.id, role: Role.CLIENT },
      include: {
        taxRecords: {
          include: { taxItems: { include: { taxType: true } } },
          orderBy: [{ year: 'desc' }, { month: 'asc' }],
        },
      },
    });

    if (!client) {
      return handleResponse<ClientDetail>({
        data: null,
        error: 'Az ügyfél nem található',
        code: 404,
      });
    }

    return handleResponse({ data: client as ClientDetail });
  } catch {
    return handleResponse<ClientDetail>({
      data: null,
      error: 'Nem sikerült betölteni az ügyfél adatait',
    });
  }
};

export const inviteClient = async (input: InviteClientInput) => {
  const { user: accountant } = await requireAccountant();

  try {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });

    if (existing) {
      if (existing.accountantId) {
        return handleResponse({
          data: null,
          error: 'Ez az e-mail cím már egy másik könyvelőhöz tartozik',
        });
      }

      const updated = await prisma.user.update({
        where: { id: existing.id },
        data: {
          accountantId: accountant.id,
          role: Role.CLIENT,
          firstName: input.firstName,
          lastName: input.lastName,
          name: `${input.lastName} ${input.firstName}`,
        },
      });

      return handleResponse({ data: updated });
    }

    const newClient = await prisma.user.create({
      data: {
        email: input.email,
        role: Role.CLIENT,
        firstName: input.firstName,
        lastName: input.lastName,
        name: `${input.lastName} ${input.firstName}`,
        accountantId: accountant.id,
        isActive: true,
      },
    });

    return handleResponse({ data: newClient });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült meghívni az ügyfelet' });
  }
};

export const removeClient = async (clientId: string) => {
  const { user: accountant } = await requireAccountant();

  try {
    const client = await prisma.user.findFirst({
      where: { id: clientId, accountantId: accountant.id },
    });

    if (!client) {
      return handleResponse({ data: null, error: 'Az ügyfél nem található', code: 404 });
    }

    await prisma.user.update({
      where: { id: clientId },
      data: { accountantId: null },
    });

    return handleResponse({ data: { success: true } });
  } catch {
    return handleResponse({ data: null, error: 'Nem sikerült eltávolítani az ügyfelet' });
  }
};
