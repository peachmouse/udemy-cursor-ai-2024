import { ActorsTable } from '@/components/actors/actors-table';
import { prisma } from '@/lib/prisma';

export default async function ActorsPage() {
  const actors = await prisma.actor.findMany({
    include: {
      movies: {
        include: {
          movie: true,
        },
      },
    },
  });

  // Transform the data to match the expected format
  const transformedActors = actors.map((actor) => ({
    ...actor,
    movies: actor.movies.map((am) => am.movie),
  }));

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Actors</h1>
      <ActorsTable actors={transformedActors} />
    </div>
  );
}
