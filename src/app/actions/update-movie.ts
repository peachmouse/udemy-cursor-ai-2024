'use server';

import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const MovieUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  overview: z.string().optional(),
  posterPath: z.string().optional(),
  backdropPath: z.string().optional(),
  releaseDate: z.string().optional(),
  popularity: z.number().optional(),
  voteAverage: z.number().optional(),
  voteCount: z.number().optional(),
  genreIds: z.array(z.number()).optional(),
  actorIds: z.array(z.number()).optional(),
  directorIds: z.array(z.number()).optional(),
});

export async function updateMovie(id: number, formData: FormData) {
  try {
    const rawData = {
      title: formData.get('title'),
      overview: formData.get('overview'),
      posterPath: formData.get('posterPath'),
      backdropPath: formData.get('backdropPath'),
      releaseDate: formData.get('releaseDate'),
      popularity: parseFloat(formData.get('popularity') as string),
      voteAverage: parseFloat(formData.get('voteAverage') as string),
      voteCount: parseInt(formData.get('voteCount') as string),
      genreIds: formData.getAll('genreIds').map(Number),
      actorIds: formData.getAll('actorIds').map(Number),
      directorIds: formData.getAll('directorIds').map(Number),
    };

    console.log('Raw update data:', rawData);

    const validated = MovieUpdateSchema.parse(rawData);

    await prisma.movie.update({
      where: { id },
      data: {
        title: validated.title,
        overview: validated.overview,
        posterPath: validated.posterPath,
        backdropPath: validated.backdropPath,
        releaseDate: validated.releaseDate
          ? new Date(validated.releaseDate)
          : undefined,
        popularity: validated.popularity,
        voteAverage: validated.voteAverage,
        voteCount: validated.voteCount,
        genres: {
          deleteMany: {},
          create: validated.genreIds?.map((genreId) => ({
            genre: { connect: { id: genreId } },
          })),
        },
        actors: {
          deleteMany: {},
          create: validated.actorIds?.map((actorId) => ({
            actor: { connect: { id: actorId } },
          })),
        },
        directors: {
          deleteMany: {},
          create: validated.directorIds?.map((directorId) => ({
            director: { connect: { id: directorId } },
          })),
        },
      },
    });

    revalidatePath(`/movies/${id}`);
    revalidatePath(`/movies/${id}/edit`);

    return { success: true };
  } catch (error) {
    console.error('Error updating movie:', error);
    if (error instanceof z.ZodError) {
      return { success: false, error: error.errors[0].message };
    }
    return { success: false, error: 'Failed to update movie' };
  }
}
