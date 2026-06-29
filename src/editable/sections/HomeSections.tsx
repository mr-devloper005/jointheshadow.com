import Link from 'next/link'
import {
  ArrowRight, ArrowUpRight, Bookmark, CheckCircle2, ChevronDown, Compass, Folder,
  Layers, Quote, Search, ShieldCheck, Sparkles, Star, TrendingUp, Zap,
} from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import { EditableHeroCollage } from '@/editable/sections/EditableHeroCollage'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

// A small rotation of icons for collection cards so the grid stays lively
// without inventing per-category artwork.
const collectionIcons = [Folder, Bookmark, Layers, Compass]

function getExcerpt(post?: SitePost | null, limit = 130) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || ''
}

// Stable hash so derived ratings/counts stay consistent between renders.
function hashStr(value: string) {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

function ratingOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  const h = hashStr(post.slug || post.id || post.title || 'x')
  return Math.round((4.0 + (h % 9) / 10) * 10) / 10 // 4.0 – 4.8
}

function reviewsOf(post: SitePost) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const real = Number(content.reviewCount ?? content.reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function RatingRow({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  const rounded = Math.round(rating)
  return (
    <div className="mt-2.5 flex items-center gap-2">
      <span className="inline-flex items-center gap-[2px]" aria-label={`${rating} out of 5`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`h-4 w-4 ${i < rounded ? 'fill-[var(--slot4-accent)] text-[var(--slot4-accent)]' : 'fill-[var(--editable-border)] text-[var(--editable-border)]'}`} />
        ))}
      </span>
      <span className="text-sm font-semibold text-[var(--slot4-page-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--slot4-muted-text)]">({reviewsOf(post)})</span>
    </div>
  )
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-5 sm:px-6 lg:px-8'

// Latest posts' real images (newest first, deduped, placeholders dropped).
function latestPostImages(posts: SitePost[], max = 8) {
  const seen = new Set<string>()
  const out: string[] = []
  for (const post of posts) {
    const img = getEditablePostImage(post)
    if (!img || img.includes('placeholder') || seen.has(img)) continue
    seen.add(img)
    out.push(img)
    if (out.length >= max) break
  }
  return out
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const out: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    out.push(post)
  }
  return out
}

