import { prisma } from '@/lib/prisma';

export async function getPaginatedSciFiMovies(
  page: number,
  moviesPerPage: number
) {
  return await prisma.movie.findMany({
    where: {
      genres: {
        some: {
          genreId: 878, // Science Fiction genre ID
        },
      },
    },
    skip: (page - 1) * moviesPerPage,
    take: moviesPerPage,
    orderBy: {
      releaseDate: 'desc',
    },
  });
}

export async function getSciFiMoviesCount() {
  return await prisma.movie.count({
    where: {
      genres: {
        some: {
          genreId: 878,
        },
      },
    },
  });
}
