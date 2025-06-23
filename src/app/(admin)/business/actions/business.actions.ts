// 'use server';

// import { Response } from '@/types/action.types';
// import { revalidatePath } from 'next/cache';

// import prisma from '@/lib/prisma/client';
// import { useIsAuthenticated } from '@/hooks/use-is-authenticated';
// import { Business } from '@/generated/prisma';

// export const createBusiness = async (
//   business: any
// ): Promise<Response<Business>> => {
//   await useIsAuthenticated();

//   const businessResult = await prisma.business.create({
//     data: business,
//   });

//   if (!businessResult) {
//     return {
//       status: 'error',
//       data: undefined,
//       code: 400,
//       errors: 'Business creation failed',
//     };
//   }

//   revalidatePath('/business');
//   return {
//     status: 'success',
//     data: business,
//     code: 200,
//     errors: undefined,
//   };
// };