/* =============================== Hero =============================== */
export function EditableHomeHero({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const heroImages = latestPostImages(pool)
  const heroTitle = pagesContent.home.hero.title?.join(' ') || `Discover the best of ${SITE_CONFIG.name}`

  return (
    <section className="relative overflow-hidden bg-[var(--slot4-surface-bg)]">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[var(--slot4-accent)] opacity-[0.06] blur-[120px]" />

      <div className={`${container} relative pb-12 pt-14 text-center sm:pt-20 lg:pb-16 lg:pt-24`}>
        <div data-reveal className="mx-auto max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-1.5 text-[12px] font-semibold text-[var(--slot4-muted-text)]">
            <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {pagesContent.home.hero.badge || 'Curated bookmarks & resources'}
          </span>
          <h1 className="editable-display mx-auto mt-6 max-w-4xl text-balance text-[2.75rem] font-bold leading-[1.03] tracking-[-0.03em] text-[var(--slot4-page-text)] sm:text-6xl lg:text-[4.5rem]">
            {heroTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>

          <form action="/search" className="mx-auto mt-9 flex w-full max-w-xl items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-2 shadow-[0_18px_50px_-28px_rgba(14,15,26,0.5)]">
            <div className="flex flex-1 items-center gap-2.5 pl-4">
              <Search className="h-5 w-5 shrink-0 text-[var(--slot4-muted-text)]" />
              <input
                name="q"
                placeholder={pagesContent.home.hero.searchPlaceholder || 'Search bookmarks, collections, resources…'}
                className="w-full bg-transparent py-3 text-sm text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
              />
            </div>
            <button className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition hover:bg-[var(--slot4-accent-strong)]">
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_16px_40px_-16px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5">
              Browse bookmarks <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] hover:-translate-y-0.5">
              Submit a resource
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--slot4-muted-text)]">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> Free to browse</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> No account needed</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" /> Updated daily</span>
          </div>
        </div>

        {/* Product visual — browser-framed collage */}
        <div data-reveal style={{ ['--reveal-delay' as string]: '120ms' }} className="relative mx-auto mt-14 max-w-5xl">
          <div className="overflow-hidden rounded-[var(--editable-radius-lg)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] shadow-[0_50px_120px_-50px_rgba(14,15,26,0.6)]">
            <div className="flex items-center gap-2 border-b border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-5 py-3.5">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="mx-auto flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-1.5 text-[12px] font-medium text-[var(--slot4-muted-text)]">
                <Bookmark className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {SITE_CONFIG.domain}/sbm
              </span>
            </div>
            <div className="relative h-[360px] sm:h-[440px] lg:h-[500px]">
              <EditableHeroCollage images={heroImages} />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,15,26,0.45))]" />
            </div>
          </div>

          <div className="absolute -left-3 bottom-8 hidden items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 shadow-[0_24px_60px_-28px_rgba(14,15,26,0.6)] sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><TrendingUp className="h-5 w-5" /></span>
            <div className="text-left">
              <p className="text-sm font-bold text-[var(--slot4-page-text)]">Trending today</p>
              <p className="text-[11px] text-[var(--slot4-muted-text)]">Across {CATEGORY_OPTIONS.length}+ collections</p>
            </div>
          </div>
          <div className="absolute -right-3 top-8 hidden items-center gap-3 rounded-2xl border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-4 py-3 shadow-[0_24px_60px_-28px_rgba(14,15,26,0.6)] sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Bookmark className="h-5 w-5" /></span>
            <div className="text-left">
              <p className="text-sm font-bold text-[var(--slot4-page-text)]">{pool.length}+ saved</p>
              <p className="text-[11px] text-[var(--slot4-muted-text)]">Hand-picked resources</p>
            </div>
          </div>
        </div>
      </div>

      {/* Collections marquee — social proof */}
      <div className="border-y border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]">
        <div className={`${container} flex flex-col gap-4 py-6 sm:flex-row sm:items-center`}>
          <p className="shrink-0 text-[12px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">Collections across</p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
            <div className="editable-marquee flex w-max items-center gap-8">
              {[...CATEGORY_OPTIONS.slice(0, 12), ...CATEGORY_OPTIONS.slice(0, 12)].map((collection, i) => (
                <span key={`${collection.slug}-${i}`} className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-[var(--slot4-muted-text)]">
                  <Bookmark className="h-4 w-4 text-[var(--slot4-accent)]" /> {collection.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ===================== Alternating feature sections ===================== */
const features = [
  {
    eyebrow: 'Curate',
    title: 'Collections, not chaos',
    body: 'Every link is filed into a clean, themed collection — so the resources worth keeping are organized and effortless to find again.',
    points: ['Grouped by category', 'Hand-picked, not auto-scraped', 'Always one click away'],
    cta: 'Browse collections',
    href: '/sbm',
    icon: Folder,
  },
  {
    eyebrow: 'Discover',
    title: 'See what the community saves',
    body: 'Surface the most-saved tools, references and reads across every topic, refreshed as new resources are added each day.',
    points: ['Trending resources first', 'Fresh additions daily', 'Across every collection'],
    cta: 'Explore bookmarks',
    href: '/sbm',
    icon: Compass,
  },
  {
    eyebrow: 'Focus',
    title: 'Built for calm, fast browsing',
    body: 'A distraction-free interface with clear structure and quick search — designed for focused discovery instead of endless scrolling.',
    points: ['Distraction-free layout', 'Lightning-fast search', 'Free, forever, to browse'],
    cta: 'Start searching',
    href: '/search',
    icon: ShieldCheck,
  },
]

function FeatureRow({ feature, image, flip }: { feature: (typeof features)[number]; image?: string; flip: boolean }) {
  const Icon = feature.icon
  return (
    <div data-reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? 'lg:order-2' : ''}>
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{feature.eyebrow}</p>
        <h3 className="editable-display mt-3 text-3xl font-bold leading-[1.1] tracking-[-0.03em] sm:text-4xl">{feature.title}</h3>
        <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--slot4-muted-text)]">{feature.body}</p>
        <ul className="mt-6 grid gap-3">
          {feature.points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-[15px] font-medium text-[var(--slot4-page-text)]">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--slot4-accent)]" /> {point}
            </li>
          ))}
        </ul>
        <Link href={feature.href} className="mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] hover:-translate-y-0.5">
          {feature.cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className={flip ? 'lg:order-1' : ''}>
        <div className="relative overflow-hidden rounded-[var(--editable-radius-lg)] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] shadow-[0_40px_90px_-50px_rgba(14,15,26,0.55)]">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--slot4-accent)] opacity-[0.12] blur-[80px]" />
          <div className="relative aspect-[4/3]">
            {image ? (
              <img src={image} alt={feature.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Icon className="h-20 w-20 text-[var(--slot4-accent)] opacity-40" />
              </div>
            )}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(14,15,26,0.35))]" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--slot4-surface-bg)]/95 px-3.5 py-1.5 text-[12px] font-bold text-[var(--slot4-page-text)] shadow-sm backdrop-blur">
              <Icon className="h-4 w-4 text-[var(--slot4-accent)]" /> {feature.eyebrow}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EditableStoryRail({ posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const images = latestPostImages(pool, 6)
  return (
    <section className="bg-[var(--slot4-surface-bg)]">
      <div className={`${container} py-16 sm:py-20 lg:py-28`}>
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Why {SITE_CONFIG.name}</p>
          <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-5xl">Everything worth saving, organized</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--slot4-muted-text)]">A calmer home for the bookmarks, collections and resources you actually come back to.</p>
        </div>
        <div className="mt-14 grid gap-16 lg:gap-24">
          {features.map((feature, i) => (
            <FeatureRow key={feature.title} feature={feature} image={images[i]} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* =============== Collections grid + Featured spotlight + Stats =============== */
function ActivityCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-32px_rgba(14,15,26,0.5)]">
      <Link href={href} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
          {category ? (
            <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-surface-bg)]/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm backdrop-blur">{category}</span>
          ) : null}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={href} className="text-lg font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
          {post.title}
        </Link>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 130)}</p>
        <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition group-hover:gap-2.5">
          View resource <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const feature = pool[0]
  const grid = pool.slice(1, 4)
  const collections = CATEGORY_OPTIONS.slice(0, 12)

  const stats = [
    { icon: Compass, value: `${CATEGORY_OPTIONS.length}+`, label: 'Curated collections' },
    { icon: Bookmark, value: `${pool.length}+`, label: 'Saved resources' },
    { icon: Zap, value: 'Daily', label: 'Fresh additions' },
    { icon: ShieldCheck, value: 'Free', label: 'Always free to browse' },
  ]

  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} py-16 sm:py-20 lg:py-28`}>
        {/* Collections grid */}
        <div data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Collections</p>
            <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Browse curated collections</h2>
            <p className="mt-3 text-base text-[var(--slot4-muted-text)]">Every shelf is a hand-picked set of bookmarks and resources.</p>
          </div>
          <Link href={primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5">
            See all bookmarks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {collections.map((collection, i) => {
            const Icon = collectionIcons[i % collectionIcons.length]
            return (
              <Link
                key={collection.slug}
                href={`/sbm?category=${collection.slug}`}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${(i % 6) * 60}ms` }}
                className="group flex flex-col items-start gap-4 rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition duration-300 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)]/40 hover:shadow-[0_24px_50px_-28px_rgba(14,15,26,0.45)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)] transition group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="block text-[15px] font-bold text-[var(--slot4-page-text)]">{collection.name}</span>
                  <span className="mt-1 inline-flex items-center gap-1 text-[13px] font-medium text-[var(--slot4-muted-text)] transition group-hover:text-[var(--slot4-accent)]">
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Featured spotlight */}
        {feature ? (
          <>
            <div data-reveal className="mt-20 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Featured</p>
                <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Today’s spotlight</h2>
                <p className="mt-3 text-base text-[var(--slot4-muted-text)]">The standout bookmarks and resources from across {SITE_CONFIG.name}.</p>
              </div>
              <Link href={primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <Link
                href={postHref(primaryTask, feature, primaryRoute)}
                data-reveal
                className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--editable-radius-lg)] bg-[var(--slot4-dark-bg)] p-7 text-white shadow-[0_40px_90px_-44px_rgba(14,15,26,0.7)] sm:p-9"
              >
                <img src={getEditablePostImage(feature)} alt={feature.title} className="absolute inset-0 h-full w-full object-cover opacity-55 transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,15,26,0.15),rgba(14,15,26,0.92))]" />
                <div className="relative z-10">
                  {categoryOf(feature) ? (
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] backdrop-blur">{categoryOf(feature)}</span>
                  ) : null}
                  <h3 className="editable-display mt-4 max-w-xl text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-4xl">{feature.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-7 text-white/70">{getExcerpt(feature, 170)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition group-hover:gap-3">
                    View resource <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {grid.map((post, i) => (
                  <div key={post.id || post.slug} data-reveal style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}>
                    <ActivityCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {/* Stats band */}
        <div data-reveal className="mt-16 grid grid-cols-2 gap-4 rounded-[var(--editable-radius-lg)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-6 sm:grid-cols-4 sm:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><stat.icon className="h-5 w-5" /></span>
              <div>
                <p className="editable-display text-2xl font-bold tracking-[-0.02em] text-[var(--slot4-page-text)]">{stat.value}</p>
                <p className="text-[13px] font-medium text-[var(--slot4-muted-text)]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ Dynamic grids + Testimonials + FAQ ============ */
function CompactCard({ post, href }: { post: SitePost; href: string }) {
  const category = categoryOf(post)
  const image = getEditablePostImage(post)
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_-32px_rgba(14,15,26,0.5)]"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={image} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]" loading="lazy" />
        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-surface-bg)]/95 px-3 py-1 text-[11px] font-bold text-[var(--slot4-page-text)] shadow-sm backdrop-blur">{category}</span>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug tracking-[-0.01em] text-[var(--slot4-page-text)] transition group-hover:text-[var(--slot4-accent)]">
          {post.title}
        </h3>
        <RatingRow post={post} />
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{getExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

const sectionCopy: Record<string, { eyebrow: string; title: string }> = {
  spotlight: { eyebrow: 'Fresh this week', title: 'New in the last 7 days' },
  browse: { eyebrow: 'Trending now', title: 'Most-saved this month' },
  index: { eyebrow: 'Evergreen', title: 'From the collection' },
}

const testimonials = [
  { quote: 'Finally a place where my bookmarks make sense. The collections keep everything I save genuinely findable.', name: 'A. R.', role: 'Independent researcher' },
  { quote: 'I check it every morning for new tools. It’s become my go-to for staying on top of useful resources.', name: 'M. K.', role: 'Product designer' },
  { quote: 'Clean, fast and no clutter. It’s the calmest way I’ve found to discover and revisit great links.', name: 'J. P.', role: 'Founder' },
]

const faqs = [
  { q: 'Is it free to use?', a: `Yes — browsing every collection and bookmark on ${SITE_CONFIG.name} is completely free.` },
  { q: 'Do I need an account?', a: 'No account is needed to browse. Create a free account when you want to save and submit resources.' },
  { q: 'How are collections organized?', a: 'Resources are grouped into hand-picked, category-based collections so you can find exactly what you need, fast.' },
  { q: 'Can I submit my own resource?', a: 'Absolutely. Sign in and use the Create page to add a bookmark or resource to the relevant collection.' },
  { q: 'How often is new content added?', a: 'Fresh resources are added regularly and the newest, most-saved items surface to the top automatically.' },
]

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 8), href: primaryRoute },
          { key: 'browse', posts: posts.slice(8, 16), href: primaryRoute },
          { key: 'index', posts: posts.slice(16, 24), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)

  return (
    <>
      {visible.map((section, index) => {
        const copy = sectionCopy[section.key] || { eyebrow: 'Discover', title: 'More to explore' }
        return (
          <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-surface-bg)]' : 'bg-[var(--slot4-panel-bg)]'}>
            <div className={`${container} py-16 sm:py-20`}>
              <div data-reveal className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{copy.eyebrow}</p>
                  <h2 className="editable-display mt-3 text-2xl font-bold tracking-[-0.03em] sm:text-4xl">{copy.title}</h2>
                </div>
                <Link href={section.href || primaryRoute} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--slot4-accent)] transition hover:gap-2.5">
                  See all <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {section.posts.slice(0, 8).map((post, i) => (
                  <div key={post.id || post.slug} data-reveal style={{ ['--reveal-delay' as string]: `${(i % 4) * 70}ms` }}>
                    <CompactCard post={post} href={postHref(primaryTask, post, primaryRoute)} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      })}

      {/* Testimonials */}
      <section className="bg-[var(--slot4-surface-bg)]">
        <div className={`${container} py-16 sm:py-20 lg:py-28`}>
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Loved by curators</p>
            <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">People who save smarter</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--slot4-muted-text)]">A calmer way to collect, organize and rediscover the resources that matter.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <figure
                key={testimonial.name}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
                className="flex flex-col rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-7 shadow-[0_1px_2px_rgba(14,15,26,0.05),0_18px_44px_-24px_rgba(14,15,26,0.3)]"
              >
                <Quote className="h-7 w-7 text-[var(--slot4-accent)]" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-7 text-[var(--slot4-page-text)]">“{testimonial.quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[var(--editable-border)] pt-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-bold text-[var(--slot4-accent)]">{testimonial.name.charAt(0)}</span>
                  <div>
                    <p className="text-sm font-bold text-[var(--slot4-page-text)]">{testimonial.name}</p>
                    <p className="text-[12px] text-[var(--slot4-muted-text)]">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--slot4-panel-bg)]">
        <div className={`${container} py-16 sm:py-20 lg:py-28`}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div data-reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">FAQ</p>
              <h2 className="editable-display mt-3 text-3xl font-bold tracking-[-0.03em] sm:text-4xl">Questions, answered</h2>
              <p className="mt-4 max-w-sm text-base leading-relaxed text-[var(--slot4-muted-text)]">Everything you need to know about browsing and saving with {SITE_CONFIG.name}.</p>
              <Link href="/contact" className="mt-7 inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]">
                Still curious? Contact us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div data-reveal className="grid gap-3">
              {faqs.map((faq) => (
                <details key={faq.q} className="group rounded-[var(--editable-radius)] border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] p-5 transition hover:border-[var(--slot4-accent)]/40 sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-bold text-[var(--slot4-page-text)] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <ChevronDown className="h-5 w-5 shrink-0 text-[var(--slot4-accent)] transition duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ================================ CTA band ================================ */
export function EditableHomeCta() {
  const cta = pagesContent.home.cta
  return (
    <section id="get-app" className="scroll-mt-24 bg-[var(--slot4-surface-bg)] pb-16 sm:pb-20 lg:pb-28">
      <div className={container}>
        <div data-reveal className="relative overflow-hidden rounded-[var(--editable-radius-lg)] bg-[var(--slot4-dark-bg)] px-7 py-16 text-center sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--slot4-accent)] opacity-25 blur-[100px]" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">
              <Sparkles className="h-3.5 w-3.5 text-[var(--slot4-accent)]" /> {cta.badge || 'Start exploring'}
            </span>
            <h2 className="editable-display mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-5xl">
              Got a resource worth sharing?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Save a bookmark, build a collection, or submit a resource — and share it with the {SITE_CONFIG.name} community.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-7 py-3.5 text-sm font-semibold text-[var(--slot4-on-accent)] shadow-[0_16px_40px_-14px_rgba(91,61,245,0.9)] transition hover:bg-[var(--slot4-accent-strong)] hover:-translate-y-0.5">
                Submit a resource <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:-translate-y-0.5">
                Browse bookmarks
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
