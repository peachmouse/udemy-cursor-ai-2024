import { notFound } from 'next/navigation';
import { getMovieById } from '@/services/movies';
import { MovieEditForm } from '@/components/MovieEditForm';
import { prisma } from '@/lib/prisma';

interface MovieEditPageProps {
  params: {
    id: string;
  };
}

export default async function MovieEditPage({ params }: MovieEditPageProps) {
  const movieId = parseInt(params.id);
  if (isNaN(movieId)) notFound();

  const [movie, genres, actors, directors] = await Promise.all([
    getMovieById(movieId),
    prisma.genre.findMany(),
    prisma.actor.findMany(),
    prisma.director.findMany(),
  ]);

  if (!movie) notFound();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">
          Edit Movie: {movie.title}
        </h1>
        <MovieEditForm
          movie={movie}
          genres={genres}
          actors={actors}
          directors={directors}
        />
      </div>
    </div>
  );
}
