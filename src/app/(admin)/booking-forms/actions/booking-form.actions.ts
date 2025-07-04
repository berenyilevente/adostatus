'use server';

import prisma from '@/lib/prisma/client';
import { isAuthenticated } from '@/lib/auth';
import { Prisma } from '@/generated/prisma/index';

export const getBookingForms = async () => {
  await isAuthenticated();
};

export const getForm = async (id: string) => {
  await isAuthenticated();
};

export const createForm = async (
  formData: Prisma.FormCreateInput,
  fields: Prisma.FormFieldCreateInput[]
): Promise<any> => {
  await isAuthenticated();
};
