import { revalidatePath } from 'next/cache';
import { Response } from '@/types/action.types';

type ResponseProps<T> = {
  data: T | null;
  error?: string;
  code?: number;
  path?: string;
};

export const handleResponse = <T>({
  data,
  error = 'Something went wrong',
  code = 400,
  path = '/business',
}: ResponseProps<T>): Response<T> => {
  if (!data) {
    return {
      status: 'error',
      data: undefined,
      code,
      error,
    };
  }

  revalidatePath(path);

  return {
    status: 'success',
    data,
    code: 200,
    error: undefined,
  };
};
