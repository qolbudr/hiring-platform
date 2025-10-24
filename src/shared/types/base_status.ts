export class BaseStatus {
  readonly isInitial: boolean;
  readonly isEmpty: boolean;
  readonly isLoading: boolean;
  readonly isError: boolean;
  readonly isSuccess: boolean;
  readonly message?: string;

  constructor({
    isInitial = true,
    isEmpty = false,
    isLoading = false,
    isError = false,
    isSuccess = false,
    message,
  }: {
    isInitial?: boolean;
    isEmpty?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    isSuccess?: boolean;
    message?: string;
  } = {}) {
    this.isInitial = isInitial;
    this.isEmpty = isEmpty;
    this.isLoading = isLoading;
    this.isError = isError;
    this.isSuccess = isSuccess;
    this.message = message;
  }

  static initial(): BaseStatus {
    return new BaseStatus({ isInitial: true });
  }

  static empty(message?: string): BaseStatus {
    return new BaseStatus({ isEmpty: true, message });
  }

  static loading(message?: string): BaseStatus {
    return new BaseStatus({ isLoading: true, message });
  }

  static error(message?: string): BaseStatus {
    return new BaseStatus({ isError: true, message });
  }

  static success(message?: string): BaseStatus {
    return new BaseStatus({ isSuccess: true, message });
  }
}
