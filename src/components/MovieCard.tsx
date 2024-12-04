import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Card className="bg-gray-800 text-white border-gray-700">
      <CardContent className="p-0">
        <div className="relative h-[400px]">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
          <p className="text-gray-400 text-sm mb-4">
            {new Date(movie.releaseDate).toLocaleDateString()}
          </p>
          <p className="text-gray-300 text-sm line-clamp-3 mb-4">
            {movie.overview}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{movie.voteAverage.toFixed(1)}</span>
            </div>
            <Button variant="secondary">View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
