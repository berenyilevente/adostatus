import {
  BusinessHours as BusinessHoursTable,
  BreakTime as BreakTimeTable,
} from '@/generated/prisma';
import { z } from 'zod';

type BusinessHours = Omit<BusinessHoursTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BusinessHoursSchema: z.ZodType<BusinessHours> = z.object({
  businessId: z.string(),
  dayOfWeek: z.array(z.string()),
  openTime: z.string(),
  closeTime: z.string(),
});

export type BusinessHoursForm = z.infer<typeof BusinessHoursSchema>;

type BreakTimes = Omit<BreakTimeTable, 'id' | 'createdAt' | 'updatedAt'>;

export const BreakTimesSchema: z.ZodType<BreakTimes> = z.object({
  businessId: z.string(),
  dayOfWeek: z.array(z.string()),
  startTime: z.string(),
  endTime: z.string(),
});

export type BreakTimesForm = z.infer<typeof BreakTimesSchema>;
