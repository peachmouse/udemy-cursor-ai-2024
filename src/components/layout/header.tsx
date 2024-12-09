import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          SciFi Flix
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/sci-fi-movies" className="hover:text-gray-300">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/actors" className="hover:text-gray-300">
                Actors
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
