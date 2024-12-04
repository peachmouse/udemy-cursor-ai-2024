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

export async function getMovieById(id: number) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      actors: {
        include: {
          actor: true,
        },
      },
      directors: {
        include: {
          director: true,
        },
      },
    },
  });

  if (!movie) {
    throw new Error(`Movie with ID ${id} not found`);
  }

  // Transform the data to a more convenient structure
  return {
    ...movie,
    genres: movie.genres.map((g) => g.genre),
    actors: movie.actors.map((a) => a.actor),
    directors: movie.directors.map((d) => d.director),
  };
}
