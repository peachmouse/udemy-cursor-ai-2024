import { getMovieById } from '@/services/movies';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface MoviePageProps {
  params: {
    id: string;
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const movieId = parseInt(params.id);

  // Handle invalid movie IDs
  if (isNaN(movieId)) {
    notFound();
  }

  try {
    const movie = await getMovieById(movieId);
    const releaseDate = new Date(movie.releaseDate);

    return (
      <div className="min-h-screen bg-gray-900">
        {/* Backdrop Image */}
        <div className="relative h-[50vh] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-8 -mt-32 relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                alt={movie.title}
                width={500}
                height={750}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>

            {/* Movie Details */}
            <div className="w-full md:w-2/3 lg:w-3/4 text-white">
              <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  {movie.voteAverage.toFixed(1)}/10
                </span>
                <span>•</span>
                <span>{format(releaseDate, 'MMMM d, yyyy')}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-gray-300">{movie.overview}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Genres</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map((genre) => (
                      <span
                        key={genre.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Directors</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.directors.map((director) => (
                      <span key={director.id} className="text-gray-300">
                        {director.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Cast</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.actors.map((actor) => (
                      <span
                        key={actor.id}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {actor.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Link href="/sci-fi-movies">
                  <Button
                    variant="secondary"
                    className="bg-gray-800 text-white hover:bg-gray-700"
                  >
                    ← Back to Movies
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
}
