export type ResponseStatus = "success" | "error";

export type Response<T> =
  | {
      status: ResponseStatus;
      data: T;
      code: number;
      errors: undefined;
    }
  | {
      status: ResponseStatus;
      data: undefined;
      code: number;
      errors: string;
    };

export type RenderToast = Record<ResponseStatus, () => void>;
