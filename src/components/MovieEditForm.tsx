'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MovieDetails } from '@/types/movie';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { updateMovie } from '@/app/actions/update-movie';
import { toast } from 'sonner';

interface MovieEditFormProps {
  movie: MovieDetails;
  genres: { id: number; name: string }[];
  actors: { id: number; name: string }[];
  directors: { id: number; name: string }[];
}

export function MovieEditForm({
  movie,
  genres,
  actors,
  directors,
}: MovieEditFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const formattedDate = new Date(movie.releaseDate).toISOString().split('T')[0];

  async function onSubmit(formData: FormData) {
    setIsPending(true);

    try {
      const genreIds = Array.from(formData.getAll('genreIds')).map(Number);
      const actorIds = Array.from(formData.getAll('actorIds')).map(Number);
      const directorIds = Array.from(formData.getAll('directorIds')).map(
        Number
      );

      const updatedFormData = new FormData();
      updatedFormData.append('title', formData.get('title') as string);
      updatedFormData.append('overview', formData.get('overview') as string);
      updatedFormData.append(
        'posterPath',
        formData.get('posterPath') as string
      );
      updatedFormData.append(
        'backdropPath',
        formData.get('backdropPath') as string
      );
      updatedFormData.append(
        'releaseDate',
        formData.get('releaseDate') as string
      );
      updatedFormData.append('popularity', movie.popularity.toString());
      updatedFormData.append('voteAverage', movie.voteAverage.toString());
      updatedFormData.append('voteCount', movie.voteCount.toString());

      genreIds.forEach((id) =>
        updatedFormData.append('genreIds', id.toString())
      );
      actorIds.forEach((id) =>
        updatedFormData.append('actorIds', id.toString())
      );
      directorIds.forEach((id) =>
        updatedFormData.append('directorIds', id.toString())
      );

      const result = await updateMovie(movie.id, updatedFormData);

      if (result.success) {
        toast.success('Movie updated successfully');
        router.push(`/movies/${movie.id}`);
        router.refresh();
      } else {
        toast.error(result.error || 'Failed to update movie');
      }
    } catch (error) {
      console.error('Failed to update movie:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={onSubmit} className="space-y-8 max-w-2xl mx-auto">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Title *
          </label>
          <Input
            name="title"
            defaultValue={movie.title}
            required
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Overview
          </label>
          <Textarea
            name="overview"
            defaultValue={movie.overview}
            className="bg-gray-800 text-white"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Poster Path
          </label>
          <Input
            name="posterPath"
            defaultValue={movie.posterPath}
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Backdrop Path
          </label>
          <Input
            name="backdropPath"
            defaultValue={movie.backdropPath}
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Release Date
          </label>
          <Input
            type="date"
            name="releaseDate"
            defaultValue={formattedDate}
            className="bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Genres
          </label>
          <select
            name="genreIds"
            multiple
            className="bg-gray-800 text-white w-full rounded-md border border-gray-700 p-2"
            defaultValue={movie.genres.map((g) => g.id.toString())}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Actors
          </label>
          <select
            name="actorIds"
            multiple
            className="bg-gray-800 text-white w-full rounded-md border border-gray-700 p-2"
            defaultValue={movie.actors.map((a) => a.id.toString())}
          >
            {actors.map((actor) => (
              <option key={actor.id} value={actor.id.toString()}>
                {actor.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-2">
            Directors
          </label>
          <select
            name="directorIds"
            multiple
            className="bg-gray-800 text-white w-full rounded-md border border-gray-700 p-2"
            defaultValue={movie.directors.map((d) => d.id.toString())}
          >
            {directors.map((director) => (
              <option key={director.id} value={director.id.toString()}>
                {director.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={isPending}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {isPending ? 'Updating...' : 'Update Movie'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="border-gray-300 hover:bg-gray-700 text-gray-300"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
