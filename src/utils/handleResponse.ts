import { Response } from '@/types/action.types';

type ResponseProps<T> = {
  data: T | null;
  error?: string;
  code?: number;
};

export const handleResponse = <T>({
  data,
  error = 'Something went wrong',
  code = 400,
}: ResponseProps<T>): Response<T> => {
  if (!data) {
    return {
      status: 'error',
      data: undefined,
      code,
      error,
    };
  }

  return {
    status: 'success',
    data,
    code: 200,
    error: undefined,
  };
};
