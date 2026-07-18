import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/logo.svg";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,var(--primary),transparent_35%)] opacity-20" />

      <header className="fixed mx-auto flex w-screen items-center justify-between px-4 py-6 sm:px-8">
        <Link href="/" className="inline-flex items-center">
          <Image src={Logo} alt="Jobify logo" className="h-10 w-auto" />
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/add-job">Get Started</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_460px]">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm">
            Track applications. Stay organised. Get hired.
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Job tracking made{" "}
            <span className="bg-linear-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              simple
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            Keep all your job applications, interviews, notes, and progress in
            one clean dashboard so you always know what to do next.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/add-job">Start Tracking</Link>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <Link href="/jobs">View Jobs</Link>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-primary/10 blur-3xl" />

          <Image
            src={LandingImg}
            alt="Job tracking dashboard illustration"
            priority
            className="h-auto w-full"
          />
        </div>
      </section>
    </main>
  );
}
