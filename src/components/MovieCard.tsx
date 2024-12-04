import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Movie } from '@prisma/client';
import Link from 'next/link';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="group relative bg-black/20 border-0 rounded-lg overflow-hidden">
      <CardContent className="p-0">
        <Link href={`/movies/${movie.id}`} className="block">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-red-600 px-6 py-2 rounded-sm uppercase text-white font-semibold">
                Read More
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold text-white">{movie.title}</h2>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="text-yellow-400 ml-1">
                {movie.voteAverage.toFixed(1)}
              </span>
              <span className="text-gray-400 ml-1">/10</span>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
