import { toast } from 'sonner';

export class AppError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export async function handleError(error: unknown) {
  const errorMessage =
    error instanceof Error ? error.message : 'An unexpected error occurred';

  console.error('Error:', error);
  toast.error(errorMessage);

  return {
    error: errorMessage,
    success: false,
  };
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorContext: string
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    throw new AppError(
      `Operation failed in ${errorContext}: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
      'OPERATION_FAILED'
    );
  }
}
