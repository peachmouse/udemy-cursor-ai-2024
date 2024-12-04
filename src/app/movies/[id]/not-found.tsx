import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-4">Movie Not Found</h1>
        <p className="text-gray-400 mb-8">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/sci-fi-movies">
          <Button variant="outline">Back to Movies</Button>
        </Link>
      </div>
    </div>
  );
}
