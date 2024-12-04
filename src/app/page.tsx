import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import heroImage from './hero-image.png';

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gray-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore the Universe of Sci-Fi
            </h1>
            <p className="text-xl mb-6">
              Discover and stream the best science fiction movies from across
              the galaxy.
            </p>
            <Link href="/sci-fi-movies">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse SciFi Movies
              </Button>
            </Link>
          </div>
          <div className="md:w-1/2">
            <Image
              src={heroImage}
              width={600}
              height={400}
              alt="Sci-Fi Movie Collage"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Choose Your Galactic Plan
          </h2>
          {/* Responsive grid layout: 1 column on mobile, 3 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <CardDescription>For casual explorers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€9.99/month</p>
                <ul className="mt-4 space-y-2">
                  <li>✓ HD streaming</li>
                  <li>✓ Watch on 1 device</li>
                  <li>✓ 100 movies/month</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full">Choose Basic</Button>
              </CardFooter>
            </Card>

            {/* Pro Plan Card - Featured tier with visual emphasis */}
            <Card className="border-4 border-blue-500 transform scale-105 flex flex-col">
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <CardDescription>For serious sci-fi fans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€14.99/month</p>
                <ul className="mt-4 space-y-2">
                  <li>✓ 4K Ultra HD</li>
                  <li>✓ Watch on 2 devices</li>
                  <li>✓ Unlimited movies</li>
                  <li>✓ Exclusive behind-the-scenes</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Choose Pro
                </Button>
              </CardFooter>
            </Card>

            {/* Ultimate Plan Card */}
            <Card className="flex flex-col">
              <CardHeader>
                <CardTitle>Ultimate</CardTitle>
                <CardDescription>For the true space opera</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">€19.99/month</p>
                <ul className="mt-4 space-y-2">
                  <li>✓ 8K streaming</li>
                  <li>✓ Watch on 4 devices</li>
                  <li>✓ Unlimited movies</li>
                  <li>✓ Early access to new releases</li>
                  <li>✓ Offline viewing</li>
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button className="w-full">Choose Ultimate</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
