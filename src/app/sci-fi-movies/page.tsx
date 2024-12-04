import { MovieCard } from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';

interface SciFiMoviesPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function SciFiMoviesPage({
  searchParams,
}: SciFiMoviesPageProps) {
  const currentPage = Number(searchParams.page) || 1;
  const moviesPerPage = 12;

  // Get sci-fi movies (genre ID 878) with pagination
  const movies = await prisma.movie.findMany({
    where: {
      genres: {
        some: {
          genreId: 878, // Science Fiction genre ID
        },
      },
    },
    skip: (currentPage - 1) * moviesPerPage,
    take: moviesPerPage,
    orderBy: {
      releaseDate: 'desc',
    },
  });

  // Get total count for pagination
  const totalMovies = await prisma.movie.count({
    where: {
      genres: {
        some: {
          genreId: 878,
        },
      },
    },
  });

  const totalPages = Math.ceil(totalMovies / moviesPerPage);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">
          Science Fiction Movies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {currentPage > 1 && (
            <Link href={`/sci-fi-movies?page=${currentPage - 1}`}>
              <Button variant="secondary">Previous</Button>
            </Link>
          )}

          <span className="flex items-center px-4 py-2 bg-gray-800 text-white rounded">
            Page {currentPage} of {totalPages}
          </span>

          {currentPage < totalPages && (
            <Link href={`/sci-fi-movies?page=${currentPage + 1}`}>
              <Button variant="secondary">Next</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
