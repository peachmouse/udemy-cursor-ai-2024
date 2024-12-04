import { PrismaClient } from '@prisma/client';
import movies from '../seed-data/movies.json';
import actors from '../seed-data/actors.json';
import directors from '../seed-data/directors.json';
import genres from '../seed-data/genres.json';

const prisma = new PrismaClient();

async function main() {
  // Create Genres
  console.log('Seeding genres...');
  for (const genre of genres) {
    await prisma.genre.create({
      data: {
        id: genre.id,
        name: genre.name,
      },
    });
  }

  // Create Actors
  console.log('Seeding actors...');
  for (const actor of actors) {
    await prisma.actor.create({
      data: {
        id: actor.id,
        name: actor.name,
      },
    });
  }

  // Create Directors
  console.log('Seeding directors...');
  for (const director of directors) {
    await prisma.director.create({
      data: {
        id: director.id,
        name: director.name,
      },
    });
  }

  // Create Movies with relationships
  console.log('Seeding movies...');
  for (const movie of movies) {
    await prisma.movie.create({
      data: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        releaseDate: new Date(movie.releaseDate),
        popularity: movie.popularity,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
        actors: {
          create: movie.actorIds.map((actorId) => ({
            actor: {
              connect: { id: actorId },
            },
          })),
        },
        directors: {
          create: movie.directorIds.map((directorId) => ({
            director: {
              connect: { id: directorId },
            },
          })),
        },
        genres: {
          create: movie.genreIds.map((genreId) => ({
            genre: {
              connect: { id: genreId },
            },
          })),
        },
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
