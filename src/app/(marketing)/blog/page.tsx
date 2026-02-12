import Link from 'next/link'
import { ArrowRight, Clock, Phone, PenLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllPosts } from '@/lib/blog'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export const metadata = {
  title: 'IT Logistics Resources & Guides | PowerRoute',
  description:
    'Practical guides for data center relocations, ITAD compliance, chain of custody, and IT asset management. Written by the team that vets 340+ providers.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hero-fg leading-tight tracking-tight mb-4">
              IT Logistics Resources
            </h1>
            <p className="text-base md:text-lg text-hero-fg/70 max-w-2xl leading-relaxed">
              Practical guides, checklists, and compliance resources from the team that
              vets 340+ IT logistics providers. No fluff. No gated PDFs. Just the information
              your IT team needs.
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Card key={post.slug} className="border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-base font-semibold text-card-foreground mb-2 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
                    >
                      Read more
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                    {!post.published && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground/60">
                        <PenLine className="h-3 w-3" />
                        Coming soon
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-section-alt border-t border-border">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Need a Provider, Not a Blog Post?
          </h2>
          <p className="text-muted-foreground mb-8">
            If you&apos;re past the research phase and ready to move, we&apos;ll match you with a
            certified provider in under 2 hours. Free, no obligation.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-sm font-semibold">
              <Link href="/quote">
                Get Your Free Match
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-sm">
              <a href={`tel:${PHONE_NUMBER}`}>
                <Phone className="mr-2 h-4 w-4" />
                Talk to a Human
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
