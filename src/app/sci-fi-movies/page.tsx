import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { StarIcon, CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'

interface PageProps {
  searchParams: { page?: string }
}

export default async function SciFiMoviesPage({ searchParams }: PageProps) {
  const currentPage = Number(searchParams.page) || 1
  const moviesPerPage = 12
  const skip = (currentPage - 1) * moviesPerPage

  // Get total count for pagination
  const totalMovies = await prisma.movie.count({
    where: {
      genres: {
        some: {
          id: 878 // Science Fiction genre ID
        }
      }
    }
  })

  // Fetch paginated science fiction movies
  const sciFiMovies = await prisma.movie.findMany({
    where: {
      genres: {
        some: {
          id: 878 // Science Fiction genre ID
        }
      }
    },
    include: {
      genres: true
    },
    orderBy: {
      popularity: 'desc'
    },
    skip: skip,
    take: moviesPerPage
  })

  const totalPages = Math.ceil(totalMovies / moviesPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
            Science Fiction Movies
          </h1>
          <p className="text-zinc-400 text-lg">
            Discover {totalMovies} amazing sci-fi movies from our collection
          </p>
          <p className="text-zinc-500 text-sm mt-1">
            Page {currentPage} of {totalPages} • Showing {sciFiMovies.length} movies
          </p>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sciFiMovies.map((movie) => (
            <div
              key={movie.id}
              className="group relative bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20"
            >
              {/* Movie Poster */}
              <div className="relative aspect-[2/3] overflow-hidden">
                {movie.posterPath ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                    <span className="text-zinc-600 text-sm">No Image</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Movie Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {movie.title}
                </h3>
                
                {/* Rating and Year */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">
                      {movie.voteAverage.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-zinc-400">
                    <CalendarIcon className="h-4 w-4" />
                    <span className="text-sm">
                      {new Date(movie.releaseDate).getFullYear()}
                    </span>
                  </div>
                </div>

                {/* Overview */}
                <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>

                {/* Genres */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {movie.genres.slice(0, 2).map((genre) => (
                    <span
                      key={genre.id}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sciFiMovies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-zinc-400 text-lg">No sci-fi movies found.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-2">
            {/* Previous Button */}
            {hasPrevPage ? (
              <Link
                href={`/sci-fi-movies?page=${currentPage - 1}`}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-600 rounded-lg text-sm cursor-not-allowed">
                <ChevronLeftIcon className="h-4 w-4" />
                Previous
              </div>
            )}

            {/* Page Numbers */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                const isCurrentPage = pageNumber === currentPage;

                return (
                  <Link
                    key={pageNumber}
                    href={`/sci-fi-movies?page=${pageNumber}`}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      isCurrentPage
                        ? 'bg-purple-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                    }`}
                  >
                    {pageNumber}
                  </Link>
                );
              })}
            </div>

            {/* Next Button */}
            {hasNextPage ? (
              <Link
                href={`/sci-fi-movies?page=${currentPage + 1}`}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm"
              >
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-zinc-600 rounded-lg text-sm cursor-not-allowed">
                Next
                <ChevronRightIcon className="h-4 w-4" />
              </div>
            )}
          </div>
        )}

        {/* Pagination Info */}
        {totalPages > 1 && (
          <div className="mt-6 text-center">
            <p className="text-zinc-500 text-sm">
              Showing {skip + 1} to {Math.min(skip + moviesPerPage, totalMovies)} of {totalMovies} movies
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 