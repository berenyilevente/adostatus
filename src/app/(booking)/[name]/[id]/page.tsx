import { FormElementInstance } from '@/app/(admin)/booking-forms/[id]/components/FormElements';
import prisma from '@/lib/prisma/client';
import { PublicBookingForm } from './PublicBookingForm';

export default async function Page({
  params,
}: {
  params: { name: string; id: string };
}) {
  const { id } = params;

  const form = await prisma.vwFormsPublic.findUnique({
    where: {
      id,
    },
  });

  const formFields: FormElementInstance[] =
    form?.content as FormElementInstance[];

  return (
    <div>
      <PublicBookingForm formFields={formFields} />
    </div>
  );
}
