import Link from 'next/link'
import { FileQuestion, Home, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-accent p-4 border-2 border-border w-fit mx-auto mb-6">
          <FileQuestion className="h-12 w-12 text-accent-foreground" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black text-foreground uppercase font-mono mb-2">
          404
        </h1>
        
        <h2 className="text-xl font-bold text-foreground mb-3">
          Page Not Found
        </h2>
        
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="accent" size="lg">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/quote">
              Get a Quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
