export type ResponseStatus = 'success' | 'error';

export type Response<T> =
  | {
      status: ResponseStatus;
      data: T;
      code: number;
      error: null;
    }
  | {
      status: ResponseStatus;
      data: null;
      code: number;
      error: string;
    };

export type RenderToast = Record<ResponseStatus, (message?: string) => void>;
