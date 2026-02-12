import Link from 'next/link'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/blog'

const PHONE_NUMBER = process.env.NEXT_PUBLIC_PHONE_NUMBER || '1-800-POWER-RT'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Not Found' }
  return {
    title: `${post.title} | PowerRoute`,
    description: post.metaDescription,
  }
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="bg-background">
      {/* Article Header */}
      <section className="bg-hero-bg border-b border-border">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Resources
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
              <span className="text-xs text-muted-foreground">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-hero-fg leading-tight tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-3xl">
            <div className="space-y-6 text-base text-foreground/80 leading-relaxed [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-foreground/80 [&_strong]:text-foreground [&_strong]:font-semibold [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-primary/80">
              {post.content.map((block, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: block }} />
              ))}
            </div>

            {!post.published && (
              <div className="mt-12 rounded-lg border border-border bg-section-alt p-6 text-center">
                <p className="text-sm font-medium text-foreground mb-1">
                  This article is being written
                </p>
                <p className="text-sm text-muted-foreground">
                  Want to be notified when it&apos;s published? Get in touch and we&apos;ll let you know.
                </p>
              </div>
            )}
          </article>
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
