export type ResponseStatus = 'success' | 'error';

export type Response<T> =
  | {
      status: ResponseStatus;
      data: T;
      code: number;
      error: undefined;
    }
  | {
      status: ResponseStatus;
      data: undefined | null;
      code: number;
      error: string;
    };

export type RenderToast = Record<ResponseStatus, (message?: string) => void>;
