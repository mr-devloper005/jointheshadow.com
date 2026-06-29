import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((url): url is string => typeof url === 'string' && Boolean(url))
  const logo = typeof content.logo === 'string' ? content.logo : ''
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Featured' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className={`group relative block min-w-0 overflow-hidden ${dc.surface.dark} ${dc.motion.lift}`}>
      <div className="relative min-h-[480px] p-7 sm:p-9 lg:min-h-[580px]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,15,26,0.15),rgba(14,15,26,0.9))]" />
        <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-end lg:min-h-[520px]">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/12 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white backdrop-blur">
            {label}
          </span>
          <h3 className="editable-display mt-5 max-w-3xl text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-white sm:text-4xl lg:text-5xl">{post.title}</h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">{getEditableExcerpt(post, 180)}</p>
          <span className={`mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold ${pal.panelText} transition group-hover:gap-3`}>
            Read more <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block overflow-hidden ${dc.surface.card} ${dc.motion.lift}`}>
      <div className={`${dc.media.frame} ${dc.media.ratio}`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-full bg-[var(--slot4-dark-bg)]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="p-4">
        <p className={`${dc.type.eyebrow}`}>{getEditableCategory(post)}</p>
        <h3 className={`mt-2 line-clamp-2 text-base font-bold leading-snug tracking-[-0.01em] ${pal.panelText} transition group-hover:text-[var(--slot4-accent)]`}>{post.title}</h3>
        <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 110)}</p>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group block min-w-0 ${dc.surface.soft} p-5 ${dc.motion.lift}`}>
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-sm font-bold text-[var(--slot4-accent)]">{index + 1}</span>
        <div className="min-w-0">
          <p className={`flex items-center gap-2 ${dc.type.eyebrow}`}><Clock3 className="h-3.5 w-3.5" /> {getEditableCategory(post)}</p>
          <h3 className={`mt-2 line-clamp-2 text-lg font-bold leading-snug tracking-[-0.01em] ${pal.panelText} transition group-hover:text-[var(--slot4-accent)]`}>{post.title}</h3>
          <p className={`mt-2 line-clamp-2 text-sm leading-6 ${pal.mutedText}`}>{getEditableExcerpt(post, 105)}</p>
        </div>
      </div>
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group grid min-w-0 gap-5 overflow-hidden ${dc.surface.card} p-4 ${dc.motion.lift} sm:grid-cols-[240px_minmax(0,1fr)]`}>
      <div className={`${dc.media.frame} aspect-[16/11] sm:aspect-auto sm:min-h-[200px]`}>
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 p-2 sm:py-5 sm:pr-6">
        <p className={`${dc.type.eyebrow}`}>{getEditableCategory(post)} · No. {String(index + 1).padStart(2, '0')}</p>
        <h2 className={`mt-3 line-clamp-2 text-2xl font-bold leading-tight tracking-[-0.02em] ${pal.panelText} transition group-hover:text-[var(--slot4-accent)] sm:text-3xl`}>{post.title}</h2>
        <p className={`mt-3 line-clamp-3 text-sm leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 180)}</p>
        <span className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${pal.accentText} transition group-hover:gap-2.5`}>Read more <ArrowUpRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}
