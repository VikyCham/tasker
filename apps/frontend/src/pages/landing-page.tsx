import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight, CheckCircle, MessageSquare, Flag, Paperclip } from "lucide-react";

export function LandingPage() {

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle aria-hidden="true" className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">Tasker</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-3">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-b from-muted/60 to-background py-20 px-4 sm:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground">
            <CheckCircle aria-hidden="true" className="h-4 w-4" />
            Your everyday tasks, in one place
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance mb-6">
            A place for your tasks.
            <span className="text-primary"> Room for your day.</span>
          </h1>
          <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground mb-8 max-w-2xl mx-auto">
            Keep track of what you need to do with Tasker. Add a task, set its
            priority and due date, and mark it done when you're finished.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8 shadow-sm" asChild>
              <Link to="/auth/sign-up">
                Get Started <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="px-8" asChild>
              <Link to="/auth/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/40 border-y">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-balance text-center mb-10">
            Small details that keep tasks clear
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border bg-card text-center p-6 shadow-sm transition-shadow hover:shadow-md">
              <CheckCircle aria-hidden="true" className="h-10 w-10 rounded-lg bg-muted p-2 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keep things sorted</h3>
              <p className="text-muted-foreground">
                Group tasks into categories so they're easy to find.
              </p>
            </div>
            <div className="rounded-xl border bg-card text-center p-6 shadow-sm transition-shadow hover:shadow-md">
              <MessageSquare aria-hidden="true" className="h-10 w-10 rounded-lg bg-muted p-2 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Leave a note</h3>
              <p className="text-muted-foreground">
                Add comments to keep useful notes alongside each task.
              </p>
            </div>
            <div className="rounded-xl border bg-card text-center p-6 shadow-sm transition-shadow hover:shadow-md">
              <Flag aria-hidden="true" className="h-10 w-10 rounded-lg bg-muted p-2 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Know what's next</h3>
              <p className="text-muted-foreground">
                Set priorities and due dates to help decide what to do next.
              </p>
            </div>
            <div className="rounded-xl border bg-card text-center p-6 shadow-sm transition-shadow hover:shadow-md">
              <Paperclip aria-hidden="true" className="h-10 w-10 rounded-lg bg-muted p-2 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Keep files close</h3>
              <p className="text-muted-foreground">
                Attach files to a task so you can find them when you need them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-muted/30 px-6 py-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Start with one task.
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
            Something to finish today or a plan for later. Give it a place in Tasker.
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link to="/auth/sign-up">
              Create Your Account <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            Tasker. A simple place to keep track.
          </p>
        </div>
      </footer>
    </div>
  );
}
