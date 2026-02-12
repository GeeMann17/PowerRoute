/**
 * Blog post data store.
 *
 * To add a new blog post:
 * 1. Add an entry to the `posts` array below
 * 2. Set `published: true` when it's ready
 * 3. Write the `content` as an array of HTML strings (each is a paragraph or section)
 *
 * Content supports raw HTML for rich formatting:
 *   - <h2>, <h3> for section headings
 *   - <ul>/<ol>/<li> for lists
 *   - <strong>, <em> for emphasis
 *   - <blockquote> for callouts
 *   - <a href="..."> for links
 */

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  metaDescription: string
  published: boolean
  content: string[]
}

export const posts: BlogPost[] = [
  {
    slug: 'data-center-relocation-checklist',
    title: 'The Data Center Relocation Checklist Most IT Teams Miss',
    excerpt:
      'A 47-point checklist covering pre-move assessment, change management, transport logistics, and post-move validation. Built from 14,200+ rack moves.',
    category: 'Data Center Relocation',
    readTime: '8 min read',
    date: '2025-01-15',
    metaDescription:
      'A 47-point checklist covering pre-move assessment, change management, transport logistics, and post-move validation for data center migrations.',
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
  {
    slug: 'itad-compliance-guide',
    title: 'ITAD Compliance: What Your Auditor Actually Looks For',
    excerpt:
      'NIST 800-88, NAID AAA, serialized Certificates of Destruction — what the standards require and how most companies fall short.',
    category: 'ITAD & Compliance',
    readTime: '6 min read',
    date: '2025-01-08',
    metaDescription:
      'NIST 800-88, NAID AAA, serialized Certificates of Destruction — what ITAD compliance standards require and how most companies fall short.',
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
  {
    slug: 'chain-of-custody-best-practices',
    title: 'Chain of Custody for IT Assets: A No-BS Guide',
    excerpt:
      'From serial-number inventory to tamper-evident seals to verified handoff — the chain of custody protocol that passes every audit.',
    category: 'Compliance',
    readTime: '5 min read',
    date: '2024-12-20',
    metaDescription:
      'From serial-number inventory to tamper-evident seals to verified handoff — the chain of custody protocol that passes every audit.',
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
  {
    slug: 'vetting-it-logistics-providers',
    title: 'How to Vet an IT Logistics Provider (Or Let Us Do It)',
    excerpt:
      'The 5 things to verify before you trust anyone with your servers. Certifications, insurance, crew clearances, fleet specs, and references.',
    category: 'Vendor Selection',
    readTime: '7 min read',
    date: '2024-12-12',
    metaDescription:
      'The 5 things to verify before you trust anyone with your servers. Certifications, insurance, crew clearances, fleet specs, and references.',
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
  {
    slug: 'office-decommission-timeline',
    title: 'Office IT Decommission: What a Realistic Timeline Looks Like',
    excerpt:
      "Your lease expires in 30 days. Here's how to plan a complete IT teardown without missing your deadline or leaving data behind.",
    category: 'Office Decommission',
    readTime: '6 min read',
    date: '2024-12-05',
    metaDescription:
      "Your lease expires in 30 days. Here's how to plan a complete IT teardown without missing your deadline or leaving data behind.",
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
  {
    slug: 'it-asset-recovery-remote-sites',
    title: 'Recovering IT Assets from Remote Sites Without Losing Your Mind',
    excerpt:
      'Branch closures, acquisitions, remote offices — how to retrieve scattered assets with full chain of custody documentation.',
    category: 'Asset Recovery',
    readTime: '5 min read',
    date: '2024-11-28',
    metaDescription:
      'Branch closures, acquisitions, remote offices — how to retrieve scattered assets with full chain of custody documentation.',
    published: false,
    content: [
      'This article is currently being written by our team. Check back shortly for the full guide.',
    ],
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export function getAllPosts(): BlogPost[] {
  return posts
}

export function getPublishedPosts(): BlogPost[] {
  return posts.filter((p) => p.published)
}
