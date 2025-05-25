import { PrismaClient } from '@prisma/client';
import movies from '../seed-data/movies.json';
import actors from '../seed-data/actors.json';
import directors from '../seed-data/directors.json';
import genres from '../seed-data/genres.json';

const prisma = new PrismaClient();

async function main() {
  // Seed genres
  console.log('Seeding genres...');
  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { id: genre.id },
      update: { name: genre.name },
      create: { id: genre.id, name: genre.name },
    });
  }

  // Seed actors
  console.log('Seeding actors...');
  for (const actor of actors) {
    await prisma.actor.upsert({
      where: { id: actor.id },
      update: { name: actor.name },
      create: { id: actor.id, name: actor.name },
    });
  }

  // Seed directors
  console.log('Seeding directors...');
  for (const director of directors) {
    await prisma.director.upsert({
      where: { id: director.id },
      update: { name: director.name },
      create: { id: director.id, name: director.name },
    });
  }

  // Seed movies
  console.log('Seeding movies...');
  for (const movie of movies) {
    await prisma.movie.upsert({
      where: { id: movie.id },
      update: {
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.releaseDate),
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        popularity: movie.popularity,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
        genres: {
          connect: movie.genreIds.map(id => ({ id })),
        },
        actors: {
          connect: movie.actorIds.map(id => ({ id })),
        },
        directors: {
          connect: movie.directorIds.map(id => ({ id })),
        },
      },
      create: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        releaseDate: new Date(movie.releaseDate),
        posterPath: movie.posterPath,
        backdropPath: movie.backdropPath,
        popularity: movie.popularity,
        voteAverage: movie.voteAverage,
        voteCount: movie.voteCount,
        genres: {
          connect: movie.genreIds.map(id => ({ id })),
        },
        actors: {
          connect: movie.actorIds.map(id => ({ id })),
        },
        directors: {
          connect: movie.directorIds.map(id => ({ id })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 