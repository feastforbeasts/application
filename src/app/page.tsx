import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FeastForBeastsLogo } from '@/components/icons/logo';
import Image from 'next/image';
import { HandHeart, Users, Award } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <FeastForBeastsLogo className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                    FeastForBeasts: Share More, Waste Less.
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join our community effort to reduce food waste and feed those in need. Donate your surplus food easily and make a tangible impact.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/donate">Donate Food Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Happy people sharing food"
                width={600}
                height={400}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square shadow-lg"
                data-ai-hint="food donation community"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary font-semibold">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How FeastForBeasts Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes food donation simple, efficient, and rewarding.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:gap-16 pt-12">
              <div className="grid gap-2 p-6 rounded-lg bg-card shadow-md hover:shadow-xl transition-shadow">
                <HandHeart className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Easy Donations</h3>
                <p className="text-sm text-muted-foreground">
                  Quickly submit details about your surplus food – type, quantity, expiry, and pickup location.
                </p>
              </div>
              <div className="grid gap-2 p-6 rounded-lg bg-card shadow-md hover:shadow-xl transition-shadow">
                <Users className="h-10 w-10 text-primary" />
                <h3 className="text-xl font-bold">Smart NGO Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI tool recommends the best nearby NGOs based on your donation's specifics and urgency.
                </p>
              </div>
              <div className="grid gap-2 p-6 rounded-lg bg-card shadow-md hover:shadow-xl transition-shadow">
                <Award className="h-10 w-10 text-accent" />
                <h3 className="text-xl font-bold">Track & Get Rewarded</h3>
                <p className="text-sm text-muted-foreground">
                  View your donation history, see your impact, and earn points for your contributions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
