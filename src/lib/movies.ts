import { AppError, withErrorHandling } from './error-handling';
import { prisma } from './prisma';

export async function getMovies(page: number) {
  return withErrorHandling(async () => {
    if (page < 1)
      throw new AppError('Invalid page number', 'INVALID_PAGE', 400);

    return await prisma.movie.findMany({
      take: 20,
      skip: (page - 1) * 20,
      include: {
        genres: true,
      },
    });
  }, 'getMovies');
}
