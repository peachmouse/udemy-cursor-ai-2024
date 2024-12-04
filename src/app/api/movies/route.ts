import { handleApiError } from '@/lib/api-error-handler';
import { getMovies } from '@/lib/movies';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');

    const movies = await getMovies(page);
    return NextResponse.json(movies);
  } catch (error) {
    return handleApiError(error);
  }
}
