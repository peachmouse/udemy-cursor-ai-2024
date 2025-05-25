import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MenuIcon, StarIcon, CalendarIcon, PlayIcon } from "lucide-react"
import { prisma } from "@/lib/prisma"

export default async function LandingPage() {
  // Fetch Interstellar movie data
  const movieOfTheDay = await prisma.movie.findUnique({
    where: { id: 157336 }, // Interstellar ID
    include: {
      genres: true,
      directors: true,
      actors: true
    }
  })

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/80 backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                SciFlix
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Home
            </Link>
            <Link href="/sci-fi-movies" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Movies
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-400 transition-colors">
              TV Shows
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-400 transition-colors">
              New Releases
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-purple-400 transition-colors">
              About
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="hidden md:flex border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
            >
              Sign In
            </Button>
            <Button className="hidden md:flex bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
              Get Started
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-gradient-to-r from-white to-purple-400 bg-clip-text text-transparent">
                  Discover the Universe of Sci-Fi Cinema
                </h1>
                <p className="text-zinc-400 md:text-xl">
                  Explore thousands of science fiction movies from classics to the latest releases. Your gateway to
                  interstellar adventures, dystopian futures, and technological wonders.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white">
                    Start Exploring
                  </Button>
                  <Button
                    variant="outline"
                    className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-zinc-800">
                <Image
                  src="/arrival.jpg"
                  alt="Sci-fi movie collage"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Movie of the Day Section */}
        <section className="py-24 bg-zinc-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Movie of the Day</h2>
              <p className="max-w-[700px] text-zinc-400 md:text-xl">
                Today&apos;s featured sci-fi masterpiece that will take you on an extraordinary journey
              </p>
            </div>

            {movieOfTheDay && (
              <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 shadow-2xl">
                  {/* Backdrop Image */}
                  <div className="relative h-96 md:h-[500px] overflow-hidden">
                    {movieOfTheDay.backdropPath ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/original${movieOfTheDay.backdropPath}`}
                        alt={movieOfTheDay.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <span className="text-zinc-600 text-lg">No backdrop available</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                      <div className="grid md:grid-cols-3 gap-8 items-end">
                        {/* Poster */}
                        <div className="hidden md:block">
                          <div className="relative aspect-[2/3] w-48 overflow-hidden rounded-lg border-2 border-zinc-600 shadow-xl">
                            {movieOfTheDay.posterPath ? (
                              <Image
                                src={`https://image.tmdb.org/t/p/w500${movieOfTheDay.posterPath}`}
                                alt={movieOfTheDay.title}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                                <span className="text-zinc-500 text-sm">No poster</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Movie Info */}
                        <div className="md:col-span-2 space-y-6">
                          <div>
                            <h3 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                              {movieOfTheDay.title}
                            </h3>
                            
                            {/* Rating and Year */}
                            <div className="flex items-center gap-6 mb-4">
                              <div className="flex items-center gap-2">
                                <StarIcon className="h-6 w-6 text-yellow-400 fill-current" />
                                <span className="text-xl font-bold text-yellow-400">
                                  {movieOfTheDay.voteAverage.toFixed(1)}
                                </span>
                                <span className="text-zinc-400">
                                  ({movieOfTheDay.voteCount.toLocaleString()} votes)
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-zinc-300">
                                <CalendarIcon className="h-5 w-5" />
                                <span className="text-lg">
                                  {new Date(movieOfTheDay.releaseDate).getFullYear()}
                                </span>
                              </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {movieOfTheDay.genres.map((genre) => (
                                <Badge
                                  key={genre.id}
                                  className="bg-purple-600/20 text-purple-300 border-purple-500/30 px-3 py-1 text-sm"
                                >
                                  {genre.name}
                                </Badge>
                              ))}
                            </div>

                            {/* Overview */}
                            <p className="text-zinc-300 text-lg leading-relaxed mb-6 max-w-3xl">
                              {movieOfTheDay.overview}
                            </p>

                            {/* Director */}
                            {movieOfTheDay.directors.length > 0 && (
                              <div className="mb-6">
                                <span className="text-zinc-400 text-sm">Directed by: </span>
                                <span className="text-white font-medium">
                                  {movieOfTheDay.directors.map(d => d.name).join(', ')}
                                </span>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                              <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 text-lg">
                                <PlayIcon className="h-5 w-5 mr-2" />
                                Watch Now
                              </Button>
                              <Button
                                variant="outline"
                                className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 hover:text-white px-8 py-3 text-lg"
                              >
                                Add to Watchlist
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 bg-black">
        <div className="container py-8 px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 font-bold text-xl mb-4">
                <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  SciFlix
                </span>
              </Link>
              <p className="text-zinc-400 text-sm">
                Your ultimate destination for science fiction movies and TV shows.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    TV Shows
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    DMCA
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    Support
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-purple-400 transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-zinc-400 text-sm">© {new Date().getFullYear()} SciFlix. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center gap-2 text-zinc-400 text-sm">
              <span>Movie data provided by</span>
              <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-500 hover:text-cyan-400 transition-colors font-medium"
              >
                The Movie Database (TMDB)
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
