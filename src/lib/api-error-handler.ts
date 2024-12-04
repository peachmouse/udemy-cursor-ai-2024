import { NextResponse } from 'next/server';
import { AppError } from './error-handling';

export function handleApiError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode }
    );
  }

  return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
}
