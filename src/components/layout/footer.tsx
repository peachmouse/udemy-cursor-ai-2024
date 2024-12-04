export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© 2023 SciFi Flix. All rights reserved.</p>
        <p className="mt-2">
          Movie data provided by{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300"
          >
            The Movie Database (TMDB)
          </a>
        </p>
      </div>
    </footer>
  );
}
